import {
  Download as DownloadIcon,
  AppWindow as Windows,
  Apple,
  Smartphone,
  Monitor,
} from 'lucide-react'

function Download() {
  const platforms = [
    {
      name: 'WINDOWS',
      icon: Windows,
      version: 'v2.1.0',
      size: '45.2 MB',
      requirements: 'Windows 10/11 (64-bit)',
      downloadUrl: 'https://github.com/eden-emulator/Releases/releases',
      primary: true,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      name: 'MACOS',
      icon: Apple,
      version: 'v2.1.0',
      size: '52.8 MB',
      requirements: 'macOS 11.0 or later',
      downloadUrl: 'https://github.com/eden-emulator/Releases/releases',
      primary: false,
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'LINUX',
      icon: Monitor,
      version: 'v2.1.0',
      size: '38.4 MB',
      requirements: 'Ubuntu 20.04+ / Fedora 35+',
      downloadUrl: 'https://github.com/eden-emulator/Releases/releases',
      primary: false,
      color: 'from-orange-400 to-red-500',
    },
    {
      name: 'MOBILE',
      icon: Smartphone,
      version: 'v1.8.0',
      size: '28.1 MB',
      requirements: 'Android 8.0+ / iOS 14+',
      downloadUrl: 'https://github.com/eden-emulator/Releases/releases',
      primary: false,
      color: 'from-green-400 to-emerald-500',
    },
  ]

  return (
    <section
      id="download"
      className="py-20 bg-linear-to-b from-black via-pink-900/10 to-black relative overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Neon Glow Effects */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-pink-400 to-purple-400">
              DOWNLOAD EDEN
            </span>
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto font-light">
            Choose your platform and enter the neon-soaked world of retro gaming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className={`relative group bg-black/60 backdrop-blur-xs border rounded-xl p-6 transition-all duration-500 hover:transform hover:scale-105 ${
                platform.primary
                  ? 'border-pink-400 shadow-lg shadow-pink-500/50'
                  : 'border-cyan-500/30 hover:border-pink-400/50'
              }`}
            >
              {platform.primary && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-linear-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
                    RECOMMENDED
                  </span>
                </div>
              )}

              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-linear-to-r ${platform.color} opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500`}
              ></div>

              <div className="relative text-center">
                <div className="flex justify-center mb-6">
                  <div
                    className={`p-4 bg-linear-to-r ${platform.color} rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <platform.icon className="w-8 h-8 text-black" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-cyan-300 mb-4 tracking-wider">
                  {platform.name}
                </h3>

                <div className="text-cyan-200 text-sm mb-6 space-y-2 font-light">
                  <p className="font-bold">Version {platform.version}</p>
                  <p>{platform.size}</p>
                  <p className="text-xs text-cyan-300">{platform.requirements}</p>
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2 tracking-wider ${
                    platform.primary
                      ? 'bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-lg shadow-pink-500/50'
                      : 'border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:text-white'
                  }`}
                >
                  <DownloadIcon className="w-5 h-5" />
                  <span>DOWNLOAD</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-cyan-200 mb-6 font-light">
            Need help with installation? Check out our retro-styled guides.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="text-pink-400 hover:text-cyan-300 transition-colors font-bold tracking-wider"
            >
              INSTALLATION GUIDE
            </a>
            <span className="text-purple-500">•</span>
            <a
              href="#"
              className="text-pink-400 hover:text-cyan-300 transition-colors font-bold tracking-wider"
            >
              SYSTEM REQUIREMENTS
            </a>
            <span className="text-purple-500">•</span>
            <a
              href="#"
              className="text-pink-400 hover:text-cyan-300 transition-colors font-bold tracking-wider"
            >
              TROUBLESHOOTING
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download
