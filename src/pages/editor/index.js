import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, IndexRoute, HashRouter, Route, hashHistory } from 'react-router-dom';
import reportWebVitals from '../../reportWebVitals';

/* 引入样式表 */
import './index.css';

/* 引入组件模块 */
import Editor from './components/Editor/Editor';
import Footer from './components/Footer/Footer';



function Main() {
  return (
    <Container maxWidth="lg" p={0} style={{backgroundColor: "white",}}>
      <Editor />
      <Footer />
    </Container>
  );
}


ReactDOM.render(
  // <React.StrictMode>
  //   <Main />
  // </React.StrictMode>,
  <Router>
    <Route exact path="/editor.html" component={Main} />
    <Route exact path="/blogs/article/:hashcode" component={Footer} />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();