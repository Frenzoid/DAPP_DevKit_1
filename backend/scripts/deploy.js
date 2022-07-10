const fs = require('fs');
const { ethers, network } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  // Name and constructor arguments of the contract.
  // THE NAME OF CONTRACT MUST BE THE SAME AS ITS FILE'S NAME.
  const contractName = "Greeter";
  const constructorArguments = ["Hallo :D"];

  // Deploy contract.
  const deployer = (await ethers.getSigners())[0];
  const Contract = await ethers.getContractFactory(contractName);
  const contractInstance = await Contract.deploy(...constructorArguments);

  // Wait until contract is deployed on the blockchain.
  await contractInstance.deployed();

  // Logs.
  console.log("Contract deployed at:", contractInstance.address);
  console.log("Deployed on network:", network.name);
  console.log("Deployed by account:", deployer.address);

  // If contract is not being deployed to the localhost network, verify.
  /*if (network.name !== "localhost") {
    console.log("Verifying contract, waiting 6 tx for propagation...");
    await contractInstance.deployTransaction.wait(6);
    await hre.run("verify:verify", {
      address: contractInstance.address,
      constructorArguments,
    });
  }*/

  // Write address on a file at frontend ( svelte app ).
  const contractMeta = { name: contractName, address: contractInstance.address, network: network.name, deployer: deployer.address };
  fs.writeFileSync("../frontend/src/config/contractMeta.json",
    JSON.stringify(contractMeta));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });