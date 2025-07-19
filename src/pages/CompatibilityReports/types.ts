export interface CompatibilityReport {
  id: string
  deviceId?: string
  gameId?: string
  performanceId: number
  notes: string
  game: {
    id: string
    title: string
    systemId: string
    imageUrl: string
    boxartUrl: string
    bannerUrl: string
    tgdbGameId: number
  }
  device: {
    id: string
    modelName: string
    brand: {
      id: string
      name: string
    }
    soc: {
      id: string
      name: string
      manufacturer: string
      architecture: string
      processNode: string
      cpuCores: number
      gpuModel: string
    }
  }
  performance: {
    label: string
    rank: number
    description: string
  }
  author: {
    name: string
  }
  _count: {
    votes: number
    comments: number
  }
  successRate: number
  upVotes: number
  downVotes: number
  totalVotes: number
  isVerifiedDeveloper: boolean
}

export interface PaginationInfo {
  total: number
  pages: number
  page: number
  limit: number
}
