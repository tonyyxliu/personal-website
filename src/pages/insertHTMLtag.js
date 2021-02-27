/* --------------------------------------
 * !!! insertHTMLtag Function Library !!!
 * --------------------------------------
 * 动态导入<script>, <link>等HTML标签
 * （insertScriptByCode尚有bug，待修复）
 */  

export function insertScriptBySrc( src ) {
    let script = document.createElement( "script" );
    script.setAttribute( "type", "text/javascript" );
    script.setAttribute( "src", src );

    // insert
    let head = document.getElementsByTagName('head').item(0);
    head.appendChild(script);
    // let s = document.getElementsByTagName("script")[0];
    // s.parentNode.insertBefore(script, s);
}



/* 有bug，待修复 */
export function insertScriptByCode( codeText ) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(codeText));
    } catch (ex) {
        script.text = codeText;
    }

    // insert
    let head = document.getElementsByTagName('head').item(0);
    head.appendChild(script);
    // let s = document.getElementsByTagName("script")[0];
    // s.parentNode.insertBefore(script, s);

    // document.body.appendChild(script);
}


export function insertLink( rel, href ) {
    let head = document.getElementsByTagName( "head" )[0];
    let link = document.createElement( "link" );
    link.rel = rel;
    link.href = href;

    // insert
    head.appendChild( link );
}