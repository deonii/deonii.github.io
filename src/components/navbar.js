import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as Option_key} from '../svg/mac-option-key.svg'
import {ReactComponent as Space_key} from '../svg/space.svg'
import {ReactComponent as Plus} from '../svg/plus.svg'

function Navbar({setViewSearch}) {
    const [navover, setNavover] = useState(false);
    const [searchover, setSearchover] = useState(false);
    const [time, setTime] = useState('')
    let nowtime = new Date()
    let nowdatelist = nowtime
        .toLocaleString()
        .slice(0, -1)
        .split('. ')
    let weekday = nowdatelist[3].split(' ')[0]
    // let nowtimelist = nowdatelist[3].split(' ')[1].split(':')
    const weekday_ko = [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토'
    ]

    useEffect(() => {
        setTime(
            `${nowdatelist[0]}년 ${nowdatelist[1]}월 ${nowdatelist[2]}일 (${weekday_ko[nowtime.getDay()]})`
        )
    })

    return (
        <div className="navbar">
            <img
                onMouseOver={() => {
                    setNavover(true)
                }}
                onMouseOut={() => {
                    setNavover(false)
                }}
                className={navover
                    ? "navbar-tap navbar-over"
                    : "navbar-tap"}
                src={process.env.PUBLIC_URL + '/img/deonii.png'}
                style={{
                    width: '24px',
                    height: '24px'
                }}/>
            <Navbar_tap text="blog"></Navbar_tap>
            <Navbar_tap text="github"></Navbar_tap>
        
            <div style={{marginLeft:"auto"}}>
            <Search_tooltop searchover={searchover}></Search_tooltop>
            <FontAwesomeIcon className={searchover
                    ? "navbar-tap navbar-over"
                    : "navbar-tap"} icon={faSearch}
                onMouseOver={() => {
                    setSearchover(true)
                }}
                onMouseOut={() => {
                    setSearchover(false)
                }}
                onClick={()=>{
                    setViewSearch(true)
                }}
                style={{verticalAlign: '-0.35em', padding:"3px 10px"}}
            ></FontAwesomeIcon>
            <Navbar_tap_right text={time}>정재유</Navbar_tap_right>
            </div>
        </div>
    )
}

function Navbar_tap({text}) {
    let [navover, setNavover] = useState(false);
    return (
        <span
            onMouseOver={() => {
                setNavover(true)
            }}
            onMouseOut={() => {
                setNavover(false)
            }}
            className={navover
                ? "navbar-tap navbar-over"
                : "navbar-tap"}>{text}</span>
    )
}

function Navbar_tap_right({text}) {
    return (<span className={"navbar-tap navbar-rigth"}>
        {text}
    </span>)
}

function Search_tooltop({searchover}) {
    
    const option_style = {
        height: '18px',
        width: '18px',
        margin:'3px',
    }
    const space_style = {
        height: '18px',
        width: '18px',
        margin:'3px',
        fill: 'white',
    }
    const plus_style = {
        height: '8px',
        width: '8px',
        marginBottom:'8px',
        fill: 'white',
    }
    const div_style = {
        textAlign: 'center',
    backgroundColor: '#00000054',
    height: "38px",
    width: '75px',
    color: 'white',
    float: 'left',
    position: 'relative',
    left: '60px',
    top: '24px',
    display: searchover ? 'block':'none'
    }
    return (<div style={div_style}>
    <div style={{fontSize:'12px'}}>
        for search
    </div>
        <div>
            <Option_key style={option_style}/>
            <Plus style={plus_style}/>
            <Space_key style={space_style}/>
        </div>
        </div>
    )
}

export default Navbar;