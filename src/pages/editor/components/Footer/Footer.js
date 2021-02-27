import React from 'react';
import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


export default function Footer() {
    return (
        <div className="footer">
            <Copyright />
        </div>
    );
}

function Copyright() {
    return (
      <Typography variant="body2" color="secondary" align="center">
        {'Rich Markdown Editor Copyright © '}
        <Link href="https://github.com/margox/braft-editor">
          margox/braft-editor
        </Link>
      </Typography>
    );
}
  
  
