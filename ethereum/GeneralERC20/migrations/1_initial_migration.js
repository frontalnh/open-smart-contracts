// npx truffle migrate -f 1 --to 1 --network goerli_infura_testnet --reset

const { setConfig } = require("./config.js");

const GeneralERC20V1 = artifacts.require("./GeneralERC20V1.sol");
const ProxyAdmin = artifacts.require("./GeneralERC20ProxyAdmin.sol");
const GeneralERC20Proxy = artifacts.require("./GeneralERC20Proxy.sol");

module.exports = async (deployer, network) => {
  await deployer.deploy(ProxyAdmin);
  setConfig("deployed." + network + ".ProxyAdmin", ProxyAdmin.address);
  await deployer.deploy(GeneralERC20V1);
  setConfig("deployed." + network + ".GeneralERC20V1", GeneralERC20V1.address);
  await deployer.deploy(GeneralERC20Proxy, GeneralERC20V1.address, ProxyAdmin.address);
  setConfig("deployed." + network + ".GeneralERC20Proxy", GeneralERC20Proxy.address);

  const proxy = await GeneralERC20V1.at(GeneralERC20Proxy.address);

  await proxy.initialize("Test", "Test", "1500000000000000000000000000");
};
