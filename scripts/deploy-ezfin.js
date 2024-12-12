const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const EzFin = await ethers.getContractFactory("EzFin");
  const instance = await upgrades.deployProxy(EzFin, ['EzFin','EZFIN',6,'0xE2F1Fd8d97e10CE66Cd3C5961aB7cE9C443C1173']);
  await instance.deployed()

  console.log("EzFin deployed to:", instance.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
