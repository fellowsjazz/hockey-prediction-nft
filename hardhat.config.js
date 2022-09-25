require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv")
dotenv.config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.7",
  etherscan:{
    apiKey: "YKN4B5K5F6J7BVHFRWJX3BV1UVAUVYYDKE"
  },
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/2bc94932a0c4464f81e2d3adab12ccb0",
      accounts: [`${process.env.PRIVATE_KEY}`],
      gas: "auto",
      gasPrice: "auto"
    },
    goerli: {
      url: `${process.env.GOERLI_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      allowUnlimitedContractSize: true
      
    },
    mainnet: {
      url: `${process.env.MAINNET_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      gas: "auto",
      gasPrice: "auto"
    }
  }
};
