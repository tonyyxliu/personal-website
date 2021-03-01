import React from 'react';
import 'fontsource-roboto';
import BackgroundImage from "../../../../assets/images/background.png";

import './Header.css';


/* 引入路由路径 */
import { adminLoginPath } from '../../../../router/Config';



export default function Header() {
    return (
      <div className="heading">
          <img src={BackgroundImage} className="header-background" alt="header-background" />
          <div className="header-title">
            <a className="title" href="/">刘宇轩的个人博客</a>
          </div>
          <div className="header-admin-login">
            <a className="title" href={ adminLoginPath }>管理员登录</a>
          </div>
          <div className="header-text">
            刘宇轩
            <br />
            从零开始的程序员生活
        </div>
      </div>
    );
}