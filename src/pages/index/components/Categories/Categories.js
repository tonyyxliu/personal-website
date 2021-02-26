import React, { useState, } from 'react';
import 'fontsource-roboto';
import { Button, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

import './Categories.css';



/* Global Variables */
// const frontendCategoryList = ["HTML/CSS", "JavaScript", "React", "Material-UI", "Vue", "其他"];
// const backendCategoryLisy = ["C/C++", "Java", "Python", "Golang", "Php", "其他"];

export const categoryList = {
  frontend: ["HTML/CSS", "JavaScript", "React", "Material-UI", "Vue", "其他"],
  backend: ["C/C++", "Java", "Python", "Golang", "Php", "其他"],
};



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    const styles = {
      gridItem: {
        textAlign: "center",
      },
      button: {
        width: "90%",
        marginTop: "3vmin",
        marginBottom: "3vmin",
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
          <Grid container spacing={0}>
            {children.map(function(item, index) {
              return (
                <Grid item xs={12} sm={6} style={styles.gridItem}>
                  <Button 
                    style={styles.button}
                    variant="outlined"
                    key={index}>
                    {item}
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


    const handleChange = (event, newValue) => {
        setAppBarValue(newValue);
    };

    return (
        /* My AppBar and Tabs */
        <div className="category">
        <AppBar position="static">
            <Tabs value={AppBarValue} onChange={handleChange} aria-label="simple tabs example" >
            <Tab label="前端" {...a11yProps(0)} />
            <Tab label="后端" {...a11yProps(1)} />
            </Tabs>
        </AppBar>


        {Object.keys(props.categoryList).map(function(ele, index) {
            return (
            <TabPanel value={AppBarValue} index={index}>
                {props.categoryList[ele]}
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
        //       {props.categoryList.map(function(item, index) {
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