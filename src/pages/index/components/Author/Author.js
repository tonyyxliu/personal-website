import React from 'react';
import 'fontsource-roboto';
import { Typography, Avatar } from '@material-ui/core';
import Link from '@material-ui/core/Link';

import AuthorBackground from '../../../../assets/images/author_background.jpg';
import AuthorImg from '../../../../assets/images/author_img.jpg';
import Resume from '../../../../assets/pdfs/resume.pdf';

import './Author.css';




export default function Author() {
    const styles = {
      info: {
        textAlign: "center",
        lineHeight: "200%",
      },
    };
  
    return (
      <div className="author">
        <div className="author-background"> 
          <img src={AuthorBackground} alt="author background -- beach" />
          <Avatar className="author-avatar" src={AuthorImg} alt="Tony Liu Yuxuan" style={{width: "12vmin", height: "12vmin", position: "absolute",}} />
          {/* <Avatar className="author-avatar" alt="Tony Liu Yuxuan" style={{width: "12vmin", height: "12vmin", position: "absolute",}}>
            <img src={{AuthorImg}} alt="author image" />
          </Avatar> */}
        </div>
        {/* <div className="author-background-test">
          <Avatar className="author-avatar-test" src={AuthorImg} alt="Tony Liu Yuxuan" style={{width: "12vmin", height: "12vmin", }} />
        </div> */}
        <div className="author-info-div">
          <Typography style={styles.info}>
            <strong>香港中文大学（深圳）</strong>
            <br />
            计算机科学与工程专业——大三在读
            <br />
            发展方向：前端工程师
          </Typography>
        </div>
        <div className="author-bottom">
          <Link href={Resume} target="_blank" rel="noreferrer">
            了解更多
          </Link>
        </div>
      </div>
    );
  }