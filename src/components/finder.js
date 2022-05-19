import Draggable from "react-draggable";
import {useEffect, useState} from 'react';
import { Outlet } from "react-router";
import pages from '../pages/pages.json'
import { useNavigate, Link } from "react-router-dom"
import Exit from './exit';
import {Dock_icon} from './dock'

function Finder({element}) {
    const [fileList, setFileList] = useState([])
    const dock_icon_style = {
        boxSizing: 'border-box',
        width: '20px',
        height: '20px',
        margin: '0px 10px'
    }
        

    useEffect(()=>{
        let fileList1 = pages[element].map(()=>false)
        setFileList(fileList1)
    }, [element])

    return (
        <>
        <Draggable handle=".for-drag" >
            <div className="finder">
                <div className="exit-bar">
                    <p class="favorite">카테고리</p>
                    <Link to="/python"><p class="categories"><Dock_icon num="0" style={dock_icon_style}></Dock_icon>Python</p></Link>
                    <Link to="/django"><p class="categories"><Dock_icon num="1" style={dock_icon_style}></Dock_icon>Django</p></Link>
                    <Link to="/js"><p class="categories"><Dock_icon num="2" style={dock_icon_style}></Dock_icon>Javascript</p></Link>
                </div>
                <div className="drag-bar"></div>
                <div className="main-div">
                    {
                        pages[element].map((page,i)=>{
                            return (
                                <File key={i} name={page.name} index={i} element={element} date={page.date} 
                                fileList={fileList} setFileList={setFileList}/>
                            )
                        })
                    }
                </div>
                <div className="for-drag">
                    <Exit element={''}></Exit>
                </div>
            </div>
        </Draggable>
        <Outlet></Outlet>
        </>
    )
}

function File({name, index, element, date, fileList, setFileList}) {
    const select_img = (e) => {
        let fileList1 = [...fileList]
        fileList1 = fileList1.map(()=>false)
        if(!fileList[index]){
            fileList1[index] = true
        }
        setFileList(fileList1)
    }
    let navigate = useNavigate(); 
    const go_to_page = () =>{ 
        let path = `${date}${index}`
    navigate(path);
    }   

    return (
        <Draggable handle={[".file-img", ".file-name"]}>
        <div className="file">
            <div className={fileList[index] ? "file-img selected" : "file-img"} onDoubleClick={()=>{go_to_page()}} onClick={()=>{select_img()}} style={{backgroundImage:`url(${process.env.PUBLIC_URL + '/img/file.png'})`}}>
            </div>
            <p className={fileList[index] ? "file-name selected" : "file-name"}>
                {name}
            </p>
        </div>
        </Draggable>
    )
}

export default Finder;