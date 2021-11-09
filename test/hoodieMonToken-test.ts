import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe("HoodieMonToken", async () => {
  const valueForPreMint = ethers.utils.parseEther('5') 
  const tokenUri0Tx = "https://ipfs.io/ipfs/QmbLBsLcqo1KW4v9eWFt74iqKpnCSqj4coPQsk5ZijUZwx"
  const name0Tx = "name0Tx"
  const tokenUri1Tx = "https://ipfs.io/ipfs/QmbLBsLcqo1KW4v9eWFt74iqKpnCSqj4coPQsk5ZijUZwx"
  const name1Tx = "name1Tx"
  const tokenUri2Tx = "https://ipfs.io/ipfs/QmbLBsLcqo1KW4v9eWFt74iqKpnCSqj4coPQsk5ZijUZwx"
  const name2Tx = "name2Tx"

  let hoodieMonToken: Contract;
  let signer: SignerWithAddress;
  let badSigner: SignerWithAddress;

  beforeEach(async () => {
    [signer, badSigner] = await ethers.getSigners();
    const HoodieMonToken = await ethers.getContractFactory("HoodieMonToken");
    hoodieMonToken = await HoodieMonToken.deploy();
    await hoodieMonToken.deployed();
    console.log(`hoodieMonToken deploy tx hash: ${hoodieMonToken.deployTransaction.hash}`);
    console.log(`hoodieMonToken contract address: ${hoodieMonToken.address}`);
  })

  it("deployed", async () => {
    // before initial minting
    expect(await hoodieMonToken.name()).to.equal("Hoodiemon");
    expect(await hoodieMonToken.symbol()).to.equal("HDMN");
    expect(await hoodieMonToken.totalSupply()).to.equal(0);
  })

  it("mint, transfer, burn ", async () => {

    const mint0Tx = await hoodieMonToken.connect(signer).preMint(tokenUri0Tx, name0Tx, {value: valueForPreMint});
    await mint0Tx.wait();
    console.log(`mint 0 tx hash: ${mint0Tx.hash}`);


    const mint1Tx = await hoodieMonToken.connect(signer).preMint(tokenUri1Tx,name1Tx, {value: valueForPreMint});
    await mint1Tx.wait();
    console.log(`mint 1 tx hash: ${mint1Tx.hash}`);

    const mint2Tx = await hoodieMonToken.connect(badSigner).preMint(tokenUri2Tx,name2Tx, {value: valueForPreMint});
    await mint2Tx.wait();
    console.log(`mint 2 tx hash: ${mint2Tx.hash}`);

    it("mint tx0", async () => {
      // Assertion for token(tokenId = 0)
      expect(await hoodieMonToken.totalSupply()).to.equal(1);
      expect(await hoodieMonToken.tokenURI(0)).to.equal(tokenUri0Tx)
      expect(await hoodieMonToken.ownerOf(0)).to.equal(signer.address);
      expect(await hoodieMonToken.balanceOf(signer.address)).to.equal(1);
    })

    it("mint tx1", async () => {
      // Assertion for token(tokenId = 0)
      expect(await hoodieMonToken.totalSupply()).to.equal(2);
      expect(await hoodieMonToken.tokenURI(1)).to.equal(tokenUri1Tx)
      expect(await hoodieMonToken.ownerOf(1)).to.equal(signer.address);
      expect(await hoodieMonToken.balanceOf(signer.address)).to.equal(2);
    })

    it("mint tx2", async () => {
      // Assertion for token(tokenId = 0)
      expect(await hoodieMonToken.totalSupply()).to.equal(3);
      expect(await hoodieMonToken.tokenURI(2)).to.equal(tokenUri2Tx)
      expect(await hoodieMonToken.ownerOf(2)).to.equal(badSigner.address);
      expect(await hoodieMonToken.balanceOf(badSigner.address)).to.equal(2);
    })

    it("transfer tx1", async () => {
      // transfer token(tokenId = 1) from signer.address to badSigner.address
      const transfer1FromSignerToAddressTx = await hoodieMonToken.connect(signer).transferFrom(signer.address, badSigner.address, 1);
      await transfer1FromSignerToAddressTx.wait();
      console.log(`transfer1FromSignerToAddressTx tx hash: ${transfer1FromSignerToAddressTx.hash}`);

      // Assertion for transferred token(tokenId = 1)
      expect(await hoodieMonToken.totalSupply()).to.equal(2);
      expect((await hoodieMonToken.ownerOf(1))).to.equal(badSigner.address);
      expect(await hoodieMonToken.balanceOf(signer.address)).to.equal(1);
      expect(await hoodieMonToken.balanceOf(badSigner.address)).to.equal(1);
    })

    it("burn tx0", async () => {
      // burn token(tokenId = 0)
      const burn0Tx = await hoodieMonToken.burn(0);
      await burn0Tx.wait();
      console.log(`burn0 tx hash: ${burn0Tx.hash}`);

      // Assertion for burned token(tokenId = 0)
      expect(await hoodieMonToken.totalSupply()).to.equal(1);
      expect(hoodieMonToken.ownerOf(0)).to.revertedWith("ERC721: owner query for nonexistent token");
      expect(hoodieMonToken.tokenURI(0)).to.revertedWith("ERC721URIStorage: URI query for nonexistent token");
      expect(await hoodieMonToken.balanceOf(signer.address)).to.equal(0);
    })

    it("transfer tx2", async () => {
      // transfer token(tokenId = 2) from badSigner.address to signer.address
    const transfer2FromBadSignerToSignerAddressTx = await hoodieMonToken.connect(badSigner).transferFrom(badSigner.address, signer.address, 2);
    await transfer2FromBadSignerToSignerAddressTx.wait();
    console.log(`transfer2FromBadSignerToSignerAddress tx hash: ${transfer2FromBadSignerToSignerAddressTx.hash}`);

    // Assertion for transferred token(tokenId = 2)
    expect(await hoodieMonToken.totalSupply()).to.equal(2);
    expect(await hoodieMonToken.ownerOf(2)).to.equal(signer.address);
    expect(await hoodieMonToken.balanceOf(signer.address)).to.equal(1);
    expect(await hoodieMonToken.balanceOf(badSigner.address)).to.equal(1);
    })

    it("safe transfer tx1", async () => {
      // transfer token(tokenId = 1) from signer.address to badSigner.address
      const transfer1FromSignerToAddressTx = await hoodieMonToken.connect(signer).transferFrom(signer.address, badSigner.address, 1);
      await transfer1FromSignerToAddressTx.wait();
      console.log(`transfer1FromSignerToAddressTx tx hash: ${transfer1FromSignerToAddressTx.hash}`);

      // Assertion for transferred token(tokenId = 1)
      expect(await hoodieMonToken.totalSupply()).to.equal(2);
      expect((await hoodieMonToken.ownerOf(1))).to.equal(badSigner.address);
      expect(await hoodieMonToken.balanceOf(signer.address)).to.equal(1);
      expect(await hoodieMonToken.balanceOf(badSigner.address)).to.equal(1);
    })
  })
});