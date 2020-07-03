const { ethers } = require('ethers')
const { wallet } = require('./wallet')

//Getting the provider
const provider = ethers.getDefaultProvider('ropsten')


//Listening to every new block
provider.on('block',(block)=>{
    console.log('New Block:',block)
})

//Listening to balance change on wallet address
//setting old balance to 0
let oldBalance = ethers.constants.Zero;
//we check the balance on each block
provider.on('block', () => {
    wallet.getBalance().then((balance) => {
        if (balance.eq(oldBalance)) { 
            
         } else {
             //if old balance is not equal to new balance, it means its updated
             console.log('Balance Updated: '+ethers.utils.formatEther(balance)+"ether")
         }
         //setting old balance to new balance for next iteration
        oldBalance = balance;
    });
});