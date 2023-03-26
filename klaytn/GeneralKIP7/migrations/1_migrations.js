// npx truffle migrate -f 1 --to 1 --network baobab --reset

/* global artifacts:false */
const { setConfig } = require("./config.js");
const GeneralKIP7 = artifacts.require("../contracts/GeneralKIP7.sol");

module.exports = async (deployer, network) => {
  await deployer.deploy(GeneralKIP7, "TEST", "SYMBOL", 18, "1000000000000000000000000000");
  setConfig("deployed." + network + ".GeneralKIP7", GeneralKIP7.address);
};
