const HDWalletProvider = require("@truffle/hdwallet-provider");
// create a file at the root of your project and name it .env -- there you can set process variables
// like the mnemomic and Infura project key below. Note: .env is ignored by git to keep your private information safe
require("dotenv").config();

const WALLET_PK = "";
const INFURA_KEY = ""; // namhoon test

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    //goerli Infura mainnet
    goerli_infura_mainnet: {
      provider: () => new HDWalletProvider(WALLET_PK, "https://mainnet.infura.io/v3/" + INFURA_KEY),
      network_id: 1,
      confirmations: 2,
      timeoutBlocks: 200,
      gasPrice: 120000000000,
      skipDryRun: true,
      chainId: 1,
    },
    //goerli Infura testnet
    goerli_infura_testnet: {
      provider: () => new HDWalletProvider(WALLET_PK, "https://goerli.infura.io/v3/" + INFURA_KEY),
      network_id: 5,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: true,
      chainId: 5,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "./node_modules/solc", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  db: {
    enabled: true,
  },
};
