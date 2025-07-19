import { Zap, Shield, Gamepad2, Monitor, Cpu, Palette } from 'lucide-react'

export const features = [
  {
    icon: Zap,
    title: 'LIGHTNING SPEED',
    description: 'Eden is written in C++ with a focus on performance.',
    color: 'from-yellow-400 to-orange-500',
    glow: 'shadow-yellow-500/50',
  },
  {
    icon: Shield,
    title: 'OPEN & AUDITABLE',
    description:
      'No telemetry, no trackers, no nonsense. The entire codebase is open for inspection.',
    color: 'from-green-400 to-emerald-500',
    glow: 'shadow-green-500/50',
  },
  {
    icon: Gamepad2,
    title: 'CONTROLLER SUPPORT',
    description: 'Plug in and play with support for Xbox, DualShock, and other common controllers.',
    color: 'from-blue-400 to-blue-500',
    glow: 'shadow-blue-500/50',
  },
  {
    icon: Monitor,
    title: 'MULTI-PLATFORM',
    description: 'Available on Windows, macOS, Linux, and Android.',
    color: 'from-purple-400 to-purple-500',
    glow: 'shadow-purple-500/50',
  },
  {
    icon: Cpu,
    title: 'SMART EMULATION',
    description:
      'Accuracy where it matters, performance where it counts. No overkill for the sake of it.',
    color: 'from-red-400 to-pink-500',
    glow: 'shadow-red-500/50',
  },
  {
    icon: Palette,
    title: 'EDEN’S VEIL (BETA)',
    description:
      'An experimental config tab for visuals—adjust shaders, frame pacing, overlays, and more (not yet polished).',
    color: 'from-purple-400 to-blue-500',
    glow: 'shadow-purple-500/50',
  },
]
