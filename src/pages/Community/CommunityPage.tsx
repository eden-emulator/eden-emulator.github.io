import { memo } from 'react'
import { Heart } from 'lucide-react'
import { socialLinks, stats } from './data'
import HeadingText from '@/components/HeadingText.tsx'
import { cn } from '@/utils/style'
import SEO from '@/components/SEO'
import PageWrapper from '@/components/PageWrapper'

function CommunityPage() {
  return (
    <>
      <SEO
        title="Eden Community - Join Discord, GitHub & More"
        description="Join the Eden community. Connect with thousands of gamers and developers on Discord, contribute on GitHub, and help improve the emulator."
        keywords="Eden community, Switch emulator Discord, Eden GitHub, emulator community"
        url="https://eden-emulator.github.io/community"
      />
      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-pink-500/8 rounded-full blur-xl animate-subtle-pulse will-change-transform" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-xl animate-float-delay-3 will-change-transform" />
          <div className="absolute top-20 right-1/3 w-60 h-60 bg-purple-500/8 rounded-full blur-xl animate-subtle-pulse-delay-2 will-change-transform" />
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-xl animate-float will-change-transform" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="JOIN THE COMMUNITY"
            description="Connect with gamers, developers, and enthusiasts in the Eden community"
          />

          {/* Community Stats */}
          <section aria-label="Community statistics">
            <h2 className="sr-only">Community Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative text-center bg-black/60 backdrop-blur-xs border border-cyan-500/30 rounded-xl p-6 hover:border-pink-400/50 transition-colors duration-300"
                >
                  {/* Glow Effect */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-20 rounded-xl blur-sm transition-all duration-500',
                      stat.color,
                    )}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="flex justify-center mb-4">
                      <div
                        className={cn(
                          'p-3 bg-linear-to-r rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300',
                          stat.color,
                        )}
                      >
                        <stat.icon className="w-6 h-6 text-black" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-cyan-300 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-cyan-200 text-sm font-light tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social Links */}
          <section aria-label="Community platforms">
            <h2 className="sr-only">Join Our Community Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {socialLinks.map((link) => (
                <div
                  key={link.name}
                  className="group relative bg-black/60 backdrop-blur-xs border border-cyan-500/30 rounded-xl p-8 hover:border-pink-400/50 transition-all duration-500"
                >
                  {/* Glow Effect */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500',
                      link.color,
                    )}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start space-x-6">
                    <div
                      className={cn(
                        'p-4 bg-linear-to-r rounded-lg transition-all duration-300 shadow-lg group-hover:shadow-xl',
                        link.color,
                        link.hoverColor,
                      )}
                    >
                      <link.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-cyan-300 mb-3 tracking-wider">
                        {link.name}
                      </h3>
                      <p className="text-cyan-100 mb-4 font-light">{link.description}</p>
                      <div className="flex items-center justify-between">
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Join Eden on ${link.name} (opens in new tab)`}
                          className="text-pink-400 hover:text-cyan-300 font-bold transition-colors duration-300 tracking-wider focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                        >
                          JOIN NOW →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contributing Section */}
          <section
            className="relative bg-black/60 backdrop-blur-xs border border-pink-500/30 rounded-xl p-8 text-center"
            aria-labelledby="contribute-heading"
          >
            {/* Glow Effect */}
            <div
              className="absolute inset-0 bg-linear-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl blur-sm"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex justify-center mb-6">
                <Heart className="w-16 h-16 text-pink-400 animate-pulse" aria-hidden="true" />
              </div>
              <h3
                id="contribute-heading"
                className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-cyan-400 mb-6 tracking-wider"
              >
                HELP MAKE EDEN BETTER
              </h3>
              <p className="text-cyan-100 mb-8 max-w-2xl mx-auto font-light">
                Eden is open source and community-driven. Whether you're a developer, designer, we
                can use your help!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="https://git.eden-emu.dev/eden-emu/eden"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Start Contributing on GitLab (opens in new tab)"
                  className="bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  START CONTRIBUTING
                </a>
                <a
                  href="https://git.eden-emu.dev/eden-emu/eden/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project issues on GitLab (opens in new tab)"
                  className="border-2 border-cyan-400 text-cyan-300 hover:text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  VIEW ISSUES
                </a>
              </div>
            </div>
          </section>
        </div>
        <div className="h-16" />
      </PageWrapper>
    </>
  )
}

export default memo(CommunityPage)
