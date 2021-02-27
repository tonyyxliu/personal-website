import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@material-ui/core';

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
  <Main />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
