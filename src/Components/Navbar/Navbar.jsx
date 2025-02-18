import React, { useContext, useEffect } from 'react'
import { connectWallet, getNetworkData } from '../../utils/connectionFunctions'
import Style from "./Navbar.module.css"
import Error from '../Error/Error'
import { MyContext } from '../Context/Context'
import { ConnectButton } from '@rainbow-me/rainbowkit'


const Navbar = () => {

    // const {error , account} = useContext(MyContext)
    // useEffect(() => {
    // }, [error])

    return (
        <div className={Style.container}>
            {/* Connect Ur Wallet */}
            {/* <ConnectButton /> */}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: 12,
                }}
            >
                <ConnectButton />
            </div>
            <br />
        </div>
    )
}

export default Navbar