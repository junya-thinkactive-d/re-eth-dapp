import React from 'react'

import { Wave } from '@/hooks/useWaveContract'

type Props = {
  wave: Wave
}

export const MessageCard = ({ wave }: Props) => {
  return (
    <div className="col-span-1 flex w-full flex-col items-center rounded-md bg-white/10 px-4 py-2">
      <div className="text-xs">{wave.waver}</div>
      <div className="flex w-full items-center justify-end text-xs text-slate-500">{wave.timeStamp.toString()}</div>
      <div className="h-20 w-full rounded bg-slate-900 px-2 py-1 text-white">{wave.message}</div>
    </div>
  )
}
