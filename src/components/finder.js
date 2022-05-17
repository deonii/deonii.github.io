import Draggable from "react-draggable";
import {useEffect, useState} from 'react';
import { Outlet } from "react-router";
import pages from '../pages/pages.json'
import { useNavigate } from "react-router-dom"

function Finder({element}) {
    return (
        <>
        <Draggable handle=".for-drag" >
            <div className="finder">
                <div className="exit-bar"></div>
                <div className="drag-bar"></div>
                <div className="main-div">
                    {
                        pages[element].map((page,i)=>{
                            return (
                                <File name={page.name} index={i} element={element} date={page.date}/>
                            )
                        })
                    }
                </div>
                <div className="for-drag"></div>
            </div>
        </Draggable>
        <Outlet></Outlet>
        </>
    )
}

function File({name, index, element, date}) {
    let [select, setSelect] = useState(false)
    const select_img = (e) => {
        if(!select) {
            let selected_list = Array.from(document.getElementsByClassName('selected'))
            for(let i = 0; i< selected_list.length; i++){
                selected_list[i].className = selected_list[i].className.split(' ')[0]
            }
        }
        select ? setSelect(false) : setSelect(true)
    }
    let navigate = useNavigate(); 
    const go_to_page = () =>{ 
        let path = `${date}${index}`
    navigate(path);
    }   

    return (
        <Draggable handle={[".file-img", ".file-name"]}>
        <div className="file">
            <div className={select ? "file-img selected" : "file-img"} onDoubleClick={()=>{go_to_page()}} onClick={()=>{select_img()}} style={{backgroundImage:`url(${process.env.PUBLIC_URL + '/img/file.png'})`}}>
            </div>
            <p className={select ? "file-name selected" : "file-name"}>
                {name}
            </p>
        </div>
        </Draggable>
    )
}

export default Finder;