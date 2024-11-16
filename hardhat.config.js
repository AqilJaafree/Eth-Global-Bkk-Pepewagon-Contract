require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    polygonZkEVMCardona: {
      url: "https://rpc.cardona.zkevm-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 2442
    }
  },
  etherscan: {
    apiKey: {
      polygonZkEVMCardona: process.env.POLYGONSCAN_API_KEY
    },
    customChains: [
      {
        network: "Polygon zkEVM Cardona Testnet",
        chainId: 2442,
        urls: {
          apiURL: "https://api-cardona-zkevm.polygonscan.com/api",
          browserURL: "https://cardona-zkevm.polygonscan.com/"
        }
      }
    ]
  },
   sourcify: {
    enabled: true
  }
};