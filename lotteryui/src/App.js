import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var lotteryContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"playerAddress","type":"address"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PayoutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"pot","type":"uint256"}],"name":"PlayerAddedEvent","type":"event"},{"constant":false,"inputs":[],"name":"restartLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addPlayer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinnerTicketNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

var lotteryContractAddress = '0xb1e4c747b37b48ed17472959fa91e4cd4e12b9e2';

var lotteryContract = ETHEREUM_CLIENT.eth.contract(lotteryContractABI).at(lotteryContractAddress);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addresses: [],
      amounts: [],
      totalPot: 0
    }
  }

  getBalance() {
    console.log(lotteryContract.getBalance());
  }

  addPlayer(playerAdress, amount) {
    lotteryContract.addPlayer({from: playerAdress, value: Web3.toWei(amount, "ether")})
  }



  componentWillMount() {
    console.log(lotteryContract);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ETHEREUM LOTTERY</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
