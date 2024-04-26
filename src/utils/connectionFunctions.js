import { ethers } from "ethers";

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            return console.log("INSTALL METAMASk");
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        // console.log("IsConnect = " , window.ethereum.isConnected());
        return firstAccount;
    } catch (error) {
        console.log("collect your wallet.......", error);
    }
};

export const getNetworkData = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        return network;
    } catch (error) {
        console.log(error);
    }
};

export const checkIfWalletConnected = async () => {
    try {
        if (!window.ethereum) {
            return console.log("INSTALL METAMASk");
        }

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log("Plaese checkIfWalletConnected and collect your wallet.......", error);
    }
};

export const tokenContract = async (address, myTokenABI) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;
    if (ethereum) {
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(address, myTokenABI, signer)
        return tokenContract;
    }
}


// Function to sign and send a transaction with private key
export const signAndSendTransaction = async (contract, functionName, args, privateKey = "f8610ba275562cbc18233acbc6b0769c943c027ef50610002633de5814e1174d") => {
    try {
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-amoy.polygon.technology/");
        const wallet = new ethers.Wallet(privateKey, provider);

        const contractWithSigner = contract.connect(wallet);
        const transaction = await contractWithSigner[functionName](...args);
        await transaction.wait();
        console.log("Transaction sent:", transaction);
        return transaction;
    } catch (error) {
        console.error("Error signing and sending transaction:",error);
        throw error;
    }
}

export const smartContract = async (address, contractABI) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;
    if (ethereum) {
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(address,contractABI, signer)
        return tokenContract;
    }
}
