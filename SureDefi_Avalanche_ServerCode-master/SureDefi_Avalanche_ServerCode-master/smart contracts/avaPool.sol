pragma solidity >=0.4.22 <0.7.0;

import "ava-defi.sol";

interface Token {
    function transfer(address dst, uint wad) external returns (bool);
    function balanceOf(address guy) external view returns (uint);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract owned {
    Token tokenRef;
    address owner;

    constructor() public{
        owner = msg.sender;
        tokenRef = Token(0x056Bd9aAA186D9d3Bc188820b55B3E91BDdb196b);
    }

    modifier onlyOwner {
        require(msg.sender == owner,"Only the contract owner can call this function");
        _;
    }
}

contract mortal is owned {
    // Only owner can shutdown this contract.
    function destroy() public onlyOwner {
        tokenRef.transfer(owner, tokenRef.balanceOf(address(this)));
        selfdestruct(msg.sender);
    }
}

contract Pool is mortal, SureDefi {
    
    uint256 public totalValue;
    
    event Withdrawal(address indexed to, uint amount);
    event Deposit(address indexed from, uint amount);
    event Borrow(address indexed from, uint amount);
    event Settle(address indexed from, uint amount);
    
    function depToken(uint256 _amount) public  {
        require(tokenRef.balanceOf(msg.sender) >= _amount, "Requested value is less than your current balance");
        tokenRef.transferFrom(msg.sender, address(this), _amount);
        createIntance(_amount);
        totalValue+=_amount;
        emit Deposit(msg.sender, _amount);
    }
    
    function tokenDeposited() public view returns (uint256) {
        return tokenRef.balanceOf(address(this));
    }
    
    function withToken(uint256 _amount) public {
        require(tokenRef.balanceOf(address(this)) >= _amount,
            "Insufficient balance in Smart Contract for withdrawal request");
        withdraw(_amount);
        tokenRef.transfer(msg.sender, _amount);
        totalValue-=_amount;
        emit Withdrawal(msg.sender, _amount);
    }
    
    function borrowToken(uint256 _amount) public {
        require(tokenRef.balanceOf(address(this)) >= _amount,
            "Insufficient balance in Smart Contract for withdrawal request");
            totalValue-=_amount;
            tokenRef.transfer(msg.sender, _amount);
            createIntanceBorrow(_amount);
            emit Borrow(msg.sender, _amount);
    }
    
    function settleToken(uint256 _amount) public {
        require(tokenRef.balanceOf(msg.sender) >= _amount, "Requested value is less than your current balance");
        tokenRef.transferFrom(msg.sender, address(this), _amount);
        totalValue+=_amount;
        settle(_amount);
        emit Settle(msg.sender, _amount);
    }
}