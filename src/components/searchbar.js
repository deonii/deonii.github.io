import {useEffect, useState, useRef} from "react";
import {ReactComponent as Search} from '../svg/search.svg'
import { useNavigate } from "react-router-dom"

function Searchbar({viewSearch, setViewSearch}) {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)
    const bar_style = {
        position: 'absolute',
        width: '600px',
        left: '50%',
        marginLeft: '-325px',
        top: '12%',
        height: '45px',
        borderRadius: '5px',
    }
    const input_style = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        border: "#858a8f 1px solid",
        backgroundColor: "#2e2e3380",
        color: '#ccd2dd',
        backdropFilter: "blur(30px)",
        fontSize: 'x-large',
        paddingLeft: '45px'
    }
    const icon_style = {
        height: '20px',
        widht: '20px',
        position: 'relative',
        bottom: '33px',
        left: '15px',
        fill: '#a7a7a7'
    }
    let navigate = useNavigate(); 
    
    useEffect(()=>{
        setInputValue('')
        // if (inputRef.current !== null) {
        //     inputRef.current.focus();
        // }
    }, [viewSearch])
    if(viewSearch) {
    }

    return viewSearch ? (
        <div style={bar_style}>
            <input id='search_input' style={input_style} placeholder="blog 내 검색" 
            onChange={(e)=>{
                setInputValue(e.target.value)
            }} 
            onKeyDown= {(e)=>{
                if(e.code == 'Enter') {
                    let path = `/${e.target.value}`
                    navigate(path);
                    setViewSearch(false)
                }
            }}
            autoComplete='off' 
            value={inputValue}
            // ref={inputRef}
            />
            <Search style={icon_style}></Search>
        </div>
    ) : ''
}

export default Searchbar;