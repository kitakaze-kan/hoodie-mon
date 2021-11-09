import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";
import 'dotenv/config'

task("accounts", "Prints the list of accounts", async (hre:HardhatRuntimeEnvironment) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

 export default {
  defaultNetwork: "matic",
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: process.env.HARDHAT_CHAIN_ID ? +process.env.HARDHAT_CHAIN_ID : 1337
    },
    ropsten: {
      url: process.env.ROPSTEN_URL ? process.env.ROPSTEN_URL : 'https://ropsten.infura.io/v3/2b01848202b443298da25cc623ca2fde',
      accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`]
    },
    matic: {
      url: process.env.MATIC_TEST_URL ? process.env.MATIC_TEST_URL : 'https://rpc-mumbai.maticvigil.com',
      accounts: [`0x${process.env.MATIC_TEST_PRIVATE_KEY}`]
    }
  }
};