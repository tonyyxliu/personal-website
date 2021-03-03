import react, { useState, useEffect } from 'react';

import { Container, Typography, Divider } from '@material-ui/core';

/* 引入indexPage中的通用模块 */
import Header from '../index/components/Header/Header';
import { Main } from '../index/index';
// import Author from '../index/components/Author/Author';
// import Categories from '../index/components/Categories/Categories';
import Footer from '../index/components/Footer/Footer';

/* 引入样式表 */
import './index.css';

/* 引入组件模块 */
import Breadcrumb from '../index/components/BreadCrumb/BreadCrumb';

/* 引入富文本编辑器 */
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';


/* 引入后端接口函数 */
import { getBlogInfoByHashCode } from '../../api/backend';




// 此处，props中需要有blogData参数，包含title，tag等所有信息
function Blog(props) {
	// const [ blogData, setBlogData ] = useState( () => {
	// 	getBlogInfoByHashCode(props.hashCode)
	// 		.then( resp => {
	// 			console.log( `result = ${ JSON.stringify( resp ) } with type = ${ Object.prototype.toString.call(resp) }` );
	// 			console.log( `JSON.parse(resp) = ${ JSON.parse(resp) } with type = ${ Object.prototype.toString.call( JSON.parse(resp) ) }` );
	// 			// setBlogData( resp );
	// 			return JSON.parse( resp );
	// 		} )
	// 		.catch( err => console.log( `getBlogInfoByHashCode failed with err mesg: ${ err.mesg }` ) );
	// } );

	// console.log( `test: blogData = ${ blogData } with type = ${ typeof( blogData ) }` );

	const [ title, setTitle ] = useState("Blog Title");
	const [ tag, setTag ] = useState("前端");
	const [ category, setCategory ] = useState("");
	const [ content, setContent ] = useState("");
	const [ createDate, setCreateDate ] = useState("");
	const [ viewNum, setViewNum ] = useState(0);
	const [ commentNum, setCommentNum ] = useState(0);
	const [ starNum, setStarNum ] = useState(0);


	// 根据props.hashCode调用后端接口获取博客信息结构体
	useEffect( () => {
		console.log( `enter use effect` );
		console.log(`hashCode = ${ props.hashCode } with type = ${ Object.prototype.toString.call(props.hashCode) }`);
		getBlogInfoByHashCode(props.hashCode)
			.then( resp => {
				// console.log( `result = ${ JSON.stringify( resp ) } with type = ${ typeof( resp ) }` );
				setTitle( resp["title"] );
				setTag( resp["tag"] );
				setCategory( resp["category"] );
				setContent( resp['content'] );
				setViewNum( resp["viewNum"] );
				setCommentNum( resp["commentNum"] );
				setStarNum( resp["starNum"] );
				setCreateDate( resp["createDate"] );
			} )
			.catch( err => console.log( `getBlogInfoByHashCode failed with err mesg: ${ err.mesg }` ) );
	}, [] )


  return (
		<div>
			<Breadcrumb tag={tag} category={category} />

			<div className="blog-main">
				<BlogHeader 
					// title={blogData["title"]}  
					// createDate={blogData["createDate"]}
					// commentNum={blogData["commentNum"]}
					// starNum={blogData["starNum"]}
					title={title}  
					createDate={createDate}
					viewNum={viewNum}
					commentNum={commentNum}
					starNum={starNum}
				/>
				<BlogContent 
					// content={blogData["content"]}
					content={content}
				/>
			</div>
		</div>
	);
}



function BlogHeader(props) {
	return (
		<div className="blog-header">
			<div className="blog-header-title">
				<Typography variant="h4">
					{props.title}
				</Typography>
			</div>
			<div className="blog-header-info">
				<div className="blog-header-data" style={{paddingLeft: "0",}}>
					<Typography>
						{/* {"最后修改于"} */}
						{mysqlDateToString( props.createDate )}
					</Typography>
				</div>
				·
				<div className="blog-header-data">
					<Typography>
						{ props.viewNum }
						{"次阅读"}
					</Typography>
				</div>
				·
				<div className="blog-header-data">
					<Typography>
						{ props.commentNum }
						{"条评论"}
					</Typography>
				</div>
				·
				<div className="blog-header-data">
					<Typography>
						{ props.starNum }
						{"个点赞"}
					</Typography>
				</div>
			</div>
		</div>
	);
}


function BlogContent(props) {
	// console.log( `props.content = ${ props.content } with type = ${ typeof( props.content ) }` );
	// const [ editorState, setEditorState ] = useState( BraftEditor.createEditorState( props.content ) );



	return (
		<div className="blog-content">
			{/* <BraftEditor 
				value={ BraftEditor.createEditorState( props.content ) }
				readOnly={true}
			/> */}

			<div className="braft-output-content" dangerouslySetInnerHTML={{__html: BraftEditor.createEditorState( props.content ).toHTML()}}></div>
		</div>
	);
}



export default function DisplayBlog() {
	const [ hashCode, setHashCode ] = useState( () => {
		let pathName = window.location.pathname;
		console.log( `path name = ${ pathName }` );

		let pathArray = pathName.split("/");
		console.log( `pathArray = ${ pathArray } with length = ${ pathArray.length }` );

		let hashCodeStr = pathArray[ pathArray.length - 1 ];
		console.log( `hash code string = ${ hashCodeStr } with type = ${ typeof( hashCodeStr ) }` );
		let hashCode = parseInt( hashCodeStr );
		console.log( `hashCode = ${ hashCode } with type = ${ typeof( hashCode ) }` );

		return hashCode;
	} );

	return (
			<div className="mainbody">
				<Header />
				<Main leftComponent={<Blog hashCode={hashCode} />} />
				<Footer />
			</div>
	);
}




function mysqlDateToString( date ) {
	let array = date.split("-");
	console.log( `mysqlDateToString: array = ${ array } with length = ${ array.length }` );

	return `${array[0]}年${array[1]}月${array[2]}日`;
}