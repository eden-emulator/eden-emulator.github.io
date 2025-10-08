import type { CompatibilityReport } from '@/pages/CompatibilityReports/types'

function getGameImageUrl(game: CompatibilityReport['game']) {
  if (game.imageUrl) return game.imageUrl
  if (game.boxartUrl) return game.boxartUrl
  if (game.bannerUrl) return game.bannerUrl
  return null
}

export default getGameImageUrl
