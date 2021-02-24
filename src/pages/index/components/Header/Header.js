import React from 'react';
import 'fontsource-roboto';
import BackgroundImage from "../../../../assets/images/background.png";

import './Header.css';




export default function Header() {
    return (
      <div className="heading">
          <img src={BackgroundImage} className="header-background" alt="header-background" />
          <div className="header-title">
            <a className="title" href="/">刘宇轩的个人博客</a>
          </div>
          <div className="header-text">
            刘宇轩
            <br />
            记录和分享技术
        </div>
      </div>
    );
}