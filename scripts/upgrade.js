const { ethers, upgrades } = require("hardhat");

const UPGRADEABLE_PROXY = "xxx";

async function main() {
   const gas = await ethers.provider.getGasPrice()
   const IDDRV2 = await ethers.getContractFactory("IDDRV2");
   console.log("Upgrading V1Contract...");
   let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, IDDRV2, {
      gasPrice: gas
   });
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address)
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });