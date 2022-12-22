import pages from "../pages/pages.json";
import Draggable from "react-draggable";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Exit from './exit';


function Page({ element }) {
  let j = 0
  const { id } = useParams();
  const [t1, setT1] = useState("");
  const [heightList, setHeightList] = useState([]);
  const cRef = useRef(null);
  const ref = useRef({});
  const index = id.slice(8);
  const page = pages[element][index];

  const scrollY = function(e) {
    let num = e.target.scrollTop
    cRef.current?.scrollTo(0,num)
  }

  let mdPath = require(`../pages/${element}/${page["filename"]}`);
    fetch(mdPath)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setT1(text);
      });

  return (
    <Draggable handle=".for-drag-page" defaultPosition={{ x: 200, y: -680 }} >
      <div className="text-page">
        <div className="right-main" ref={ref} onScroll={scrollY}>
          <div style={{ height: "28px" }}></div>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                img: ({ node, ...props }) => (
                        <img style={{ maxWidth: "750px" }} {...props} alt="" />
                        ),
                blockquote: ({children, ...props}) => (
                        props ?
                        <div className="markdown-comp">
                            <div className='numbers'>{j++, j}</div>
                            <blockquote
                                children={children}
                                style={{
                                color: "#343d46",
                                marginLeft: "0px",
                                marginRight: "0px",
                                paddingLeft: "20px",
                                paddingRight: "20px",
                                borderLeft: "5px solid #6e7680",
                                backgroundColor: "#f3f3f3",
                                margin: '10px 0px 10px 10px',
                                maxWidth: '1030px'
                            }} {...props}/>
                        </div> :
                                <blockquote
                                    children={children}
                                    style={{
                                    color: "#343d46",
                                        marginLeft: "0px",
                                        marginRight: "0px",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                        borderLeft: "5px solid #6e7680",
                                        backgroundColor: "#f3f3f3",
                                        margin: '10px 0px 10px 10px',
                                        maxWidth: '900px'
                                }} {...props}/>
                        ),
                h1: ({node, ...props}) => (
                        <div className="markdown-comp">
                            <div className='numbers'>{j++, j}</div>
                            <h1 style={{
                                borderBottom: "1px solid",
                                padding: "20px",
                                width: "1060px",
                                margin: "0px 0px 0px 10px"
                            }} {...props}/>
                        </div>),
                h2: ({node, ...props}) => (
                        <div className="markdown-comp">
                            <div className='numbers'>{j++, j}</div>
                            <h2 style={{
                                borderBottom: "1px solid",
                                padding: "18px",
                                width: "1060px",
                                margin: "0px 0px 0px 10px"
                            }} {...props}/>
                        </div>),
                h3: ({node, ...props}) => (
                        node.position.start.column ==1 ?
                        <div className="markdown-comp">
                            <div className='numbers'>{j++, j}</div>
                            <h3 style={{
                                borderBottom: "1px solid",
                                padding: "16px",
                                width: "1060px",
                                margin: "0px 0px 0px 10px"
                            }} {...props}/>
                        </div> :
                                <h3 style={{
                                    borderBottom: "1px solid",
                                    padding: "16px",
                                    width: "1060px",
                                    margin: "0px 0px 0px 10px"
                                }} {...props}/>
                        ),
                a: ({node, ...props}) => (
                        <div className="markdown-comp">
                            <a onClick={(e)=>{
                                e.preventDefault()
                                window.open(e.target.href, '_blank')
                            }}
                                style={{
                                textDecoration: "none",
                                    boxShadow: "0 -8px #00000080 inset",
                                    color: "#91969b",
                                }} {...props}/>
                        </div>
                        ),
                p: ({node,...props}) => (
                        node.position.start.column ==1 ?
                        <div className="markdown-comp">
                            {
                                <div className='numbers'>{j++, j}</div>
                            }
                            <p
                                style={{
                                margin: "16px 10px",
                                    maxWidth: '1080px'
                            }}{...props}/>
                        </div> :
                                <p
                                    style={{
                                    margin: "16px 10px",
                                        maxWidth: '1100px'
                                }}{...props}/>
                        ),
                pre: ({node, ...props}) => (
                        <div className="markdown-comp">
                            <div className='numbers'>{j++, j}</div>
                            <pre style={{
                                margin: "14px 0px 14px 10px",
                                width:"1030px",
                                padding: "20px"
                            }} {...props}/>
                      </div>
                      ),
                ul: ({depth, ...props}) => (
                        console.log(depth),
                        depth === 0 ?
                      <div className="markdown-comp">
                          <div className='numbers'>{j++, j}</div>
                          <ul style={{
                          }} {...props}/>
                      </div> :
                                <ul style={{
                                }} {...props}/>
                      )
          }}>
                {t1}
          </ReactMarkdown>
        </div>
        <div className="for-drag-page"> <Exit element={element}></Exit>
        <p className="file-name-on-bar">{page['filename']} &nbsp;  {page['datetime']}</p></div>
      </div>
    </Draggable>
  );
}


export default Page; 