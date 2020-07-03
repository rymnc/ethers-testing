const { ethers } = require("ethers");

//Getting the wallet instance from wallet.js
const { wallet } = require("./wallet");

console.log("IN TRANSACTION.JS ", wallet);

//Setting amount of transaction to 0.1 ether
const amount = ethers.utils.parseEther("0.1");

//The raw transaction object takes in many params, 2 of which are
//the 'to' field, and the 'value' field
const tx = {
  to: process.env.ADDRESS_TO,
  value: amount,
};

//Sending the transaction, note that the transaction returns
//all details of txn, including hash, v,r,s etc/
const transactionProm = wallet.sendTransaction(tx);
transactionProm.then((txdata) => {
  console.log("Transaction Details:", txdata);
});
