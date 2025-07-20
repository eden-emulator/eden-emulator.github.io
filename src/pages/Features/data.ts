import { Zap, Shield, Gamepad2, Monitor, Cpu, Palette } from 'lucide-react'

export const features = [
  {
    icon: Zap,
    title: 'Lightning Speed',
    description: 'Eden is written in C++ with a focus on performance.',
    color: 'from-yellow-400 to-orange-500',
    glow: 'shadow-yellow-500/50',
  },
  {
    icon: Shield,
    title: 'Open & Auditable',
    description:
      'No telemetry, no trackers, no nonsense. The entire codebase is open for inspection.',
    color: 'from-green-400 to-emerald-500',
    glow: 'shadow-green-500/50',
  },
  {
    icon: Gamepad2,
    title: 'Controller Support',
    description: 'Plug n play with support for Xbox, DualShock, and other common controllers.',
    color: 'from-blue-400 to-blue-500',
    glow: 'shadow-blue-500/50',
  },
  {
    icon: Monitor,
    title: 'Multi-platform',
    description: 'Available on Windows, Linux and Android.',
    color: 'from-purple-400 to-purple-500',
    glow: 'shadow-purple-500/50',
  },
  {
    icon: Cpu,
    title: 'Accurate Emulation',
    description:
      'Accuracy where it matters, performance where it counts. No overkill for the sake of it.',
    color: 'from-red-400 to-pink-500',
    glow: 'shadow-red-500/50',
  },
  {
    icon: Palette,
    title: 'EDEN’S VEIL',
    description: 'An all new experimental config tab for advanced settings and ultimate customisation.',
    color: 'from-purple-400 to-blue-500',
    glow: 'shadow-purple-500/50',
  },
]
