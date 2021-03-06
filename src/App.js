import './App.css';
import {useEffect, useState} from 'react';
import {Routes, Route, Link} from "react-router-dom";

import Finder from './components/finder';
import Navbar from './components/navbar';
import {Dock_bar} from './components/dock';
import Page from './components/page';
import Searchbar from './components/searchbar';

function App() {
    let [moveup, setMoveup] = useState(true);
    const [viewSearch, setViewSearch] = useState(false);

    document.onkeydown = (e)=>{   
        if((e.altKey== true) && (e.code== 'Space')){
            setViewSearch(true)
        }
        if(e.code=='Escape') {
            setViewSearch(false)
        }
    }
    return (
        <div className="App">
            <div
                className="board"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/img/board01.jpg'})`
                }}
                >
                <Navbar setViewSearch={setViewSearch}></Navbar>
                
                <Routes>
                    <Route path="/django" element={<Finder element={"Django"}></Finder>}>
                        <Route path=":id" element={<Page element={"Django"}></Page>}/>
                    </Route>
                    <Route path="/python" element={<Finder element={"Python"}></Finder>}>
                        <Route path=":id" element={<Page element={"Python"}></Page>}/>
                    </Route>
                    <Route path="/js" element={<Finder element={"JS"}></Finder>}>
                        <Route path=":id" element={<Page element={"JS"}></Page>}/>
                    </Route>
                    <Route path=":search" element={<Finder element={'search'}></Finder>}>
                    </Route>
                </Routes>
                <Searchbar viewSearch={viewSearch} setViewSearch={setViewSearch}></Searchbar>
                <Dock_bar moveup={moveup} setMoveup={setMoveup}></Dock_bar>
            </div>
        </div>
    );
}


export default App;
