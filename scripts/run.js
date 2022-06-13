const main = async () => {
  const [owner, randomPerson, random1] = await hre.ethers.getSigners();

  //Compile contract and generate the necessary files we need to work with contract under artifacts dir
  //hre (Hardhat Run Environment)
  //command :"npx hardhat ..." to get hre object built on the fly using the hardhat.config.js
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  //Hardhat will create a local Ethereum network for us (only for this contract)
  //Then, after the script completes it'll destroy that local network
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });

  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  /*
   * Get Contract balance 
   */
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  /* 
   * Send Wave 
   */
  const waveTxn = await waveContract.wave('This is wave #1');
  await waveTxn.wait();
  const waveTxn2 = await waveContract.wave('This is wave #2');
  await waveTxn2.wait();

  /*
   * Get Contract balance to see what happened
   */
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log({ allWaves });
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();