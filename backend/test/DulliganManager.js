const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('DulliganManager', () => {
    let  dulliger, vendor, dulligie
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
        transaction = await dulliganManager.connect(dulliger).list(1, tokens(10), dulligie.address)
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

        it('Returns buyer as the dulligie as target', async () => {
            const result = await dulliganManager.buyer(1)
            expect(result).to.be.equal(dulligie.address)
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

    describe('Selected by dulligie', () => {
        beforeEach(async () => {
            const transaction = await dulliganManager.connect(dulligie).updateSelectionStatus(1, true)
            await transaction.wait()
        })

        it('Updates selected status', async () => {
            const result = await dulliganManager.dulligieSelected(1)
            expect(result).to.be.equal(true)
        })

    describe('Approval', () => {
        beforeEach(async () => {
            let transaction = await dulliganManager.connect(dulligie).approveSale(1)
            await transaction.wait()

            transaction = await dulliganManager.connect(dulliger).approveSale(1)
            await transaction.wait()

            transaction = await dulliganManager.connect(vendor).approveSale(1)
            await transaction.wait()
        })

        it('Updates approval status', async () => {
            expect(await dulliganManager.approval(1, dulligie.address)).to.be.equal(true)
            expect(await dulliganManager.approval(1, dulliger.address)).to.be.equal(true)
            expect(await dulliganManager.approval(1, vendor.address)).to.be.equal(true)
        })
    })

        describe('Sale', () => {
         beforeEach(async () => {
            let transaction = await dulliganManager.connect(dulliger).depositEarnest(1, { value: tokens(10) })
            await transaction.wait()

            transaction = await dulliganManager.connect(dulligie).updateSelectionStatus(1, true)
            await transaction.wait()

            transaction = await dulliganManager.connect(this).finalizeSale(1)
            await transaction.wait()
        })

        it('Updates ownership of NFT', async () => {
            expect(await dulligian.ownerOf(1)).to.be.equal(dulligie.address)
        })

        it('Updates balance', async () => {
            expect(await dulligianManager.getBalance()).to.be.equal(0)
        })
            
    })
    })
    })

})