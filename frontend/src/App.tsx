import {useState} from 'react'
import {Routes, Route} from "react-router-dom";

import './App.css'
import NavBar from "./components/NavBar.tsx";
import Responder from "./pages/Responder.tsx";
import Home from "./pages/Home.tsx";
import Dispatcher from "./pages/Dispatcher.tsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/responder" element={<Responder/>}/>
                <Route path="/dispatcher" element={<Dispatcher/>}/>
            </Routes>
        </>
    )
}

export default App
