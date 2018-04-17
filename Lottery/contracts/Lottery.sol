pragma solidity ^0.4.17;

contract Lottery {
  address public owner;

  function Lottery() public {
    owner = msg.sender;
  }



}
