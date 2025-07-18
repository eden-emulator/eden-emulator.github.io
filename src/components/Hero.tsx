import { Download, Star, Zap } from 'lucide-react'
import edenLogo from '@/assets/logo.png'
import { GitHubIcon } from '@/components/Icons'

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-linear-to-b from-black via-purple-900/20 to-black overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite',
          }}
        ></div>
      </div>

      {/* Neon Glow Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="mb-8">
          <img
            src={edenLogo}
            alt="Eden Emulator Banner"
            className="mx-auto max-w-full h-auto max-h-40 mb-6 drop-shadow-2xl"
            style={{
              filter:
                'drop-shadow(0 0 20px rgba(255, 0, 255, 0.5)) drop-shadow(0 0 40px rgba(0, 255, 255, 0.3))',
            }}
          />
        </div>

        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400">
            Nintendo Switch
          </span>
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-pink-400 to-purple-400 mt-2">
            Emulator
          </span>
        </h1>

        <p className="text-xl text-cyan-100 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
          Experience the golden age of gaming with cutting-edge emulation technology.
          <span className="text-pink-300"> Eden Emulator </span>
          brings your favorite classics into the neon-soaked future.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="group relative bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/50 border border-pink-400/50 flex items-center space-x-3">
            <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              <span>DOWNLOAD NOW</span>
            </div>
          </button>

          <button className="group relative border-2 border-cyan-400 text-cyan-300 hover:text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-cyan-400/10 flex items-center space-x-3">
            <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <GitHubIcon className="w-6 h-6" />
              <span>VIEW SOURCE</span>
            </div>
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 text-cyan-200">
          <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-xs border border-pink-500/30 rounded-full px-6 py-3">
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="font-bold">4.8★ RATING</span>
          </div>
          <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-xs border border-cyan-500/30 rounded-full px-6 py-3">
            <Download className="w-6 h-6 text-green-400 animate-pulse" />
            <span className="font-bold">1M+ DOWNLOADS</span>
          </div>
          <div className="flex items-center space-x-3 bg-black/30 backdrop-blur-xs border border-purple-500/30 rounded-full px-6 py-3">
            <Zap className="w-6 h-6 text-purple-400 animate-pulse" />
            <span className="font-bold">500+ GAMES</span>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
