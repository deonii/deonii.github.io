import {Routes, Route, Link} from "react-router-dom";

function Dock_bar({moveup, setMoveup}) {
    let dock_style = {}
    const dock_icon_style = {
        boxSizing: 'border-box',
        width: '64px',
        height: '64px',
        backgroundColor: 'white',
        border: 'gray 1px solid',
        borderRadius: '15px'
    }

    return (
        <div
            className="dock-bar"
            style={dock_style}
            >
            <Link className="dock-icon-a" to="/python">
                <Dock_icon num="0" style={dock_icon_style}></Dock_icon>
            </Link>
            <Link className="dock-icon-a" to="/django">
                <Dock_icon num="1" style={dock_icon_style}></Dock_icon>
            </Link>
            <Link className="dock-icon-a" to="/java">
                <Dock_icon num="2" style={dock_icon_style}></Dock_icon>
            </Link>
            <Link className="dock-icon-a" to="/cs">
                <Dock_icon num="3" style={dock_icon_style}></Dock_icon>
            </Link>
            <Link className="dock-icon-a" to="/http">
                <Dock_icon num="4" style={dock_icon_style}></Dock_icon>
            </Link>
        </div>
    )
}

function Dock_icon({num, style}) {
    let icon_list = ['python', 'django', 'java', 'cs', 'http']
    return (<div className={"dock-icon " + icon_list[num]} style={style}></div>)
}

export { Dock_bar, Dock_icon};