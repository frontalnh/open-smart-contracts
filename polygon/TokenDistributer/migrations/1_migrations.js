/* global artifacts:false */
const { setConfig } = require("./config.js");
const TokenDistributer = artifacts.require("../contracts/TokenDistributer.sol");

module.exports = async (deployer, network) => {
  await deployer.deploy(TokenDistributer);
  setConfig("deployed." + network + ".TokenDistributer", TokenDistributer.address);

  const distributer = await TokenDistributer.deployed();
  // await distributer.distributeERC20("", [""], [""]);
};
