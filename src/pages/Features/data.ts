import { Zap, Shield, Gamepad2, Monitor, Cpu, Palette } from 'lucide-react'

export const features = [
  {
    icon: Zap,
    title: 'LIGHTNING SPEED',
    description: 'Optimized emulation engine delivers smooth 60fps gameplay with zero input lag.',
    color: 'from-yellow-400 to-orange-500',
    glow: 'shadow-yellow-500/50',
  },
  {
    icon: Shield,
    title: 'SECURE & SAFE',
    description: 'Open-source codebase with regular security audits. No malware, no adware.',
    color: 'from-green-400 to-emerald-500',
    glow: 'shadow-green-500/50',
  },
  {
    icon: Gamepad2,
    title: 'CONTROLLER SUPPORT',
    description: 'Full support for modern controllers with custom mapping and haptic feedback.',
    color: 'from-blue-400 to-blue-500',
    glow: 'shadow-blue-500/50',
  },
  {
    icon: Monitor,
    title: 'MULTI-PLATFORM',
    description: 'Available on Windows, macOS, Linux, and mobile with cloud sync.',
    color: 'from-purple-400 to-purple-500',
    glow: 'shadow-purple-500/50',
  },
  {
    icon: Cpu,
    title: 'ADVANCED EMULATION',
    description:
      'Cycle-accurate emulation with support for enhancement chips and special hardware.',
    color: 'from-red-400 to-pink-500',
    glow: 'shadow-red-500/50',
  },
  {
    icon: Palette,
    title: 'VISUAL ENHANCEMENT',
    description: 'HD upscaling, shader effects, and customizable filters for modern displays.',
    color: 'from-purple-400 to-blue-500',
    glow: 'shadow-purple-500/50',
  },
]
