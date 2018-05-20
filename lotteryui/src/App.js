import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


var lotteryContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"playerAddress","type":"address"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PayoutEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"playerAddress","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"pot","type":"uint256"}],"name":"PlayerAddedEvent","type":"event"},{"constant":false,"inputs":[],"name":"restartLottery","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"addPlayer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinnerTicketNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

var lotteryContractAddress = '0x04fce3562b549bc94ec9bdaf1871377c4787a141';

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
      availableFunds: [],
      potSize: 0,
      addressInput: "",
      etherInput: "",
      errorMessage: ""
    }
  }

  componentWillMount() {
    this.resetState();
  }

  resetState() {
    // console.log(lotteryContract.getWinnerTicketNumber());
    // // console.log(lotteryContract);
    // // console.log(web3);
    var data = lotteryContract.getPlayers();
    var potSize = lotteryContract.getBalance() / (10**18);
    var availAddresses = lotteryContract._eth.accounts;
    var availFunds = []
    for (let i = 0; i < availAddresses.length; i++) {
      availFunds.push(lotteryContract._eth.getBalance(lotteryContract._eth.accounts[i]));
    }
    this.setState({
      playerAdresses: String(data[0]).split(','),
      amounts: String(data[1]).split(','),
      availableAddresses: String(availAddresses).split(','),
      availFunds: String(availFunds).split(','),
      potSize,
      errorMessage: ""
    })
  }


  handleAddressInput = (e) => {
    this.setState({addressInput: e.target.value});
  }

  handleEtherInput = (e) => {
    this.setState({etherInput: e.target.value});
  }

  cancelInput = () => {
    this.setState({
      addressInput: "",
      etherInput: ""
    })
  }

  getBalance() {
    return this.state.potSize;
  }

  joinLotteryButtonClicked() {
    var address = this.state.addressInput;
    var val = this.state.etherInput;
    this.cancelInput();
    try {
      lotteryContract.addPlayer({ from: address, value: web3.toWei(val, "ether"), gas: 3000000});
    }
    catch(err) {
      this.setState({
        errorMessage: "An error occured. Please try again."
      })
      return;
    }
    this.resetState();
  }

  getTableRowsPlayers() {
    var TableRowsPlayers = []
    _.each(this.state.playerAdresses, (value, index) => {
      TableRowsPlayers.push(
        <tr>
         <td>{this.state.playerAdresses[index]}</td>
         <td>{this.state.amounts[index]}</td>
        </tr>
      )
    })
    return TableRowsPlayers;
  }

  getTableRowsAvailAddresses() {
    var TableRowsAvailAddresses = []
    _.each(this.state.availableAddresses, (value, index) => {
      TableRowsAvailAddresses.push(
        <tr>
          <td>{this.state.availableAddresses[index]}</td>
          <td>{this.state.availFunds[index]}</td>
        </tr>
      )
    })
    return TableRowsAvailAddresses;
  }


  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ETHEREUM LOTTERY</h1>
          <h3>A DECENTRALIZED APPLICATION</h3>
        </header>

        <div align="center">

          <div className="place-bets">
            <label className="addressLabel">Address</label>
            <input
              value={this.state.addressInput}
              onChange={this.handleAddressInput}
              className="addressInput"
              type="text"
            />
          </div>

          <div className="place-bets">
            <label className="etherLabel">Ether</label>
            <input
              value={this.state.etherInput}
              onChange={this.handleEtherInput}
              className="etherInput"
              type="text"
            />
          </div>

          <button className="button" onClick={(e) => { this.joinLotteryButtonClicked() }}>Join Lottery!</button>

          <div style={{ marginBottom: '20px' }}>
            <text style={{ color: 'red' }}>{this.state.errorMessage}</text>
          </div>

          <div className="Table">
            <table id="AddressTable">
              <thead>
                <tr>
                  <th>PlayerAddress</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.getTableRowsPlayers()}
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
                {this.getTableRowsAvailAddresses()}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
