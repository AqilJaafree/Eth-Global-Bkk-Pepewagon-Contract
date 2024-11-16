const hre = require("hardhat");

async function main() {
  console.log("Starting deployment on Flow EVM testnet...");

  // Deploy Pepewagentoken
  const Pepewagentoken = await hre.ethers.getContractFactory("Pepewagentoken");
  const token = await Pepewagentoken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("Pepewagentoken deployed to:", tokenAddress);

  // Wait for confirmations
  console.log("Waiting for Pepewagentoken block confirmations...");
  await token.deploymentTransaction().wait(5);

  // Deploy Pepewagon
  const Pepewagon = await hre.ethers.getContractFactory("Pepewagon");
  const wagon = await Pepewagon.deploy();
  await wagon.waitForDeployment();
  const wagonAddress = await wagon.getAddress();
  console.log("Pepewagon deployed to:", wagonAddress);

  // Wait for confirmations
  console.log("Waiting for Pepewagon block confirmations...");
  await wagon.deploymentTransaction().wait(5);

  console.log("\nDeployment completed!");
  console.log("\nContract addresses:");
  console.log("Pepewagentoken:", tokenAddress);
  console.log("Pepewagon:", wagonAddress);
  
  console.log("\nVerification commands:");
  console.log(`\nVerify Pepewagentoken:`);
  console.log(`npx hardhat verify --network flowTestnet ${tokenAddress}`);
  
  console.log(`\nVerify Pepewagon:`);
  console.log(`npx hardhat verify --network flowTestnet ${wagonAddress}`);
  
  console.log("\nYou can view your contracts at:");
  console.log(`https://evm-testnet.flowscan.io/address/${tokenAddress}`);
  console.log(`https://evm-testnet.flowscan.io/address/${wagonAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });