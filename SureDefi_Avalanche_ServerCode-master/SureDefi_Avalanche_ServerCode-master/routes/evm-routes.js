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
]

//Initialising smart contract object
const cont =  new web3.eth.Contract(CONTRACT_ABI ,process.env.AVADAI_CONTRACT_ADDRESS);

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

//Get AVAX balance for an address
async function getAVAXBal(address) {

    let balance;
    await web3.eth.getBalance(address, function(err, result) { // Get ETH balance
        if (err) {
          console.log(err)
        } else {
          console.log(web3.utils.fromWei(result, "ether") + " AVAX");
          balance = web3.utils.fromWei(result, "ether");
        }
      });
    return balance;

}

router.route('/bal').post(async (req, res) => {

    const address = req.query.address;
    const bal = await getAVAXBal(address);
    console.log(bal);
    res.json({bal});
    
});

// GET the token name
async function getTokenName() {
    const name = await cont.methods.name().call();

    console.log(name);
    return name;
}

router.route('/tokenName').get(async (req, res) => {

    const name = await getTokenName();
    console.log(name);
    res.json({name});
    
});

// GET the token name
async function getTokenSymbol() {
    const name = await cont.methods.symbol().call();

    console.log(name);
    return name;
}

router.route('/tokenSymbol').get(async (req, res) => {

    const name = await getTokenSymbol();
    console.log(name);
    res.json({name});
    
});

// Mint 10 tokens
async function mintToken(gas_price) {
    try {
            var GAS = await cont.methods.mint(process.env.USER_ADDRESS, "10000000000000000000").estimateGas({from: process.env.USER_ADDRESS}, function(error, estimatedGas) {
                console.log(estimatedGas);
            });
            console.log("gas limit is "+ GAS);
    
            var nonce = await web3.eth.getTransactionCount(process.env.USER_ADDRESS);
            console.log(nonce);
    
            var hexData = await cont.methods.mint(process.env.USER_ADDRESS, "10000000000000000000").encodeABI();
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

router.route('/mint').post(async (req, res) => {

    const gasPrice = req.body.gasPrice;

    const result = await mintToken(gasPrice);

    console.log(result);
    res.json(result);

});

//token balance of the USER
async function tokenBal(address) {
    const tokenBalance = await cont.methods.balanceOf(address).call();
  
    console.log(tokenBalance);
    return tokenBalance;
}

router.route('/tokenBal').post(async (req, res) => {

	const address = req.body.address;

    const result = await tokenBal(address);

    console.log(result/10**18);
    res.json({"tokenBalance": result/10**18});

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

router.get("/getSeed", async (req, res) =>{

    const web3 = new Web3(
        new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/6493e4b878364180b6f3b86596175035')
    );
    web3.eth.net.isListening()
        .then(() => console.log('is connected'))
        .catch(e => console.log('Wow. Something went wrong'));

//generates mnemonic
    const mnemonic = bip39.generateMnemonic();
    console.log("seed phrase", mnemonic);
	
	res.json(mnemonic);
})
module.exports = router;