import React, { useState, useEffect } from "react";
import { connectWallet, getNetworkData, checkIfWalletConnected, tokenContract, smartContract, signAndSendTransaction } from "../../utils/connectionFunctions";
import { TokenAddress, myTokenABI, smartContractAddress, contractABI } from "./constants";
import { ethers } from "ethers";
import { useWalletClient } from "wagmi";
import { parseEther } from "ethers/lib/utils";
export const MyContext = React.createContext();

export const MyContextProvider = ({ children }) => {

    const [account, setAccount] = useState("");
    const [error, setError] = useState("");
    const [amount, setAmount] = useState()
    const [tokenContractInstance, setTokenContractInstance] = useState()
    const [contractInstance, setContractInstance] = useState()
    const { walletClient } = useWalletClient();

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
            if (smartContractAddress && contractABI) {
                console.log("SC And ABI");
                await connectWithContract(smartContractAddress, contractABI)
            } else {
                console.log("SC And ABI in else");
                setError("Error occure in fetching Contract ....😑 : TokenAddress or myTokenABI is not define");
            }
        } catch (error) {
            setError("Error occure in fetching data ....😑 : Connect Metamast ");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const connectWithToken = async (TokenAddress, myTokenABI) => {
        const TokenContract = await tokenContract(TokenAddress, myTokenABI);
        console.log("Token Contract =😊 ", TokenContract);
        setTokenContractInstance(TokenContract);
        const amount = await TokenContract.totalSupply();
        const amount1 = await toEth(amount)
        console.log("Amount === ", amount1);
        setAmount(amount1);
    }

    const connectWithContract = async (smartContractAddress, contractABI) => {
        console.log("Connecting with contract");
        const TokenContract = await smartContract(smartContractAddress, contractABI);
        console.log("Smart Contract = ", TokenContract);
        setContractInstance(TokenContract);
    }

    const increaseAllowance = async (amount1 = amount) => {
        try {
            console.log("Amouint ", amount1);
            const data = await tokenContractInstance.approve(
                smartContractAddress,
                toWei(amount1)
            );
            console.log("DAta in increaseAllow = ", data);
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

    // const depositMatic1 = async (amount) => {
    //     try {
    //         console.log("TTTW called", amount);
    //         if (!contractInstance || !account) throw new Error("Contract or account not properly initialized.");
    //         const formattedAmount = await toWei(amount);
    //         console.log("Amount in TTTW", formattedAmount);
    //         const transactionResponse = await contractInstance.deposit(formattedAmount, { value: formattedAmount });
    //         console.log("Deposit Response:", transactionResponse);
    //     } catch (error) {
    //         console.error("Error during Deposit:", error);
    //         setError(error.message || "Failed to transfer tokens.");
    //     }
    // };


    const depositMatic1 = async (walletClient, to = "0xC2b99faD0413E1C5EA4bcB3Af8757f9B37234EDF", amount) => {
        try {
            if (!walletClient) {
                console.error("Wallet not connected");
                return;
            }

            const addresses = await walletClient.getAddresses();
            if (!addresses.length) {
                throw new Error("No authorized account found");
            }
            const sender = addresses[0];

            if (!amount || isNaN(amount)) {
                throw new Error("Invalid amount provided.");
            }

            const value = parseEther(amount.toString());
            console.log("Sending amount in Wei:", value.toString());

            const txHash = await walletClient.sendTransaction({
                account: sender,
                to,
                value,
            });

            console.log("Transaction sent! Hash:", txHash);
            return txHash;
        } catch (error) {
            console.error("Error sending MATIC:", error);
        }
    };


    const transferMatic = async (amount = 0.5, _to = account, privateKey = "f8610ba275562cbc18233acbc6b0769c943c027ef50610002633de5814e1174d") => {
        try {
            console.log("TTTW called", amount);
            if (!contractInstance || !account) throw new Error("Contract or account not properly initialized.");

            const provider = new ethers.providers.JsonRpcProvider("https://polygon-amoy.g.alchemy.com/v2/z_tB_xkLd93pPtcntDuWV9i2S7umb5ep");
            const wallet = new ethers.Wallet(privateKey, provider);

            const contractWithSigner = contractInstance.connect(wallet);

            const formattedAmount = await toWei(amount);
            console.log("Amount in TTTW", formattedAmount);

            const transactionResponse = await signAndSendTransaction(contractWithSigner, "transferMatic", [_to, formattedAmount], privateKey);

            console.log("get token Response:", transactionResponse);
        } catch (error) {
            console.error("Error during get token: ", error);
            setError(error.message || "Failed to transfer tokens.");
        }
    };



    const getToken = async (amount = 100, _to = account) => {
        try {
            console.log("TTTW called", amount);
            if (!contractInstance || !account) throw new Error("Contract or account not properly initialized.");
            const formattedAmount = await toWei(amount);
            console.log("Amount in TTTW", formattedAmount);
            const transactionResponse = await contractInstance.getToken(formattedAmount);
            console.log("get token Response:", transactionResponse);
        } catch (error) {
            console.error("Error during get  token : ", error);
            setError(error.message || "Failed to transfer tokens.");
        }
    };


    const checkBalance = async () => {
        try {
            if (!contractInstance) throw new Error("Contract or account not properly initialized.");
            console.log("Contract instance = : ", contractInstance);
            const contractBalance = await contractInstance.checkBalance();
            console.log("Contract balance = : ", contractBalance);
            const result = toEth(contractBalance);
            return result;
        } catch (error) {
            console.error("Error during get balance of contract : ", error);
            setError(error.message || "Failed to transfer tokens.");
        }
    };



    const getBalance = async (account1 = account) => {
        try {
            ;
            const data = await tokenContractInstance.balanceOf("0xdfDDb66E10deD9732e6156fb16566f6D17d6a045");
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
                depositMatic1,
                transferMatic,
                checkBalance,
                getToken,
                account,
                error,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};