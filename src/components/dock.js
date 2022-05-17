import {Routes, Route, Link} from "react-router-dom";

function Dock_bar({moveup, setMoveup}) {
    let dock_style = {}

    return (
        <div
            className="dock-bar"
            style={dock_style}
            >
            <Link className="dock-icon-a" to="/python">
                <Dock_icon num="0"></Dock_icon>
            </Link>
            <Link className="dock-icon-a" to="/django">
                <Dock_icon num="1"></Dock_icon>
            </Link>
            <Link className="dock-icon-a" to="/js">
                <Dock_icon num="2"></Dock_icon>
            </Link>
        </div>
    )
}

function Dock_icon({num}) {
    let icon_list = ['python', 'django', 'js']
    return (<div className={"dock-icon " + icon_list[num]}></div>)
}

export default Dock_bar;