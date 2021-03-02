import React from 'react';
import 'fontsource-roboto';
import { Tooltip, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import IconButton from '@material-ui/core/IconButton';

import './Footer.css';




export default function Footer() {
    const githubLink = "https://github.com/tonyLyx1";
    const emailAddress = "118010200@link.cuhk.edu.cn";
    const linkedinAddress = "https://www.baidu.com/";
  
  
    return (
      <div className="footer">
        <div className="footer-icon-div">
          <Tooltip title="visit my github repos" arrow placement="top">
            <IconButton 
							href="https://github.com/tonyLyx1"
							target="_blank"
							rel="noreferrer" 
							aria-label="Github Icon"
						>
              <GitHubIcon className="footer-icon" fontSize="large"  />
            </IconButton>
          </Tooltip>
          <Tooltip title="send email to me" arrow placement="top">
            <IconButton 
							href="mailto: 118010200@link.cuhk.edu.cn"
							target="_blank"
							rel="noreferrer" 
							aria-label="Email Icon"
						>
              <EmailIcon  className="footer-icon" fontSize="large"  />
            </IconButton>
          </Tooltip>
          <Tooltip title="visit my LinkedIn" arrow placement="top">
            <IconButton 
              href="https://www.linkedin.com/in/%E5%AE%87%E8%BD%A9-%E5%88%98-693b63207/" 
							target="_blank"
							rel="noreferrer"
							aria-label="LinkedIn Icon"
						>
              <LinkedInIcon className="footer-icon" fontSize="large" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="footer-text-div">
          <Typography className="footer-text" style={{lineHeight: "200%",}}>
            COPYRIGHT © 2021 刘宇轩的博客. ALL RIGHTS RESERVED.
            <br />
            THEME <Link href="https://github.com/vtrois/kratos">KRATOS</Link> MADE BY <Link href="https://www.vtrois.com/">VTROIS</Link>
            <br />
            THEME INSPIRED BY <Link href="https://www.iwowen.cn/">IWOMEN'S BLOG</Link>
          </Typography>
        </div>
      </div>
    );
}