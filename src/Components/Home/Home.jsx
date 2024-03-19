import React, { useContext, useEffect, useState } from 'react'
import Style from "./Home.module.css"
import { getNetworkData, connectWallet } from '../../utils/connectionFunctions'
import { MyContext } from '../Context/Context'

const Home = () => {

    const [error, setError] = useState()
    const [data, setData] = useState()
    const [account, setAccount] = useState()
    const [balance, setBalance] = useState()
    const [transferAmount, setTransferAmount] = useState()
    const [transferAccount, setTransferAccount] = useState()

    const { increaseAllowance, getBalance , transferToken } = useContext(MyContext)

    const fetchData = async () => {
        const account = await connectWallet();
        const info = await getNetworkData();
        const bal = await getBalance();
        setBalance(bal)
        setData(info);
        setAccount(account);
    }
    const approveToken = async () => {
        await increaseAllowance()
    }

    const handleTransfer = async (e) => {
        e.preventDefault();
        console.log("Form Submit", transferAccount, transferAmount);
        await transferToken(transferAccount , transferAmount)
    }

    useEffect(() => {
        fetchData();
    }, [getBalance])

    return (
        <div>
            <div className={Style.container}>
                {data && (
                    <>
                        Account Address : {account}
                        <br />
                        Network Name : {data.name}
                        <br />
                        Network ChainId : {data.chainId}
                    </>
                )}
            </div>
            <div className={Style.container}>
                <div className={Style.con1}>
                    <div>
                        <button onClick={approveToken}>Approve Token</button>
                    </div>
                    <div>
                        Balance : {balance}
                    </div>
                </div>
                <br />
                <form onSubmit={handleTransfer}>
                    Enter Token Amount To transfer
                    <input type="number" name="Amount" id="Amount" onChange={(e) => setTransferAmount(e.target.value)} required />
                    <br />
                    Enter Address of Recipient
                    <input type="text" name="Account" id="Account" onChange={(e) => setTransferAccount(e.target.value)} required />
                    <br />
                    <button type="submit" value="submit">Transfer</button>
                </form>
            </div>
        </div>
    )
}

export default Home