const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const LunioX = await ethers.getContractFactory("LunioX");
  const instance = await upgrades.deployProxy(LunioX, ['LunioX','LUNIOX',6,'0x5373d6f82722eBD607440266AC88d29491601212']);
  await instance.deployed()

  console.log("LUNIOX deployed to:", instance.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
