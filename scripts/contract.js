const { ethers } = require('ethers')
const { wallet } = require('./wallet')

//Getting the abi from the /bin directory
const { abi }    = require('../bin/scripts/test.json')

//Getting the bytecode from /bin/test.json
const { bytecode } = require('../bin/scripts/test.json')

//Creating a Factory, to initialise contracts from
const contractFactory = new ethers.ContractFactory(abi,bytecode,wallet)

//Contract interactions are better called as async/await functions 
const interactions = async () =>{
    //Deploying the factory to the wallet provided network, using abi, and bytecode(data of tx)
    let contract = await contractFactory.deploy();
    console.log("Waiting for contract deploy to get included in the block.....")
    //Contract interactions
    //Calling the current count value
    let count = await contract.getCount()
    console.log("Count before increment:",ethers.utils.formatEther(count)*(1e18))

    console.log("Sending Increment Transaction...")
    //Incrementing the count value
    let incCountProm = await contract.incrementCount();

    //We must wait till the transaction gets included in the block to check for state change
    console.log("Waiting for increment transaction to be included in the block")
    await incCountProm.wait()


    let newcount = await contract.getCount();
    console.log("Count After Increment:",ethers.utils.formatEther(newcount)*(1e18))

    
    //Listening for Event - coinIncremented from contract
    //The parameters are in the same order as the contract
    //The final param , event, comes with the transaction data
    //In this case, because only I want to listen to only 1 event, I have used .once
    //To listen to multiple events, use .on instead of .once
    // blockNumber, blockHash, transactionHash – The Block and Transaction of the Log
    // address – The contract address for the Log
    // data – The Log data
    // topics – An array of the Log topics
    // args – An array of the parsed arguments for the event
    // event – the name of the event (e.g. “Transfer”)
    // eventSignature – the full signature of the event (e.g. “Transfer(address,address,uint256)”)
    // getBlock() – A function that resolves to the Block containing the Log
    // getTransaction() – A function that resolves to the Transaction containing the Log
    // getTransactionReceipt() – A function that resolves to the Transaction Receipt containing the Log
    // removeListener() – A function that removes this callback as a listener
    // decode(data, topics) – A function that decodes data and topics into parsed arguments
    contract.once("countIncremented",(count,sender,event)=>{
        console.log("Count was incremented by :",sender," Count is now:",ethers.utils.formatEther(count)*(1e18))
    })

    

    
}
interactions()