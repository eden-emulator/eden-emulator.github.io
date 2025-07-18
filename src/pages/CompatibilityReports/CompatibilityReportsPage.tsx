import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Loader2,
  Smartphone,
  Cpu,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react'
import type { CompatibilityReport, PaginationInfo } from './types'
import HeadingText from '@/components/HeadingText'
import getGameImageUrl from '@/pages/CompatibilityReports/utils/getGameImageUrl.ts'

const EDEN_EMULATOR_ID = '43bfc023-ec22-422d-8324-048a8ec9f28f' as const

function CompatibilityReportsPage() {
  const [reports, setReports] = useState<CompatibilityReport[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastReportRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const fetchReports = useCallback(
    async (pageNum: number) => {
      // Validate page number and prevent duplicate requests
      if (!pageNum || pageNum < 1 || loadingRef.current || !hasMore) return

      loadingRef.current = true
      setIsLoading(true)
      setError(null)

      try {
        const encodedInput = encodeURIComponent(
          JSON.stringify({ '0': { json: { page: pageNum, limit: 10, emulatorIds: [EDEN_EMULATOR_ID] } } }),
        )

        const apiUrl = import.meta.env.VITE_API_BASE_URL || '/api/emuready'
        const response = await fetch(
          `${apiUrl}/trpc/mobile.getListings?batch=1&input=${encodedInput}`,
        )
        const data = await response.json()

        if (data?.[0]?.result?.data?.json) {
          const { listings, pagination: paginationData } = data[0].result.data.json

          setReports((prev) => (pageNum === 1 ? listings : [...prev, ...listings]))
          setPagination(paginationData)
          setHasMore(pageNum < paginationData.pages)
        } else if (data?.[0]?.error) {
          console.error('API Error:', data[0].error)
          setError('Failed to load compatibility reports.')
        }
      } catch (err) {
        setError('Failed to load compatibility reports. Please try again later.')
        console.error('Error fetching reports:', err)
      } finally {
        setIsLoading(false)
        setIsInitialLoad(false)
        // Add a small delay before allowing next request
        setTimeout(() => {
          loadingRef.current = false
        }, 500)
      }
    },
    [hasMore],
  )

  // Initial load
  useEffect(() => {
    fetchReports(1)
  }, [])

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && pagination.page > 0) {
          const nextPage = pagination.page + 1
          if (nextPage <= pagination.pages) {
            fetchReports(nextPage)
          }
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      },
    )

    if (lastReportRef.current && !isLoading) {
      observerRef.current.observe(lastReportRef.current)
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [fetchReports, hasMore, isLoading, pagination.page, pagination.pages])

  const getPerformanceIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 2:
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 3:
        return <TrendingUp className="w-5 h-5 text-yellow-400" />
      case 4:
        return <TrendingDown className="w-5 h-5 text-orange-400" />
      case 5:
        return <AlertCircle className="w-5 h-5 text-red-400" />
      case 6:
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-gray-400" />
    }
  }

  const getPerformanceColor = (rank: number) => {
    switch (rank) {
      case 1:
      case 2:
        return 'from-green-500/20 to-emerald-500/20 border-green-500/50'
      case 3:
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50'
      case 4:
        return 'from-orange-500/20 to-red-500/20 border-orange-500/50'
      case 5:
      case 6:
        return 'from-red-500/20 to-pink-500/20 border-red-500/50'
      default:
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/50'
    }
  }

  return (
    <div className="bg-linear-to-b from-black via-purple-900/10 to-black relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadingText
          title="COMPATIBILITY REPORTS"
          description="Community-driven game compatibility reports for Eden Emulator"
        />
        <div className="text-center mb-16">
          {pagination.total > 0 && (
            <p className="text-sm text-purple-300 mt-4">
              Showing {reports.length} of {pagination.total} reports
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/50 rounded-xl">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        )}

        {/* Loading State for Initial Load */}
        {isInitialLoad && isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
            <p className="text-cyan-100 font-light">Loading compatibility reports...</p>
          </div>
        )}

        {/* Reports Grid */}
        {!isInitialLoad && (
          <div className="space-y-6">
            {reports.map((report, index) => {
              const imageUrl = getGameImageUrl(report.game)
              return (
                <div
                  key={report.id}
                  ref={index === reports.length - 1 ? lastReportRef : null}
                  className="group relative bg-black/40 backdrop-blur-xs border border-purple-500/30 rounded-xl overflow-hidden transition-all duration-500 hover:border-cyan-400/50"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(139,69,19,0.1) 50%, rgba(0,0,0,0.8) 100%)',
                  }}
                >
                  {/* Performance Badge */}
                  <div
                    className={`absolute top-0 right-0 px-4 py-2 rounded-bl-xl ${
                      report.performance.rank <= 2
                        ? 'bg-green-500/20 border-l border-b border-green-500/50'
                        : report.performance.rank === 3
                          ? 'bg-yellow-500/20 border-l border-b border-yellow-500/50'
                          : report.performance.rank === 4
                            ? 'bg-orange-500/20 border-l border-b border-orange-500/50'
                            : 'bg-red-500/20 border-l border-b border-red-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getPerformanceIcon(report.performance.rank)}
                      <span className="text-sm font-bold uppercase tracking-wider">
                        {report.performance.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row p-6 gap-6">
                    {/* Game Art */}
                    <div className="flex-shrink-0">
                      {imageUrl ? (
                        <div className="relative group">
                          <div className="absolute inset-0 bg-purple-500/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                          <img
                            src={imageUrl}
                            alt={report.game.title}
                            className="relative w-32 h-44 object-cover rounded-lg shadow-2xl"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-44 bg-purple-900/20 rounded-lg flex items-center justify-center">
                          <Info className="w-8 h-8 text-purple-400/50" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      {/* Game Title */}
                      <div>
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 mb-2">
                          {report.game.title}
                        </h3>
                        <p className="text-cyan-100/80 font-light">
                          {report.performance.description}
                        </p>
                      </div>

                      {/* Device Info Card */}
                      <div className="bg-black/60 backdrop-blur-xs border border-cyan-500/20 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Smartphone className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm font-semibold text-cyan-300">Device</span>
                            </div>
                            <p className="text-cyan-100">
                              {report.device?.brand?.name} {report.device?.modelName}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Cpu className="w-4 h-4 text-purple-400" />
                              <span className="text-sm font-semibold text-purple-300">
                                Processor
                              </span>
                            </div>
                            <p className="text-cyan-100">
                              {report.device?.soc?.manufacturer} {report.device?.soc?.name}
                            </p>
                            {report.device.soc?.gpuModel && (
                              <p className="text-xs text-cyan-100/60 mt-1">
                                {report.device?.soc.gpuModel} • {report.device?.soc?.architecture}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {report.notes && (
                        <div className="relative bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                          <div className="absolute -top-2 -left-2 text-4xl text-purple-500/30">
                            "
                          </div>
                          <p className="text-sm text-cyan-100 font-light italic relative z-10">
                            {report.notes}
                          </p>
                          <div className="absolute -bottom-2 -right-2 text-4xl text-purple-500/30 rotate-180">
                            "
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-sm text-cyan-100/60">
                          Reported by{' '}
                          <span className="text-purple-300 font-semibold">
                            {report.author.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1 text-green-400">
                              <TrendingUp className="w-4 h-4" />
                              <span>{report.upVotes}</span>
                            </div>
                            <span className="text-cyan-100/40">•</span>
                            <div className="flex items-center gap-1 text-red-400">
                              <TrendingDown className="w-4 h-4" />
                              <span>{report.downVotes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Loading More Indicator */}
        {!isInitialLoad && isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin mr-3" />
            <p className="text-cyan-100 font-light">Loading more reports...</p>
          </div>
        )}

        {/* No More Reports */}
        {!hasMore && reports.length > 0 && (
          <div className="text-center py-8">
            <p className="text-purple-300 font-light">No more reports to load</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && reports.length === 0 && (
          <div className="text-center py-20">
            <Info className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <p className="text-xl text-cyan-100 font-light">No compatibility reports found</p>
          </div>
        )}
      </div>

      <div className="text-center py-20">
        <a
          href="https://www.emuready.com"
          title="EmuReady Compatibility Reports"
          className="border-2 border-cyan-400 text-cyan-300 hover:text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-cyan-400/10"
        >
          SHOW ALL EDEN REPORTS ON EMUREADY
        </a>
      </div>
    </div>
  )
}

export default CompatibilityReportsPage
