const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('DulliganManager', () => {
    let dulliger, dulligie, vendor
    let dulligan, dulliganManager

    beforeEach( async () => {
        // Setup accounts
        [dulliger, dulligie, vendor] = await ethers.getSigners()

        // Deply Dulligan
        const Dulligan = await ethers.getContractFactory('Dulligan')
        dulligan = await Dulligan.deploy()

        // Mint 1 Dulligan
        let transaction = await dulligan.connect(dulliger).mint("https://ipfs.io/ipfs/QmfKUeG2pE4fcA6dLwzqbUac19PN5uLC7ziyHFAnRAA8j6")
        await transaction.wait()


        const DulliganManager = await ethers.getContractFactory('DulliganManager')
        dulliganManager = await DulliganManager.deploy(
            dulligan.address,
            dulliger.address,
            dulligie.address,
            vendor.address
        )

        // Approve dulligab
        transaction = await dulligan.connect(dulliger).approve(dulliganManager.address, 1)
        await transaction.wait()
    })

    describe('Deployment', () => {

        it('Returns NFT address', async () => {
            const result = await dulliganManager.nftAddress()
            expect(result).to.be.equal(dulligan.address)
        })

        it('Returns dulliger address', async () => {
            const result = await dulliganManager.dulliger()
            expect(result).to.be.equal(dulliger.address)
        })

        it('Returns dulligie address', async () => {
            const result = await dulliganManager.dulligie()
            expect(result).to.be.equal(dulligie.address)
        })

        it('Returns vendor address', async () => {
            const result = await dulliganManager.vendor()
            expect(result).to.be.equal(vendor.address)
        })

    })

    describe('Listing', () => {

        it('Updates ownership', async () => {
            //ownerOf(1) means NFT # 1
            expect(await dulligan.ownerOf(1)).to.be.equal(dulliganManager.address)
        })
    })

})