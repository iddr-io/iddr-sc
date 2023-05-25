const { ethers, upgrades } = require("hardhat");

async function main() {
  // Deploying
  const IDDRV1 = await ethers.getContractFactory("IDDRV1");
  const instance = await upgrades.deployProxy(IDDRV1, ['ID DIGITAL RUPIAH','IDDR',18,'0xBF9D34d3554a812DfDc4455660533F0bB7Be5f9F']);
  await instance.deployed()

  console.log("IDDRV1 deployed to:", instance.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
