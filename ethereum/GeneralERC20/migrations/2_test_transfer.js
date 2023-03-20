// npx truffle migrate -f 2 --to 2 --network goerli_infura_testnet --reset

const { setConfig } = require("./config.js");

const GeneralERC20V1 = artifacts.require("./GeneralERC20V1.sol");

module.exports = async (deployer, network) => {
  const token = await GeneralERC20V1.at("0x4cbe5e65D0492c1992bdfdEFe591Bb3f8eE4f8B7");
  await token.transfer("0x0C8c15f50E92CF9Dd814999280b1E7cc6880307B", "10000000000000000000");
};
