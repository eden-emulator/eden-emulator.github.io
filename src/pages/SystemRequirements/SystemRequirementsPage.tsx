import { Monitor, Cpu, HardDrive, Smartphone, Activity } from 'lucide-react'
import { requirements } from './data'
import HeadingText from '@/components/HeadingText.tsx'
import PageWrapper from '@/components/PageWrapper'
import SEO from '@/components/SEO'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://eden-emu.dev'

function SystemRequirementsPage() {
  return (
    <>
      <SEO
        title="Eden System Requirements - OS, CPU, GPU, RAM Specs"
        description="Discover the system requirements for running Eden emulator. Check CPU, GPU, RAM and OS specs for optimal performance on Windows, Linux, macOS, FreeBSD, Solaris, OpenBSD, and Android devices."
        keywords="Eden system requirements, Switch emulator requirements, CPU GPU RAM specs, Eden emulator specs"
        url={`${APP_URL}/system-requirements`}
      />

      <PageWrapper>
        <div className="h-24 md:h-34" />
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Top section glows */}
          <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-subtle-pulse" />
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-subtle-pulse-delay-2" />

          {/* Middle section glows - positioned throughout the page */}
          <div className="absolute top-[30%] left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delay-1" />
          <div className="absolute top-[45%] right-1/3 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-3xl animate-subtle-pulse-delay-3" />
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-float-slow-delay-2" />
          <div className="absolute top-[75%] right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-subtle-pulse-delay-4" />

          {/* Bottom section glows */}
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delay-3" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeadingText
            title="System Requirements"
            description="Run Eden on your handheld, desktop or Android device with these recommended specifications"
          />

          {/* CPU Requirements */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25">
                <Cpu className="w-6 h-6 text-black" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-pink-300">
                CPU REQUIREMENTS
              </h3>
            </div>

            <p className="text-cyan-100 mb-8 font-light">
              Any amd64 CPU with support for the FMA instruction set, or an ARM64-v8a or newer CPU.
              6 threads or more are recommended.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Desktop CPU */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-cyan-300 mb-4">Desktop CPU</h4>
                <p className="text-cyan-100/80 text-sm mb-4 font-light h-10">
                  Or any other CPU with similar performance.
                </p>
                {requirements.cpu.desktop.map((req, index) => (
                  <div
                    key={index}
                    className="group relative bg-black/40 backdrop-blur-xs border border-purple-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500" />
                    <div className="relative">
                      <h5 className="text-sm font-bold text-pink-400 mb-2 uppercase tracking-wider">
                        {req.level}
                      </h5>
                      <p className="text-cyan-100 font-light">{req.specs}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Laptop CPU */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-cyan-300 mb-4">Laptop CPU</h4>
                <p className="text-cyan-100/80 text-sm mb-4 font-light h-10">
                  Mobile and Laptop CPUs generally need to be far newer to effectively run Eden due
                  to their thermal throttling and lower power draw.
                </p>
                {requirements.cpu.laptop.map((req, index) => (
                  <div
                    key={index}
                    className="group relative bg-black/40 backdrop-blur-xs border border-purple-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500" />
                    <div className="relative">
                      <h5 className="text-sm font-bold text-pink-400 mb-2 uppercase tracking-wider">
                        {req.level}
                      </h5>
                      <p className="text-cyan-100 font-light">{req.specs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Graphics Requirements */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25">
                <Monitor className="w-6 h-6 text-black" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-300">
                GRAPHICS REQUIREMENTS
              </h3>
            </div>

            <p className="text-cyan-100 mb-8 font-light">
              OpenGL 4.6 or Vulkan 1.1 compatible hardware and drivers are mandatory. Half-float
              support and VP9 decoding support are recommended.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dedicated Graphics */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-cyan-300 mb-4">Dedicated Graphics</h4>
                <p className="text-cyan-100/80 text-sm mb-4 font-light h-10">
                  Dedicated graphics cards are recommended for the best performance and
                  compatibility. Integrated graphics may work, but with significantly lower
                  performance.
                </p>
                {requirements.graphics.dedicated.map((req, index) => (
                  <div
                    key={index}
                    className="group relative bg-black/40 backdrop-blur-xs border border-cyan-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500" />
                    <div className="relative">
                      <h5 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                        {req.level}
                      </h5>
                      <p className="text-cyan-100 font-light">{req.specs}</p>
                      {req.note && (
                        <p className="text-cyan-100/60 text-sm mt-2 italic">{req.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Integrated Graphics */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-cyan-300 mb-4">Integrated Graphics</h4>
                <p className="text-cyan-100/80 text-sm mb-4 font-light h-10">
                  Integrated graphics will produce very low performance. A dedicated GPU will
                  produce better results on all scenarios. This is only for listing iGPU support.
                </p>
                <div className="space-y-4">
                  <h5 className="text-lg font-semibold text-purple-300">Windows</h5>
                  {requirements.graphics.integrated.windows.map((req, index) => (
                    <div
                      key={index}
                      className="group relative bg-black/40 backdrop-blur-xs border border-cyan-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500" />
                      <div className="relative">
                        <h5 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                          {req.level}
                        </h5>
                        <p className="text-cyan-100 font-light">{req.specs}</p>
                      </div>
                    </div>
                  ))}

                  <h5 className="text-lg font-semibold text-purple-300 pt-4">Linux</h5>
                  {requirements.graphics.integrated.linux.map((req, index) => (
                    <div
                      key={index}
                      className="group relative bg-black/40 backdrop-blur-xs border border-cyan-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500" />
                      <div className="relative">
                        <h5 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                          {req.level}
                        </h5>
                        <p className="text-cyan-100 font-light">{req.specs}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Android Graphics */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-cyan-300 mb-4">
                <Smartphone className="inline-block w-5 h-5 mr-2" />
                Android Graphics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requirements.graphics.android.map((req, index) => (
                  <div
                    key={index}
                    className="group relative bg-black/40 backdrop-blur-xs border border-purple-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500" />
                    <div className="relative">
                      <h5 className="text-sm font-bold text-pink-400 mb-2 uppercase tracking-wider">
                        {req.level}
                      </h5>
                      <p className="text-cyan-100 font-light">{req.specs}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RAM Requirements */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-lg bg-linear-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/25">
                <HardDrive className="w-6 h-6 text-black" />
              </div>
              <h3 className="ml-4 text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-purple-300">
                RAM REQUIREMENTS
              </h3>
            </div>

            <p className="text-cyan-100 mb-8 font-light">
              Since an integrated GPU uses system RAM as its video memory (VRAM), our memory
              requirement in this configuration is higher. Highest possible frequency is strongly
              recommended.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(requirements.ram).map(([category, specs]) => (
                <div key={category} className="space-y-4">
                  <h4 className="text-xl font-bold text-purple-300 capitalize">
                    {category === 'igpu' ? 'Laptop/iGPU Desktop' : category.replace('_', ' ')}
                  </h4>
                  {specs.map((spec) => (
                    <div
                      key={spec.amount}
                      className="group relative bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-500"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500" />
                      <div className="relative">
                        <h5 className="text-sm font-bold text-pink-400 mb-2 uppercase tracking-wider">
                          {spec.level}
                        </h5>
                        <p className="text-2xl font-bold text-cyan-100">{spec.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-500/20 rounded-full border border-purple-500/50">
              <Activity className="w-5 h-5 text-purple-300" />
              <span className="text-purple-200 font-light">
                Powered by C++. Throttled by potatoes
              </span>
            </div>
          </div>
          <div className="h-16" />
        </div>
      </PageWrapper>
    </>
  )
}

export default SystemRequirementsPage
