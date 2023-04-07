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
    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    
    //create account
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User already exist");
        require(bytes(name).length > 0, "Username cannot be empty");
        userList[msg.sender].name = name;
    }

    //get user name
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    //add friend
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(msg.sender != friend_key, "Users cannot add themselves as friends");
        require(checkAlreadyFriends(msg.sender, friend_key) == false, "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
        
    }

    //check already friend
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns (bool) {
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
                address temp = pubkey1;
                pubkey1 = pubkey2;
                pubkey2 = temp;
        }
        for(uint256 i = 0; i < userList[pubkey1].friendList.length; i++){
            if(userList[pubkey1].friendList[i].pubkey == pubkey2){
                return true;
            }
        }
    }

    //add friend
    function _addFriend(address me, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //get my friends list
    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    //get chat code
    function _getChatCode(address user_pubkey1, address friend_pubkey2) internal pure returns (bytes32) {
        if(user_pubkey1 < friend_pubkey2){
            return keccak256(abi.encodePacked(user_pubkey1, friend_pubkey2));
        } else {
            return keccak256(abi.encodePacked(friend_pubkey2, user_pubkey1));
        } 
    }

    //send message
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not frind with the given address user");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //read message
    function readMessage(address friend_key) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

}