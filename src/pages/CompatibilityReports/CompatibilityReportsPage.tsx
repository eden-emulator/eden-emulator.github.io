import { useState, useEffect, useCallback } from 'react'
import { Loader2, Smartphone, Cpu, TrendingUp, TrendingDown, Info } from 'lucide-react'
import type { CompatibilityReport, PaginationInfo } from './types'
import HeadingText from '@/components/HeadingText'
import RedirectModal from '@/components/RedirectModal'
import getGameImageUrl from '@/pages/CompatibilityReports/utils/getGameImageUrl'
import { EDEN_EMULATOR_ID, DEFAULT_PERFORMANCE_STYLE, PERFORMANCE_STYLES } from './data'
import { cn } from '@/utils/style'
import SEO from '@/components/SEO'
import PageWrapper from '@/components/PageWrapper'

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
  const [error, setError] = useState<string | null>(null)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    gameTitle: string
    listingId: string
  }>({
    isOpen: false,
    gameTitle: '',
    listingId: '',
  })

  const fetchReports = useCallback(
    async (pageNum: number) => {
      // Validate page number
      if (!pageNum || pageNum < 1 || isLoading) return

      setIsLoading(true)
      setError(null)

      try {
        const encodedInput = encodeURIComponent(
          JSON.stringify({
            '0': { json: { page: pageNum, limit: 10, emulatorIds: [EDEN_EMULATOR_ID] } },
          }),
        )

        // In development, use the Vite proxy to avoid CORS. In production, use direct API URL
        const apiUrl = import.meta.env.DEV
          ? '/api/emuready'
          : import.meta.env.VITE_EMUREADY_API_BASE_URL || 'https://www.emuready.com/api'

        const response = await fetch(
          `${apiUrl}/trpc/mobile.getListings?batch=1&input=${encodedInput}`,
        )
        const data = await response.json()

        if (data?.[0]?.result?.data?.json) {
          const { listings, pagination: paginationData } = data[0].result.data.json

          setReports(listings)
          setPagination(paginationData)
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
      }
    },
    [isLoading],
  )

  // Initial load
  useEffect(() => {
    fetchReports(1).catch(console.error)
  }, [fetchReports])

  const getPerformanceStyle = (rank: number) => {
    return PERFORMANCE_STYLES[rank as keyof typeof PERFORMANCE_STYLES] || DEFAULT_PERFORMANCE_STYLE
  }

  const handleReportClick = (report: CompatibilityReport) => {
    setModalState({
      isOpen: true,
      gameTitle: report.game.title,
      listingId: report.id,
    })
  }

  const handleModalClose = () => {
    setModalState({ isOpen: false, gameTitle: '', listingId: '' })
  }

  const handleModalConfirm = () => {
    window.open(`https://www.emuready.com/listings/${modalState.listingId}`, '_blank')
    handleModalClose()
  }

  return (
    <>
      <SEO
        title="Eden Emulator Game Compatibility - Performance Reports"
        description="Check game compatibility for Eden Emulator. Browse real-world performance reports from the community for Nintendo Switch games."
        keywords="Eden Emulator compatibility, Switch game compatibility, game performance reports, Eden game support"
        url="https://eden-emulator.github.io/compatibility"
      />

      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite',
            }}
          />
        </div>

        {/* Neon Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="GAME COMPATIBILITY"
            description="Real-world performance reports from the Eden community"
          />

          {/* Stats Bar */}
          {pagination.total > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <div className="bg-black/60 backdrop-blur-xs border border-purple-500/50 rounded-lg px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-purple-300 font-bold">{pagination.total}</span>
                  <span className="text-cyan-100/70 text-sm">Total Reports</span>
                </div>
              </div>
              <div className="bg-black/60 backdrop-blur-xs border border-cyan-500/50 rounded-lg px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-300 font-bold">{reports.length}</span>
                  <span className="text-cyan-100/70 text-sm">Loaded</span>
                </div>
              </div>
            </div>
          )}

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
            <div className="grid grid-cols-1 gap-8">
              {reports.map((report) => {
                const imageUrl = getGameImageUrl(report.game)
                const perfStyle = getPerformanceStyle(report.performance.rank)

                return (
                  <div key={report.id} className="group relative">
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
                      onClick={() => handleReportClick(report)}
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
                                alt={report.game.title}
                                aria-label={report.game.title}
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
                                {report.performance.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Content */}
                        <div className="flex-1 p-8 space-y-6">
                          <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full">
                              <span className="text-xs text-purple-300 font-medium">
                                Click for details
                              </span>
                            </div>
                          </div>

                          {/* Header */}
                          <div>
                            <h3 className="text-3xl font-bold mb-3">
                              <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400">
                                {report.game.title}
                              </span>
                            </h3>
                            <p className="text-lg text-cyan-100/90 font-light">
                              {report.performance.description}
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
                                  {report.device?.brand?.name} {report.device?.modelName}
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
                                  {report.device?.soc?.manufacturer} {report.device?.soc?.name}
                                </p>
                                {report.device.soc?.gpuModel && (
                                  <p className="text-xs text-cyan-100/60 mt-1">
                                    {report.device?.soc.gpuModel} •{' '}
                                    {report.device?.soc?.architecture}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          {report.notes && (
                            <div className="relative">
                              <div className="absolute inset-0 bg-purple-500/5 rounded-xl blur-xl" />
                              <div className="relative bg-black/60 backdrop-blur-xs border border-purple-500/30 rounded-xl p-6">
                                <div className="absolute -top-3 -left-3 text-5xl text-purple-400/20 font-serif">
                                  "
                                </div>
                                <p className="text-cyan-100 font-light italic relative z-10 pl-4">
                                  {report.notes}
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
                                  {report.author.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="text-sm text-cyan-100/60">Tested by</p>
                                <p className="text-purple-300 font-semibold -mt-1">
                                  {report.author.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-8">
                              <div className="flex items-center gap-2">
                                <button className="group/vote flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/30 transition-all duration-300 hover:bg-green-500/20 hover:border-green-500/50">
                                  <TrendingUp className="w-4 h-4 text-green-400 group-hover/vote:scale-110 transition-transform" />
                                  <span className="text-green-400 font-bold">{report.upVotes}</span>
                                </button>
                                <button className="group/vote flex items-center gap-2 px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/30 transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/50">
                                  <TrendingDown className="w-4 h-4 text-red-400 group-hover/vote:scale-110 transition-transform" />
                                  <span className="text-red-400 font-bold">{report.downVotes}</span>
                                </button>
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

          {/* Empty State */}
          {!isLoading && reports.length === 0 && (
            <div className="relative py-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
              </div>
              <div className="relative text-center">
                <div className="inline-flex p-6 bg-purple-500/10 rounded-full mb-6">
                  <Info className="w-16 h-16 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 mb-4">
                  No Reports Found
                </h3>
                <p className="text-lg text-cyan-100/70 font-light">
                  Be the first to test Eden Emulator and share your results!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="relative py-24">
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative text-center">
            <h3 className="text-2xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                Want to see more compatibility reports?
              </span>
            </h3>
            <a
              href="https://www.emuready.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
            >
              <span>VIEW ALL REPORTS ON EMUREADY</span>
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Redirect Modal */}
        <RedirectModal
          isOpen={modalState.isOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          gameTitle={modalState.gameTitle}
        />
      </PageWrapper>
    </>
  )
}

export default CompatibilityReportsPage
