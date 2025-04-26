const { ethers, upgrades } = require("hardhat");

const UPGRADEABLE_PROXY = "0xae27544775d6287bafcc3fe12cb25068774295e3";

async function main() {
   const LunioXV2 = await ethers.getContractFactory("contracts/LunioXV2.sol:LunioXV2");
   console.log("Upgrading V1Contract...");
   let upgrade = await upgrades.upgradeProxy(UPGRADEABLE_PROXY, LunioXV2,  {redeployImplementation: 'always'});
   console.log("V1 Upgraded to V2");
   console.log("V2 Contract Deployed To:", upgrade.address)
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 }); 