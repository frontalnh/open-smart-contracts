/* global artifacts:false */
const { setConfig } = require("./config.js");
const MaticDistributer = artifacts.require("../contracts/MaticDistributer.sol");

module.exports = async (deployer, network) => {
  await deployer.deploy(MaticDistributer);
  setConfig("deployed." + network + ".MaticDistributer", MaticDistributer.address);
  const distributer = await MaticDistributer.deployed();
  await distributer.distribute(["0x23072A209e8519e515D11b0E49e15770F9c812Df", "0xb709fFe228D34dfBC499F3aD2c09592533583350"], [1, 1], { value: 10 });
};
