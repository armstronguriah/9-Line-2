import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

import './App.css'
import axios from "axios";
import SiteNavbar from "./components/NavBar.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>App page</h1>
        <NavBar/>
    </>
  )
}

export default App
