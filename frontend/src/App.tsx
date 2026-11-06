import {Route, Routes} from "react-router-dom";

import './App.css'
import NavBar from "./components/NavBar.tsx";
import Dispatcher from "./pages/Dispatcher.tsx";
import Requester from "./pages/Requester.tsx";
import Responder from "./pages/Responder.tsx";


function App() {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Requester/>}/>
                <Route path="/dispatcher" element={<Dispatcher/>}/>
                <Route path="/responder" element={<Responder/>}/>
            </Routes>
        </>
    )
}

export default App
