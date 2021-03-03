/* 解决IE浏览器的不兼容问题 */
import  "react-app-polyfill/ie11";
import  "react-app-polyfill/stable";

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Button } from '@material-ui/core';
import reportWebVitals from '../../reportWebVitals';
import 'fontsource-roboto';

/* 引入样式表 */
import "./index.css";

/* 引入components模块 */
import Header from './components/Header/Header';
import InfoCard from './components/InfoCard/InfoCard';
import Author from './components/Author/Author';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import BreadCrumb from './components/BreadCrumb/BreadCrumb';

/* 引入全局变量 */
// import { categoryList } from './components/Categories/Categories';

/* 引入cookie函数库 */
import { getCookie, setCookie, deleteCookie } from '../cookie';

/* 引入路由器 */
import MyRouter from '../../router/Router';

/* 引入路由路径 */
import { createNewBlogPath } from '../../router/Config';
import { getAllblogInfo } from "../../api/backend";


export const baseURL = "http://localhost:3000";


function MainLeft(props) {
  const [ infoObjList, setInfoObjList ] = useState([]);

  useEffect( () => {
    const getInfoObjList = async () => {
      let resp = await( getAllblogInfo() );
      // let json = resp.json();
      setInfoObjList( resp );
      // setInfoObjList( await( getAllblogInfo() ) );
    };
    getInfoObjList();    
    // console.log( `infoObjList = ${infoObjList} with type = ${ Object.prototype.toString.call(infoObjList) }` );



    // getAllblogInfo()
    //   .then( resp => {
    //     console.log(`resp = ${resp} with type = ${ Object.prototype.toString.call(resp) }`);
    //     setInfoObjList(resp);
    //   } )
    //   .catch( error => {
    //     console.log(`Error in MainLeft useState: ${error}`);
    //     return null;
    //   } );
  }, [] );

  return (
    <div>
      <BreadCrumb />
      {
        infoObjList.map( (item, index) => {
          return <InfoCard info={item} key={index} />
        } )
      }
    </div>
  );
}


export default function Index() {
  return (
      <div className="mainbody">
        <Header />
        <Main leftComponent={<MainLeft />} />
        <Footer />
      </div>
  );
}



/* 路由DOM渲染 */
ReactDOM.render(
<React.StrictMode>
  <MyRouter />
</React.StrictMode>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




export function Main(props) {
  return (
    <div className="main">
      <div className="main-left">
        {/* <InfoCard info={infocard} />
        <InfoCard info={infocard2} /> */}
        {props.leftComponent}
      </div>
      <div className="main-right">
        <Author />
        <Categories />
        <BlogEditor />
      </div>
    </div>
  );
}



/* React函数式组件的条件渲染：使用 && 或 ？来进行 */
// 将getCookie放入useEffect函数中，否则alert(cookie)将会执行多次，原因不明，不过大概是React组件state的生命周期问题
function BlogEditor(props) {
  const [ isAdmin, setIsAdmin ] = useState( false );

  useEffect( () => {
    let cookie_admin = getCookie( "admin" );
    // alert( `cookie_admin = ${cookie_admin}` );
    setIsAdmin( cookie_admin );
  }, [] );

  const styles = {
    button: {
      textAlign: "center",
    }
  }

  function handleClick() {
    // window.location.href = "http://127.0.0.1:3000/editor.html";
    window.location.href = createNewBlogPath;
  }

  return (
    <div className="blog-editor-div">
      { isAdmin && (
      <Button 
        color="primary" 
        variant="contained" 
        style={styles.button}
        onClick={handleClick}
      >
        编辑博客内容
      </Button>
      )}
    </div>
  );
}