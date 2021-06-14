const router = require('express').Router();
const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');
const ethTx = require('ethereumjs-tx');
const Web3 = require('web3');
require('dotenv').config();

//connect with the eth chain
const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_AVALANCHE)
 ); 

// Initialising Web3 object
web3.eth.net.isListening()
    .then(() => console.log('is connected'))
    .catch(e => console.log('Wow. Something went wrong'));

DEFI_ABI = [
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
		"name": "Borrow",
		"type": "event"
	},
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
		"name": "Settle",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "borrMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeInSeconds",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "notFirstTime",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "borrowInterestRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "borrowToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "createIntance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "createIntanceBorrow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depoMap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timeInSeconds",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "notFirstTime",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositInterestRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getAmountBorrowed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getTimeStamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getTimeStampBorrow",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "settle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "settleToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenDeposited",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
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
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PAUSER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getRoleMember",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleMemberCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

//Initialising smart contract object
const defiCont =  new web3.eth.Contract(DEFI_ABI ,process.env.DEFI_ADDRESS);
const avaDai = new web3.eth.Contract(CONTRACT_ABI ,process.env.AVADAI_CONTRACT_ADDRESS);

// Deposite AVA_DAI
async function increaseTokenAllowance(gas_price, amount, sender) {
    try {
            var GAS = await avaDai.methods.approve(sender, amount).estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is "+ GAS);
    
            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);
    
            var hexData = await avaDai.methods.approve(sender, amount).encodeABI();
            console.log(hexData);
    
            var receiptMain;
            var txResult;
    
            const params = {
            nonce: nonce,
            to: process.env.AVADAI_CONTRACT_ADDRESS, //address of the receiver
            value: '0x000', // value in hexa format
            gasPrice: web3.utils.toHex(gas_price), //gas_price
            gasLimit: web3.utils.toHex(GAS),
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

async function depositeToken(gas_price, amount) {
    try {
            var GAS = await defiCont.methods.depToken(amount).estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is "+ GAS);
    
            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);
    
            var hexData = await defiCont.methods.depToken(amount).encodeABI();
            console.log(hexData);
    
            var receiptMain;
            var txResult;
    
            const params = {
            nonce: nonce,
            to: process.env.DEFI_ADDRESS, //address of the receiver
            value: '0x000', // value in hexa format
            gasPrice: web3.utils.toHex(gas_price), //gas_price
            gasLimit: web3.utils.toHex(GAS),
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

router.route('/dep-token').post(async (req, res) => {

    const gasPrice = req.body.gasPrice;
    const amount = (req.body.amount * (10 ** 18)).toString();
    const sender = process.env.DEFI_ADDRESS;

    const allow = await increaseTokenAllowance(gasPrice,amount, sender);
    const result = await depositeToken(gasPrice, amount);

    console.log(result);
    res.json(result);

});

// Withdraw AVA_DAI from the pool
async function withdrawToken(gas_price, amount) {
    try {
            var GAS = await defiCont.methods.withToken(amount).estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is "+ GAS);
    
            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);
    
            var hexData = await defiCont.methods.withToken(amount).encodeABI();
            console.log(hexData);
    
            var receiptMain;
            var txResult;
    
            const params = {
            nonce: nonce,
            to: process.env.DEFI_ADDRESS, //address of the receiver
            value: '0x000', // value in hexa format
            gasPrice: web3.utils.toHex(gas_price), //gas_price
            gasLimit: web3.utils.toHex(GAS),
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

router.route('/withdraw-token').post(async (req, res) => {

    const gasPrice = req.body.gasPrice;
    const amount = (req.body.amount * (10 ** 18)).toString();
    //const sender = process.env.USER_ADDRESS;

    //const allow = await increaseTokenAllowance(gasPrice,amount, sender);
    const result = await withdrawToken(gasPrice, amount);

    console.log(result);
    res.json(result);

});

// GET the token name
async function getTotalAmount() {
    const amount = await defiCont.methods.tokenDeposited().call();

    console.log(amount);
    return amount;
}

router.route('/totalAmount').get(async (req, res) => {

    const amount = await getTotalAmount();
    console.log(amount);
    res.json({amount:(amount/(10**18))});
    
});

// GET the Deposited TIMESTAMP
async function getTimestamp(address) {
    const timestamp = await defiCont.methods.getTimeStamp(address).call();

    console.log(timestamp);
    return timestamp;
}

router.route('/deposite-timestamp').post(async (req, res) => {
    const address = req.body.address;

    const timestamp = await getTimestamp(address);
    console.log(timestamp);
    res.json({timestamp});
    
});

// GET the Amount Deposited
async function getTokenAmount(address) {
    const amount = await defiCont.methods.getAmount(address).call();

    console.log(amount);
    return amount;
}

router.route('/tokenAmount').post(async (req, res) => {
    const address = req.body.address;

    const amount = await getTokenAmount(address);
    console.log(amount);
    res.json({amount:(amount/(10**18))});
    
});

// Borrow Token
async function borrowToken(gas_price, amount) {
    try {
            var GAS = await defiCont.methods.borrowToken(amount).estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is "+ GAS);
    
            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);
    
            var hexData = await defiCont.methods.borrowToken(amount).encodeABI();
            console.log(hexData);
    
            var receiptMain;
            var txResult;
    
            const params = {
            nonce: nonce,
            to: process.env.DEFI_ADDRESS, //address of the receiver
            value: '0x000', // value in hexa format
            gasPrice: web3.utils.toHex(gas_price), //gas_price
            gasLimit: web3.utils.toHex(GAS),
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

router.route('/Borrow-token').post(async (req, res) => {

    const gasPrice = req.body.gasPrice;
    const amount = (req.body.amount * (10 ** 18)).toString();
    //const sender = process.env.USER_ADDRESS;

    //const allow = await increaseTokenAllowance(gasPrice,amount, sender);
    const result = await borrowToken(gasPrice, amount);

    console.log(result);
    res.json(result);

});

// Settle Token
async function settleToken(gas_price, amount) {
    try {
            var GAS = await defiCont.methods.settleToken(amount).estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is "+ GAS);
    
            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);
    
            var hexData = await defiCont.methods.settleToken(amount).encodeABI();
            console.log(hexData);
    
            var receiptMain;
            var txResult;
    
            const params = {
            nonce: nonce,
            to: process.env.DEFI_ADDRESS, //address of the receiver
            value: '0x000', // value in hexa format
            gasPrice: web3.utils.toHex(gas_price), //gas_price
            gasLimit: web3.utils.toHex(GAS),
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

router.route('/settle-token').post(async (req, res) => {

    const gasPrice = req.body.gasPrice;
    const amount = (req.body.amount * (10 ** 18)).toString();
    const sender = process.env.DEFI_ADDRESS;

    const allow = await increaseTokenAllowance(gasPrice,amount, sender);
    const result = await settleToken(gasPrice, amount);

    console.log(result);
    res.json(result);

});

// GET the Amount Borrowed
async function getTokenAmountBorrowed(address) {
    const amount = await defiCont.methods.getAmountBorrowed(address).call();

    console.log(amount);
    return amount;
}

router.route('/tokenAmountBorrowed').post(async (req, res) => {
    const address = req.body.address;

    const amount = await getTokenAmountBorrowed(address);
    console.log(amount);
    res.json({amount:(amount/(10**18))});
    
});

// GET the Borrowed TIMESTAMP
async function getTimestampBorrowed(address) {
    const timestamp = await defiCont.methods.getTimeStampBorrow(address).call();

    console.log(timestamp);
    return timestamp;
}

router.route('/deposite-timestamp-borrowed').post(async (req, res) => {
    const address = req.body.address;

    const timestamp = await getTimestampBorrowed(address);
    console.log(timestamp);
    res.json({timestamp});
    
});

module.exports = router;