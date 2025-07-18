import HeadingText from '@/components/HeadingText.tsx'
import { docSections } from '@/pages/Documentation/data.ts'
import DocumentationSection from '@/pages/Documentation/components/DocumentationSection.tsx'

const SHOW_DOCUMENTATION = false

function DocumentationPage() {
  return (
    <div className="bg-linear-to-b from-black via-blue-900/10 to-black relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <HeadingText
          title="DOCUMENTATION"
          description="Everything you need to know about using Eden Emulator, from setup to advanced features."
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
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-xl blur-sm" />

            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-wider">NEED MORE HELP?</h3>
              <p className="text-blue-100 mb-8">
                Join our community for help and discussions about Eden Emulator.
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
    </div>
  )
}

export default DocumentationPage
