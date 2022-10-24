// SPDX-License-Identifier: MIT

import "./IKIP17.sol";
import "./IKIP7.sol";

pragma solidity ^0.5.6;

contract TokenDistributer {
  function distributeKIP17(address contractAddress, address[] memory addresses, uint256[] memory tokenIds) public {
    require(addresses.length == tokenIds.length, "length of addresses and tokenIds must be equal");
    for(uint256 i=0;i<addresses.length;i++){
      IKIP17(contractAddress).safeTransferFrom(msg.sender, addresses[i], tokenIds[i]);
    }
  }

  function distributeKIP7(address contractAddress, address[] memory addresses, uint256[] memory amounts) public {
    require(addresses.length == amounts.length, "length of addresses and tokenIds must be equal");
    for(uint256 i=0;i<addresses.length;i++){
      IKIP7(contractAddress).safeTransferFrom(msg.sender, addresses[i], amounts[i], "");
    }
  }
}