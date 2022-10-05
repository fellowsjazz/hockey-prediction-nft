// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const NHLNFT = await hre.ethers.getContractFactory("NHLNFT", {libraries: { NhlMetaDataGenerator: "0xc422c5bf7d79608b31e17a27ef555895adf70d4a"}});
  const nHLNFT = await NHLNFT.deploy();

  await nHLNFT.deployed();

  console.log(
    `deployed to ${nHLNFT.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
