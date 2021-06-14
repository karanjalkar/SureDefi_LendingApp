const router = require('express').Router();
const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');
const ethTx = require('ethereumjs-tx');
const Web3 = require('web3');
require('dotenv').config();

//connect with the eth chain
const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
 ); 

// Initialising Web3 object
web3.eth.net.isListening()
    .then(() => console.log('is connected'))
    .catch(e => console.log('Wow. Something went wrong'));

WRAP_CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depDai",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "withdraw_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkAllowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "daiAvai",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "daiUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

DAI_ABI = [{"inputs":[{"internalType":"uint256","name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"guy","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"internalType":"bytes4","name":"sig","type":"bytes4"},{"indexed":true,"internalType":"address","name":"usr","type":"address"},{"indexed":true,"internalType":"bytes32","name":"arg1","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"arg2","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"src","type":"address"},{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"deny","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"bool","name":"allowed","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"usr","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"guy","type":"address"}],"name":"rely","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"wards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
    

//Initialising smart contract object
const cont =  new web3.eth.Contract(WRAP_CONTRACT_ABI ,process.env.WRAP_CONTRACT);

//Initialising DAI object
const daiCont =  new web3.eth.Contract(DAI_ABI ,process.env.DAI_ADDRESS);

//Geting the Gas Price
async function getGasPrice() {
    let gas_price;
    await web3.eth.getGasPrice().then((result) => { 
        console.log(result, 'wei');
        gas_price = result;
        });
    return gas_price;
}

router.route('/gasPrice').get(async (req, res) => {
      const gas_price = await getGasPrice();
      console.log(gas_price);
      res.json({gas_price});
});

//Get ETH balance for an address
async function getETHBal(address) {

    let balance;
    await web3.eth.getBalance(address, function(err, result) { // Get ETH balance
        if (err) {
          console.log(err)
        } else {
          console.log(web3.utils.fromWei(result, "ether") + " ETH");
          balance = web3.utils.fromWei(result, "ether");
        }
      });
    return balance;

}

router.route('/bal').post(async (req, res) => {

    const address = req.body.address;
    const bal = await getETHBal(address);
    console.log(bal);
    res.json({bal});
    
});

// GET DAI available in the smart contract
async function DaiBalCont() {
    const daiBal = await cont.methods.daiAvai().call();

    console.log(daiBal);
    return daiBal;
}

router.route('/daiBalCont').get(async (req, res) => {

    const bal = await DaiBalCont();
    console.log(bal);
    res.json({bal});
    
});

// Deposit 100 DAI to the contract
// 1 dai = 1 * 10 ** 18;
async function approveDai(gas_price) {
     try {
            var GAS = await daiCont.methods.approve(process.env.WRAP_CONTRACT,"100000000000000000000").estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is"+GAS);

            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);

            var hexData = await daiCont.methods.approve(process.env.WRAP_CONTRACT,"100000000000000000000").encodeABI();
            console.log(hexData);

            var receiptMain;
            var txResult;

            const params = {
            nonce: nonce,
            to: process.env.DAI_ADDRESS, //address of the receiver
            value: '0x000', // value in hexa format
            gasPrice: web3.utils.toHex(gas_price), //gas_price
            gasLimit: web3.utils.toHex(GAS),
            chainId: 42, // 1 for main ethereum chain
            data: hexData
            };

            const tx = new ethTx(params);
            tx.sign(new Buffer.from(process.env.USER_PRIVATE_KEY, 'hex'));
            const serializedTx = tx.serialize();

            
            await  web3.eth.sendSignedTransaction(
                `0x${serializedTx.toString('hex')}`, 
                (error, result) => { 
                    if (error) { console.log(`Error: ${error}`); }  
                    else { receiptMain = result; console.log(`Result: ${result}`); } 
                } 
                );
            

            await web3.eth.getTransactionReceipt(receiptMain).then((result)=>{txResult=result.status;console.log('result is '+result.status);})
            var endResult = {
            receiptMain,
            txResult
            };
            return endResult;  

    } catch (error) {
        console.error(error);
        return error;
    }
};

async function depDaiCont(gas_price) {
try {
        var GAS = await cont.methods.depDai("100000000000000000000").estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
            console.log(estimatedGas);
        });
        console.log("gas limit is"+GAS);

        var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
        console.log(nonce);

        var hexData = await cont.methods.depDai("100000000000000000000").encodeABI();
        console.log(hexData);

        var receiptMain;
        var txResult;

        const params = {
        nonce: nonce,
        to: process.env.WRAP_CONTRACT, //address of the receiver
        value: '0x000', // value in hexa format
        gasPrice: web3.utils.toHex(gas_price), //gas_price
        gasLimit: web3.utils.toHex(GAS),
        chainId: 42, // 1 for main ethereum chain
        data: hexData
        };

        const tx = new ethTx(params);
        tx.sign(new Buffer.from(process.env.USER_PRIVATE_KEY, 'hex'));
        const serializedTx = tx.serialize();

        
        await  web3.eth.sendSignedTransaction(
            `0x${serializedTx.toString('hex')}`, 
            (error, result) => { 
                if (error) { console.log(`Error: ${error}`); }  
                else { receiptMain = result; console.log(`Result: ${result}`); } 
            } 
            );
        

        await web3.eth.getTransactionReceipt(receiptMain).then((result)=>{txResult=result.status;console.log('result is '+result.status);})
        var endResult = {
        receiptMain,
        txResult
        };
        return endResult;  

    } catch (error) {
        console.error(error);
        return error;
    }
}

router.route('/depDai').post(async (req, res) => {

    const gasPrice = req.body.gasPrice;
    const approve = await approveDai(gasPrice);

    const result = await depDaiCont(gasPrice);

    console.log(result);

    res.json(result);

});

// Withdraw DAI from Smart Contract
//Condition dai amount should be less than 1
//currently can withdraw 0.01 dai
async function withdrawDai(gas_price) {
    try {
            var GAS = await cont.methods.withdraw("10000000000000000").estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is"+GAS);
    
            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);
    
            var hexData = await cont.methods.withdraw("10000000000000000").encodeABI();
            console.log(hexData);
    
            var receiptMain;
            var txResult;
    
            const params = {
            nonce: nonce,
            to: process.env.WRAP_CONTRACT, //address of the receiver
            value: '0x000', // value in hexa format
            gasPrice: web3.utils.toHex(gas_price), //gas_price
            gasLimit: web3.utils.toHex(GAS),
            chainId: 42, // 1 for main ethereum chain
            data: hexData
            };
    
            const tx = new ethTx(params);
            tx.sign(new Buffer.from(process.env.USER_PRIVATE_KEY, 'hex'));
            const serializedTx = tx.serialize();
    
            
            await  web3.eth.sendSignedTransaction(
                `0x${serializedTx.toString('hex')}`, 
                (error, result) => { 
                    if (error) { console.log(`Error: ${error}`); }  
                    else { receiptMain = result; console.log(`Result: ${result}`); } 
                } 
                );
            

            await web3.eth.getTransactionReceipt(receiptMain).then((result)=>{txResult=result.status;console.log('result is '+result.status);})
            var endResult = {
            receiptMain,
            txResult
            };
            return endResult;  

    } catch (error) {
        console.error(error);
        return error;
    }
}

