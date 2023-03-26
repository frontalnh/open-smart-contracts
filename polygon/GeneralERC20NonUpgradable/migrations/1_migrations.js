// npx truffle migrate -f 1 --to 1 --network polygon_infura_testnet --reset

const { setConfig } = require("./config.js");
const GeneralERC20NonUpgradable = artifacts.require("../contracts/GeneralERC20NonUpgradable.sol");

module.exports = async function (deployer, network) {
  await deployer.deploy(GeneralERC20NonUpgradable, "Test","TST", "1000000000000000000000000000");
  setConfig("deployed." + network + ".GeneralERC20NonUpgradable", GeneralERC20NonUpgradable.address);
};
