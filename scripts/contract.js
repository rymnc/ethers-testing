const { ethers } = require("ethers");
const { wallet } = require("./wallet");

//Getting the abi from the /bin directory
const { abi } = require("../bin/scripts/test.json");

//Getting the bytecode from /bin/test.json
const { bytecode } = require("../bin/scripts/test.json");

//Creating a Factory, to initialise contracts from
const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

//Contract interactions are better called as async/await functions
const interactions = async () => {
  //Deploying the factory to the wallet provided network, using abi, and bytecode(data of tx)
  let contract = await contractFactory.deploy();
  console.log("Waiting for contract deploy to get included in the block.....");
  //Getting the address of deployed contract
  if (contract) {
    console.log("Deployed at: ", contract.address);
  }
  //Contract interactions
  //Calling the current count value
  console.log("Getting the current Count");
  let count = await contract.getCount();
  console.log(
    "Count before increment:",
    ethers.utils.formatEther(count) * 1e18
  );

  console.log("Sending Increment Transaction...");
  //Incrementing the count value
  let incCountProm = await contract.incrementCount();

  //We must wait till the transaction gets included in the block to check for state change
  console.log("Waiting for increment transaction to be included in the block");
  await incCountProm.wait();

  let newcount = await contract.getCount();
  console.log(
    "Count After Increment:",
    ethers.utils.formatEther(newcount) * 1e18
  );

  //Listening for Event - coinIncremented from contract
  //The parameters are in the same order as the contract
  //The final param , event, comes with the transaction data
  //In this case, because only I want to listen to only 1 event, I have used .once
  //To listen to multiple events, use .on instead of .once
  contract.once("countIncremented", (count, sender, event) => {
    console.log(
      "Count was incremented by :",
      sender,
      " Count is now:",
      ethers.utils.formatEther(count) * 1e18
    );
  });
};
interactions();
