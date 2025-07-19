import { Cpu, Download, Zap } from 'lucide-react'
import edenLogo from '@/assets/logo.png'
import { Link } from '@tanstack/react-router'
import { GitHubIcon } from '@/components/Icons'
import SEO from '@/components/SEO'

function HomePage() {
  return (
    <>
      <SEO />
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Subtle Animated Synthwave Background */}
        <div className="synthwave-animated-bg" aria-hidden="true">
          <div className="synthwave-gradient-animated"></div>
          <div className="synthwave-horizon"></div>
          <div className="synthwave-lines"></div>
          
          {/* Music Visualizer Bars */}
          <div className="music-bars">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="music-bar"
                style={{
                  height: `${20 + Math.sin(i * 0.3) * 30}px`,
                  animationDelay: `${i * 0.05}s`,
                  opacity: 0.6 - (Math.abs(i - 20) * 0.02)
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle Synthwave Neon Glow Effects */}
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
            opacity: 0.15
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 70%)',
            opacity: 0.15
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, var(--synthwave-purple) 0%, transparent 60%)',
            opacity: 0.1
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-8">
            <img
              src={edenLogo}
              alt="Eden Emulator logo"
              className="mx-auto max-w-full h-auto max-h-40 mb-6 drop-shadow-2xl"
              style={{
                filter:
                  'drop-shadow(0 0 30px var(--synthwave-hot-pink)) drop-shadow(0 0 60px var(--synthwave-cyan)) drop-shadow(0 0 90px var(--synthwave-purple))',
              }}
            />
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="block text-white mb-2" style={{ textShadow: '0 0 20px var(--synthwave-cyan), 0 0 40px var(--synthwave-cyan)' }}>Nintendo Switch</span>
            <span className="block text-white mt-2" style={{ textShadow: '0 0 20px var(--synthwave-hot-pink), 0 0 40px var(--synthwave-hot-pink)' }}>Emulator</span>
          </h1>

          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="font-bold" style={{ color: 'var(--synthwave-hot-pink)', textShadow: '0 0 10px var(--synthwave-hot-pink)' }}>Eden</span> is an experimental, open-source Nintendo
            Switch emulator built in C++ for Windows, Linux, macOS, and Android. It focuses on
            performance, accuracy, and a clean user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-14 mb-12">
            <Link
              to="/download"
              className="group relative text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black"
              style={{
                background: 'linear-gradient(135deg, var(--synthwave-hot-pink), var(--synthwave-purple))',
                border: '2px solid var(--synthwave-cyan)',
                boxShadow: '0 0 20px var(--synthwave-hot-pink), 0 0 40px var(--synthwave-purple), inset 0 0 20px rgba(255, 0, 255, 0.2)',
                fontFamily: 'Orbitron, sans-serif',
              }}
              aria-label="Download Eden Emulator"
            >
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--synthwave-hot-pink), var(--synthwave-purple))',
                }}
                aria-hidden="true"
              ></div>
              <div className="relative flex items-center space-x-3">
                <Download className="w-6 h-6 group-hover:animate-bounce" aria-hidden="true" />
                <span>DOWNLOAD NOW</span>
              </div>
            </Link>

            <a
              href="https://git.eden-emu.dev/eden-emu/eden"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black"
              style={{
                border: '2px solid var(--synthwave-cyan)',
                color: 'var(--synthwave-cyan)',
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                boxShadow: '0 0 15px var(--synthwave-cyan), inset 0 0 15px rgba(0, 255, 255, 0.1)',
                fontFamily: 'Orbitron, sans-serif',
              }}
              aria-label="View Eden Emulator source code on GitLab (opens in new tab)"
            >
              <div
                className="absolute inset-0 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  border: '2px solid var(--synthwave-cyan)',
                  boxShadow: '0 0 20px var(--synthwave-cyan)',
                }}
                aria-hidden="true"
              ></div>
              <div className="relative flex items-center space-x-3">
                <GitHubIcon className="w-6 h-6" aria-hidden="true" />
                <span>VIEW SOURCE</span>
              </div>
            </a>
          </div>

          <nav
            className="flex flex-wrap justify-center items-center gap-8"
            aria-label="Quick links"
            style={{ color: 'var(--synthwave-cyan)' }}
          >
            <Link
              to="/features"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                background: 'rgba(0, 255, 255, 0.1)',
                border: '2px solid var(--synthwave-cyan)',
                boxShadow: '0 0 10px var(--synthwave-cyan)',
                fontFamily: 'Audiowide, sans-serif',
              }}
              aria-label="View Eden Emulator features"
            >
              <Zap className="w-6 h-6" style={{ color: 'var(--synthwave-cyan)' }} aria-hidden="true" />
              <span className="font-bold">Features</span>
            </Link>

            <Link
              to="/system-requirements"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                background: 'rgba(255, 0, 255, 0.1)',
                border: '2px solid var(--synthwave-hot-pink)',
                boxShadow: '0 0 10px var(--synthwave-hot-pink)',
                fontFamily: 'Audiowide, sans-serif',
              }}
              aria-label="View system requirements for Eden Emulator"
            >
              <Cpu className="w-6 h-6" style={{ color: 'var(--synthwave-hot-pink)' }} aria-hidden="true" />
              <span className="font-bold">System Requirements</span>
            </Link>

            <Link
              to="/download"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                background: 'rgba(255, 235, 0, 0.1)',
                border: '2px solid var(--synthwave-yellow)',
                boxShadow: '0 0 10px var(--synthwave-yellow)',
                fontFamily: 'Audiowide, sans-serif',
              }}
              aria-label="Download Eden Emulator"
            >
              <Download className="w-6 h-6" style={{ color: 'var(--synthwave-yellow)' }} aria-hidden="true" />
              <span className="font-bold">Download</span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  )
}

export default HomePage
