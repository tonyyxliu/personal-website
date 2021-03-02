import React, { useEffect, useState } from 'react';
import 'fontsource-roboto';
import { Tooltip, Typography, Divider, Paper, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

/* 引入样式表 */
import './InfoCard.css';

/* 引入默认浏览URL及端口 */
import { baseURL } from '../../index';



export default function InfoCard(props) {
    const title = props.info.title;
    const tag = props.info.tag;
    const tagURL = props.info.tagURL;
    const category = props.info.category;
    const imageHashCode = props.info.imageHashCode;
    const imageName = props.info.imageName;
    const content = props.info.content;
    const viewNum = props.info.viewNum;
    const commentNumber = props.info.commentNum;
    const starNumber = props.info.starNum;
    const dateString = mysqlDateToString(props.info.createDate);
    const hashCode = props.info.hashCode;
    // const baseURL = "http://localhost:3000";
    const linkURL = `${baseURL}/blogs/article/${hashCode}`;


    const [ contentString, setContentString ] = useState("");

    useEffect( () => {
      // 先用contentStringTemp储存所有的text值，然后将它赋值给state hook：contentString
      console.log(`imageHashCode = ${ imageHashCode } with type = ${ Object.prototype.toString.call(imageHashCode) }`);

      let contentStringTemp = "";
      // 需要将JSON字符串parse为JSON对象
      let contentJSON = JSON.parse(content);
      let dataBlockArray = contentJSON["blocks"];

      dataBlockArray.forEach( (item) => {
        contentStringTemp += item["text"];
      } )
      setContentString( contentStringTemp );
    }, [] );


    return (
      <Paper elevation={3} className="infocard">
        <div className="infocard-upper">
          <div className="infocard-img-div">
            <a href={linkURL} target="_blank" rel="noreferrer">
              <img src={ require(`../../../../assets/blogImages/${imageHashCode}/${imageName}`).default } alt="card" className="infocard-img" />
            </a>
          </div>
          <div className="infocard-content-div">
            <div className="infocard-content-title-div">
              <div className="infocard-content-title">
                <Chip label={tag} component="a" href={tagURL} target="_blank" color="primary" rel="noopener" clickable />
              </div>
              <div className="infocard-content-title">
                <Typography>
                  <Link 
                    href={linkURL} 
                    className="infocard-content-title-link" 
                    color="inherit"
                    style={{textDecoration: "none",}}
                  >
                    <strong>{title}</strong>
                  </Link>
                </Typography>
              </div>
            </div>
            <div className="infocard-content-text">
              <Typography >
                {contentString}
              </Typography>
            </div>
          </div>
        </div>
  
        <Divider />
  
        <div className="infocard-downward">
          <div className="infocard-action-div">
              <Tooltip title={`本文最后修改于${dateString}`} aria-label="last updated date">
                <Typography className="infocard-action-content">
                  <DateRangeIcon />
                  {dateString}
                </Typography>
              </Tooltip>
            </div>
            <div className="infocard-action-div">
              <Typography className="infocard-action-content">
                <ChatOutlinedIcon />
                {commentNumber}条评论
              </Typography>
            </div>
            <div className="infocard-action-div">
              <Typography className="infocard-action-content">
                <ThumbUpAltOutlinedIcon />
                {starNumber}个点赞
              </Typography>
            </div>
            <div className="infocard-action-div" style={{float: "right",}}>
                <Link href={linkURL} target="_blank" rel="noopener" className="infocard-action-content">
                  <Button 
                    className="infocard-action-content"
                    variant="contained"
                    color="primary"
                    size="small"
                    endIcon={<ArrowForwardIcon />}>
                    阅读全文
                  </Button>
                </Link>
            </div>
        </div>
      </Paper>
    );
}




/* functions */
export function CreateInfoCard( obj ) {
    this.id             = obj.id;
    this.title          = obj.title;  
    this.tag            = obj.tag;
    this.tagURL         = tagToURL(obj.tag);      // extra member variable
    this.category       = obj.category;
    this.imageHashCode  = obj.imageHashCode;
    this.imageName      = obj.imageName;
    this.content        = obj.content;
    this.viewNum        = obj.viewNum;
    this.commentNum     = obj.commentNum;
    this.starNum        = obj.starNum;
    this.createDate     = obj.createDate;
    this.hashCode       = obj.hashCode;
  
    function tagToURL(tag) {
      switch(tag) {
        case "前端":
          return "https://www.baidu.com/";
        case "后端":
          return "https://www.mi.com/";
        case "其他":
          return "https://www.jd.com/";
        default:
          console.log(`undefined tag ${tag}`);
          return "/";
      }
    }
}
  




export function mysqlDateToString(date) {
  let dateArray = date.split("-");
  // console.log( `mysqlDateToString function: dateArray = ${ dateArray }` );

  return `${dateArray[0]}年${dateArray[1]}月${dateArray[2]}日`;
}