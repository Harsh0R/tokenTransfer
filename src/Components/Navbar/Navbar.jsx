import React, { useContext, useEffect } from 'react'
import { connectWallet, getNetworkData } from '../../utils/connectionFunctions'
import Style from "./Navbar.module.css"
import Error from '../Error/Error'
import { MyContext } from '../Context/Context'


const Navbar = () => {

    const {error , account} = useContext(MyContext)
    useEffect(() => {
    }, [error])
    

    const connectToWallet = async () => {
        connectWallet()
    }
  
    return (
        <div className={Style.container}>
            Connect Ur Wallet 
            <button onClick={connectToWallet}>
                {account ? `Connected` : `Connect`}
                {/* Connect */}
            
            </button>
            <br />
            {error == "" ? "" : <Error error={error} />}
        </div>
    )
}

export default Navbar