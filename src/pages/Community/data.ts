import { MessageSquare, GitGraph, type LucideIcon, Download } from 'lucide-react'
import { DiscordIcon, TwitterIcon, type Icon, GitHubIcon } from '@/components/Icons'

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
    icon: Download,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    label: 'ACTIVELY MAINTAINED',
    value: '27,472+ COMMITS',
    icon: GitGraph,
    color: 'from-yellow-400 to-orange-500',
  },
  {
    label: 'DISCORD MEMBERS',
    value: '15.2K+',
    icon: DiscordIcon,
    color: 'from-indigo-400 to-purple-500',
  },
  {
    label: 'COMPATIBILITY REPORTS',
    value: '200+',
    icon: MessageSquare,
    color: 'from-pink-400 to-red-500',
  },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'DISCORD',
    icon: DiscordIcon,
    href: 'https://discord.gg/edenemu',
    description: 'Join our Discord server (15.2K+ members)',
    color: 'from-indigo-500 to-purple-600',
    hoverColor: 'hover:from-indigo-400 hover:to-purple-500',
  },
  {
    name: 'GITHUB',
    icon: GitHubIcon,
    href: 'https://git.eden-emu.dev/eden-emu/eden',
    description: 'Contribute to the project and report issues',
    color: 'from-gray-600 to-gray-800',
    hoverColor: 'hover:from-gray-500 hover:to-gray-700',
  },
  {
    name: 'TWITTER',
    icon: TwitterIcon,
    description: 'Follow us for updates and announcements',
    href: 'https://x.com/edenemuofficial',
    color: 'from-blue-500 to-cyan-600',
    hoverColor: 'hover:from-blue-400 hover:to-cyan-500',
  },
  {
    name: 'EMUREADY x EDEN',
    icon: MessageSquare,
    href: 'https://forums.emuready.com',
    description: 'Community-driven platform for emulation compatibility reports.',
    color: 'from-purple-500 to-pink-600',
    hoverColor: 'hover:from-purple-400 hover:to-pink-500',
  },
]
