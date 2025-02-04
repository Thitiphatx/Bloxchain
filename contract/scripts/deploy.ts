import { ethers } from "hardhat";



async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy("Hello, Blockchain!");
  await hello.deployed();
  console.log(`Deployed to: ${hello.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
