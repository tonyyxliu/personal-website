import react, { useState, useEffect } from 'react';

/* 引入样式表 */

/* 引入组件模块 */
import Index from '../index/index';
import BreadCrumb from '../index/components/BreadCrumb/BreadCrumb';
import InfoCard from '../index/components/InfoCard/InfoCard';

/* 引入后端接口函数 */
import { classifyBlogs } from '../../api/backend';



function BlogList(props) {
    const [ criterion, setCriterion ] = useState("category");
    const [ key, setKey ] = useState("HTML/CSS");
    const [ blogList, setBlogList ] = useState([]);

    useEffect( () => {
        // 获取tag和category
        let url = window.location.href;
        console.log( `page url = ${ url }` );


        let paramString = url.split("?")[1];
        console.log( `param string = ${ paramString }` );

        let paramArray = paramString.split("&");
        console.log( `paramArray = ${ paramArray }` );

        let paramCriterion = paramArray[0].split("=")[1];
        let paramKey = paramArray[1].split("=")[1];
        console.log( `criterion = ${ paramCriterion } and key = ${ paramKey }` );

        setCriterion( paramCriterion );
        setKey( paramKey );

        // get blog list which satisfy the classifying criteria
        const getBlogList = async () => {
            let resp = await( classifyBlogs( paramCriterion, paramKey ) );
            setBlogList( resp );
        };
        getBlogList();
    }, [] );
    
    function categoryToTag( category ) {
        switch( category ) {
            case "HTML/CSS":
            case "JavaScript":
            case "React":
            case "Vue":
            case "Material-UI":
                return "前端";
            case "C/C++":
            case "Java":
            case "Python":
            case "Golang":
            case "PHP":
                return "后端";
            case "计算机网络":
            case "操作系统":
            case "数据库":
            case "软件工程":
            case "其他":
                return "其他";
        }
        return "其他";
    }

    return (
        <div>
            <BreadCrumb tag={ categoryToTag( key ) } category={ key } article={false} />
            {
                blogList.map( (item, index) => {
                    return <InfoCard info={item} key={index} />
                } )
            }
        </div>
    );
}


export default function ClassifyBlogs() {
    return (
        <Index mainLeftComponent={<BlogList />} />
    );
}