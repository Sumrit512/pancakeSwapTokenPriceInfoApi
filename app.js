const express = require("express");
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const Web3= require('web3');
const { ethers } = require("ethers");
let pancakeSwapAbi =  [
    {"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},
    ];
let tokenAbi = [
    {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    ];


app.use(cors())
app.use(helmet())
app.use(express.json())




// function to calculate the token's price from the token's address and bnb pair

const calcSell = async (tokensToSell, tokenAddress) => {
    const web3 = await new Web3(url)
const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"

 let tokenRouter = await new web3.eth.Contract(tokenAbi, tokenAddress);
 let tokenDecimals = await tokenRouter.methods.decimals().call(); // getting the decimals value of the token

 tokensToSell = await setDecimals(tokensToSell, tokenDecimals); //quantity of the  token with the decimals

 let amountOut;

            try{

                let router = await new web3.eth.Contract( pancakeSwapAbi, pancakeSwapContract);
                amountOut = await router.methods.getAmountsOut(tokensToSell, [tokenAddress, BNBTokenAddress]);
                amountOut = await web3.utils.fromWei(amountOut[1]);


            } catch(e){

            if(!amountOut) return 0;
           
                return amountOut;
                
        }
}

// function to calculate the token's qunatity according to the decimals

// const setDecimals = async (number, decimals) => {
//     const web3 = await new Web3(url)
//   number = '1';
//    let numberAbs = number.split('.')[0] // taking the qunaitity of the token before the point
//     let numberDecimals = number.split('.')[1] ? number.split('.')[1] : ''; // taking the value of the token after the point
//      while( numberDecimals.length < decimals) {   // calculating the number of zeroes we need to add
//     numberDecimals += "0";
// }
// return numberAbs + numberDecimals;

// }

// function to calculate the bnb's price in terms of us dollars by fetching it's price from bnb and usdt's pool

// const calcBNBPrice = async () => {
//     let pancakeSwapContract = '0x10ED43C718714eb63d5aA57B78B54704E256024E'.toLowerCase();
// let url = "https://bsc-dataseed1.binance.org"
//     const web3 = await new Web3(url)
//         const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" 
//         const USDTokenAddress = "0x55d398326f99059fF775485246999027B3197955"

//         let bnbToSell = await web3.utils.toWei("1", "ether");
//         let amountOut ;
//         try{

//         let router = await new web3.eth.Contract(pancakeSwapAbi, pancakeSwapContract);
//         amountOut = await router.methods.getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress]).call();
//         amountOut = await web3.utils.fromWei(amountOut[1])
//         } catch(e) {
//             if(!amountOut) return 0;
//             return amountOut;
//         }

// }


// ( async  () => {
//         const tokenAddress = '0xa49e44976c236beb51a1f818d49b9b9759ed97b1';
//         let bnbPrice = await calcBNBPrice()
//         console.log(`Current BNB Price: ${bnbPrice}`);
//         let tokens_to_sell = 1;
//         let priceInBnb = await calcSell(tokens_to_sell, tokenAddress)/tokens_to_sell;
//         console.log(' Shit token value in BNB: ' + priceInBnb );
//         console.log(`Shit token value in USD: ${priceInBnb*bnbPrice}`)
//     }
// )();


// app.use('/', async (req,res, next) => {
//  let id= req.query.id;
//  try{
// console.log(id)
//      return res.status(200).send(id).end()
//  } catch(e){
// console.log(e)
//  }
 

// })
// app.use('/hi', async (req,res, next) => {
//  let id= req.query.id;
//  try{

//      return res.status(200).send(id).end()
//  } catch(e){
// console.log(e)
//  }
 

// })
const setDecimals = async (number, decimals) => {
    // decimals = 18;
   let url = "https://bsc-dataseed1.binance.org";
   const web3 = await new Web3(url);
   number = number.toString()
  let numberAbs = number.split('.')[0]; // taking the qunaitity of the token before the point
   let numberDecimals = number.split('.')[1] ? number.split('.')[1] : ''; // taking the value of the token after the point
    while( numberDecimals.length < decimals) {   // calculating the number of zeroes we need to add
   numberDecimals += "0";
}
return numberAbs + numberDecimals;

}

app.get('/priceInfo', async (req, res) => {
 try{
  
    let pancakeSwapContract = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
    let url = "https://rpc.ankr.com/bsc/b71b17f5ec6d40268436c98d4d20afecdcaa300c05360d40e9c919a8f871f404"
    let address = req.query.address;
    let amount = req.query.amount;
    const web3 = await new Web3(url)
    const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" 
    const USDTokenAddress = "0x55d398326f99059fF775485246999027B3197955"

    let bnbToSell = await web3.utils.toWei("1", "ether");
    let amountOut ;
    let router;
    let bnbPriceInUsd;
        try{

             router = await new web3.eth.Contract(pancakeSwapAbi, pancakeSwapContract);
             
            amountOut = await router.methods.getAmountsOut(bnbToSell, [BNBTokenAddress, USDTokenAddress]).call();
           
            amountOut = await web3.utils.fromWei(amountOut[1])
            console.log(amountOut[1])
            
            bnbPriceInUsd = amountOut
        } catch(e) {
            // if(!amountOut) return 0;
            // return amountOut;
            console.log(e)
        }

    
    
    let tokenAddress = address;
    console.log(address)
     let tokenRouter = await new web3.eth.Contract(tokenAbi, tokenAddress);
     let tokenDecimals = await tokenRouter.methods.decimals().call(); // getting the decimals value of the token
     let amountOutToken
    let tokensToSell = amount;
    tokensToSell.toString();
    let amountOutTokenInUsd;
    
    tokensToSell = await setDecimals(tokensToSell, tokenDecimals); //quantity of the  token with the decimals
    
     console.log(tokensToSell)
    
                try{
                    let router = await new web3.eth.Contract( pancakeSwapAbi, pancakeSwapContract);
                    amountOutToken = await router.methods.getAmountsOut(tokensToSell, [tokenAddress, USDTokenAddress]).call();
                    console.log("it's here",amountOutToken)
                    amountOutToken = await web3.utils.fromWei(amountOutToken[1]);
                    amountOutTokenInUsd = amountOutToken;
                    console.log(bnbPriceInUsd)
                    console.log(amountOutTokenInUsd)
                } catch(e){
                    // console.log("error 1")
    console.log(e)
                // if(!amountOut) return 0;
               
                //     return amountOut;
                    
            }
            const sendingData = amountOutTokenInUsd.substring(0,4)

    return res.json(sendingData).status(200).end()
    }   catch(e){
    console.log(e)
    return res.status(500).end()
    } 
})



app.listen(3007, () => {
    console.log(`server is listening to port 3005`)
})