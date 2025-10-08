import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { Loader2, TrendingUp, Info } from 'lucide-react'
import type { CompatibilityReport, PaginationInfo } from './types'
import HeadingText from '@/components/HeadingText'
import RedirectModal from '@/components/RedirectModal'
import { EDEN_EMULATOR_ID } from './data'
import SEO from '@/components/SEO'
import PageWrapper from '@/components/PageWrapper'
import ReportCard from './components/ReportCard'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://eden-emu.dev'

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
  const hasInitialized = useRef(false)
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

        // Use environment variable if set, otherwise fallback based on dev/prod
        const apiUrl =
          import.meta.env.VITE_EMUREADY_API_BASE_URL ||
          (import.meta.env.DEV ? '/api/mobile/trpc' : 'https://www.emuready.com/api/mobile/trpc')

        const response = await fetch(`${apiUrl}/listings.get?batch=1&input=${encodedInput}`)
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
    if (hasInitialized.current) return
    hasInitialized.current = true
    fetchReports(1).catch(console.error)
  }, [fetchReports])

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
        title="Eden Game Compatibility - Performance Reports"
        description="Check game compatibility for Eden. Browse real-world performance reports from the community for Nintendo Switch games, powered by EmuReady."
        keywords="Eden compatibility, Switch game compatibility, game performance reports, Eden game support, EmuReady"
        url={`${APP_URL}/compatibility`}
      />

      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
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
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="Game Compatibility"
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
              {reports.map((report) => (
                <ReportCard key={report.id} report={report} onClick={handleReportClick} />
              ))}
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
                  Be the first to test Eden and share your results!
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
              aria-label="View all compatibility reports on EmuReady"
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

export default memo(CompatibilityReportsPage)
