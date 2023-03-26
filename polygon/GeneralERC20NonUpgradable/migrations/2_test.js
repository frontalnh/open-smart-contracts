// npx truffle migrate -f 2 --to 2 --network polygon_infura_testnet --reset

const { setConfig } = require("./config.js");
const GeneralERC20NonUpgradable = artifacts.require("../contracts/GeneralERC20NonUpgradable.sol");

module.exports = async function (deployer, network) {
  const contract = await GeneralERC20NonUpgradable.at("0xd4Dbd8fc8dF80C14C74De25714941693ed7afE2b");
  await contract.burn("1000000000000000000");
  const name = await contract.name();
  const symbol = await contract.symbol();
  let totalSupply = await contract.totalSupply();
  totalSupply = totalSupply.toString();
  console.log({ name, totalSupply, symbol });
  await contract.transfer("0x0C8c15f50E92CF9Dd814999280b1E7cc6880307B", "1000000000000000000");
};
