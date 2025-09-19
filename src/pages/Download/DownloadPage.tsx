import { memo, useMemo } from 'react'
import { Download } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import HeadingText from '@/components/HeadingText.tsx'
import { cn } from '@/utils/style'
import getDynamicPlatforms from '@/pages/Download/utils/getDynamicPlatforms.ts'
import SEO from '@/components/SEO'
import PageWrapper from '@/components/PageWrapper'
import playstoreBadge from '@/assets/playstore_badge.png'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://eden-emu.dev'

function DownloadPage() {
  const platformOptions = useMemo(() => getDynamicPlatforms(), [])

  return (
    <>
      <SEO
        title="Download Eden - Windows, Linux, macOS, FreeBSD, Solaris, OpenBSD, and Android"
        description="Download the latest version of Eden for your platform. Available for Windows, Linux, macOS, FreeBSD, Solaris, OpenBSD, and Android with regular updates and improvements."
        keywords="download Eden, Eden Switch emulator download, free Switch emulator, emulator download"
        url={`${APP_URL}/download`}
      />
      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/8 rounded-full blur-xl animate-float will-change-transform" />
          <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-pink-500/8 rounded-full blur-xl animate-subtle-pulse-delay-2 will-change-transform" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-xl animate-float-delay-3 will-change-transform" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="Download Eden"
            description="Choose your platform and have some fun."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {platformOptions.map((platform) => (
              <article
                key={platform.platform}
                className={cn(
                  'relative group bg-black/60 backdrop-blur-xs border rounded-xl p-6 transition-transform duration-300 hover:scale-105 will-change-transform',
                  platform.primary
                    ? 'border-purple-400 shadow-lg shadow-purple-500/50'
                    : 'border-blue-500/30 hover:border-purple-400/50',
                )}
                role="listitem"
              >
                {platform.primary && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-linear-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                {/* Glow Effect */}
                <div
                  className={cn(
                    'absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-8 rounded-xl blur-sm transition-opacity duration-300 will-change-opacity',
                    platform.color,
                  )}
                  aria-hidden="true"
                />

                <div className="relative text-center">
                  <div className="flex justify-center mb-6">
                    <div
                      className={cn(
                        'p-4 bg-linear-to-r rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300',
                        platform.color,
                      )}
                    >
                      <platform.icon className="w-8 h-8 text-black" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-purple-300 mb-4 tracking-wider">
                    {platform.name}
                  </h3>

                  <div className="text-blue-200 text-sm mb-6 space-y-2">
                    <p className="font-bold">Version {platform.version}</p>
                    <p>{platform.size}</p>
                    <p className="text-xs text-blue-300 h-10">{platform.requirements}</p>
                  </div>
                  <div className="mt-auto">
                    {platform.name === 'ANDROID' ? (
                      <a
                        href={platform.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get Eden on Google Play - opens in new tab`}
                        className="inline-block transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                      >
                        <img
                          src={playstoreBadge}
                          alt="Get it on Google Play"
                          className="w-full h-[48px]"
                        />
                      </a>
                    ) : (
                      <button
                        onClick={() => window.open(platform.downloadUrl, '_blank')}
                        className={cn(
                          'w-full py-3 px-4 rounded-lg font-bold transition-colors duration-200 flex items-center justify-center space-x-2 tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black',
                          platform.primary
                            ? 'bg-linear-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white shadow-lg shadow-purple-500/50'
                            : 'border-2 border-blue-400 text-blue-300 hover:bg-blue-400/10 hover:text-white',
                        )}
                        aria-label={`Download Eden for ${platform.name} (${platform.version}, ${platform.size}) - opens in new tab`}
                      >
                        <Download className="w-5 h-5" aria-hidden="true" />
                        <span>DOWNLOAD</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-blue-200 mb-6">
              Need help with installation? Check out our guides. (We will have them soon, I
              promise.)
            </p>
            <nav className="flex flex-wrap justify-center gap-6" aria-label="Additional resources">
              <a
                href="https://youtu.be/dQw4w9WgXcQ?si=fUtiLmNrE2OBBnq3"
                className="text-purple-400 hover:text-blue-300 transition-colors font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="Installation guide (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Installation Guide
              </a>
              <span className="text-purple-500" aria-hidden="true">
                •
              </span>
              <Link
                to="/system-requirements"
                className="text-purple-400 hover:text-blue-300 transition-colors font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="View system requirements"
              >
                System Requirments
              </Link>
              <span className="text-purple-500" aria-hidden="true">
                •
              </span>
              <a
                href="https://youtu.be/dQw4w9WgXcQ?si=fUtiLmNrE2OBBnq3"
                className="text-purple-400 hover:text-blue-300 transition-colors font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                aria-label="Troubleshooting guide (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Troubleshooting
              </a>
            </nav>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export default memo(DownloadPage)
