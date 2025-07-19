import { memo } from 'react'
import { Cpu, Heart, Download, Zap } from 'lucide-react'
import edenLogo from '@/assets/logo_neon.png'
import { Link } from '@tanstack/react-router'
import { GitHubIcon } from '@/components/Icons'
import SEO from '@/components/SEO'
import SynthWaveBackground from '@/pages/Home/components/SynthWaveBackground.tsx'

function HomePage() {
  return (
    <>
      <SEO />
      <section className="relative bg-black overflow-hidden py-12 sm:py-16 lg:py-20 xl:min-h-screen xl:flex xl:items-center xl:justify-center">
        <SynthWaveBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-8">
            <img
              src={edenLogo}
              alt="Eden Emulator logo"
              className="mx-auto max-w-full h-auto max-h-60 mb-6 drop-shadow-2xl synthwave-logo-glow"
            />
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight font-orbitron">
            <span className="block text-white mb-2 text-shadow-cyan">Nintendo Switch</span>
            <span className="block text-white mt-2 text-shadow-pink">Emulator</span>
          </h1>

          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200 font-sans">
            <span className="font-bold text-synthwave-pink text-shadow-pink-sm">Eden</span> is an
            experimental open-source emulator for the Nintendo Switch, built with performance and
            stability in mind. It is written in C++ with cross-platform support for Windows, Linux
            and Android.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-14 mb-12">
            <Link
              to="/download"
              className="group relative text-white px-10 py-4 rounded-lg font-bold text-lg transition-transform duration-200 hover:scale-105 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black font-orbitron btn-synthwave-primary will-change-transform"
              aria-label="Download Eden Emulator"
            >
              <div
                className="absolute inset-0 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-200 btn-synthwave-primary-glow will-change-opacity"
                aria-hidden="true"
              />
              <div className="relative flex items-center space-x-3">
                <Download className="w-6 h-6 group-hover:animate-bounce" aria-hidden="true" />
                <span>DOWNLOAD</span>
              </div>
            </Link>

            <a
              href="https://git.eden-emu.dev/eden-emu/eden"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:text-white px-10 py-4 rounded-lg font-bold text-lg transition-transform duration-200 hover:scale-105 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black font-orbitron btn-synthwave-secondary will-change-transform"
              aria-label="View Eden Emulator source code on GitLab (opens in new tab)"
            >
              <div
                className="absolute inset-0 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-200 btn-synthwave-secondary-glow will-change-opacity"
                aria-hidden="true"
              />
              <div className="relative flex items-center space-x-3">
                <GitHubIcon className="w-6 h-6" aria-hidden="true" />
                <span>SOURCE CODE</span>
              </div>
            </a>
          </div>

          <nav
            className="flex flex-wrap justify-center items-center gap-8 text-synthwave-cyan"
            aria-label="Quick links"
          >
            <Link
              to="/features"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black font-audiowide link-synthwave-orange will-change-transform"
              aria-label="View Eden Emulator features"
            >
              <Zap className="w-6 h-6 text-synthwave-orange" aria-hidden="true" />
              <span className="font-bold">Features</span>
            </Link>

            <Link
              to="/system-requirements"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black font-audiowide link-synthwave-pink will-change-transform"
              aria-label="View system requirements for Eden Emulator"
            >
              <Cpu className="w-6 h-6 text-synthwave-pink" aria-hidden="true" />
              <span className="font-bold">System Requirements</span>
            </Link>

            <Link
              to="/donations"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black font-audiowide link-synthwave-yellow will-change-transform"
              aria-label="Download Eden Emulator"
            >
              <Heart className="w-6 h-6 text-synthwave-yellow" aria-hidden="true" />
              <span className="font-bold">Donations</span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  )
}

export default memo(HomePage)
