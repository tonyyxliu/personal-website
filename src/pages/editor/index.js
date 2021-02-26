import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Link, TextField, Grid, Select, MenuItem, Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import reportWebVitals from '../../reportWebVitals';


import './index.css';

import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import BraftEditor from 'braft-editor';
import { ContactsOutlined } from '@material-ui/icons';



function Main() {
  return (
    <Container maxWidth="lg" p={0} style={{backgroundColor: "white",}}>
      <Editor />
      <Footer />
    </Container>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function Header() {
  const classes = useStyles();

  function handleClick() {
    alert( `文章已发布，请前往主页查看` );

    /* 收集所有博客数据并发往后端 */

  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          新建您的博客文章
        </Typography>
        <Button 
          color="inherit"
          onClick={handleClick}
        >
          发布文章
        </Button>
      </Toolbar>
    </AppBar>
  );
}


function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Rich Markdown Editor Copyright © '}
      <Link href="https://github.com/margox/braft-editor">
        margox/braft-editor
      </Link>
    </Typography>
  );
}


function Footer() {
  return (
    <div className="footer">
      <Copyright />
    </div>
  );
}


export function Editor() {
  const classes = useStyles();

  const [ editorState, setEditorState ] = useState( BraftEditor.createEditorState(null) );
  const [ outputHTML, setOutputHTML ] = useState( null );


  /* 文章数据 */
  const [ blogTitle, setBlogTitle ] = useState( "" );
  const [ blogTag, setBlogTag ] = useState( "前端" );
  const [ imageURL, setImageURL ] = useState( "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1365064717,1310351409&fm=26&gp=0.jpg" );


  /* 处理事件函数 */
  function handleTitleChange(event) {
    setBlogTitle( event.target.value );
  }

  function handleTagChange( event ) {
    setBlogTag( event.target.value );
  }

  function handleImageURLchange( event ) {
    setImageURL( event.target.value );
  }

  const handleChange = (editorState) => {
    setEditorState( editorState );
    setOutputHTML( editorState.toHTML() );
  };
  // function handleChange(editorState) {
  //   setEditorState( editorState );
  //   setOutputHTML( editorState.toHTML() );
  // }

  async function handleFormSubmit() {
    const blogDataObj = {
      title: blogTitle,
      tag: blogTag,
      imageURL: imageURL,
      content: JSON.stringify(editorState),
    };
    // alert( `blog data obj = ${JSON.stringify(blogDataObj)}` );

    // alert( `typeof(content) = ${ typeof(editorState) }` );

    /* 将博客数据POST到后端 */
    const postURL = "http://127.0.0.1:8080/createblog";
    try {
      let resp = await( fetch( postURL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type":"application/json",
        },
        body: JSON.stringify( blogDataObj ),
      } ) );

      if ( resp.ok ) {
        // 测试POST是否成功
        // alert( `resp.status = ${ resp.status } and status text = ${ resp.statusText }` );
        let json = await( resp.json() );
        // alert( `POST成功` );
        // alert( `json = ${ JSON.stringify(json) }` );
        alert( `editorState.toHTML() = ${ outputHTML } and type = ${ typeof( outputHTML ) }` );
      }
      else {
        alert( `fetch failed with status code = ${ resp.status } and status text = ${ resp.statusText }` );
      }
    }
    catch( error ) {
      console.log( `fetch failed with error = ${ error.mesg }`);
    }



    alert( `文章已发布，请前往主页查看` );
    
  }

  const styles = {
    typography: {
      textAlign: "center",
      // border: "2px solid orange",
      alignItems: "center",
      lineHeight: "300%",
      fontWeight: "bold",
    },
    textfield: {
      width: "30vw",
    },
  };

  return (
    // 文章标题
    <div className="editor">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            新建您的博客文章
          </Typography>
          <Button 
            color="inherit"
            onClick={handleFormSubmit}
          >
            发布文章
          </Button>
        </Toolbar>
      </AppBar>


      <form>
      <div className="title form-item">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography style={styles.typography}>
              文章标题：
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="title"
              label="title"
              maxWidth="100%"
              variant="outlined"
              value={blogTitle}
              style={styles.textfield}
              onChange={handleTitleChange}
            />
          </Grid>
        </Grid>
      </div>

      <Divider />

      <div className="tag form-item">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography style={styles.typography}>
              文章类型
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={blogTag}
              onChange={handleTagChange}
            >
              <MenuItem value={"前端"}>前端</MenuItem>
              <MenuItem value={"后端"}>后端</MenuItem>
              <MenuItem value={"其他"}>其他</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>

      <Divider />

      <div className="img-url form-item">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography style={styles.typography}>
              配图链接
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              name="imageURL"
              label="imageURL"
              maxWidth="100%"
              variant="outlined"
              value={imageURL}
              style={styles.textfield}
              onChange={handleImageURLchange}
            />
          </Grid>
        </Grid>
      </div>

      <Divider />

      <div className="form-item">
        <Typography style={styles.typography}>
          文章正文
        </Typography>
      </div>

    </form>

    <Divider />

    <BraftEditor 
      value={editorState} 
      onChange={handleChange}
    />

    <div className="braft-output-content" dangerouslySetInnerHTML={{__html: outputHTML}}></div>

    </div>
  )
}




ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
