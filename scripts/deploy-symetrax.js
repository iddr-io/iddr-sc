const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const SymetraX = await ethers.getContractFactory("SymetraX");
  const instance = await upgrades.deployProxy(SymetraX, ['SymetraX','SYMETRAX',6,'0x11ABf202B7cA168b0323Bf24c1491B7CAD01f711']);
  await instance.deployed()

  console.log("SymetraX deployed to:", instance.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
