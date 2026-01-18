import { memo, useEffect } from 'react'

function DocumentationPage() {
  useEffect(() => {
    window.location.replace('https://eden-emu.dev/docs')
  }, [])

  return null
}

export default memo(DocumentationPage)

/*
import { memo } from 'react'
import HeadingText from '@/components/HeadingText'
import { docSections } from '@/pages/Documentation/data'
import DocumentationSection from '@/pages/Documentation/components/DocumentationSection'
import PageWrapper from '@/components/PageWrapper'

const SHOW_DOCUMENTATION = false

function DocumentationPage() {
  return (
    <PageWrapper>
      <div className="h-24 md:h-34" />

      {/* Background Effects */} /*
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-xl animate-float will-change-transform" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-xl animate-subtle-pulse-delay-2 will-change-transform" />
        <div className="absolute top-0 left-1/4 w-60 h-60 bg-cyan-500/8 rounded-full blur-xl animate-float-delay-3 will-change-transform" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-pink-500/8 rounded-full blur-xl animate-subtle-pulse will-change-transform" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <HeadingText
          title="Documentation"
          description="Everything you need to know about using Eden, from setup to advanced features."
        />

        {SHOW_DOCUMENTATION ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docSections.map((section) => (
              <DocumentationSection key={section.title} section={section} />
            ))}
          </div>
        ) : (
          <div className="text-center text-blue-200 mt-16">
            <h5 className="text-xl text-cyan-100 max-w-3xl mx-auto font-extrabold tracking-wider">
              Documentation is coming soon!
            </h5>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="relative bg-black/60 backdrop-blur-xs border border-purple-500/30 rounded-xl p-8">
            {/* Glow Effect */} /*
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-xl blur-sm" />

            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-wider">NEED MORE HELP?</h3>
              <p className="text-blue-100 mb-8">
                Join our community for help and discussions about Eden.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="https://discord.gg/edenemu"
                  target="_blank"
                  className="bg-linear-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/50"
                >
                  JOIN DISCORD
                </a>
                <a
                  href="https://www.emuready.com/listings?emulatorIds=%5B%2243bfc023-ec22-422d-8324-048a8ec9f28f%22%5D"
                  target="_blank"
                  className="border-2 border-blue-400 text-blue-300 hover:text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-blue-400/10"
                >
                  COMPATIBILITY REPORTS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default memo(DocumentationPage) */
