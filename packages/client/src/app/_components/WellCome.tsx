'use client'

import React from 'react'

import { useConnectWallet } from '@/hooks/useConnectWallet'

export const WellCome = () => {
  const { connectWallet } = useConnectWallet()
  return (
    <div className="flex flex-col items-center justify-center text-stone-100">
      <h2 className="my-6 text-2xl">👋 WELCOME!</h2>
      <p>イーサリアムウォレットを接続しよう✨</p>
      <button className="my-4 rounded-md bg-white/40 p-2 text-white drop-shadow" onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  )
}
