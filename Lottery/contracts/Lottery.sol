pragma solidity ^0.4.17;

contract Lottery {


  Player[] public players;
  uint256 totalAmount;


  struct Player {
    address playerAddress;
    uint256 amount;
  }


  function addPlayer() payable {
    require(totalAmount + msg.value <= 1 ether)
    address playerAddress = msg.sender;
    uint256 amount = msg.value;

    Player memory newPlayer;
    newPlayer.playerAddress = playerAddress;
    newPlayer.amount = amount;

    player.push(newPlayer);

    totalAmount += _amount;

    if (totalAmount == 1 ether) {
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


  function getTotalAmount() constant returns (uint) {
    return (totalAmount);
  }


  function playLottery() returns (Player) {
    // TODO: Add logic to determine which player wins.
    players[0].transfer(this.balance);
  }



}
