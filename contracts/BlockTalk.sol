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

    //add friend
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExist(msg.sender), "Create an account first");
        require(checkUserExist(friend_key), "User is not registered");
        require(msg.sender != friend_key, "Users cannot add themselves as friends");
        require(checkAlreadyFriends(msg.sender, friend_key) == false, "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
        
    }

    //check already friend
    function checkAlreadyFriends(address user_pubkey1, address friend_pubkey2) internal view returns (bool) {
        if(userList[user_pubkey1].friendList.length > userList[friend_pubkey2].friendList.length){
                address temp = user_pubkey1;
                user_pubkey1 = friend_pubkey2;
                friend_pubkey2 = temp;
        }

        
        }
        return false;
    }

    //add friend
    function _addFriend(address user_key, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[user_key].friendList.push(newFriend);
    }

}