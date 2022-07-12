// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./RevealableUpgradeable.sol";

contract GeneralERC20V1 is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable, ERC20Upgradeable, ERC20BurnableUpgradeable {
  function initialize(
    string memory name_,
    string memory symbol_,
    uint256 initial
  ) public initializer {
    __ReentrancyGuard_init();
    __Ownable_init();
    __ERC20_init(name_, symbol_);
    __ERC20Burnable_init();
    _mint(msg.sender, initial);
  }

  function adminMint(uint256 amount) external onlyOwner {
    _mint(msg.sender, amount);
  }
}
