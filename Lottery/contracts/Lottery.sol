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
    accumulatedLotteryTicketNumber = 0;
  }


  function addPlayer() payable public {
    require(msg.value >= 0.1 ether);
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

    //emit PlayerAddedEvent(msg.sender, msg.value, getBalance());
    getBalance();

    if (pot == 10 ether ) {
      playLottery();
    }
  }


  function getPlayers() constant public returns (address[], uint[]){
    address[] memory playerAddresses = new address[](numPlayers);
    uint[] memory amounts = new uint[](numPlayers);

    for (uint i = 0; i < numPlayers; i++) {
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


  uint accumulatedLotteryTicketNumber = 0;
  uint winnerTickerNumber;

  function playLottery() private {
    winnerTickerNumber = getWinnerTicketNumber();
    uint playerIndex = 0;
    while (true) {
      accumulatedLotteryTicketNumber += players[playerIndex].amount / (10 ** 17);
      if (accumulatedLotteryTicketNumber >= winnerTickerNumber) {
        address winner = players[playerIndex].playerAddress;
        payout(winner);
        break;
      }
      else {
        playerIndex += 1;
      }
    }
  }
  

  /*
    TODO: Implement a way to randomly choose a value between 1 and 100.
  */
  function getWinnerTicketNumber() constant private returns (uint) {
    return 42;
  }


  function payout(address winner) private {
    winner.transfer(pot);
    restartLottery();
    emit PayoutEvent(winner, pot);
  }
}
