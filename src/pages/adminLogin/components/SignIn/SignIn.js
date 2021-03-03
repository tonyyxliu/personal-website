import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

import { getCookie, setCookie, deleteCookie } from '../../../cookie';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ dialogOpen, setDialogOpen ] = useState( false );
  const [ loginStatus, setLoginStatus ] = useState( false );

  function handleChange(event) {
    switch( event.target.name ) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        console.log(`failed in SignIn handleChange: unindentified event.target.name`);
    }
  }


  function handleDialogClickOpen() {
    setDialogOpen( true );
  }

  function handleDialogClose() {
    setDialogOpen( false );

    /* 用户点击弹出框的“OK”按钮之后，新建一个admin: true的cookie以标识管理员，此后cookie即刻失效 */
    // alert( `document.cookie before = ${ document.cookie }` );

    if ( loginStatus === true ) {
      setCookie( "admin", true, { 'max-age': 3600 } );
      // alert( `document.cookie after = ${ document.cookie }` );

      /* 跳转回主界面，在主界面中检验cookie admin的值从而添加管理员编辑入口 */
      window.location.href = "/";
    }
    
  }

  async function handleFormSubmit(form) {
    // 阻止form自带的事件传递
    form.preventDefault();

    // alert( 'form submit' );

    // 建立要POST的JS对象
    const POSTobj = {
      email: email,
      password: password,
    };

    // alert( `POSTobj = ${JSON.stringify( POSTobj )}` );

    // fetch
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const targetURL = "http://127.0.0.1:8080/form";
    try {
      let resp = await( fetch( targetURL , {
        method: "POST",
        mode: "cors",
        headers:{
          "Content-type":"application/json",
        },
        body: JSON.stringify( POSTobj ),
      }) );
  
      if (resp.ok) {
        let json = await( resp.json() );
        // alert( `resp.json = ${json} and JSON.stringify(json) = ${JSON.stringify(json)}` );

        // 登陆成功
        if ( json["pass"] === true ) {
          // alert("correct");

          /* 调出显示“登陆成功”的Dialog小窗口 */
          setLoginStatus( true );
          setDialogOpen( true );
        }
        // 登陆失败
        else {
          setLoginStatus( false )
          setDialogOpen( true );
          // alert("unidentified user");
        }
      }
    }
    catch(error) {
      alert( `fetch failed with err mesg = ${error}` );
    }

  } 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form 
          className={classes.form} 
          // method="POST"
          // action="http://127.0.0.1:8080/form"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      

      <Dialog
        open={dialogOpen}
        close={handleDialogClose}
      >
        <DialogContent>
          <DialogContentText>
            {loginStatus? "登陆成功" : "账号或密码不正确"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={handleDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}