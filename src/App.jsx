import './App.css'
import Navbar from './Components/Navbar/Navbar'
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




// "@rainbow-me/rainbowkit": "^0.4.6",
// "wagmi": "^2.5.11",