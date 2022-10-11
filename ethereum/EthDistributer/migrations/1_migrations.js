/* global artifacts:false */
const { setConfig } = require("./config.js");
const EthDistributer = artifacts.require("../contracts/EthDistributer.sol");

module.exports = async (deployer, network) => {
  await deployer.deploy(EthDistributer);
  setConfig("deployed." + network + ".EthDistributer", EthDistributer.address);

  const distributer = await EthDistributer.deployed();
  await distributer.distribute(["0x23072A209e8519e515D11b0E49e15770F9c812Df", "0xb709fFe228D34dfBC499F3aD2c09592533583350"], [1, 1], { value: 10 });
};
