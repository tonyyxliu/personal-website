import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from '../../reportWebVitals';
import 'fontsource-roboto';
import "./index.css";
import { Card, CardActions, CardContent, Tooltip, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


// import HomePage from './pages/HomePage';


const infocard = new CreateInfoCard("../../assets/gravatar.png", "前端", "this is a title","daiodjiawodjawojodjwaiodjawiojmskamcnnieojofjewfjm", new Date(), 123, 123, "https://www.baidu.com/");


function Header() {
  return (
    <div className="header">
      <div className="title-div">
        <a className="title" href="/">刘宇轩的个人博客</a>
      </div>
      <div className="headline">
          刘宇轩
          <br />
          记录和分享技术
        </div>
    </div>
  )
}

function InfoCard(props) {
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
    <Card className="infocard">
      <CardContent>
        <div className="infocard-upper">
          <div className="infocard-img-div">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg" alt="card" className="infocard-img" />
          </div>
          <div className="infocard-content-div">
            <div className="infocard-content-title-div">
              <div className="infocard-content-title">
                <Chip label={tag} component="a" href={tagURL} target="_blank" rel="noopener" color="primary" clickable />
              </div>
              <div className="infocard-content-title">
                <Typography className="infocard-content-title">
                  {title}
                </Typography>
              </div>
            </div>
            <Typography className="infocard-content">
              {content}
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions >
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
        <div className="infocard-action-link-div">
          <Link href={linkURL} target="_blank" rel="noopener" onClick={() => alert("click")} >
            阅读全文
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}

function Index() {
    return (
        <div className="main">
            <Header />
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
    <InfoCard info={infocard} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();







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



function dateToString(date) {
  console.log(`dateToString function: input date = ${date}`);
  const year = date.getFullYear(date);
  const month = date.getMonth(date) + 1;
  const day = date.getDate(date);

  let output = `${year}年${month}月${day}日`;
  console.log(`dateToString function: output date string = ${output}`)
  return output;
}