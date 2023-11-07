import React, { useRef } from 'react'

import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useWaveContract } from '@/hooks/useWaveContract'

import { MessageCard } from './MessageCard'

const AllowWave = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { currentAccount, isConnectChain, connectChain } = useConnectWallet()
  const { handleWave, allWaves, contractBalance } = useWaveContract({ currentAccount })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputRef.current) return
    const message = inputRef.current.value
    handleWave(message)
  }
  return (
    <div className="flex flex-col items-center justify-center text-stone-100">
      <h2 className="my-6 text-2xl">👋 WELCOME!</h2>
      <div>wallet account: {currentAccount}</div>
      {!isConnectChain ? (
        <div>
          <div>You need connect sepolia chain</div>
          <form onSubmit={connectChain} className="flex flex-col items-center justify-center">
            <button type="submit" className="my-4 rounded-md bg-white/40 p-2 text-white drop-shadow">
              Change Chain
            </button>
          </form>
        </div>

      ) : (
        <div className='flex w-full flex-col items-center justify-center gap-y-4'>
          <p>✨Waveをおくってください✨</p>
          <div>In this Contract: {contractBalance}ETH</div>
          <form onSubmit={handleSubmit} className="flex w-full flex-col items-center justify-center">
            <textarea ref={inputRef} className="h-40 w-full resize-none rounded p-2 text-stone-950" />
            <button type="submit" className="my-4 rounded-md bg-white/40 p-2 text-white drop-shadow">
              Sent Wave
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2">
            {allWaves.map((wave, i) => (
              <MessageCard key={i} wave={wave} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AllowWave
