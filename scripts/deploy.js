// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const NhlMetaDataGenerator = await hre.ethers.getContractFactory("NhlMetaDataGenerator");
  const nhlMetaDataGenerator = await NhlMetaDataGenerator.deploy();

  await nhlMetaDataGenerator.deployed();

  console.log(
    `generator deployed to ${nhlMetaDataGenerator.address}`
  );

  const NHLNFT = await hre.ethers.getContractFactory("NHLNFT", {libraries: { NhlMetaDataGenerator: nhlMetaDataGenerator.address}});
  const nHLNFT = await NHLNFT.deploy();

  await nHLNFT.deployed();

  console.log(
    `nft contract deployed to ${nHLNFT.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
