import { Heart } from 'lucide-react'
import { socialLinks, stats } from './data'
import HeadingText from '@/components/HeadingText.tsx'
import { cn } from '@/utils/style'

function CommunityPage() {
  return (
    <div className="bg-linear-to-b from-black via-purple-900/10 to-black relative overflow-hidden min-h-screen">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      ></div>

      {/* Neon Glow Effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"/>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadingText
          title="JOIN THE COMMUNITY"
          description="Connect with gamers, developers, and enthusiasts in the Eden Emulator community"
        />

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative text-center bg-black/60 backdrop-blur-xs border border-cyan-500/30 rounded-xl p-6 hover:border-pink-400/50 transition-all duration-500"
            >
              {/* Glow Effect */}
              <div
                className={cn(
                  'absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-20 rounded-xl blur-sm transition-all duration-500',
                  stat.color
                )}
              />

              <div className="relative">
                <div className="flex justify-center mb-4">
                  <div
                    className={cn(
                      'p-3 bg-linear-to-r rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300',
                      stat.color
                    )}
                  >
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-cyan-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-cyan-200 text-sm font-light tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
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
                  link.color
                )}
              />

              <div className="relative flex items-start space-x-6">
                <div
                  className={cn(
                    'p-4 bg-linear-to-r rounded-lg transition-all duration-300 shadow-lg group-hover:shadow-xl',
                    link.color,
                    link.hoverColor
                  )}
                >
                  <link.icon className="w-8 h-8 text-white" />
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
                      aria-label={`Join ${link.name}`}
                      className="text-pink-400 hover:text-cyan-300 font-bold transition-colors duration-300 tracking-wider"
                    >
                      JOIN NOW →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contributing Section */}
        <div className="relative bg-black/60 backdrop-blur-xs border border-pink-500/30 rounded-xl p-8 text-center">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl blur-sm"></div>

          <div className="relative">
            <div className="flex justify-center mb-6">
              <Heart className="w-16 h-16 text-pink-400 animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-cyan-400 mb-6 tracking-wider">
              HELP MAKE EDEN BETTER
            </h3>
            <p className="text-cyan-100 mb-8 max-w-2xl mx-auto font-light">
              Eden Emulator is open source and community-driven. Whether you're a developer,
              designer, we can use your help!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://git.eden-emu.dev/eden-emu/eden"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start Contributing on Git"
                className="bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-pink-500/50"
              >
                START CONTRIBUTING
              </a>
              <a
                href="https://git.eden-emu.dev/eden-emu/eden/issues"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Issues"
                className="border-2 border-cyan-400 text-cyan-300 hover:text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-cyan-400/10"
              >
                VIEW ISSUES
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-16" />
    </div>
  )
}

export default CommunityPage
