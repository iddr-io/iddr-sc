const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { BigNumber, utils } = require("ethers");

chai.use(solidity);

describe("IDDR", () => {

    let contract;
    let owner;
    let alice;
    let bob;
    let blacklister;

    before(async () => {
        const IDDRFactory = await ethers.getContractFactory(
          "IDDRV1"
        );
        [owner, alice, bob, blacklister ] = await ethers.getSigners();
        contract = await upgrades.deployProxy(IDDRFactory,["ID DIGITAL RUPIAH","IDDR",18,blacklister.address]);
      });

      it("Should the right Name", async () => {
        expect(await contract.name()).to.equal("ID DIGITAL RUPIAH");
      });
    
      it("Should the right Symbol", async () => {
        expect(await contract.symbol()).to.equal("IDDR");
      });
    
      it('Should be 18 decimals', async () => {
        expect(await contract.decimals()).to.equal(18);
      })

      it("Should the right Owner", async () => {
        expect(await contract.owner()).to.equal(owner.address);
      });

      it("Should the right blaclister", async () => {
        expect(await contract.blacklister()).to.not.equal(owner.address);
        expect(await contract.blacklister()).to.equal(blacklister.address);
      });

      it("Should failed mint not minter", async () => {
       await expect(contract.mint(owner.address,1000000)).to.be.reverted;
      });

      it("Should sucesss mint 1000000", async () => {
        await contract.increaseMinterAllowance(owner.address,1000000);
        await contract.connect(owner).mint(owner.address,1000000);
        expect(await contract.balanceOf(owner.address)).equal(1000000)
      });


      it("Should success mint 500000", async () => {
        await contract.increaseMinterAllowance(owner.address,1000000);
        await contract.connect(owner).mint(alice.address,500000);
      });

      it("Should success decreease mint alloawance 200000", async () => {
        await contract.decreaseMinterAllowance(owner.address,200000);
      });

      it("Should failed mint 500000 because decrease", async () => {
        await expect(contract.connect(owner).mint(alice.address,500000)).to.be.reverted;
      });

      it("Should sucess mint 300000 because decrease", async () => {
        await contract.connect(owner).mint(bob.address,300000);
      });

      it("Should sucess sucess transfer", async () => {
        await contract.connect(owner).transfer(bob.address,200000);
      });

      it("Should failed transfer more than amount", async () => {
        await expect(contract.connect(owner).transfer(alice.address,1000000)).to.be.reverted;
      });
      
      it('increase allowance', async () => {
        await contract.connect(alice).increaseAllowance(owner.address, 5000);
        let allowance = await contract.allowance(alice.address,owner.address);
        expect(allowance).to.equal(5000);
      })

      it('decrease allowance', async () => {
        await contract.connect(alice).decreaseAllowance(owner.address, 3000);
        let allowance = await contract.allowance(alice.address,owner.address);
        expect(allowance).to.equal(2000);
       })
  
    
       it('allowance should be deduct after burn form', async () => {
        let allowance = await contract.allowance(alice.address,owner.address);
        expect(allowance).to.equal(2000);
       })
    
       it('transfer form failed amount exceeds allowance', async () => {
        await expect(contract.transferFrom(alice.address,bob.address,10000))
        .to.be.reverted;
       })
      
       it('should be success transfer form', async () => {
        await contract.transferFrom(alice.address,bob.address,2000);
        expect(await contract.balanceOf(alice.address)).to.equal(498000);
        expect(await contract.balanceOf(bob.address)).to.equal(502000);
       })


      it("Should failed add blacklist not blaclister", async () => {
        await expect(contract.connect(owner).blacklist(bob.address)).to.be.reverted;
      });

      it("Should sucess add blacklist", async () => {
        await contract.connect(blacklister).blacklist(bob.address);
      });
      
      it("Should failed transfer after blacklist", async () => {
        await expect(contract.connect(owner).transfer(bob.address,200000)).to.be.reverted;
      });

      it("Should success burn after blaclist", async () => {
        await contract.connect(blacklister).lawEnforcementWipingBurn(bob.address);
      });

      it("Should success transfer after unblacklist", async () => {
        await contract.connect(blacklister).unBlacklist(bob.address);
        await contract.connect(owner).transfer(bob.address,200000);
      });
      

});