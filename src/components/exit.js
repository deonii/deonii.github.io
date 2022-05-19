import { useState } from "react";
import { useNavigate } from "react-router";

function Exit({element}) {
    const [exitIcon, setExitIcon] = useState(false);

    let navigate = useNavigate(); 
    
    const go_to_page = () =>{ 
        let path = `/${element}`
        navigate(path);
    }

    return (<> < div className = {exitIcon ? "exit bar_button hover_icon":"exit bar_button"}
    onClick = {(e) => {go_to_page()}} 
    onMouseOver = {()=>{setExitIcon(true)}}
    onMouseLeave = {()=>{setExitIcon(false)}}
    > {exitIcon ? 'X': ''}</div>
    <div className={"disappear bar_button"}></div>
    <div className={"full_page bar_button"}></div> </>
    )
}

export default Exit;