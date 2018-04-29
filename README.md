# FIB-DS-Ethereum-SmartContracts

## Description
Lab solution in course Decentralized Systems, FIB UPC - Leonard Halling and Aksel Vincent Berg.

As the scope of the lab description states, we will implement and evaluate a Decentralized Application [*dApp*]. The dApp that is going to be made is a **Lottery System** built upon **Smart Contracts**, deployed on the **Ethereum Platform**.


### TODO's
* Implement logic for how to pick the winner. Need to randomly pick a number and find the winner using this.
* Implement how to decide when the lottery should trigger.
* Make intermediate presentation powerpoint.


### Deadlines
* **Tuesday 08.05.2018**: Group work intermediate results.
* **Tuesday 31.05.2018**: Final presentation.


### Links/resources
* [Ethereum](https://www.ethereum.org)
* [Ethereum White Paper](https://github.com/ethereum/wiki/wiki/White-Paper)
* [Cyberdice P2P gambling](http://www.cl.cam.ac.uk/%7Efms27/papers/2008-StajanoCla-cyberdice.pdf)
* [Remix](https://remix.ethereum.org/)
* [Truffle](https://github.com/trufflesuite/truffle)
* [Intro to Ethereum smart contract w/ Solidity, Part I](https://www.youtube.com/watch?v=8jI1TuEaTro)
* [Intro to Ethereum smart contract w/ Solidity, Part II](https://www.youtube.com/watch?v=3-XPBtAfcqo)
* [Intro to Smart Contracts](https://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html)
* [Solidity tutorial](https://ethereumbuilders.gitbooks.io/guide/content/en/solidity_tutorials.html)
* [Solidity tutorial 2](http://truffleframework.com/tutorials/pet-shop)
* [Ganache](http://truffleframework.com/ganache/)
* [MetaMask](https://metamask.io/)


## How to deploy a Smart Contract implementation on Ethereum test blockchain
1. run *truffle init*
2. Copy-paste the following to *truffle.js*
```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // your rpc port (like geth rpc port or testrpc port )
      network_id: "*"
    }
  }
};
```
3. run *testrpc*
4. run *truffle compile*
5. run *truffle migrate --reset*
6. run *truffle console*
7. NameOfFile.deployed().then(function(instance){objectName=instance})
  - objectName.getValue()
  - objectName.setValue("Values", "to", "insert")


## Truffle nice to know.
After running *truffle migrate --reset*, the owner address of the contract is generated.
[TruffleMigrate](images/truffle_migrate.png)

- Save an account to a variable: **account0 = web3.eth.accounts[0]**
- Create an instance of the Smart Contract: **Lottery.deployed().then(inst => {lottery=inst})**
- Add a new player to the lottery: **lottery.addPlayer({from: account0, value: web3.toWei(1.0, "ether")})**
- Call get functions: **lottery.getPlayers()**
- Get balance of account: **web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]))**


## Smart Contract Lottery

### Rules
A generic description of the smart contract lottery system.

* Each player inputs certain amount of Ether in the lottery.
* When the lottery cap has been reached, the lottery will start.
* There’s a limit of how much Ether one participant can insert.
* The chances of winning is based on the amount of Ether inserted by each participant.
* When the winner has been decided, the winnings will be rewarded to the winner, and the other participants will be notified that the game has ended.
* **NB!**: Only submit values of Ether that are multiples of 0.1: 0.1, 4.2, 1.0 etc.
