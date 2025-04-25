const hre = require("hardhat");

async function main() {
    // Get the contract factory for the SmartEnergy contract
    const SmartEnergy = await hre.ethers.getContractFactory("MachineRegistry");

    // Deploy the contract
    const smartEnergy = await SmartEnergy.deploy();

    // Wait for the deployment to be mined
    await smartEnergy.waitForDeployment();

    // Log the deployed contract address dynamically
    console.log("Vechical monitoring contract deployed to:", await smartEnergy.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
