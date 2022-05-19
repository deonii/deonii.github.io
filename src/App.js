import './App.css';
import {useEffect, useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";

import Finder from './components/finder';
import Navbar from './components/navbar';
import {Dock_bar} from './components/dock';
import Page from './components/page';

function App() {
    let [moveup, setMoveup] = useState(true);
    // let [moving, setMoving] = useState(false);

    return (
        <div className="App">
            <div
                className="board"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/img/board01.jpg'})`
                }}>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/django" element={<Finder element={"django"}></Finder>}>
                        <Route path=":id" element={<Page element={"django"}></Page>}/>
                    </Route>
                    <Route path="/python" element={<Finder element={"python"}></Finder>}>
                        <Route path=":id" element={<Page element={"python"}></Page>}/>
                    </Route>
                    <Route path="/js" element={<Finder element={"js"}></Finder>}>
                        <Route path=":id" element={<Page element={"python"}></Page>}/>
                    </Route>
                </Routes>
                <Dock_bar moveup={moveup} setMoveup={setMoveup}></Dock_bar>
            </div>
        </div>
    );
}


export default App;
