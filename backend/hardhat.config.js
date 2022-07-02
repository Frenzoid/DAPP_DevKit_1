require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({ path: ".env" });


// Tasks (npx hardhat run <task-name>)
task("accounts", "Prints the list of accounts", async (taskArgs, { ethers }) => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(
      await addr(ethers, taskArgs.account)
    );
    console.log(formatUnits(balance, "ether"), "ETH");
  });


// List of networks (npx hardhat run script/deploy_script.js --network <network-name>)
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.DEPLOYER_ACC_PRIV_KEY],
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.DEPLOYER_ACC_PRIV_KEY],
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
      polygonMumbai: process.env.POLYSCAN_API_KEY,
    }
  },
};