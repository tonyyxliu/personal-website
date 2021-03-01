import React from 'react';
import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

/* 引入样式表 */
import './Footer.css';


export default function Footer() {
    return (
        <div className="footer">
            <Copyright />
        </div>
    );
}

function Copyright() {
    return (
      <div style={{color: "white"}}>
        <Typography variant="body2" color="inherit" align="center">
          {'Rich Markdown Editor Copyright © '}
          <Link 
            href="https://github.com/margox/braft-editor"
            target="_blank"
            rel="noreferrer"
          >
            margox/braft-editor
          </Link>
        </Typography>
      </div>
    );
}
  
  
