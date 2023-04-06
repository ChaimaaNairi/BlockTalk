//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BlockTalk {
    string public message;
    
    function setMessage(string memory _message) public {
        message = _message;
    }
}