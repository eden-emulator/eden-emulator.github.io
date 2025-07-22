import { Apple, AppWindow as Windows, type LucideIcon, Monitor, Smartphone } from 'lucide-react'
import type { PlatformType } from '@/utils/getCurrentPlatform.ts'

const DOWNLOAD_VERSION = 'v0.0.2' as const
const DOWNLOAD_URL = 'https://github.com/eden-emulator/Releases/releases' as const

interface Platform {
  name: string
  platform: PlatformType
  icon: LucideIcon
  version: string
  size: string
  requirements: string
  downloadUrl: string
  primary: boolean
  color: string
}

export const platforms: Platform[] = [
  {
    name: 'WINDOWS',
    platform: 'windows',
    icon: Windows,
    version: DOWNLOAD_VERSION,
    size: '137 MB',
    requirements: 'Windows 10/11 (64-bit)',
    downloadUrl: DOWNLOAD_URL,
    primary: true,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    name: 'MACOS',
    platform: 'macos',
    icon: Apple,
    version: ': Coming Soon™',
    size: '138 MB',
    requirements: 'Apple Silicon',
    downloadUrl: '/noscript/pages/Game.html',
    primary: false,
    color: 'from-gray-400 to-gray-600',
  },
  {
    name: 'LINUX',
    platform: 'linux',
    icon: Monitor,
    version: DOWNLOAD_VERSION,
    size: '167 MB',
    requirements: 'amd64 / armv8-a / armv9-a / Steam Deck',
    downloadUrl: DOWNLOAD_URL,
    primary: false,
    color: 'from-orange-400 to-red-500',
  },
  {
    name: 'ANDROID',
    platform: 'mobile',
    icon: Smartphone,
    version: DOWNLOAD_VERSION,
    size: '47.2 MB',
    requirements: 'Android 13.0+',
    downloadUrl: DOWNLOAD_URL,
    primary: false,
    color: 'from-green-400 to-emerald-500',
  },
]
