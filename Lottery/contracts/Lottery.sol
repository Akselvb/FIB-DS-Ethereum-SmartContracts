pragma solidity ^0.4.17;

contract Lottery {

  Player[] public players;
  uint numPlayers;
  uint256 pot;

  event PayoutEvent(address target, uint256 amount);
  event PlayerAddedEvent(address playerAddress, uint256 amount, uint256 pot);

  struct Player {
    address playerAddress;
    uint256 amount;
  }


  function Lottery() public {
    restartLottery();
  }


  function restartLottery() public {
    numPlayers = 0;
    pot = 0;
  }


  function addPlayer() payable public {
    require(pot + msg.value <= 10 ether);

    Player memory newPlayer;
    newPlayer.playerAddress = msg.sender;
    newPlayer.amount = msg.value;

    /*
      This method of processing an array might be worth talking about.
      https://ethereum.stackexchange.com/questions/3373/how-to-clear-large-arrays-without-blowing-the-gas-limit
    */
    if (numPlayers == players.length) {
      players.length += 1;
    }
    players[numPlayers++] = newPlayer;

    pot += msg.value;

    emit PlayerAddedEvent(msg.sender, msg.value, getBalance());

    if (pot > 9.5 ether ) {
      playLottery();
    }
  }


  function getPlayers() constant public returns (address[], uint[]){
    uint length = numPlayers;

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


  function getBalance() constant public returns (uint256) {
    return pot;
  }


  // TODO: Add logic to determine which player wins.
  function playLottery() private {
    players[0].playerAddress.transfer(pot);
    restartLottery();
    emit PayoutEvent(players[0].playerAddress, pot);
  }
}
