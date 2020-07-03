pragma solidity 0.6.7;
contract test {
    address private admin;
    uint256 public count;
    constructor() public {
        admin = msg.sender;
    }

    event countIncremented(
        uint256 _count,
        address sender
    );

    function incrementCount() public returns(uint256){
        count += 1;
        emit countIncremented(count,msg.sender);
        return count;
    }

    function getCount() public view returns(uint256){
        return count;
    }

}