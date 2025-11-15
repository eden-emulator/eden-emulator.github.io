import { type LucideIcon } from 'lucide-react'

import { DiscordIcon, GitHubIcon, TwitterIcon, StoatIcon, type Icon } from '@/components/Icons'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface SocialLink {
  icon: LucideIcon | Icon
  href: string
  label: string
  color: string
}

export const footerLinks: Record<string, FooterLink[]> = {
  PRODUCT: [
    { name: 'Download', href: '/download' },
    { name: 'Features', href: '/features' },
    { name: 'System Requirements', href: '/system-requirements' },
    {
      name: 'Release Notes',
      href: 'https://github.com/eden-emulator/Releases/releases',
      external: true,
    },
  ],
  SUPPORT: [
    { name: 'Documentation', href: '/docs' },
    { name: 'FAQ (soon)', href: '#' },
    { name: 'Troubleshooting (soon)', href: '#' },
    { name: 'Contact Us', href: 'https://discord.gg/edenemu' },
  ],
  COMMUNITY: [
    { name: 'Discord', href: 'https://discord.gg/edenemu', external: true },
    { name: 'GitHub', href: 'https://git.eden-emu.dev/eden-emu/eden/releases', external: true },
    { name: 'Twitter', href: 'https://x.com/edenemuofficial', external: true },
    { name: 'EmuReady', href: 'https://emuready.com', external: true },
  ],
}

export const socialLinks: SocialLink[] = [
  {
    icon: GitHubIcon,
    href: 'https://git.eden-emu.dev/eden-emu/eden/releases',
    label: 'GitHub',
    color: 'hover:text-gray-400',
  },
  {
    icon: DiscordIcon,
    href: 'https://discord.gg/edenemu',
    label: 'Discord',
    color: 'hover:text-purple-400',
  },
  {
    icon: TwitterIcon,
    href: 'https://x.com/edenemuofficial',
    label: 'Twitter',
    color: 'hover:text-blue-400',
  },
  {
    icon: StoatIcon,
    href: 'https://rvlt.gg/qKgFEAbH',
    label: 'Stoat',
    color: 'hover:text-blue-400',
  },
]
