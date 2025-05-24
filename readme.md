#deploy
npx hardhat run scripts/deploy.js --network sepolia 
npx hardhat run scripts/upgrade.js --network sepolia  

#verify

npx hardhat verify {address}  --network sepolia

npx hardhat verify {address} --contract contracts/IDDRV1.sol  --network sepolia