require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/{key}", 
      accounts: ['']
    },
    bsc: {
      url: "https://capable-falling-valley.bsc.discover.quiknode.pro/{key}", 
      accounts: ['']
    },
    eth: {
      url: "https://eth-mainnet.g.alchemy.com/v2/{key}", 
      accounts: ['']
    }
  },
  etherscan: {
   apiKey: 'xxx'
   
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};