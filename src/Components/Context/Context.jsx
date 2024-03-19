import React, { useState, useEffect } from "react";
import { connectWallet, getNetworkData, checkIfWalletConnected, tokenContract } from "../../utils/connectionFunctions";
import { TokenAddress, myTokenABI, smartContractAddress } from "./constants";
import { ethers } from "ethers";
export const MyContext = React.createContext();

export const MyContextProvider = ({ children }) => {

    const [account, setAccount] = useState("");
    const [error, setError] = useState("");
    const [amount, setAmount] = useState()
    const [tokenContractInstance, setTokenContractInstance] = useState()

    const fetchData = async () => {
        try {
            const connectAccount = await checkIfWalletConnected();
            if (connectAccount != null) {
                setAccount(connectAccount);
            } else {
                setError("Plaese install and collect your wallet....😑");
            }

        } catch (error) {
            setError("Plaese install and collect your wallet....😑");
        }
        try {
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            if (TokenAddress && myTokenABI) {
                await connectWithToken(TokenAddress, myTokenABI)
            } else {
                setError("Error occure in fetching TokenContract ....😑 : TokenAddress or myTokenABI is not define");
            }
        } catch (error) {
            setError("Error occure in fetching data ....😑" + error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const connectWithToken = async (TokenAddress, myTokenABI) => {
        const TokenContract = await tokenContract(TokenAddress, myTokenABI);
        console.log("Token Contract = ", TokenContract);
        setTokenContractInstance(TokenContract);
        const amount = await TokenContract.totalSupply();
        const amount1 = await toEth(amount)
        console.log("Amount === ", amount1);
        setAmount(amount1);
    }

    const increaseAllowance = async (amount1 = amount) => {
        try {
            console.log("Amouint ", amount1);
            const data = await tokenContractInstance.approve(
                smartContractAddress,
                toWei(amount1)
            );
            console.log("DAta = ", data);
        } catch (e) {
            return console.log("Error at Increase allowence = ", e);
        }
    }
    const transferToken = async (recipient, amount) => {
        try {
            ;
            const data = await tokenContractInstance.transfer(
                recipient,
                toWei(amount)
            );
            console.log("DAta = ", data);
        } catch (e) {
            return console.log("Error at Increase allowence = ", e);
        }
    }
    const getBalance = async (account1 = account) => {
        try {
            ;
            const data = await tokenContractInstance.balanceOf(
                account1
            );
            const result = toEth(data)
            console.log("DAta = ", data);
            return result;
        } catch (e) {
            return console.log("Error at getBalance = ", e);
        }
    }

    const toWei = async (amount) => {
        const toWie = ethers.utils.parseUnits(amount.toString());
        return toWie.toString();
    }
    const toEth = async (amount) => {
        const toEth = ethers.utils.formatUnits(amount.toString());
        return toEth.toString();
    }



    return (
        <MyContext.Provider
            value={{
                connectWallet,
                connectWithToken,
                checkIfWalletConnected,
                increaseAllowance,
                getBalance,
                transferToken,
                account,
                error,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};