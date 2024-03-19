import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Error from './Components/Error/Error'
import { MyContextProvider } from './Components/Context/Context'
import Home from './Components/Home/Home'

function App() {
  return (
    <MyContextProvider>
    <Navbar></Navbar>
    <Home></Home>
    </MyContextProvider>
  )
}

export default App
