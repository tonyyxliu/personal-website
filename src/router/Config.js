/* -------------------------
 * !!! Router config文件 !!!
 * -------------------------
 * Usage: 明确网站路由规则（URL -> component）
 * 引入路由懒加载技术，否则会报错：Object are not valid as a React child (found:[object Promise]),if you meant to render a collection
 * （注意：路由懒加载必须配合Suspense一起使用）
 */ 

import react, { lazy } from 'react';


export const adminLoginPath = "/adminLogin";
export const createNewBlogPath = "/createNewBlog";


let Config = [   {
  name: '网站主页面',
  path: '/',
  exact: true,
  component:  lazy( () => import("../pages/index/index") ),
},  {
  name: '管理员登录页面',
  path: '/adminLogin',
  exact: true,
  component:  lazy( () => import('../pages/adminLogin/index') ),
},  {
  name: "新博客创建页面",
	path: "/createNewBlog",
	exact: true,
	component: lazy( () => import("../pages/createNewBlog/index") ),
},	{
	name: "根据hashcode访问博客",
	path: "/blogs/article/:hashcode",
	exact: true,
	component: lazy( () => import("../pages/displayBlog/index") ),
}, {
  name: "检索博客",
  path: "/blogs/classify",
  exact: true,
  component: lazy( () => import("../pages/classifyBlog/index") ),
},
];

export default Config;