export const requirements = {
  cpu: {
    desktop: [
      {
        level: 'Minimum',
        specs: 'Intel Core i5-4430 / AMD Ryzen 3 1200 / Qualcomm Snapdragon 460'
      },
      {
        level: 'Recommended',
        specs: 'Intel Core i5-11400 / AMD Ryzen 5 3600 / Qualcomm Snapdragon 865'
      },
      {
        level: 'Optimal',
        specs: 'Intel Core i9-13900K / AMD Ryzen 7 7800X3D / Qualcomm Snapdragon 8 Gen 2'
      }
    ],
    laptop: [
      {
        level: 'Recommended',
        specs: 'Intel Core i5-13420H / AMD Ryzen 7 5700U'
      },
      {
        level: 'Optimal',
        specs: 'Intel Core Ultra 7 265H / AMD Ryzen AI 9 HX 370'
      }
    ]
  },
  graphics: {
    dedicated: [
      {
        level: 'Minimum for Linux',
        specs: 'NVIDIA GeForce GT 1050 4GB / AMD Radeon R7 240 4GB'
      },
      {
        level: 'Minimum for Windows',
        specs: 'NVIDIA GeForce GT 1050 4GB / AMD Radeon RX 550 4GB'
      },
      {
        level: 'Recommended',
        specs: 'NVIDIA GeForce GTX 1660 6GB / AMD Radeon RX 5500 8GB',
        note: 'AMD GPUs: Enable "Force maximum clocks"'
      },
      {
        level: 'Optimal',
        specs: 'NVIDIA Geforce RTX 3060 12GB / AMD Radeon RX 6700 10GB',
        note: 'AMD GPUs: Enable "Force maximum clocks"'
      }
    ],
    integrated: {
      windows: [
        {
          level: 'Minimum',
          specs: 'Intel UHD Graphics 730 / AMD Radeon Vega 3'
        },
        {
          level: 'Recommended',
          specs: 'Intel Iris Xe Graphics / AMD Radeon 680M'
        }
      ],
      linux: [
        {
          level: 'Minimum',
          specs: 'Intel HD Graphics 4400 / AMD Radeon R5 Graphics'
        },
        {
          level: 'Recommended',
          specs: 'Intel Iris Xe Graphics / AMD Radeon 680M'
        }
      ]
    },
    android: [
      {
        level: 'Minimum for Android',
        specs: 'Qualcomm Adreno 605 (with Turnip drivers) / ARM Mali G57'
      },
      {
        level: 'Recommended',
        specs: 'Qualcomm Adreno 740 / ARM Mali G720'
      }
    ]
  },
  ram: {
    dedicated_gpu: [
      { level: 'Minimum', amount: '8GB' },
      { level: 'Recommended', amount: '16GB' },
      { level: 'Optimal', amount: '32GB' }
    ],
    android: [
      { level: 'Minimum', amount: '8GB' }
    ],
    igpu: [
      { level: 'Minimum', amount: '12GB' },
      { level: 'Recommended', amount: '16GB' },
      { level: 'Optimal', amount: '32GB' }
    ]
  }
}