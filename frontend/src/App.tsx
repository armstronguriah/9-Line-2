import {useState} from 'react'

import './App.css'
import NavBar from "./components/NavBar.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>Your page</h1>
        <NavBar/>
    </>
  )
}

export default App
