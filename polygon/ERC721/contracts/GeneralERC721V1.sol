// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GeneralERC721V1 is ERC721Upgradeable, OwnableUpgradeable {
  uint256 private nextTokenId = 0;

  struct TokenOwnership {
    address addr;
    uint64 startTimestamp;
  }
  struct AddressData {
    uint128 balance;
    uint128 numberMinted;
  }

  // Mapping owner address to address data
  mapping(address => AddressData) private _addressData;

  function initialize(string memory name_, string memory symbol_) public initializer {
    __Ownable_init();
    __ERC721_init(name_, symbol_);
  }

  function mintTo(address[] memory addresses, uint256[] memory nftIds) public onlyOwner {
    require(addresses.length == nftIds.length, "length not match");
    for (uint256 i = 0; i < addresses.length; i++) {
      _safeMint(addresses[i], nftIds[i]);
    }
  }

  /**
   * @dev Mints `quantity` tokens and transfers them to `to`.
   *
   * Requirements:
   *
   * - there must be `quantity` tokens remaining unminted in the total collection.
   * - `to` cannot be the zero address.
   * - `quantity` cannot be larger than the max batch size.
   *
   * Emits a {Transfer} event.
   */
  function _mintMany(address to, uint256 quantity) internal {
    for (uint256 i = 0; i < quantity; i++) {
      _safeMint(to, nextTokenId);
      nextTokenId++;
    }
  }

  function mintMany(address to, uint256 quantity) public onlyOwner {
    _mintMany(to, quantity);
  }
}
