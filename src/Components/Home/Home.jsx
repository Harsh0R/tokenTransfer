import React, { useContext, useEffect, useState } from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Style from "./Home.module.css"
import { getNetworkData, connectWallet } from '../../utils/connectionFunctions'
import { MyContext } from '../Context/Context'
import Error from '../Error/Error';

const Home = () => {

    const [error, setError] = useState()
    const [data, setData] = useState()
    const [account, setAccount] = useState()
    const [balance, setBalance] = useState()
    const [transferAmount, setTransferAmount] = useState()
    const [transferAccount, setTransferAccount] = useState()
    const [contractBal, setContractBal] = useState()

    const { increaseAllowance, getBalance, transferToken, depositMatic1, checkBalance, transferMatic , getToken } = useContext(MyContext)

    const fetchData = async () => {
        const account = await connectWallet();
        if (!account) {
            setError("Connect Metamask")
        }

        const info = await getNetworkData();
        const bal = await getBalance();

        const conBal = await checkBalance();

        setContractBal(conBal);
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
        await transferToken(transferAccount, transferAmount)
    }
    const depositMatic = async (e) => {
        e.preventDefault();
        console.log("Form Submit222", transferAmount);
        await depositMatic1(transferAmount)
    }
    const getMatic = async (e) => {
        e.preventDefault();
        console.log("Form Submit222", transferAmount);
        await transferMatic()
    }
    const getToken1 = async (e) => {
        e.preventDefault();
        console.log("Form Submit222", transferAmount);
        await getToken()
    }

    useEffect(() => {
        fetchData();
    }, [getBalance])

    return (
        <div>

            {error == null ? "" : <Error error={error} />}

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
                    {/* <div>
                        <button onClick={approveToken}>Approve Token</button>
                    </div>
                    <div>
                        Balance : {balance}
                    </div> */}

                    <div>Matic :  {contractBal}</div>
                    <div>TSC Token :  {balance}</div>

                </div>
                <br />
                {/* <form onSubmit={handleTransfer}>
                    Enter Token Amount To transfer
                    <input type="number" name="Amount" id="Amount" onChange={(e) => setTransferAmount(e.target.value)} required />
                    <br />
                    Enter Address of Recipient
                    <input type="text" name="Account" id="Account" onChange={(e) => setTransferAccount(e.target.value)} required />
                    <br />
                    <button type="submit" value="submit">Transfer</button>
                </form> */}



                <form onSubmit={getMatic}>
                    Get 3 Matic :
                    {/* <input type="number" name="Amount" id="Amount" onChange={(e) => setTransferAmount(e.target.value)} required />
                    <br /> */}
                    <button type="submit" value="submit">Get Matic</button>
                </form>
                <form onSubmit={getToken1}>
                    Get 100 TSC Token :
                    {/* <input type="number" name="Amount" id="Amount" onChange={(e) => setTransferAmount(e.target.value)} required />
                    <br /> */}
                    <button type="submit" value="submit">Get TSC Token</button>
                </form>

                <br /><br /><br /><br />

                <form onSubmit={depositMatic}>
                    Enter Token Amount To Deposit Matic
                    <input type="number" name="Amount" id="Amount" onChange={(e) => setTransferAmount(e.target.value)} required />
                    <br />
                    <button type="submit" value="submit">Deposit</button>
                </form>


            </div>

        </div>
    )
}

export default Home