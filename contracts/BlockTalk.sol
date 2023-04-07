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

    
}