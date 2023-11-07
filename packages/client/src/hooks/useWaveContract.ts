import { useCallback, useEffect, useState } from 'react'
import { formatEther } from 'viem'

import { publicClient, walletClient } from '@/libs/viem'
import { waveContract } from '@/libs/viem/contractsConstABI/waveContractConstABI'

export type Wave = {
  waver: string
  timeStamp: Date
  message: string
}

type Props = {
  currentAccount: `0x${string}` | null
}

type ReturnUseWaveContract = {
  mining: boolean
  handleWave: (message: string) => Promise<void>
  allWaves: Wave[]
  getAllWaves: () => Promise<void>
  totalWaves: number
  getTotalWave: () => Promise<void>
  contractBalance: string
}

export const useWaveContract = ({ currentAccount }: Props): ReturnUseWaveContract => {
  const [mining, setMining] = useState<boolean>(false)
  const [totalWaves, setTotalWaves] = useState<number>(0)
  const [allWaves, setAllWaves] = useState<Wave[]>([])
  const [contractBalance, setContractBalance] = useState<string>('')

  const getAllWaves = useCallback(async () => {
    try {
      const data = await publicClient.readContract({
        ...waveContract,
        functionName: 'getAllWaves',
      })
      const organizedWaves: Wave[] = data.map((wave: { waver: string; timestamp: bigint; message: string }) => {
        return {
          waver: wave.waver,
          timeStamp: new Date(Number(wave.timestamp) * 1000),
          message: wave.message,
        }
      })
      setAllWaves(organizedWaves)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getTotalWave = useCallback(async () => {
    const data = await publicClient.readContract({
      ...waveContract,
      functionName: 'getTotalWave',
    })
    setTotalWaves(Number(data))
  }, [])

  const getNewWave = useCallback(async () => {
    const unwatch = publicClient.watchContractEvent({
      ...waveContract,
      eventName: 'NewWave',
      onLogs: (logs) => {
        console.log(logs)
        getAllWaves()
        getTotalWave()
      },
    })
  }, [getAllWaves, getTotalWave])

  const handleWave = useCallback(
    async (message: string) => {
      try {
        setMining(true)
        if (!currentAccount) return
        const { request } = await publicClient.simulateContract({
          ...waveContract,
          functionName: 'wave',
          account: currentAccount,
          args: [message],
          gas: BigInt(300000),
        })
        await walletClient.writeContract(request)
      } catch (error) {
        console.log(error)
      } finally {
        setMining(false)
      }
    },
    [currentAccount]
  )

  const getContractBalance = useCallback(async () => {
    try {
      const balance = formatEther(
        await publicClient.getBalance({
          address: waveContract.address,
        })
      )
      setContractBalance(balance)
    } catch (error) {}
  }, [])

  useEffect(() => {
    getContractBalance()
    getAllWaves()
    getTotalWave()
    getNewWave()
  }, [getAllWaves, getContractBalance, getNewWave, getTotalWave])

  return { mining, handleWave, allWaves, getAllWaves, totalWaves, getTotalWave, contractBalance }
}
