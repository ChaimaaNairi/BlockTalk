//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BlockTalk {
    
    //user struct
    struct User {
        string name;
        string email;
        string password;
        string bio;
        string profilePic;
        string[] posts;
        string[] followers;
        string[] following;
    }

    //friend struct
    struct Friend {
        address pubkey;
        string email;
        string bio;
        string profilePic;
    }

    //message struct
    struct Message {
        address sender;
        uint256 timestamp;
        string message;
    }
    
}