require('dotenv').config()

//Get the ethers library from /node_modules/
const ethers = require('ethers');


//Setting the Provider to Ropsten, you can change it to whichever provider you like
const provider = ethers.getDefaultProvider('ropsten')

//Getting the private key from process.env file,
//That you have set
const privkey = process.env.PRIVATE_KEY


//Initialising an ethers wallet instance with the use of private key and provider
const wallet = new ethers.Wallet(privkey,provider)


console.log("Wallet has been set up")

//Blockchain functions return promises, hence the use of callbacks(async/await can also be used)

//Get Balance of Wallet
const balanceProm = wallet.getBalance()
balanceProm.then((bal)=>{
    console.log("Balance: ",ethers.utils.formatEther(bal)," ether")
})

//Get Transaction Count of Wallet
const transactionCountProm = wallet.getTransactionCount()
transactionCountProm.then((tx)=>{
    console.log("Transactions:",tx)
})

//Get chain ID of Wallet's provider
const chainIdProm = wallet.getChainId()
chainIdProm.then((chain)=>{
    console.log("Chain ID:",chain)
})

//Get Current Gas Price of Wallet Provider Network
const gasPriceProm = wallet.getGasPrice()
gasPriceProm.then((gas)=>{
    console.log("Gas Price:",ethers.utils.formatUnits(gas))
})

//Get the latest block number
const blockNumberProm = provider.getBlockNumber()
blockNumberProm.then((num)=>{
    console.log('Block Number:',num)
})

//Get the latest Block Details
const blockProm = provider.getBlock('latest')
blockProm.then((data)=>{
    console.log("Block Number:",data.number)
    console.log(data)
})



//Setting amount of transaction to 0.1 ether
const amount = ethers.utils.parseEther('0.1')

//The raw transaction object takes in many params, 2 of which are 
//the 'to' field, and the 'value' field
const tx = {
    to:process.env.ADDRESS_TO,
    value:amount
}

//Sending the transaction, note that the transaction returns
//all details of txn, including hash, v,r,s etc/
const transactionProm = wallet.sendTransaction(tx)
transactionProm.then((txdata)=>{
    console.log("Transaction Details:",txdata)
})

//Get transaction receipt of random transaction
const transactionReceiptProm = provider.getTransactionReceipt("0xa4ddad980075786c204b45ab8193e543aec4411bd94894abef47dc90d4d3cc01")
transactionReceiptProm.then((res)=>{
    console.log("Receipt of Random Tx:",res)
})

//ENS resolver
const resolverProm = provider.resolveName("registrar.firefly.eth")

resolverProm.then(function(address) {
    console.log("Address of registrar.firefly.eth: " + address);
});


