import React from 'react';
import { Container } from '@material-ui/core';

/* 引入样式表 */
import './index.css';

/* 引入组件模块 */
import Editor from './components/Editor/Editor';
import Footer from './components/Footer/Footer';



export default function CreateNewBlog() {
  return (
    <Container maxWidth="lg" p={0} style={{backgroundColor: "white",}}>
      <Editor />
      <Footer />
    </Container>
  );
}