import { Cpu, Download, Zap } from 'lucide-react'
import edenLogo from '@/assets/logo.png'
import { Link } from '@tanstack/react-router'
import { GitHubIcon } from '@/components/Icons'

function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linear-to-b from-black via-purple-900/20 to-black overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-500/5 to-transparent"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite',
          }}
        ></div>
      </div>

      {/* Neon Glow Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="mb-8">
          <img
            src={edenLogo}
            alt="Eden Emulator Banner"
            className="mx-auto max-w-full h-auto max-h-40 mb-6 drop-shadow-2xl"
            style={{
              filter:
                'drop-shadow(0 0 20px rgba(147, 51, 234, 0.5)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))',
            }}
          />
        </div>

        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-white mb-2">Nintendo Switch</span>
          <span className="block text-purple-400 mt-2">Emulator</span>
        </h1>

        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          <span className="text-purple-300">Eden</span> is an experimental, open-source Nintendo
          Switch emulator built in C++ for Windows, Linux, macOs, and Android. It focuses on
          performance, accuracy, and a clean user experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-14 mb-12">
          <Link
            to="/download"
            className="group relative bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 border border-purple-400/50 flex items-center space-x-3"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>DOWNLOAD NOW</span>
            </div>
          </Link>

          <a
            href="https://git.eden-emu.dev/eden-emu/eden"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative border-2 border-blue-400 text-blue-300 hover:text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-blue-400/10 flex items-center space-x-3"
          >
            <div className="absolute inset-0 border-2 border-blue-400 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <GitHubIcon className="w-6 h-6" />
              <span>VIEW SOURCE</span>
            </div>
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200">

          <Link
            to="/features"
            className="flex items-center space-x-3 bg-black/30 backdrop-blur-xs border border-blue-500/30 rounded-full px-6 py-3 hover:bg-blue-500/10 transition-colors"
          >
            <Zap className="w-6 h-6 text-blue-400" />
            <span className="font-bold">Features</span>
          </Link>

          <Link
            to="/system-requirements"
            className="flex items-center space-x-3 bg-black/30 backdrop-blur-xs border border-purple-500/30 rounded-full px-6 py-3 hover:bg-purple-500/10 transition-colors"
          >
            <Cpu className="w-6 h-6 text-purple-400" />
            <span className="font-bold">System Requirements</span>
          </Link>

          <Link
            to="/download"
            className="flex items-center space-x-3 bg-black/30 backdrop-blur-xs border border-green-500/30 rounded-full px-6 py-3 hover:bg-green-500/10 transition-colors"
          >
            <Download className="w-6 h-6 text-green-400" />
            <span className="font-bold">Download</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomePage
