const hre = require("hardhat");

async function main() {

  const BlockTalk = await hre.ethers.getContractFactory("BlockTalk");
  const blockTalk = await BlockTalk.deploy();

  await blockTalk.deployed();

  console.log(
    `Contract Address ${blockTalk.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
