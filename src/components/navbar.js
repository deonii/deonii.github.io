import {useEffect, useState} from 'react';

function Navbar() {
    let [navover, setNavover] = useState(false);
    let [time, setTime] = useState('')
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
            <Navbar_tap navover={navover} setNavover={setNavover} text="blog"></Navbar_tap>
            <Navbar_tap navover={navover} setNavover={setNavover} text="github"></Navbar_tap>
            <Navbar_tap_right text={time}></Navbar_tap_right>
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

export default Navbar;