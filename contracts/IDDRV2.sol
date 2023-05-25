// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./IDDRV1.sol";

contract IDDRV2 is IDDRV1 {
   
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }


    function initialize() initializer public  {
    
        __EIP712_init(name, "2");
    }

    function newFunction() public pure returns (string memory){
        return "newFunction";
    }
    
    function version() override external pure returns (string memory) {
        return "2";
    }   
}