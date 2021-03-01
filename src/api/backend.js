/* ------------------------------
 * !!! 个人网站后端接口调用封装 !!!
 * ------------------------------ */

const baseURL = "http://127.0.0.1:8080";


/* ----------------------------------------
 * !!! 根据博客hashCode查询对应的博客信息 !!!
 * ---------------------------------------- */
export async function getBlogInfoByHashCode(hashCode) {
    const targetURL = `${baseURL}/getBlogInfoByHashCode/${hashCode}`;
    console.log( `target url = ${ targetURL }` );

    try {
        let resp = await( fetch(targetURL, {
            method: "GET",
            mode: "cors",
        }) );
        if (resp.ok) {
            // console.log( `resp is ok` );
            let json = await( resp.json() );
            // console.log( `result value = ${ json }` );
            // console.log( `result json = ${ JSON.stringify(json) }` );
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

    try {
        let resp = await( fetch(targetURL, {
            method: "GET",
            mode: "cors",
        }) );
        if (resp.ok) {
            let json = await(resp.json());
            return new Promise.resolve( json );
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