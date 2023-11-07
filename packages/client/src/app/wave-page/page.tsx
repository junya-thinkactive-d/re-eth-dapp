'use client'
import React from 'react'

import { useConnectWallet } from '@/hooks/useConnectWallet'

import AllowWave from '../_components/AllowWave'
import { WellCome } from '../_components/WellCome'

const ConnectWalletPage = () => {
  const { currentAccount } = useConnectWallet()
  console.log('currentAccount', currentAccount)

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-stone-900 py-12">
      {!currentAccount ? (
        <>
          <WellCome />
        </>
      ) : (
        <>
          <AllowWave />
        </>
      )}
    </div>
  )
}

export default ConnectWalletPage
