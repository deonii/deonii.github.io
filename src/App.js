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
                    <Route path="/django" element={<Finder element={"django"}></Finder>}>
                        <Route path=":id" element={<Page element={"django"}></Page>}/>
                    </Route>
                    <Route path="/python" element={<Finder element={"python"}></Finder>}>
                        <Route path=":id" element={<Page element={"python"}></Page>}/>
                    </Route>
                    <Route path="/java" element={<Finder element={"java"}></Finder>}>
                        <Route path=":id" element={<Page element={"java"}></Page>}/>
                    </Route>
                    <Route path="/cs" element={<Finder element={"cs"}></Finder>}>
                        <Route path=":id" element={<Page element={"cs"}></Page>}/>
                    </Route>
                    <Route path="/http" element={<Finder element={"http"}></Finder>}>
                        <Route path=":id" element={<Page element={"http"}></Page>}/>
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
