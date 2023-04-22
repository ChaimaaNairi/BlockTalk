import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  ChechIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const BlockTalkContect = React.createContext();

export const BlockTalkProvider = ({ children }) => {
    //set initial states
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    // Get the router
    const router = useRouter();

    // Fetch data from the contract and set the state
    const fetchData = async () => {
        try {
          //Get contract
          const contract = await connectingWithContract();
          //Get account
          const connectAccount = await connectWallet();
          setAccount(connectAccount);
          //Get user name
          const userName = await contract.getUsername(connectAccount);
          setUserName(userName);
          //Get my friend list
          const friendLists = await contract.getMyFriendList();
          setFriendLists(friendLists);
          //Get all app user list
          const userList = await contract.getAllAppUser();
          setUserLists(userList);
        } catch (error) {
          // setError("Please Install And Connect Your Wallet");
          console.log(error);
        }
      };

    // Run fetchData() when the component mounts
      useEffect(() => {
        fetchData();
      }, []);
    
      //Read message
      const readMessage = async (friendAddress) => {
        try {
          const contract = await connectingWithContract();
          const read = await contract.readMessage(friendAddress);
          setFriendMsg(read);
        } catch (error) {
          console.log("Currently You Have no Message");
        }
      };
    
      //create account
      const createAccount = async ({ name, accountAddress }) => {
        try {
          // if (name || accountAddress)
          //   return setError("Name And AccountAddress, cannot be emty");
    
          const contract = await connectingWithContract();
          const getCreatedUser = await contract.createAccount(name);
          setLoading(true);
          await getCreatedUser.wait();
          setLoading(false);
          window.location.reload();
        } catch (error) {
          setError("Error while creating your account Pleas reload browser");
        }
      };
    
      //Add your friends
      const addFriends = async ({ name, accountAddress }) => {
        try {
          // if (name || accountAddress) return setError("Please provide data");
    
          const contract = await connectingWithContract();
          const addMyFriend = await contract.addFriend(accountAddress, name);
          setLoading(true);
          await addMyFriend.wait();
          setLoading(false);
          router.push("/");
          window.location.reload();
        } catch (error) {
          setError("Something went wrong while adding friends, try again");
        }
      };
    
      //Send message to your friends or any user
      const sendMessage = async ({ msg, address }) => {
        try {
          // if (msg || address) return setError("Please Type your Message");
    
          const contract = await connectingWithContract();
          const addMessage = await contract.sendMessage(address, msg);
          setLoading(true);
          await addMessage.wait();
          setLoading(false);
          window.location.reload();
        } catch (error) {
          setError("Please reload and try again");
        }
      };
    
      //Read information of any user
      const readUser = async (userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
      };
      return (
        <BlockTalkContect.Provider
          value={{
            readMessage,
            createAccount,
            addFriends,
            sendMessage,
            readUser,
            connectWallet,
            ChechIfWalletConnected,
            account,
            userName,
            friendLists,
            friendMsg,
            userLists,
            loading,
            error,
            currentUserName,
            currentUserAddress,
          }}
        >
          {children}
        </BlockTalkContect.Provider>
      );
    };
    