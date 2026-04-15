import { Apple, AppWindow as Windows, type LucideIcon, Monitor, Smartphone, Sun, Bomb } from 'lucide-react'
import type { PlatformType } from '@/utils/getCurrentPlatform'
import env from '@/utils/env'

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
    version: env().DOWNLOAD_VERSION,
    size: '100 MB',
    requirements: 'Windows 10/11 (64-bit)',
    downloadUrl: env().DOWNLOAD_URL,
    primary: true,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    name: 'MACOS',
    platform: 'macos',
    icon: Apple,
    version: env().DOWNLOAD_VERSION,
    size: '100 MB',
    requirements: 'Apple Silicon',
    downloadUrl: env().DOWNLOAD_URL,
    primary: false,
    color: 'from-gray-400 to-gray-600',
  },
  {
    name: 'LINUX',
    platform: 'linux',
    icon: Monitor,
    version: env().DOWNLOAD_VERSION,
    size: '100 MB',
    requirements: 'amd64 / aarch64 / Steam Deck',
    downloadUrl: env().DOWNLOAD_URL,
    primary: false,
    color: 'from-orange-400 to-red-500',
  },
  {
    name: 'ANDROID',
    platform: 'mobile',
    icon: Smartphone,
    version: env().DOWNLOAD_VERSION,
    size: '30 MB',
    requirements: 'Android 9.0+',
    downloadUrl: env().DOWNLOAD_URL,
    primary: false,
    color: 'from-green-400 to-emerald-500',
  },
  {
    name: 'SOLARIS',
    platform: 'linux',
    icon: Sun,
    version: env().DOWNLOAD_VERSION,
    size: '100 MB',
    requirements: 'amd64',
    downloadUrl: env().DOWNLOAD_URL,
    primary: false,
    color: 'from-green-400 to-red-500',
  },
  {
    name: 'FREEBSD',
    platform: 'linux',
    icon: Bomb,
    version: env().DOWNLOAD_VERSION,
    size: '100 MB',
    requirements: 'amd64 / aarch64',
    downloadUrl: env().DOWNLOAD_URL,
    primary: false,
    color: 'from-yellow-400 to-red-500',
  },
]
