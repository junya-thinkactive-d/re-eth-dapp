import hre from 'hardhat';
import { parseEther, formatEther } from 'viem';

const main = async () => {
  const [owner, randomPerson] = await hre.viem.getWalletClients();
  const waveContract = await hre.viem.deployContract('WaveContract', [], {
    value: parseEther('0.1'),
  });

  console.log('Contract deployed to:', waveContract.address);

  const publicClient = await hre.viem.getPublicClient();

  let contractBalance = await publicClient.getBalance({
    address: waveContract.address,
  });

  console.log('Contract balance:', formatEther(contractBalance));

  await waveContract.write.wave(['This is wave #1']);
  await waveContract.write.wave(['This is wave #2']);

  contractBalance = await publicClient.getBalance({
    address: waveContract.address,
  });
  console.log('Contract balance:', formatEther(contractBalance));

  let allWaves = await waveContract.read.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
