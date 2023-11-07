export const waveContract = {
  address: '0xe9cc4f9fe805c4d157f5f1e09fb3635fd5dc2a3d', // ここにアドレスを追加
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'message',
          type: 'string',
        },
      ],
      name: 'NewWave',
      type: 'event',
    },
    {
      inputs: [],
      name: 'getAllWaves',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'waver',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'message',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256',
            },
          ],
          internalType: 'struct WaveContract.Wave[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTotalWave',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_message',
          type: 'string',
        },
      ],
      name: 'wave',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
} as const
