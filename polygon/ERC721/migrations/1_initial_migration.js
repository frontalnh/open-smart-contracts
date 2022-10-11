const { setConfig } = require("./config.js");
const ProxyAdmin = artifacts.require("../contracts/GeneralERC721ProxyAdmin.sol");
const GeneralERC721Proxy = artifacts.require("../contracts/GeneralERC721Proxy.sol");
const GeneralERC721V1 = artifacts.require("../contracts/GeneralERC721V1.sol");

module.exports = async function (deployer, network) {
  await deployer.deploy(ProxyAdmin);
  setConfig("deployed." + network + ".ProxyAdmin", ProxyAdmin.address);

  await deployer.deploy(GeneralERC721V1);
  setConfig("deployed." + network + ".GeneralERC721V1", GeneralERC721V1.address);

  await deployer.deploy(GeneralERC721Proxy, GeneralERC721V1.address, ProxyAdmin.address);
  setConfig("deployed." + network + ".GeneralERC721Proxy", GeneralERC721Proxy.address);

  const proxy = await GeneralERC721V1.at(GeneralERC721Proxy.address);

  // initialize
  await proxy.initialize("PolygonERC721", "PERC721");
};
