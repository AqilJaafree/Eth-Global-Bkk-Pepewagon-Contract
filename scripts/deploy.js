const hre = require("hardhat");

async function main() {
  // Deploy Pepewagentoken
  const Pepewagentoken = await hre.ethers.getContractFactory("Pepewagentoken");
  const token = await Pepewagentoken.deploy();
  await token.waitForDeployment();
  console.log("Pepewagentoken deployed to:", await token.getAddress());

  // Wait for a few blocks for better verification
  await new Promise(resolve => setTimeout(resolve, 30000));

  // Deploy Pepewagon
  const Pepewagon = await hre.ethers.getContractFactory("Pepewagon");
  const wagon = await Pepewagon.deploy();
  await wagon.waitForDeployment();
  console.log("Pepewagon deployed to:", await wagon.getAddress());

  // Wait for a few blocks before verification
  await new Promise(resolve => setTimeout(resolve, 30000));

  // Verify Pepewagentoken
  await hre.run("verify:verify", {
    address: await token.getAddress(),
    constructorArguments: [],
  });

  // Verify Pepewagon
  await hre.run("verify:verify", {
    address: await wagon.getAddress(),
    constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });