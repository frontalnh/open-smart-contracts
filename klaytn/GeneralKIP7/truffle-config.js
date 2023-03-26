const fs = require("fs");
const path = require("path");
const Caver = require("caver-js");
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const NAMHOON_TEST_WALLET = "";
const NAMHOON_TEST_WALLET_PK = "";
const { KAS_ACCESS_KEY_ID, KAS_SECRET_ACCESS_KEY } = process.env;
const ALLTHAT_NODE_BAOBAB = "https://klaytn-baobab-rpc.allthatnode.com:8551";
const KLAYTN_BAOBAB = "http://api.baobab.klaytn.net:8651";
const BAOBAB_FANTRIE = "wss://baobab01.fautor.app/ws/";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const pks = JSON.parse(fs.readFileSync(path.resolve(__dirname) + "/privateKeys.js"));

        return new HDWalletProvider(pks, "https://api.baobab.klaytn.net:8651", 0, pks.length);
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value: "Basic " + Buffer.from(KAS_ACCESS_KEY_ID + ":" + KAS_SECRET_ACCESS_KEY).toString("base64"),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(NAMHOON_TEST_WALLET_PK, new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value: "Basic " + Buffer.from(KAS_ACCESS_KEY_ID + ":" + KAS_SECRET_ACCESS_KEY).toString("base64"),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(cypressPrivateKey, new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
      },
      network_id: "8217", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    baobab: {
      provider: () => {
        return new HDWalletProvider(NAMHOON_TEST_WALLET_PK, BAOBAB_FANTRIE);
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "850000000",
      gasPrice: null,
      confirmations: 1,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(privateKey, "https://public-node-api.klaytnapi.com/v1/cypress");
      },
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
  mocha: {
    // timeout: 100000
  },
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
        evmVersion: "constantinople",
      },
    },
  },
  plugins: ["truffle-contract-size"],
};
