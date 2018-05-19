# FIB-DS-Ethereum-SmartContracts

## Description
Lab solution in course Decentralized Systems, FIB UPC - Leonard Halling and Aksel Vincent Berg.

As the scope of the lab description states, we will implement and evaluate a Decentralized Application [*dApp*]. The dApp that is going to be made is a **Lottery System** built upon **Smart Contracts**, deployed on the **Ethereum Platform**.


### TODO's
**Tuesday 31.05.2018**
- Implement random number generator from a TTP.
- Implement front-end.
- Make final presentation poster.

**Sunday 10.06.2018**
- Write white paper in Google Drive.
- Convert white paper to Latex and upload to BSCW.


### Deadlines
- **Tuesday 08.05.2018**: Group work intermediate results.
- **Tuesday 31.05.2018**: Final presentation.
- **Sunday 10.06.2018**: White paper.


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


### How to deploy a Smart Contract implementation on Ethereum test blockchain
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


### Truffle nice to know.
After running *truffle migrate --reset*, the owner address of the contract is generated.
[TruffleMigrate](images/truffle_migrate.png)

- Save an account to a variable: **account0 = web3.eth.accounts[0]**
- Create an instance of the Smart Contract: **Lottery.deployed().then(inst => {lottery=inst})**
- Add a new player to the lottery: **lottery.addPlayer({from: account0, value: web3.toWei(2.5, "ether")})**
- Call get functions: **lottery.getPlayers()**
- Get balance of account: **web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]))**


### Start GUI
- testrpc
- npm start
- truffle compile
- truffle migrate --reset
- truffle console
- Lottery.deployed().then(inst => {lottery=inst})
- var lotteryContractABI = JSON.stringify(lottery.abi)
- var lotteryContractAddress = lottery.address
- localhost:3000

# Smart Contract Lottery

### Rules
A generic description of the smart contract lottery system.

* Each player inputs certain amount of Ether in the lottery.
* When the lottery cap has been reached, the lottery will start.
* There’s a limit of how much Ether one participant can insert.
* The chances of winning is based on the amount of Ether inserted by each participant.
* When the winner has been decided, the winnings will be rewarded to the winner, and the other participants will be notified that the game has ended.
* **NB!**: Only submit values of Ether that are multiples of 0.1: 0.1, 4.2, 1.0 etc.


# Intermediate Presentation

### Intro
- Smart Contracts and Ethereum Blockchain
- Our implementation - Decentralized Lottery
- Resources
- Solidity - File Structure
- Teaser of Final Presentation

### Smart Contracts on Ethereum Blockchain
- Smart contracts are deployed on the Ethereum blockchain in order to execute modifyible code.
- When executing functions on the Blockchain, it is important to keep in mind that every execution costs gas.

### Decentralized Lottery Application
- Each player inputs certain amount of Ether in the lottery.
- When the lottery cap has been reached, the lottery will start.
- When the winner has been decided, the winnings will be rewarded to the winner, and the other participants will be notified that the game has ended.
- Decentralization increases expected earnings compared to lottery with a centralized actor.

### Resources
- **Ethereum**: The blockchain the smart contracts are built upon.
- **Solidity**: The standardized programming language of smart contracts in Ethereum.
- **Truffle**: Most popular development framework in Ethereum.
- **Ganache**: Local Ethereum blockchain for dev.
- **MetaMask**: A browser extension which allows you to run dApps directly in the browser.

### Solidity - File Structure
- **Build**: The compiled JSON files created which contains all the information needed to interact with the Smart Contract.
- **Contracts**: Contains the actual contract code, where the contracts are defined.
- **Migrations**: Specify which contract to deploy.
- **truffle.js**: Truffle config file, specifying local port number, network id, etc.

### Final Presentation
- How do we have to implement in order to minimize the gas cost?
- There are no specified or standardized way in order to generate (pseudo) random numbers in Ethereum yet. We wish to figure out the best way, both in terms of non-prediction and gas cost.
- We also wish to create a neat front-end in which users can interact with our smart contract implementation.

### Intermediate Presentation - Feedback
- Maybe look at different design patterns or implementations and compare the gas cost.
- Consider the possibility to have a third party number generator that can return a random generated number.
- Otherwise they where happy!


# Final Presentation

### Lottery as a dApp
What is the problem we are trying to solve?
- Our goal is to maximize the expected income for every user.
- In a perfect, decentralized world: Expected income is equal to outcome.
- Expected income should be greater than compared to using a centralized actor.
- *Statistics showing the difference between our application and centralized actors, in terms of profitability.*
- Do number of players affect the pay-offs?
- How close are we to 1-to-1 outcome/income?
- Smooth transition to gas cost.

### Gas Cost
- What factors/operations cost the most amount of gas.
- The lecturer was interested in how DDoS attacks can be prevented if read-operations are almost for free.
- Compare the function getPlayers() with another implementation. Tets both and discuss the difference in terms of gas usage.

### Random Number Generation
- [What is the 'most trusted' way to generate random numbers yet](https://ethereum.stackexchange.com/questions/191/how-can-i-securely-generate-a-random-number-in-my-smart-contract)
- https://blog.otlw.co/random-in-ethereum-50eefd09d33e
- General rule to use blockhash as source of randomness: The total value of the pot is less than what a miner earns by mining a single block.
- Discuss trade-offs related to this subject.
- https://ethereum.stackexchange.com/questions/419/when-can-blockhash-be-safely-used-for-a-random-number-when-would-it-be-unsafe


### Deployed Version of Lottery dApp
