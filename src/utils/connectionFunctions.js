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
