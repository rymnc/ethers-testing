require('dotenv').config()
const ethers = require('ethers');
const provider = ethers.getDefaultProvider('ropsten')

//Getting the private key from process.env file,
//That you have set
const privkey = process.env.PRIVATE_KEY


//Initialising an ethers wallet instance with the use of private key and provider
const wallet = new ethers.Wallet(privkey,provider)


console.log("Wallet has been set up")

//Exporting the wallet to be used in other js files
module.exports = {
    wallet
}
