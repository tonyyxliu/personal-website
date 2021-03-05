/* ------------------------------
 * !!! 个人网站后端接口调用封装 !!!
 * ------------------------------ */

import { CreateInfoCard } from '../pages/index/components/InfoCard/InfoCard';


export const baseURL = "http://www.tonyliuyuxuan.cn:8080";


/* ----------------------------------------
 * !!! 根据博客hashCode查询对应的博客信息 !!!
 * ---------------------------------------- */
export async function getBlogInfoByHashCode(hashCode) {
    const targetURL = `${baseURL}/getBlogInfoByHashCode/${hashCode}`;
    // console.log( `target url = ${ targetURL }` );

    try {
        let resp = await( fetch(targetURL, {
            method: "GET",
            mode: "cors",
        }) );
        if (resp.ok) {
            let json = await( resp.json() );
            return json;
        }
        else {
            console.log( `resp faield with status = ${ resp.status }` );
            return Promise.reject( new Error( `resp faield with status = ${ resp.status }` ) );
        }
    }
    catch(error) {
        console.log( `Error occurs in getBlogInfoByHashCode: ${ error } with mesg = ${ error.mesg }` );
        return Promise.reject( new Error( `Error occurs in getBlogInfoByHashCode: ${ error } with mesg = ${ error.mesg }` ) );
    }
}



/* -----------------------------
 * !!! 查询所有博客的所有信息 !!!
 * ----------------------------- */
export async function getAllblogInfo() {
    const targetURL = `${baseURL}/getAllBlogInfo`;

    let outputArray = [];

    try {
        let resp = await( fetch(targetURL, {
            method: "GET",
            mode: "cors",
        }) );
        if (resp.ok) {
            let json = await(resp.json());

            json.forEach(element => {
                // console.log( `element = ${JSON.stringify(element)}` );
                let blogObj = {
                    id:             element["id"],
                    title:          element["title"],
                    tag:            element["tag"],
                    category:       element["category"],
                    imageHashCode:  element["imageHashCode"],
                    imageName:      element["imageName"],
                    content:        element["content"],
                    viewNum:        element["viewNum"],
                    commentNum:     element["commentNum"],
                    starNum:        element["starNum"],
                    createDate:     element["createDate"],
                    hashCode:       element["hashCode"],
                };
                // let title = element["title"];
                // let tag = element["tag"];
                // let imageURL = element["imageURL"];
                // let content = element["content"];
                // let commentNumber = element["commentNum"];
                // let starNum = element["starNum"];
                // let createDate = element["createDate"];
                // let hashCode = element["hashCode"];

                outputArray.push( new CreateInfoCard(blogObj) );
            });
            return outputArray;
        }
        else {
            console.log(`Error in getAllBloginfo: resp.status = ${resp.status} with statusText = ${ resp.statusText }`);
            return new Promise.reject( new Error(`Error in getAllBloginfo: resp.status = ${resp.status} with statusText = ${ resp.statusText }`) );
        }
    }
    catch(error) {
        console.log(`Error in getAllBlogInfo: error = ${error}`);
        return new Promise.reject( new Error(`Error in getAllBlogInfo: ${error}`) );
    }
}



/* ------------------------------------------
 * !!! Insert Blog Info to MYSQL Database !!!
 * ------------------------------------------ */
export async function insertBlogInfoToDatabase( blogDataObj ) {
    const targetURL = `${baseURL}/createblog`;

    try {
        let resp = await( fetch( targetURL, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type":"application/json",
          },
          body: JSON.stringify( blogDataObj ),
        } ) );
  
        if ( resp.ok ) {
          // 测试POST是否成功
          // let json = await( resp.json() );
          return true;
        }
        else {
          console.log( `InsertBlogInfoToDatabase: fetch failed with status code = ${ resp.status } and status text = ${ resp.statusText }` );
          throw new Error( `fetch failed with status code = ${ resp.status } and status text = ${ resp.statusText }` );
        }
      }
      catch( error ) {
        console.log( `InsertBlogInfoToDatabase: fetch failed with error = ${ error.mesg }` );
        throw new Error( `InsertBlogInfoToDatabase: fetch failed with error = ${ error.mesg }` );
      }
}



/* -----------------------
 * !!! 获取所有博客分类 !!!
 * ----------------------- */
export async function getBlogCategories() {
    const targetURL = `${baseURL}/getBlogCategories`;

    try {
        let resp = await( fetch(targetURL, {
            method: "GET",
            mode: "cors",
        }) );
    
        if ( resp.ok ) {
            let json = await( resp.json() );
            // console.log( `getBlogCategories: json = ${ JSON.stringify(json) }` );
            return json;
        }
        else {
            console.log( `getBlogCategories: resp not ok with status ${ resp.status } and statusText ${ resp.statusText }` );
            return Promise.reject( new Error( `getBlogCategories: resp not ok with status ${ resp.status } and statusText ${ resp.statusText }` ) );
        }
    }
    catch( error ) {
        console.log( `getBlogCategories: fetch failed with error = ${ error } with mesg = ${ error.mesg }` );
        return Promise.reject( new Error( `getBlogCategories: fetch failed with error = ${ error } with mesg = ${ error.mesg }` ) );
    }
}



/* --------------------
 * !!! 博客分类检索 !!!
 * -------------------- 
 * criterion:   按何种方式检索，如按category或date
 * key:         该检索方式的key值，如category的React
 */ 
export async function classifyBlogs( criterion, key ) {
    const targetURL = `${baseURL}/blogs/classify?criterion=${criterion}&key=${key}`;
    console.log( `target URL = ${ targetURL }` );

    try {
        let resp = await( fetch( targetURL, {
            method: "GET",
            mode: "cors",
        } ) );
        if ( resp.ok ) {
            let json = await( resp.json() );
            console.log( `classifyBlogs: return json = ${ JSON.stringify( json ) }` );
            return json;
        }
        else {
            console.log( `classifyBlogs: Error occurs with status ${ resp.status } and status text = ${ resp.statusText }` );
            return Promise.reject( new Error( `classifyBlogs: Error occurs with status ${ resp.status } and status text = ${ resp.statusText }` ) );
        }
    }
    catch( error ) {
        console.log( `classifyBlogs: Error occurs ${ error } with mesg = ${ error.mesg }` );
        return Promise.reject( new Error( `classifyBlogs: Error occurs ${ error } with mesg = ${ error.mesg }` ) );
    }
}