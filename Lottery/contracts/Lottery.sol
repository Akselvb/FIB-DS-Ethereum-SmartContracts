pragma solidity ^0.4.17;

contract Lottery {


  Player[] public players;
  uint256 pot;

  event PayoutEvent(address target, uint amount);

  struct Player {
    address playerAddress;
    uint256 amount;
  }


  function addPlayer() payable {
    require(pot + msg.value <= 1 ether);

    Player memory newPlayer;
    newPlayer.playerAddress = msg.sender;
    newPlayer.amount = msg.value;

    players.push(newPlayer);

    pot += msg.value;

    if (pot > 0.95 ether ) {
      playLottery();
    }
  }


  function getPlayers() constant returns (address[], uint[]) {
    uint length = players.length;

    address[] memory playerAddresses = new address[](length);
    uint[] memory amounts = new uint[](length);

    for (uint i = 0; i < length; i++) {
      Player memory currentPlayer;
      currentPlayer = players[i];

      playerAddresses[i] = currentPlayer.playerAddress;
      amounts[i] = currentPlayer.amount;
    }
    return (playerAddresses, amounts);
  }


  function getBalance() constant returns (uint256) {
    return pot;
  }


  function playLottery() {
    // TODO: Add logic to determine which player wins.
    players[0].playerAddress.transfer(pot);
    PayoutEvent(players[0].playerAddress, pot);
  }
}
