import { Book, FileText, MessageCircle, Video, type LucideIcon } from 'lucide-react'

export interface DocSection {
  icon: LucideIcon
  title: string
  description: string
  links: string[]
  color: string
}

export const docSections: DocSection[] = [
  {
    icon: Book,
    title: 'GETTING STARTED',
    description: 'Quick setup guide and basic configuration',
    links: ['Installation Guide', 'First Time Setup', 'Basic Controls', 'Adding Homebrew Games'],
    color: 'from-blue-400 to-blue-500',
  },
  {
    icon: FileText,
    title: 'USER MANUAL',
    description: 'Comprehensive documentation for all features',
    links: ['Advanced Settings', 'Controller Configuration', 'Cheats & Codes'],
    color: 'from-purple-400 to-purple-500',
  },
  {
    icon: Video,
    title: 'VIDEO TUTORIALS',
    description: 'Step-by-step video guides and walkthroughs',
    links: ['Setup Walkthrough', 'Performance Optimization', 'Multiplayer Setup'],
    color: 'from-purple-400 to-blue-500',
  },
  {
    icon: MessageCircle,
    title: 'FAQ & SUPPORT',
    description: 'Common questions and troubleshooting help',
    links: ['Frequently Asked Questions', 'Troubleshooting Guide', 'Performance Issues'],
    color: 'from-green-400 to-blue-500',
  },
]
