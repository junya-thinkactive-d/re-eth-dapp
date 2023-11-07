import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import hre, { viem } from 'hardhat';
import { expect } from 'chai';
import { parseEther, formatEther } from 'viem';

describe('WaveContract', function () {
  async function deployProjectFixture() {
    const [user1, user2] = await hre.viem.getWalletClients();
    const waveContract = await hre.viem.deployContract('WaveContract', [], {
      value: parseEther('0.1'),
    });

    const publicClient = await hre.viem.getPublicClient();
    const waveContractBalance = await publicClient.getBalance({
      address: waveContract.address,
    });

    const sendTwoWaves = async () => {
      await waveContract.write.wave(['This is wave #1'],{account:user1.account.address});
      await waveContract.write.wave(['This is wave #2'],{account:user2.account.address});
    };
    return { waveContract, waveContractBalance, sendTwoWaves, user1, user2 };
  }

  describe('getTotalWaves', function () {
    it('Should return total waves', async function () {
      const { waveContract, sendTwoWaves } =
        await loadFixture(deployProjectFixture);

      await sendTwoWaves();

      const totalWaves = await waveContract.read.getTotalWave();

      expect(Number(totalWaves)).to.equal(2);
    });
  });

  describe('getAllWaves', function () {
    it('Should return all waves', async function () {
      const { waveContract, sendTwoWaves, user1, user2 } =
        await loadFixture(deployProjectFixture);
      await sendTwoWaves();

      const allWaves = await waveContract.read.getAllWaves();

      expect(allWaves[0].waver.toLowerCase()).to.equal(user1.account.address);
      expect(allWaves[0].message).to.equal('This is wave #1');
      expect(allWaves[1].waver.toLowerCase()).to.equal(user2.account.address);
      expect(allWaves[1].message).to.equal('This is wave #2');
    });
  });

  describe('wave', function () {
    context('When user waved', function () {
      it('should send tokens at random.', async function () {
        const { waveContract, waveContractBalance, sendTwoWaves } =
          await loadFixture(deployProjectFixture);
        await sendTwoWaves();

        const publicClient = await hre.viem.getPublicClient();
        const waveContractBalanceAfter = formatEther(
          await publicClient.getBalance({
            address: waveContract.address,
          })
        );

        const allWaves = await waveContract.read.getAllWaves();
        let cost = 0;
        for (let i = 0; i < allWaves.length; i++) {
          if (allWaves[i].seed <= 50) {
            cost += 0.0001;
          }
        }

        expect(parseFloat(waveContractBalanceAfter)).to.equal(
          Number(formatEther(waveContractBalance)) - cost
        );
      });
    });
    context(
      'when user1 tried to resubmit without waiting 15 mitutes',
      function () {
        it('reverts', async function () {
          const { waveContract, user1 } =
            await loadFixture(deployProjectFixture);

          await waveContract.write.wave(['This is wave #1'], {
            account: user1.account.address,
          });

          await expect(
            waveContract.write.wave(['This is wave #2'], {
              account: user1.account.address,
            })
          ).to.be.rejectedWith('Wait 15m');
        });
      }
    );
  });
});
