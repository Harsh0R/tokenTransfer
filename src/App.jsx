import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { MyContextProvider } from './Components/Context/Context'
import Home from './Components/Home/Home'

import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { polygonAmoy } from 'wagmi/chains'
import { WagmiProvider , http  } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

function App() {

  const config = getDefaultConfig({
    appName: 'RainbowKit demo',
    projectId: 'YOUR_PROJECT_ID',
    chains: [polygonAmoy],
    transports: {
      [polygonAmoy.id]: http(),
    },
  })
 
  const queryClient = new QueryClient()
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >

          <MyContextProvider>
            <Navbar></Navbar>
            <Home></Home>
          </MyContextProvider>

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App




// "@rainbow-me/rainbowkit": "^0.4.6",
// "wagmi": "^2.5.11",