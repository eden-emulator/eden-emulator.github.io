import { AlertCircle, CheckCircle, Info, TrendingDown, TrendingUp, XCircle } from 'lucide-react'

export const EDEN_EMULATOR_ID = '43bfc023-ec22-422d-8324-048a8ec9f28f' as const

export const PERFORMANCE_STYLES = {
  1: {
    icon: CheckCircle,
    iconColor: 'text-green-400',
    glowGradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/50',
    shadowColor: 'shadow-green-500/25',
    bgColor: 'bg-green-500/20',
    indicatorGradient: 'from-green-400 via-emerald-400 to-green-400',
  },
  2: {
    icon: CheckCircle,
    iconColor: 'text-green-400',
    glowGradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/50',
    shadowColor: 'shadow-green-500/25',
    bgColor: 'bg-green-500/20',
    indicatorGradient: 'from-green-400 via-emerald-400 to-green-400',
  },
  3: {
    icon: TrendingUp,
    iconColor: 'text-yellow-400',
    glowGradient: 'from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/50',
    shadowColor: 'shadow-yellow-500/25',
    bgColor: 'bg-yellow-500/20',
    indicatorGradient: 'from-yellow-400 via-amber-400 to-yellow-400',
  },
  4: {
    icon: TrendingDown,
    iconColor: 'text-orange-400',
    glowGradient: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/50',
    shadowColor: 'shadow-orange-500/25',
    bgColor: 'bg-orange-500/20',
    indicatorGradient: 'from-orange-400 via-red-400 to-orange-400',
  },
  5: {
    icon: AlertCircle,
    iconColor: 'text-red-400',
    glowGradient: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/50',
    shadowColor: 'shadow-red-500/25',
    bgColor: 'bg-red-500/20',
    indicatorGradient: 'from-red-400 via-pink-400 to-red-400',
  },
  6: {
    icon: XCircle,
    iconColor: 'text-red-600',
    glowGradient: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/50',
    shadowColor: 'shadow-red-500/25',
    bgColor: 'bg-red-500/20',
    indicatorGradient: 'from-red-400 via-pink-400 to-red-400',
  },
} as const

export const DEFAULT_PERFORMANCE_STYLE = {
  icon: Info,
  iconColor: 'text-gray-400',
  glowGradient: 'from-gray-500/20 to-slate-500/20',
  borderColor: 'border-gray-500/50',
  shadowColor: 'shadow-gray-500/25',
  bgColor: 'bg-gray-500/20',
  indicatorGradient: 'from-gray-400 via-slate-400 to-gray-400',
}
