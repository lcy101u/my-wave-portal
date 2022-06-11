// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // address of the user who waved
        string message; // The message the user sent
        uint256 timestamp; //The timestamp when the user waved
    }

    Wave[] waves;

    constructor() payable {
        console.log("Yo, I'm a contract and I'm running on the blockchain ...");
    }

    function wave(string memory _message) public {
        totalWaves++;
        console.log("%s has waved, message - %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether; //solidity lets us use the ether unit
        require(
            prizeAmount <= address(this).balance, //`address(this).balance` is the balance of the contract itself
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}
