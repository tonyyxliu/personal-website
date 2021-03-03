import React, { useState } from 'react';
import { TextField, Grid, Select, MenuItem, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

/* 引入组件模块 */
import FileUploader from '../FileUploader/FileUploader';

/* 引入样式表 */
import './Editor.css';

/* 引入富文本编辑器 */
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import { insertBlogInfoToDatabase } from '../../../../api/backend';



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




export default function Editor() {
  
    /* Braft-Editor相关变量 */
    const [ editorState, setEditorState ] = useState( BraftEditor.createEditorState(null) );
    // const [ outputHTML, setOutputHTML ] = useState( null );
  
  
    /* 文章数据 */
    const [ blogTitle, setBlogTitle ] = useState( "" );
    const [ blogTag, setBlogTag ] = useState( "前端" );
    const [ blogCategory, setBlogCategory ] = useState("");
    const [ imageHashCode, setImageHashCode ] = useState();
    const [ imageName, setImageName ] = useState("");
  
  
    /* 处理事件函数 */
    function handleTitleChange(event) {
      setBlogTitle( event.target.value );
    }
  
    function handleTagChange( event ) {
      setBlogTag( event.target.value );
    }
  
    function handleChange(editorState) {
      setEditorState( editorState );
    }
  
  
    // function handleSaveEditor() {
    //   // const editorData = Editor.createEditorState( editorState );
    //   // alert( `editorData = ${ editorData } with type = ${ typeof( editorData ) }` );
  
    //   alert( `editorState = ${ JSON.stringify( editorState ) } with type = ${ typeof( editorState ) }` );
    //   const htmlString = editorState.toHTML();
    //   const html = editorState.getCon
    //   setOutputHTML( htmlString );
    //   alert( `handleSaveEditor: html string = ${ htmlString }` );
      
  
    //   const contentRaw = editorState.toRAW()      // false for default raw string
    //   alert( `content raw string = ${ contentRaw } with type = ${ typeof( contentRaw ) }` );
  
    //   const contentJSON = editorState.toRAW( true );    // true for transfering to JSON
    //   alert( `content JSON = ${ JSON.stringify( contentJSON ) } with type = ${ typeof( contentJSON ) }` );
    // }
  
  
  
    async function handleFormSubmit() {
      const blogDataObj = {
        title: blogTitle,
        tag: blogTag,
        category: blogCategory,
        imageHashCode: imageHashCode,
        imageName: imageName,
        content: editorState.toRAW(),   //transfer to JSON string
      };
      // console.log( `getContent = ${ editorState.getCurrentContent() } with type = ${ Object.prototype.toString.call(editorState.getCurrentContent()) }` );

      console.log( `blog data obj = ${JSON.stringify(blogDataObj)}` );
  
      /* 将博客数据POST到后端 */
      // const postURL = "http://127.0.0.1:8080/createblog";
      // try {
      //   let resp = await( fetch( postURL, {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-type":"application/json",
      //     },
      //     body: JSON.stringify( blogDataObj ),
      //   } ) );
  
      //   if ( resp.ok ) {
      //     // 测试POST是否成功
      //     // alert( `resp.status = ${ resp.status } and status text = ${ resp.statusText }` );
      //     let json = await( resp.json() );
      //     // alert( `POST成功` );
      //     // alert( `json = ${ JSON.stringify(json) }` );
      //     // alert( `editorState.toHTML() = ${ outputHTML } and type = ${ typeof( outputHTML ) }` );
      //   }
      //   else {
      //     alert( `fetch failed with status code = ${ resp.status } and status text = ${ resp.statusText }` );
      //   }
      // }
      // catch( error ) {
      //   console.log( `fetch failed with error = ${ error.mesg }`);
      // }
  
      let status = await( insertBlogInfoToDatabase( blogDataObj ) );
      if (status === true) {
        alert( `文章已发布，请前往主页查看` );

        // redirect back to the index page
        window.location.href = "/";
      }
    }
  
    const styles = {
      typography: {
        textAlign: "center",
        // border: "2px solid orange",
        alignItems: "center",
        lineHeight: "300%",
        fontWeight: "bold",
        color: "black",
      },
      textfield: {
        width: "30vw",
      },
    };
  
    return (
      // 文章标题
      <div className="editor">
          <Header handleSubmitFunction={handleFormSubmit} />
        {/* <AppBar position="static">
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
        </AppBar> */}
  
  
        <form>
        <div className="form-item">
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography style={styles.typography}>
                文章标题:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField 
                name="title"
                label="title"
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
                文章类型:
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
                博客配图:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FileUploader 
                setImageHashCodeFunction={setImageHashCode}
                setImageNameFunction={setImageName} />
              {/* <TextField 
                name="imageURL"
                label="imageURL"
                variant="outlined"
                value={imageURL}
                style={styles.textfield}
                onChange={handleImageURLchange}
              /> */}
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

      {/* 给用于展示HTML内容的容器加上特定的className */}
      {/* <div className="braft-output-content" dangerouslySetInnerHTML={{__html: editorState.toHTML()}}></div> */}
  
      
      { /* 测试toHTML()方法是否可用 */ }
      {/* <div className="braft-output-content" dangerouslySetInnerHTML={{__html: outputHTML}}></div> */}
      {/* <div className="output-content">
        This is HTML version
        {outputHTML}
      </div> */}
  
    </div>
    )
}






function Header(props) {
    const classes = useStyles();
    const handleFormSubmit = props.handleSubmitFunction;

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
            onClick={handleFormSubmit}
          >
            发布文章
          </Button>
        </Toolbar>
      </AppBar>
    );
  }