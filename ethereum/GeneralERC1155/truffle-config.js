const { ETHEREUM_TEST_WALLET_PK } = process.env;
const WALLET_PK = ETHEREUM_TEST_WALLET_PK;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    goerli: {
      provider: function () {
        return new HDWalletProvider(WALLET_PK, "https://goerli.infura.io/v3/" + INFURA_KEY);
      },
      from: "",
      port: 8545,
      network_id: "5",
      gas: 6700000,
      networkCheckTimeout: 100000,
      // gasPrice: 21110000000,
      confirmations: 1,
    },
    mainnet: {
      provider: function () {
        return new HDWalletProvider(WALLET_PK, "https://mainnet.infura.io/v3/" + infuraKey);
      },
      from: "",
      port: 8545,
      network_id: "1",
      gasPrice: 17110000000,
      confirmations: 2,
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

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
};
