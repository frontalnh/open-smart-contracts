// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IA {
  function hello() external returns (bool);
}

contract A is IA {
  function hello() public virtual override(IA) returns (bool result) {
    require(true, "hello");

    return false;
  }
}

contract B is IA, A {}
