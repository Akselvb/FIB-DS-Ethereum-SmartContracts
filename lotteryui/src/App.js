import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


var lotteryContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"playerAddress","type":"address"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PayoutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"pot","type":"uint256"}],"name":"PlayerAddedEvent","type":"event"},{"constant":false,"inputs":[],"name":"restartLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addPlayer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinnerTicketNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

var lotteryContractAddress = '0xa86f426b37fe0084e7424402e5be0ce60c1b8e60';

var lotteryContract = ETHEREUM_CLIENT.eth.contract(lotteryContractABI).at(lotteryContractAddress);

var web3 = { Web3 };
web3 = web3.Web3.prototype;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerAdresses: [],
      amounts: [],
      availableAddresses: [],
      availableFunds: []
    }
  }

  componentWillMount() {
    console.log(lotteryContract);
    console.log(ETHEREUM_CLIENT);
    var data = lotteryContract.getPlayers();
    var availAddresses = lotteryContract._eth.accounts;
    var availFunds = []
    for (let i = 0; i < availAddresses.length; i++) {
      availFunds.push(lotteryContract._eth.getBalance(lotteryContract._eth.accounts[i]));
    }
    this.setState({
      playerAdresses: String(data[0]).split(','),
      amounts: String(data[1]).split(','),
      availableAddresses: String(availAddresses).split(','),
      availFunds: String(availFunds).split(',')
    })
  }

  getBalance() {
    return lotteryContract.getBalance() / (10 ** 18);
  }

  getAvailableAddresses() {
    var outString = "";
    for (var i = 0; i < 10; i++) {
      outString = outString + lotteryContract._eth.accounts[i] + " ";
    }
    return outString;
  }

  joinLotteryButtonClicked() {
    var address = this.refs.addressTextBox.value
    var val = this.refs.etherTextBox.value;
    lotteryContract.addPlayer({ from: address, value: web3.toWei(val, "ether")});
  }


  render() {
    var TableRowsPlayers = []
    _.each(this.state.playerAdresses, (value, index) => {
      TableRowsPlayers.push(
        <tr>
         <td>{this.state.playerAdresses[index]}</td>
         <td>{this.state.amounts[index]}</td>
        </tr>
      )
    })

    var TableRowsAvailAddresses = []
    _.each(this.state.availableAddresses, (value, index) => {
      TableRowsAvailAddresses.push(
        <tr>
          <td>{this.state.availableAddresses[index]}</td>
          <td>{this.state.availFunds[index]}</td>
        </tr>
      )
    })


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ETHEREUM LOTTERY</h1>
          <h3>A DECENTRALIZED APPLICATION</h3>
        </header>

        <div align="center">

          <div className="place-bets">
            <label>Address</label>
            <input className="address-input" type="text" ref="addressTextBox"/>
          </div>

          <div className="place-bets">
            <label className="ether-label">Ether</label>
            <input className="ether-input" type="text" ref="etherTextBox"/>
          </div>

          <button className="button" onClick={(e) => { this.joinLotteryButtonClicked() }}>Join Lottery!</button>



          <div className="Table">
            <table id="AddressTable">
              <thead>
                <tr>
                  <th>PlayerAddress</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {TableRowsPlayers}
              </tbody>
              <tfoot>
                <th>Total</th>
                <th>{this.getBalance()} / 5 Ether</th>
              </tfoot>
            </table>
          </div>

          <div className="Table">
            <table id="AddressTable">
              <thead>
                <tr>
                  <th>Available Addresses</th>
                  <th>Available Ether</th>
                </tr>
              </thead>
              <tbody>
                {TableRowsAvailAddresses}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
