// Import necessary libraries and constants
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { BlockTalkAddress, BlockTalkABI } from "../Context/constants";

// Function to check if a wallet is connected
export const ChechIfWalletConnected = async () => {
    try {
      // If there is no window.ethereum, then the user does not have MetaMask installed
      if (!window.ethereum) return console.log("Install MateMask");
      // If there is a MetaMask instance, request the accounts and return the first account
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
  
      const firstAccount = accounts[0];
      return firstAccount;
    } catch (error) {
      console.log(error);
    }
  };
  // Function to connect to MetaMask wallet
  export const connectWallet = async () => {
    try {
      // if (!window.ethereum) return console.log("Install MateMask");
  
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });

      // If there is no window.ethereum, then the user does not have MetaMask installed
      if (!window.ethereum) return console.log("Install MetaMask");

      // Request access to the user's MetaMask account and return the first account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const firstAccount = accounts[0];
      return firstAccount;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch the contract using the provider or signer object
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(BlockTalkAddress, BlockTalkABI, signerOrProvider);
  
    // Function to connect to the contract using MetaMask
  export const connectingWithContract = async () => {
    try {
      // Create a new Web3Modal instance and connect to the user's MetaMask wallet
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      // Create a new Web3Provider and Signer instance using the connection
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
       // Fetch the contract using the signer object and return it
      const contract = fetchContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  // Function to convert the timestamp to readable format
  export const converTime = (time) => {
    // Convert the timestamp to a Date object
    const newTime = new Date(time.toNumber());
    // Format the Date object to a readable string and return it
    const realTime =
      newTime.getHours() +
      "/" +
      newTime.getMinutes() +
      "/" +
      newTime.getSeconds() +
      "  Date:" +
      newTime.getDate() +
      "/" +
      (newTime.getMonth() + 1) +
      "/" +
      newTime.getFullYear();
  
    return realTime;
  };