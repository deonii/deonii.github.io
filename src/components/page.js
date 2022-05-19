import pages from "../pages/pages.json";
import Draggable from "react-draggable";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Exit from './exit';

function Page({ element }) {
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

  useEffect(() => {
    let mdPath = require(`../pages/${element}/${page["filename"]}`);
    fetch(mdPath)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        setT1(text);
        make_num_div()
      });
  },[heightList, id]);

  function make_num_div() {
    const main_html = Array.from(ref.current.children);

    if(main_html.length != heightList.length){
        let b_offset = 0
        const newArr = main_html.map((el) => {
            let n_offset = 2 * (el.offsetTop - b_offset) + el.offsetHeight
            b_offset += n_offset
            return n_offset
        });
        setHeightList(newArr);
    }
  }

  return (
    <Draggable handle=".for-drag-page" defaultPosition={{ x: 200, y: -680 }} >
      <div className="text-page">
        <div className="right-main" ref={ref} onScroll={scrollY}>
          <div style={{ height: "28px" }}></div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              img: ({ node, ...props }) => (
            <img onLoad={make_num_div} style={{ maxWidth: "750px" }} {...props} alt="" />),
            blockquote: ({node, ...props}) => (
                <blockquote style={{
                    color: "#343d46",
                    marginLeft: "0px",
                    marginRight: "0px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    borderLeft: "5px solid #6e7680",
                    backgroundColor: "#f3f3f3"
                }} {...props}/>),
            h1: ({node, ...props}) => (
                <h1 style={{
                    borderBottom: "1px solid",
                    margin: "0px",
                    padding: "20px"
                }} {...props}/>),
            h2: ({node, ...props}) => (
                <h2 style={{
                    borderBottom: "1px solid",
                    margin: "0px",
                    padding: "18px"
                }} {...props}/>),
            h3: ({node, ...props}) => (
                <h3 style={{
                    borderBottom: "1px solid",
                    margin: "0px",
                    padding: "16px"
                }} {...props}/>),
            a: ({node, ...props}) => (
                <a onClick={(e)=>{
                    e.preventDefault()
                    window.open(e.target.href, '_blank')
                }}
                style={{
                    textDecoration: "none",
                    boxShadow: "0 -8px #00000080 inset",
                    color: "#91969b"
                }} {...props}/>
            )

                    }}>
            {t1}
          </ReactMarkdown>
        </div>
        <div className="left-num" ref={cRef}>
          {heightList.map((num, idx) => {
            return (
              <Number key={idx}  num={idx - 1} height={num}>
                {idx}
              </Number>
            );
          })}
        </div>
        <div className="for-drag-page"> <Exit element={element}></Exit>
        <p className="file-name-on-bar">{page['filename']} &nbsp;  {page['datetime']}</p></div>
      </div>
    </Draggable>
  );
}

// function Exit({element}) {
//     const [exitIcon, setExitIcon] = useState(false);

//     let navigate = useNavigate(); 

//     const go_to_page = () =>{ 
//         let path = `/${element}`
//         navigate(path);
//     }

//     return (<> < div className = {exitIcon ? "exit bar_button hover_icon":"exit bar_button"}
//     onClick = {(e) => {go_to_page()}} 
//     onMouseOver = {()=>{setExitIcon(true)}}
//     onMouseLeave = {()=>{setExitIcon(false)}}
//     > {exitIcon ? 'X': ''}</div>
//     <div className={"disappear bar_button"}></div>
//     <div className={"full_page bar_button"}></div> </>
//     )
// }

function Number({ num, height = 25 }) {
  return (
    <div style={{ height: `${height}px` }} className="numbers">
      {num}
    </div>
  );
}

export default Page; 