const fs = require('fs');
const { ethers, network } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  // Name and constructor arguments of the contract.
  // THE NAME OF CONTRACT MUST BE THE SAME AS ITS FILE'S NAME.
  const contractName = "Greeter";
  const args = ["Hallo :D"];

  // Deploy contract.
  const deployer = (await ethers.getSigners())[0];
  const Contract = await ethers.getContractFactory(contractName);
  const contractInstance = await Contract.deploy(...args);

  // Wait until contract is deployed on the blockchain.
  await contractInstance.deployed();

  // Logs.
  console.log("Contract deployed at:", contractInstance.address);
  console.log("Deployed on network:", network.name);
  console.log("Deployed by account:", deployer.address);

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