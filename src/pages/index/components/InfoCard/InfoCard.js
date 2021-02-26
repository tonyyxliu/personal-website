import React from 'react';
import 'fontsource-roboto';
import { Tooltip, Typography, Divider, Paper, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import './InfoCard.css';


/* Global Variables */
const infoObj = {
    imageURL: "../../assets/gravatar.png",
    tag: "前端",
    title: "使用rollup和typescript搭建自己的函数库",
    content: "简介 每当在项目中需要使用一些工具函数时，一般需要去引入一些第三方的工具库，而像lodash这样的工具库又体积很大，影响打包后整个项目的大小。所以封装自己的代码库就很必要了。 本篇文章将介绍如何使用rollup工具生成自己的代码库",
    date: new Date(),
    commentNumber: 189,
    starNumber: 200,
    linkURL: "https://www.mi.com/",
  };
export const infocard = new CreateInfoCard("../../assets/gravatar.png", "前端", "this is a title","daiodjiawodjawojodjwaiodjawiojmskamcnnieojofjewfjm", new Date(), 123, 123, "https://www.baidu.com/");
export const infocard2 = new CreateInfoCardByObject(infoObj);



export default function InfoCard(props) {
    const imageURL = props.info.imageURL;
    const tag = props.info.tag;
    const tagURL = props.info.tagURL;
    const title = props.info.title;
    const content = props.info.content;
    const dateString = dateToString(props.info.date);
    const commentNumber = props.info.commentNumber;
    const starNumber = props.info.starNumber;
    const linkURL = props.info.linkURL;
    return (
      <Paper elevation={3} className="infocard">
        <div className="infocard-upper">
          <div className="infocard-img-div">
            <a href={linkURL} target="_blank" rel="noreferrer">
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1365064717,1310351409&fm=26&gp=0.jpg" alt="card" className="infocard-img" />
            </a>
          </div>
          <div className="infocard-content-div">
            <div className="infocard-content-title-div">
              <div className="infocard-content-title">
                <Chip label={tag} component="a" href={tagURL} target="_blank" color="primary" rel="noopener" clickable />
              </div>
              <div className="infocard-content-title">
                <Typography className="infocard-content-title-link">
                  <strong>{title}</strong>
                </Typography>
              </div>
            </div>
            <Typography className="infocard-content">
              {content}
            </Typography>
          </div>
        </div>
  
        <Divider />
  
        <div className="infocard-downward">
          <div className="infocard-action-div">
              <Tooltip title={`The page was last updated on ${dateString}`} aria-label="last updated date">
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
                <Link href={linkURL} target="_blank" rel="noopener" onClick={() => alert("click")} className="infocard-action-content">
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
function CreateInfoCard(imageURL, tag, title, content, date, commentNumber, starNumber, linkURL) {
    this.imageURL = imageURL;
    this.tag = tag;
    this.tagURL = tagToURL(tag);
    this.title = title;
    this.content = content;
    this.date = date;
    this.commentNumber = commentNumber;
    this.starNumber = starNumber;
    this.linkURL = linkURL;
  
    function tagToURL(tag) {
      switch(tag) {
        case "前端":
          return "https://www.baidu.com/";
        case "后端":
          return "https://www.mi.com/";
        default:
          console.log(`undefined tag ${tag}`);
          return "/";
      }
    }
}
  
  
function CreateInfoCardByObject(obj) {
    this.imageURL = obj.imageURL;
    this.tag = obj.tag;
    this.tagURL = tagToURL(obj.tag);
    this.title = obj.title;
    this.content = obj.content;
    this.date = obj.date;
    this.commentNumber = obj.commentNumber;
    this.starNumber = obj.starNumber;
    this.linkURL = obj.linkURL;
  
    function tagToURL(tag) {
      switch(tag) {
        case "前端":
          return "https://www.baidu.com/";
        case "后端":
          return "https://www.mi.com/";
        default:
          console.log(`undefined tag ${tag}`);
          return "/";
      }
    }
}
  
  
  
function dateToString(date) {
    console.log(`dateToString function: input date = ${date}`);
    const year = date.getFullYear(date);
    const month = date.getMonth(date) + 1;
    const day = date.getDate(date);
  
    let output = `${year}年${month}月${day}日`;
    console.log(`dateToString function: output date string = ${output}`)
    return output;
}