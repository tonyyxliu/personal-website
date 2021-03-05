import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import { Button, Grid, Link, Box, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

import { getBlogCategories } from '../../../../api/backend';



const projectList = [
    "http://www.tonyliuyuxuan.cn/projects/TributePage/index.html",
    "http://www.tonyliuyuxuan.cn/projects/Survey/index.html",
    "http://www.tonyliuyuxuan.cn/projects/Product_Landing_Page/index.html",
];


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    // console.log( `TabPanel: children = ${ children } with type = ${ Object.prototype.toString.call( children ) }` );

    const styles = {
      gridItem: {
        textAlign: "center",
      },
      button: {
        width: "90%",
        marginTop: "3vmin",
        marginBottom: "3vmin",
        textTransform: "none",
      },
    };

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} style={{textAlign: "center",}}>
            <Typography style={{ textAlign: "center," }}>
              {children}
            </Typography>
          </Box>
          // <Grid container spacing={0}>
          //   {children.map(function(item, index) {
          //     // console.log( `item = ${ item } while index = ${ index }` );
          //     return (
          //       <Grid item xs={12} sm={6} style={styles.gridItem} key={index}>
          //         <Button 
          //           style={styles.button}
          //           variant="outlined"
          //           key={index}
          //           onClick={ () => { window.location.href=`/blogs/classify?criterion=category&key=${ item.category }`; } }
          //         >
          //           {`${item.category}(${item.blogNum})`}
          //         </Button>
          //       </Grid>
          //     );
          //   })}
          // </Grid>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
// children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}
  
  
  
export default function ProjectList(props) {
    // const classes = useStyles();
    const [ AppBarValue, setAppBarValue ] = useState(0);

    const styles = {
      tab: {
        minWidth: `${100 / 3 }%`,
      },
    };



    const handleChange = (event, newValue) => {
        setAppBarValue(newValue);
    };

    return (
        /* My AppBar and Tabs */
        <div className="category">
        <AppBar position="static">
            <Tabs 
              variant="fullWidth"
              value={AppBarValue} 
              onChange={handleChange} 
              aria-label="simple tabs example" >
              {/* {
                Object.keys(categoryList).map( (ele, index) => {
                  return <Tab style={styles.tab} label={ele} index={index} {...a11yProps( orderJSON( ele ) )} />
                } )
              } */}
              <Tab style={styles.tab} label="我的项目" {...a11yProps(0)} />
              {/* <Tab style={styles.tab} label="后端" {...a11yProps(1)} />
              <Tab style={styles.tab} label="其他" {...a11yProps(2)} /> */}
            </Tabs>
        </AppBar>

        <TabPanel value={AppBarValue} index={0}>
          <Link
						href={projectList[0]}
						target="_blank"
						rel="noreferrer"
					>
							网页还原——人物简介
					</Link>
          <br />
					<Link
						href={projectList[1]}
						target="_blank"
						rel="noreferrer"
					>
							网页还原——问卷填写
					</Link>
          <br />
					<Link
						href={projectList[2]}
						target="_blank"
						rel="noreferrer"
					>
							网页还原——网站首页
					</Link>
        </TabPanel>
        </div>
    );
}