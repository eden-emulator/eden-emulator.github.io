export const requirements = {
  cpu: {
    desktop: [
      {
        level: 'Minimum',
        specs: 'Intel Core i5-4430 / AMD Ryzen 3 1200',
      },
      {
        level: 'Recommended',
        specs: 'Intel Core i5-11400 / AMD Ryzen 5 3600 / Snapdragon X Plus',
      },
      {
        level: 'Optimal',
        specs: 'Intel Core i9-13900K / AMD Ryzen 7 7800X3D / Snapdragon X Elite',
      },
    ],
    android: [
      {
        level: 'Minimum',
        specs: 'Snapdragon 865 / Tensor G1 / Exynos 2200 / Dimensity 8200',
      },
      {
        level: 'Recommended',
        specs: 'Snapdragon 8 Gen 1 / Tensor G4 / Exynos 2400 / Dimensity 8400',
      },
      {
        level: 'Optimal',
        specs:
          'Snapdragon 8 Gen 3 / Snapdragon G3 Gen 3 / Tensor G5 / Exynos 2400-12 / Dimensity 9400',
      },
    ],
    laptop: [
      {
        level: 'Minimum',
        specs: 'Intel Core i5-8265U / AMD Ryzen 3 2300U',
      },
      {
        level: 'Recommended',
        specs: 'Intel Core i5-13420H / AMD Ryzen 7 5700U',
      },
      {
        level: 'Optimal',
        specs: 'Intel Core Ultra 7 265H / AMD Ryzen AI 9 HX 370',
      },
    ],
  },
  graphics: {
    dedicated: [
      {
        level: 'Minimum for Linux',
        specs: 'NVIDIA GeForce GT 1030 4GB / AMD Radeon R7 240 4GB',
      },
      {
        level: 'Minimum for Windows',
        specs: 'NVIDIA GeForce GTX 1050 4GB / AMD Radeon RX 550 4GB',
      },
      {
        level: 'Recommended',
        specs: 'NVIDIA GeForce GTX 1660 6GB / AMD Radeon RX 5500 8GB',
        note: 'AMD GPUs: Enable "Force maximum clocks"',
      },
      {
        level: 'Optimal',
        specs: 'NVIDIA Geforce RTX 3060 12GB / AMD Radeon RX 6700 10GB',
        note: 'AMD GPUs: Enable "Force maximum clocks"',
      },
    ],
    integrated: [
      {
        level: 'Minimum For Windows',
        specs: 'Intel UHD Graphics 620 / AMD Radeon Vega 3',
      },
      {
        level: 'Minimum For Linux',
        specs: 'Intel HD Graphics 4400 / AMD Radeon R5 Graphics',
      },
      {
        level: 'Recommended',
        specs: 'Intel Iris Xe Graphics / AMD Radeon 680M',
      },
      {
        level: 'Optimal',
        specs: 'Latest Intel Graphics / AMD Radeon 8060S',
      },
    ],
    android: [
      {
        level: 'Minimum Recommended',
        specs: 'Qualcomm Adreno 650 (with Legacy build) / ARM Mali G78',
      },
      {
        level: 'Recommended',
        specs: 'Qualcomm Adreno 740 / ARM Mali G715',
      },
      {
        level: 'Optimal',
        specs: 'Qualcomm Adreno A32/750 / ARM Immortalis G925 / Xclipse 950 / PowerVR DXT-48',
      },
    ],
  },
  ram: {
    dedicated_gpu: [
      { level: 'Minimum', amount: '8GB' },
      { level: 'Recommended', amount: '16GB' },
      { level: 'Optimal', amount: '32GB' },
    ],
    android: [
      { level: 'Minimum', amount: '8GB' },
      { level: 'Recommended', amount: '12GB' },
      { level: 'Optimal', amount: '16GB' },
    ],
    igpu: [
      { level: 'Minimum', amount: '12GB' },
      { level: 'Recommended', amount: '16GB' },
      { level: 'Optimal', amount: '32GB' },
    ],
  },
}
