const { setConfig } = require("./config.js");
const ProxyAdmin = artifacts.require("../contracts/GeneralERC20ProxyAdmin.sol");
const GeneralERC20Proxy = artifacts.require("../contracts/GeneralERC20Proxy.sol");
const GeneralERC20V1 = artifacts.require("../contracts/GeneralERC20V1.sol");

module.exports = async function (deployer, network) {
  await deployer.deploy(ProxyAdmin);
  setConfig("deployed." + network + ".ProxyAdmin", ProxyAdmin.address);

  await deployer.deploy(GeneralERC20V1);
  setConfig("deployed." + network + ".GeneralERC20V1", GeneralERC20V1.address);

  await deployer.deploy(GeneralERC20Proxy, GeneralERC20V1.address, ProxyAdmin.address);
  setConfig("deployed." + network + ".GeneralERC20Proxy", GeneralERC20Proxy.address);

  const proxy = await GeneralERC20V1.at(GeneralERC20Proxy.address);

  // initialize
  await proxy.initialize("PolygonTestToken", "PTT", "100000000000000000000000000");
};
