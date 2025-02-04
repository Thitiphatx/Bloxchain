// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract HelloWorld {
    string public message;

    event UpdatedMessages(string oldMessage, string newMessage);

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function update(string memory newMessage) public {
        string memory oldMessage = message;
        message = newMessage;
        emit UpdatedMessages(oldMessage, newMessage);
    }
}