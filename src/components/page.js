import pages from '../pages/pages.json'
import Draggable from "react-draggable";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Page({element}) {
    let {id} = useParams();
    let [t1, setT1] = useState('')

    let numbers = []

    for (let i = 0; i < 100; i++) {
        numbers.push(i)
    }
    let index = id.slice(8,)
    let page = pages[element][index]

    useEffect(()=>{
        let readmePath = require(`../pages/${element}/${page['filename']}`)

        fetch(readmePath)
            .then(response => {
                return response.text()
            })
            .then(text => {
                setT1(text)
                console.log(text.split('\n'))
            })
        
    }, [])
    
    
    return (<Draggable handle=".for-drag-page" defaultPosition={{x: 200,y: -680}}>
       <div className="text-page">
           <div className="right-main">
               <div style={{height:'18px'}}></div>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={{img: ({node, ...props}) => <img style={{maxWidth: '750px'}}{...props} alt=""/>}}>{t1}</ReactMarkdown>
           </div>
           <div className="left-num">
               <div style={{height:"28px"}}></div>
               {numbers.map((num)=>{
                   return (<Number num={num} height={'26'}></Number>)
               })}
           </div>
           <div className="for-drag-page"></div>
       </div>
    </Draggable>)
}

function Number({num, height=25}) {
    return (
        <div style={{height:`${height}px`}} className="numbers">{num}</div>
    )
}

export default Page;