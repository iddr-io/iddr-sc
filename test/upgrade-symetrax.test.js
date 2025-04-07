const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("SymetraX Upgrade with Storage & Compliance", function () {
    let proxy, SymetraX_V1, SymetraX_V2;
    let owner, user1, user2, blacklister;

    const NAME = "SymetraX Token";
    const SYMBOL = "SYM";
    const DECIMALS = 18;
    const INITIAL_SUPPLY = ethers.utils.parseEther("1000");

    beforeEach(async function () {
        [owner, user1, user2, blacklister] = await ethers.getSigners();

        // Deploy v1
        SymetraX_V1 = await ethers.getContractFactory("SymetraX");

        proxy = await upgrades.deployProxy(SymetraX_V1, [
            NAME,
            SYMBOL,
            DECIMALS,
            blacklister.address,
        ]);

        await proxy.connect(owner).increaseMinterAllowance(owner.address, INITIAL_SUPPLY);

        // Mint some tokens using v1 logic (assuming `mint()` exists)
        await proxy.connect(owner).mint(user1.address, INITIAL_SUPPLY);
        expect(await proxy.balanceOf(user1.address)).to.deep.equal(INITIAL_SUPPLY);

        // Transfer some to user2
        await proxy.connect(user1).transfer(user2.address, ethers.utils.parseEther("100"));
        expect(await proxy.balanceOf(user2.address)).deep.equal(ethers.utils.parseEther("100"));

        // Blacklist user2
        await proxy.connect(blacklister).blacklist(user2.address);
        expect(await proxy.isBlacklisted(user2.address)).to.be.true;
    });

    it("should upgrade and preserve balances, blacklist, and add compliance", async function () {
        // Upgrade to v2 logic
        SymetraX_V2 = await ethers.getContractFactory("SymetraXV2");

        // const upgraded = await upgrades.upgradeProxy(proxy.address, SymetraX_V2);
        // // Initialize new module logic
        // await upgraded.initializeV2();

        const upgraded = await upgrades.upgradeProxy(proxy.address, SymetraX_V2);
        
        await upgraded.setPublicMode(true);

        // ✅ Validate storage is preserved
        expect(await upgraded.name()).to.equal(NAME);
        expect(await upgraded.blacklister()).to.equal(blacklister.address);
        expect(await upgraded.balanceOf(user1.address)).to.deep.equal(ethers.utils.parseEther("900"));
        expect(await upgraded.balanceOf(user2.address)).to.deep.equal(ethers.utils.parseEther("100"));

        // ✅ Confirm blacklist state is still true
        expect(await upgraded.isBlacklisted(user2.address)).to.be.true;

        // ✅ Compliance logic should respect blacklist (default isPublic = true)
        expect(await upgraded.isCompliant(user2.address)).to.be.false; // blacklisted
        expect(await upgraded.isCompliant(user1.address)).to.be.true;  // not blacklisted

        // Switch to private mode
        await upgraded.setPublicMode(false);

        expect(await upgraded.isCompliant(user1.address)).to.be.false; // not whitelisted
        await upgraded.addToWhitelist(user1.address);
        expect(await upgraded.isCompliant(user1.address)).to.be.true;
    });
});
