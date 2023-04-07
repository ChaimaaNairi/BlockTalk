//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BlockTalk {
    
    //user struct
    struct user {
        string name;
        friend[] friendList;
    }

    //friend struct
    struct friend {
        address pubkey;
        string name;
    }

    //message struct
    struct message {
        address sender;
        uint256 timestamp;
        string message;
    }

    //mapping of users
    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;
    

    //check user exist
    function checkUserExist(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //create account
    function createAccount(string calldata name) external {
        require(checkUserExist(msg.sender) == false, "User already exist");
        require(bytes(name).length > 0, "Username cannot be empty");
        userList[msg.sender].name = name;
    }

    //get user name
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExist(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

}