const main = async () => {
  const [owner, randomPerson, random1] = await hre.ethers.getSigners();

  //Compile contract and generate the necessary files we need to work with contract under artifacts dir
  //hre (Hardhat Run Environment)
  //command :"npx hardhat ..." to get hre object built on the fly using the hardhat.config.js
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  //Hardhat will create a local Ethereum network for us (only for this contract)
  //Then, after the script completes it'll destroy that local network
  const waveContract = await waveContractFactory.deploy();

  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log('waveCount', waveCount.toNumber());

  let waveTxn = await waveContract.wave('A message!');
  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
  await waveTxn.wait();

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