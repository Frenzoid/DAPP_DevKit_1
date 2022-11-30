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
        let transaction = await dulligan.connect(dulliger).mint("https://ipfs.io/ipfs/QmddjmkFnrdrQw7oVmkC8w7WMMFP4YoxCD21BmwC15HJvt")
        await transaction.wait()


        const DulliganManager = await ethers.getContractFactory('DulliganManager')
        dulliganManager = await DulliganManager.deploy(
            dulligan.address,
            dulliger.address,
            dulligie.address,
            vendor.address
        )

        // Approve dulligan
        transaction = await dulligan.connect(dulliger).approve(dulliganManager.address, 1)
        await transaction.wait()

        // List dulligan
        transaction = await dulliganManager.connect(dulliger).list(1, tokens(10), vendor.address)
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
        it('Updates as listed', async () => {
             const result = await dulliganManager.isListed(1)
            expect(result).to.be.equal(true)
        })

        it('Returns purchase price', async () => {
            const result = await dulliganManager.purchasePrice(1)
            expect(result).to.be.equal(tokens(10))
        })

        it('Returns buyer as the vendor to provide the product or service', async () => {
            const result = await dulliganManager.buyer(1)
            expect(result).to.be.equal(vendor.address)
        })

        it('Updates ownership', async () => {
            //ownerOf(1) means NFT # 1
            expect(await dulligan.ownerOf(1)).to.be.equal(dulliganManager.address)
        })

    })

    describe('Deposits', () => {
        beforeEach(async () => {
            const transaction = await dulliganManager.connect(dulliger).depositEarnest(1, { value: tokens(10) })
            await transaction.wait()
        })

        it('Updates contract balance', async () => {
            const result = await dulliganManager.getBalance()
            expect(result).to.be.equal(tokens(10))
        })

    describe('Picked', () => {
        beforeEach(async () => {
            const transaction = await dulliganManager.connect(dulligie).updateSelectionStatus(1, true)
            await transaction.wait()
        })

        it('Updates selected status', async () => {
            const result = await dulliganManager.dulligieSelected(1)
            expect(result).to.be.equal(true)
        })
    })
    })

})