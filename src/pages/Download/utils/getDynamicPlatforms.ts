import { platforms } from '@/pages/Download/data'
import getCurrentPlatform from '@/utils/getCurrentPlatform'

function getDynamicPlatforms() {
  const current = getCurrentPlatform()

  return platforms.map((p) => ({
    ...p,
    primary: p.name.toLowerCase() === current,
  }))
}

export default getDynamicPlatforms
