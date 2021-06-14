pragma solidity ^0.5.17;

interface DaiToken {
    function transfer(address dst, uint wad) external returns (bool);
    function balanceOf(address guy) external view returns (uint);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
}

contract owned {
    DaiToken daitoken;
    address owner;

    constructor() public{
        owner = msg.sender;
        daitoken = DaiToken(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
    }

    modifier onlyOwner {
        require(msg.sender == owner,
        "Only the contract owner can call this function");
        _;
    }
}

contract mortal is owned {
    // Only owner can shutdown this contract.
    function destroy() public onlyOwner {
        daitoken.transfer(owner, daitoken.balanceOf(address(this)));
        selfdestruct(msg.sender);
    }
}

contract DaiFaucet is mortal {

    event Withdrawal(address indexed to, uint amount);
    event Deposit(address indexed from, uint amount);

    // Give out Dai to anyone who asks
    function withdraw(uint withdraw_amount) public {
        require(daitoken.balanceOf(address(this)) >= withdraw_amount,
            "Insufficient balance in faucet for withdrawal request");
        // Send the amount to the address that requested it
        daitoken.transfer(msg.sender, withdraw_amount);
        emit Withdrawal(msg.sender, withdraw_amount);
    }
    
    function daiAvai() public view returns (uint256) {
        return daitoken.balanceOf(address(this));
    }
    
    function daiUser() public view returns (uint256) {
        return daitoken.balanceOf(msg.sender);
    }
    

    function depDai(uint _amount) public {
        require(daitoken.balanceOf(msg.sender) >= _amount);
        daitoken.transferFrom(msg.sender, address(this), _amount);
        emit Deposit(msg.sender, _amount);
    }
    
    function checkAllowance() public view returns (uint256) {
        return daitoken.allowance(msg.sender, address(this));
    }
}