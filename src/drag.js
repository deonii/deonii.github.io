import {useState, useEffect} from 'react';
import Draggable from "react-draggable"

function Drag() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y });
     };
    return (
        <Draggable 
        handle=".handle"
        onDrag={(e, data) => trackPos(data)}
        position= {{x: 100, y: 100}}
        >
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    );
}

export default Drag;