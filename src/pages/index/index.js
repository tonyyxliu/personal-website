/* 解决IE浏览器的不兼容问题 */
import  "react-app-polyfill/ie11";
import  "react-app-polyfill/stable";

import React from 'react';
import ReactDOM from 'react-dom';
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

/* 引入全局变量 */
import { infocard, infocard2 } from './components/InfoCard/InfoCard';
import { categoryList } from './components/Categories/Categories';



function Index() {
  return (
      <div className="mainbody">
        <Header />
        <Main />
        <Footer />
      </div>
  );
}

ReactDOM.render(
<React.StrictMode>
  <Index />
</React.StrictMode>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




function Main(props) {
  return (
    <div className="main">
      <div className="main-left">
        <InfoCard info={infocard} />
        <InfoCard info={infocard2} />
      </div>
      <div className="main-right">
        <Author />
        <Categories categoryList={categoryList} />
      </div>
    </div>
  );
}