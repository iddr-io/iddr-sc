const { ethers, upgrades } = require("hardhat");

const UPGRADEABLE_PROXY = "0xf7c1E2eEBe49e9cc37451328F5A95DFFFB0511cD";

async function main() {
   const SymetraXV2 = await ethers.getContractFactory("SymetraXV2");
   console.log("Upgrading V1Contract...");
   let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, SymetraXV2);
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address)
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 }); 