router.route('/withdrawDai').post(async (req, res) => {

    const gasPrice = req.body.gasPrice;

    const result = await withdrawDai(gasPrice);

    console.log(result);
    res.json(result);

});

//DAI balance of the USER
async function daiBal() {
    const daiBal = await daiCont.methods.balanceOf(process.env.USER_ADDRESS).call();
  
    console.log(daiBal);
    return daiBal;
}

router.route('/daiBal').get(async (req, res) => {

    const result = await daiBal();

    console.log(result);
    res.json(result);

});

//Get details of the user
async function getUserCreds(mnemonic) {
    var creds;
    await bip39.mnemonicToSeed(mnemonic).then(
        async function (json) {
        const root = hdkey.fromMasterSeed(json);
        const masterPrivateKey = root.privateKey.toString('hex');
        console.log(masterPrivateKey);
        const addrNode = root.derive("m/44'/60'/0'/0/0");
        const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
        var addr1 = ethUtil.publicToAddress(pubKey).toString('hex');
        var addr='0x';
        addr+=addr1;
        const address = ethUtil.toChecksumAddress(addr);
        console.log(address);
        creds = {
            address,
            privateKey: web3.utils.toHex(addrNode._privateKey)
            }
        }
    );
    return creds;
}

router.route('/getUserCreds').post(async (req, res) => {

    const mnemonic = req.body.mnemonic;

    const result = await getUserCreds(mnemonic);

    console.log(result);
    res.json(result);

});

module.exports = router;