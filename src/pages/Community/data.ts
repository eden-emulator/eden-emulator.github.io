import { MessageSquare, GitGraph, CloudDownload, type LucideIcon } from 'lucide-react'
import { DiscordIcon, TwitterIcon, GitIcon, type Icon } from '@/components/Icons'

interface Stat {
  label: string
  value: string
  icon: LucideIcon | Icon
  color: string
}

interface SocialLink {
  name: string
  icon: LucideIcon | Icon
  description: string
  href: string
  color: string
  hoverColor: string
}

export const stats: Stat[] = [
  {
    label: 'DOWNLOADS',
    value: '420,069+',
    icon: CloudDownload,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    label: 'ACTIVELY MAINTAINED',
    value: '27,800+ COMMITS',
    icon: GitGraph,
    color: 'from-yellow-400 to-orange-500',
  },
  {
    label: 'DISCORD MEMBERS',
    value: '27.5K+',
    icon: DiscordIcon,
    color: 'from-indigo-400 to-purple-500',
  },
  {
    label: 'COMPATIBILITY REPORTS',
    value: '1360+',
    icon: MessageSquare,
    color: 'from-pink-400 to-red-500',
  },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'Discord',
    icon: DiscordIcon,
    href: 'https://discord.gg/edenemu',
    description: 'Join our Discord server (27.5K+ members)',
    color: 'from-indigo-500 to-purple-600',
    hoverColor: 'hover:from-indigo-400 hover:to-purple-500',
  },
  {
    name: 'Git Repository',
    icon: GitIcon,
    href: 'https://git.eden-emu.dev/eden-emu/eden',
    description: 'Contribute to the project and report issues',
    color: 'from-gray-600 to-gray-800',
    hoverColor: 'hover:from-gray-500 hover:to-gray-700',
  },
  {
    name: 'X (Twitter)',
    icon: TwitterIcon,
    description: 'Follow us for updates and announcements 1.7k+',
    href: 'https://x.com/edenemuofficial',
    color: 'from-blue-500 to-cyan-600',
    hoverColor: 'hover:from-blue-400 hover:to-cyan-500',
  },
  {
    name: 'EMUREADY x EDEN',
    icon: MessageSquare,
    href: 'https://www.emuready.com/listings?emulatorIds=43bfc023-ec22-422d-8324-048a8ec9f28f',
    description: 'Community-driven platform for emulation compatibility reports.',
    color: 'from-purple-500 to-pink-600',
    hoverColor: 'hover:from-purple-400 hover:to-pink-500',
  },
]
