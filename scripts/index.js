require('dotenv').config()

//Get the ethers library from /node_modules/
const ethers = require('ethers');


//Setting the Provider to Ropsten, you can change it to whichever provider you like
const provider = ethers.getDefaultProvider('ropsten')


const { wallet } = require('./wallet')
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




//Get transaction receipt of random transaction
const transactionReceiptProm = provider.getTransactionReceipt("0xa4ddad980075786c204b45ab8193e543aec4411bd94894abef47dc90d4d3cc01")
transactionReceiptProm.then((res)=>{
    console.log("Receipt of Random Tx:",res)
})

//ENS resolver
const resolverProm = provider.resolveName("registrar.firefly.eth")
resolverProm.then(function(address) {
    console.log("Address of registrar.firefly.eth: " + address);
    //0x6fC21092DA55B392b045eD78F4732bff3C580e2c
});

//Get ENS address from address
let address = "0x6fC21092DA55B392b045eD78F4732bff3C580e2c";
provider.lookupAddress(address).then(function(address) {
    console.log("Name: " + address);
    // "registrar.firefly.eth"
});



