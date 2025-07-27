import { Cpu, Info, Smartphone, TrendingDown, TrendingUp } from 'lucide-react'
import type { CompatibilityReport } from '../types'
import { DEFAULT_PERFORMANCE_STYLE, PERFORMANCE_STYLES } from '@/pages/CompatibilityReports/data'
import getGameImageUrl from '../utils/getGameImageUrl'
import { cn } from '@/utils/style'

const getPerformanceStyle = (rank: number) => {
  return PERFORMANCE_STYLES[rank as keyof typeof PERFORMANCE_STYLES] || DEFAULT_PERFORMANCE_STYLE
}

interface ReportCardProps {
  report: CompatibilityReport
  onClick: (report: CompatibilityReport) => void
}

function ReportCard(props: ReportCardProps) {
  const imageUrl = getGameImageUrl(props.report.game)

  const perfStyle = getPerformanceStyle(props.report.performance.rank)
  return (
    <div className="group relative">
      {/* Glow Effect Behind Card */}
      <div
        className={cn(
          'absolute inset-0 bg-linear-to-r blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700 rounded-2xl',
          perfStyle.glowGradient,
        )}
      />

      {/* Main Card */}
      <div
        className="relative bg-black/80 backdrop-blur-md border border-purple-500/30 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-cyan-400/50 group-hover:transform group-hover:scale-[1.02] cursor-pointer"
        onClick={() => props.onClick(props.report)}
      >
        {/* Performance Indicator Bar */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-1 bg-linear-to-r',
            perfStyle.indicatorGradient,
          )}
        />

        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Game Art & Performance */}
          <div className="relative lg:w-64 bg-black/40 p-6 flex flex-col items-center justify-center border-r border-purple-500/20">
            {/* Click Indicator */}
            {imageUrl ? (
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-2xl" />
                <img
                  src={imageUrl}
                  alt={props.report.game.title}
                  aria-label={props.report.game.title}
                  className="relative w-40 h-56 object-cover rounded-xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-40 h-56 bg-purple-900/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <Info className="w-12 h-12 text-purple-400/30" />
              </div>
            )}

            {/* Performance Badge */}
            <div
              className={cn(
                'mt-4 px-6 py-3 rounded-full backdrop-blur-sm border shadow-lg',
                perfStyle.bgColor,
                perfStyle.borderColor,
                perfStyle.shadowColor,
              )}
            >
              <div className="flex items-center gap-3">
                <perfStyle.icon className={cn('w-5 h-5', perfStyle.iconColor)} />
                <span className="font-bold uppercase tracking-wider text-sm">
                  {props.report.performance.label}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="flex-1 p-8 space-y-6">
            <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
                <span className="text-xs text-purple-300 font-medium">Click for details</span>
              </div>
            </div>

            {/* Header */}
            <div>
              <h3 className="text-3xl font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400">
                  {props.report.game.title}
                </span>
              </h3>
              <p className="text-lg text-cyan-100/90 font-light">
                {props.report.performance.description}
              </p>
            </div>

            {/* Device Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group/item relative">
                <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-black/40 backdrop-blur-xs border border-cyan-500/30 rounded-lg p-4 transition-all duration-300 group-hover/item:border-cyan-400/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
                      Device
                    </span>
                  </div>
                  <p className="text-cyan-100 font-medium">
                    {props.report.device?.brand?.name} {props.report.device?.modelName}
                  </p>
                </div>
              </div>

              <div className="group/item relative">
                <div className="absolute inset-0 bg-purple-500/5 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-black/40 backdrop-blur-xs border border-purple-500/30 rounded-lg p-4 transition-all duration-300 group-hover/item:border-purple-400/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">
                      Processor
                    </span>
                  </div>
                  <p className="text-cyan-100 font-medium">
                    {props.report.device?.soc?.manufacturer} {props.report.device?.soc?.name}
                  </p>
                  {props.report.device.soc?.gpuModel && (
                    <p className="text-xs text-cyan-100/60 mt-1">
                      {props.report.device?.soc.gpuModel} • {props.report.device?.soc?.architecture}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Notes */}
            {props.report.notes && (
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/5 rounded-xl blur-xl" />
                <div className="relative bg-black/60 backdrop-blur-xs border border-purple-500/30 rounded-xl p-6">
                  <div className="absolute -top-3 -left-3 text-5xl text-purple-400/20 font-serif">
                    "
                  </div>
                  <p className="text-cyan-100 font-light italic relative z-10 pl-4">
                    {props.report.notes}
                  </p>
                  <div className="absolute -bottom-3 -right-3 text-5xl text-purple-400/20 font-serif rotate-180">
                    "
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-300 font-bold text-sm">
                    {props.report.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-cyan-100/60">Tested by</p>
                  <p className="text-purple-300 font-semibold -mt-1">{props.report.author.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <button className="group/vote flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/30 transition-all duration-300 hover:bg-green-500/20 hover:border-green-500/50">
                    <TrendingUp className="w-4 h-4 text-green-400 group-hover/vote:scale-110 transition-transform" />
                    <span className="text-green-400 font-bold">{props.report.upVotes}</span>
                  </button>
                  <button className="group/vote flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/30 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/50">
                    <TrendingDown className="w-4 h-4 text-red-400 group-hover/vote:scale-110 transition-transform" />
                    <span className="text-red-400 font-bold">{props.report.downVotes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportCard
