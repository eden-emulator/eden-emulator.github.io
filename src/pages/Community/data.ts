import { MessageSquare, Users, type LucideIcon } from 'lucide-react'
import { DiscordIcon, GitHubIcon, TwitterIcon, type Icon } from '@/components/Icons'

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
  { label: 'ACTIVE USERS', value: '50K+', icon: Users, color: 'from-blue-400 to-cyan-500' },
  { label: 'GITHUB STARS', value: '12.5K', icon: GitHubIcon, color: 'from-gray-400 to-gray-600' },
  {
    label: 'DISCORD MEMBERS',
    value: '8.2K',
    icon: DiscordIcon,
    color: 'from-indigo-400 to-purple-500',
  },
  { label: 'FORUM POSTS', value: '25K+', icon: MessageSquare, color: 'from-pink-400 to-red-500' },
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
    href: 'https://git.eden-emu.dev/eden-emu/eden/releases',
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
    name: 'EMUREADY',
    icon: MessageSquare,
    href: 'https://forums.emuready.com',
    description: 'Community-driven platform for emulation compatibility reports.',
    color: 'from-purple-500 to-pink-600',
    hoverColor: 'hover:from-purple-400 hover:to-pink-500',
  },
]
