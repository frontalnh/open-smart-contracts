// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./RevealableUpgradeable.sol";

contract GeneralERC1155V1 is
  Initializable,
  OwnableUpgradeable,
  ReentrancyGuardUpgradeable,
  IERC1155MetadataURIUpgradeable,
  ERC1155Upgradeable,
  ERC1155BurnableUpgradeable,
  ERC1155URIStorageUpgradeable
{
  using Strings for uint256;
  string private baseURI;
  mapping(uint256 => address) public creators;
  mapping(uint256 => uint256) public tokenSupply;
  uint256 private nextTokenId;
  // Contract name
  string public name;
  // Contract symbol
  string public symbol;

  function initialize(string memory name_, string memory symbol_) public initializer {
    __ReentrancyGuard_init();
    __Ownable_init();
    __ERC1155_init("");
    __ERC1155Burnable_init();
    __ERC1155URIStorage_init();
    baseURI = "";
    name = name_;
    symbol = symbol_;
    nextTokenId = 0;
  }

  modifier callerIsUser() {
    require(tx.origin == msg.sender, "The caller is another contract");
    _;
  }

  function uri(uint256 tokenId)
    public
    view
    override(ERC1155Upgradeable, IERC1155MetadataURIUpgradeable, ERC1155URIStorageUpgradeable)
    returns (string memory)
  {
    return super.uri(tokenId);
  }

  /**
   * @dev Returns the total quantity for a token ID
   * @param _id uint256 ID of the token to query
   * @return amount of token in existence
   */
  function totalSupply(uint256 _id) public view returns (uint256) {
    return tokenSupply[_id];
  }

  function mint() external {
    _mint(msg.sender, nextTokenId, 1, "");
    nextTokenId++;
  }

  function setBaseURI(string memory uri_) external onlyOwner {
    _setBaseURI(uri_);
  }

  function setURI(uint256 tokenId_, string memory tokenURI_) external onlyOwner {
    _setURI(tokenId_, tokenURI_);
  }

  function adminBurn(
    address account,
    uint256 tokenId,
    uint256 amount
  ) external onlyOwner {
    _burn(account, tokenId, amount);
  }
}
