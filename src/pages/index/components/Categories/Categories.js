import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import { Button, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

import './Categories.css';
import { getBlogCategories } from '../../../../api/backend';



/* Global Variables */
// const frontendCategoryList = ["HTML/CSS", "JavaScript", "React", "Material-UI", "Vue", "其他"];
// const backendCategoryLisy = ["C/C++", "Java", "Python", "Golang", "Php", "其他"];

// export const categoryList = {
//   frontend: ["HTML/CSS", "JavaScript", "React", "Material-UI", "Vue", "其他"],
//   backend: ["C/C++", "Java", "Python", "Golang", "Php", "其他"],
//   others: ["Test", "Internship", "LeetCode"],
// };



function TabPanel(props) {
    const { children, value, index, ...other } = props;
    console.log( `TabPanel: children = ${ children } with type = ${ Object.prototype.toString.call( children ) }` );

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

    const handleButtonClick = () => {
      alert( `暂不支持按细分类搜索博客，该功能会尽快上线` );
    }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Grid container spacing={0}>
            {children.map(function(item, index) {
              console.log( `item = ${ item } while index = ${ index }` );
              return (
                <Grid item xs={12} sm={6} style={styles.gridItem} key={index}>
                  <Button 
                    style={styles.button}
                    variant="outlined"
                    key={index}
                    onClick={handleButtonClick}
                  >
                    {item.category}
                    {`(${item.blogNum})`}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}
  
  
  
export default function Categories(props) {
    // const classes = useStyles();
    const [ AppBarValue, setAppBarValue ] = useState(0);
    const [ categoryList, setCategoryList ] = useState([]);

    const styles = {
      tab: {
        minWidth: `${100 / Object.keys( categoryList ).length }%`,
      },
    };


    // 从后端获取categorylist信息
    useEffect( () => {
      const fetchBlogCategories = async () => {
        let resp = await( getBlogCategories() );
        setCategoryList( resp );
      };
      fetchBlogCategories();
    }, [] );


    const orderJSON = ( tag ) => {
      console.log( `tag = ${ tag }` );
      switch( tag ) {
        case "前端":
          return 0;
        case "后端":
          return 1;
        case "其他":
          return 2;
      }
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
              <Tab style={styles.tab} label="前端" {...a11yProps(0)} />
              <Tab style={styles.tab} label="后端" {...a11yProps(1)} />
              <Tab style={styles.tab} label="其他" {...a11yProps(2)} />
            </Tabs>
        </AppBar>


        {Object.keys(categoryList).map(function(ele, index) {
            return (
            <TabPanel value={AppBarValue} index={ orderJSON( ele ) } key={index}>
                {categoryList[ele]}
            </TabPanel>
            );
        })}
        </div>
    
    

        /* Original Version -- don't use AppBar and Tabs */
        // <div className="category">
        //   <div className="category-title">
        //     <Typography>
        //       <strong>分类目录</strong>
        //     </Typography>
        //   </div>

        //   <Divider />

        //   <div className="category-content">
        //     <Grid container spacing={3} >
        //       {categoryList.map(function(item, index) {
        //         // alert(`item = ${item} and index = ${index}`);
        //         return (
        //           <Grid item xs={12} sm={6} style={styles.gridItem}>
        //             <Button 
        //               className="category-button" 
        //               style={styles.button}
        //               variant="outlined"
        //               key={index}>
        //               {item}
        //             </Button>
        //           </Grid>
        //         );
        //       })}
        //     </Grid>
        //   </div>
        // </div>
    );
}