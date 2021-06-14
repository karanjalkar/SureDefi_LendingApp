pragma solidity >=0.4.22 <0.7.0;

contract SureDefi {
    
    uint public depositInterestRate = 5;
    uint public borrowInterestRate = 8;
    
    struct depositor {
        uint256 amount;
        uint timeInSeconds;
        bool notFirstTime;
    }
    
    struct borrower {
        uint256 amount;
        uint timeInSeconds;
        bool notFirstTime;
    }
    
    mapping(address => depositor) public depoMap;
    mapping(address => borrower) public borrMap;
    
    function createIntance(uint256 _amount) public {
        depositor storage instance = depoMap[msg.sender];
        instance.amount += _amount;
        if(!instance.notFirstTime) {
            instance.notFirstTime = true;
            instance.timeInSeconds = now;
        }
    }
    
    function getTimeStamp(address _address) public view returns(uint) {
        return now - depoMap[_address].timeInSeconds;
    }
    
    function getAmount(address _address) public view returns(uint256) {
        return depoMap[_address].amount;
    }
    
    function withdraw(uint256 _amount) public {
        require(_amount <= depoMap[msg.sender].amount, "Amount is greater than available");
        depoMap[msg.sender].amount -= _amount;
        if(depoMap[msg.sender].amount == 0) {
            depoMap[msg.sender].timeInSeconds = 0;
            depoMap[msg.sender].notFirstTime = false;
        }
    }
    
    function createIntanceBorrow(uint256 _amount) public {
        borrower storage instance = borrMap[msg.sender];
        instance.amount += _amount;
        if(!instance.notFirstTime) {
            instance.notFirstTime = true;
            instance.timeInSeconds = now;
        }
    }
    
    function getTimeStampBorrow(address _address) public view returns(uint) {
        return now - borrMap[_address].timeInSeconds;
    }
    
    function getAmountBorrowed(address _address) public view returns(uint256) {
        return borrMap[_address].amount;
    }
    
    function settle(uint256 _amount) public {
        require(_amount <= borrMap[msg.sender].amount, "You are giving more than your loan amount");
        borrMap[msg.sender].amount -= _amount;
        if(borrMap[msg.sender].amount == 0) {
            borrMap[msg.sender].timeInSeconds = 0;
            borrMap[msg.sender].notFirstTime = false;
        }
    }
    
    // function liquidate(uint debt) public {
    //     depoMap[msg.sender].amount -= debt;
    //     depoMap[msg.sender].timeInSeconds = now;
    //     depoMap[msg.sender].notFirstTime = false;
        
    //     borrMap[msg.sender].amount = 0;
    //     borrMap[msg.sender].timeInSeconds = 0;
    //     borrMap[msg.sender].notFirstTime = false;
    // }
    
}