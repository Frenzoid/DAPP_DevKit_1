const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('DulliganManager', () => {
    let dulliger, dulligie
    let dulligan
    
    it('saves the addresses', async () => {

        // Setup accounts
        [dulliger, dulligie, vendor] = await ethers.getSigners()

        // Deploy Dulligan
        const Dulligan = await ethers.getContractFactory('Dulligan')
        const dulligan = await Dulligan.deploy()
        await Dulligan.deployed()

        console.log(`Deployed Dulligan Contract at: ${dulligan.address}`)
        console.log(`Minting 3 dulligans...\n`)

        //Mint

        // Add 3 NFT's using this 
        for (let i = 0; i < 3; i++) {
            const transaction = await Dulligan.connect(dulliger).mint(`https://ipfs.io/ipfs/QmX2dSzF4gySyXKHyLhJ8fccXZCcpkPZaKXvxjcaP2T5dW/${i + 1}.json`)
            await transaction.wait()
        }

        // Deploy DulliganManager
        const DulliganManager = await ethers.getContractFactory('DulliganManager')
        const dulliganManager = await DulliganManager.deploy(
            dulligan.address,
            dulliger.address,
            dulligie.address,
            vendor.address
        )
        await dulliganManager.deployed()

        console.log(`Deployed DulliganManager Contract at: ${dulliganManager.address}`)
        console.log(`Listing 3 dulligans...\n`)

        for (let i = 0; i < 3; i++) {
        // Approve dulligans...
        let transaction = await dulligan.connect(dulliger).approve(dulliganManager.address, i + 1)
        await transaction.wait()

        transaction = await dulliganManager.connect(dulliger).list(2, buyer.address, tokens(10), tokens(5))
        await transaction.wait()

        transaction = await dulliganManager.connect(dulliger).list(3, buyer.address, tokens(5), tokens(2))
        await transaction.wait()

        console.log(`Finished.`)
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});