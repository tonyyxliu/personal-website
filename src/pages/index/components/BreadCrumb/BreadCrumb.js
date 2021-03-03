import React from 'react';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';


/* 引入样式表 */
import './BreadCrumb.css';


const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs(props) {
	// props 包含tag和category两个属性，用来动态面包屑导航
  const classes = useStyles();

  return (
    <div>
			<div className="nowhere">
				<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
						<HomeIcon className={classes.icon} />
						首页
				</Link>

				{
					props.tag != undefined && 
					<Link
						color="inherit"
						href="/"
						onClick={ () => alert("暂不支持此功能，我会尽快上线") }
						className={classes.link}
					>
						<WhatshotIcon className={classes.icon} />
						{ props.tag }
					</Link>
				}

				{
					props.category != undefined && 
					<Link
						color="inherit"
						href="/"
						onClick={ () => alert("暂不支持此功能，我会尽快上线") }
						className={classes.link}
					>
						<GrainIcon className={classes.icon} />
						{ props.category }
					</Link>
				}

				{
					props.tag != undefined && props.category != undefined && 
					<Typography color="textPrimary" className={classes.link}>
						<GrainIcon className={classes.icon} />
						博客文章
					</Typography>
				}



				{/* <Link
						color="inherit"
						href="/getting-started/installation/"
						onClick={handleClick}
						className={classes.link}
				>
						<WhatshotIcon className={classes.icon} />
						前端
				</Link>
				<Typography color="textPrimary" className={classes.link}>
						<GrainIcon className={classes.icon} />
						博客文章
				</Typography> */}
				</Breadcrumbs>
			</div>
			<div>
				<Divider />
			</div>
		</div>
  );
}