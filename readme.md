#deploy
npx hardhat run scripts/deploy-symetrax.js --network sepolia 
npx hardhat run scripts/upgrade-symetrax.js --network sepolia  

#verify

npx hardhat verify {address}  --network sepolia

npx hardhat verify {address} --contract contracts/SymetraX.sol:SymetraX  --network sepolia