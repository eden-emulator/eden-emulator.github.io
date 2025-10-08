import { memo } from 'react'
import { features } from './data'
import HeadingText from '@/components/HeadingText'
import { cn } from '@/utils/style'
import SEO from '@/components/SEO'
import PageWrapper from '@/components/PageWrapper'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://eden-emu.dev'

function FeaturesPage() {
  return (
    <>
      <SEO
        title="Eden Features - High Performance Switch Emulation"
        description="Explore Eden's features: high performance emulation, cross-platform support, clean interface, and active development. Experience Switch games on your device."
        keywords="Eden features, Switch emulator features, emulation performance, cross-platform emulator"
        url={`${APP_URL}/features`}
      />
      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/8 rounded-full blur-xl animate-subtle-pulse will-change-transform" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-xl animate-subtle-pulse-delay-2 will-change-transform" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="Eden"
            description="Written in C++ with cross-platform support for Windows, Linux and Android."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-xl p-8 hover:border-cyan-400/50 transition-transform duration-300 hover:scale-105 will-change-transform"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(139,69,19,0.1) 50%, rgba(0,0,0,0.8) 100%)',
                }}
              >
                {/* Glow Effect */}
                <div
                  className={cn(
                    'absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-15 rounded-xl blur-sm transition-opacity duration-300 will-change-opacity',
                    feature.color,
                  )}
                />

                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div
                      className={cn(
                        'p-4 rounded-lg bg-linear-to-r shadow-lg group-hover:shadow-xl transition-all duration-300',
                        feature.color,
                        feature.glow,
                      )}
                    >
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-cyan-300 mb-4 tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-100 leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-16" />
      </PageWrapper>
    </>
  )
}

export default memo(FeaturesPage)
