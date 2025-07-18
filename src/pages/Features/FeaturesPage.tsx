import { features } from './data'
import HeadingText from '@/components/HeadingText.tsx'

function FeaturesPage() {
  return (
    <div className="bg-linear-to-b from-black via-purple-900/10 to-black relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadingText
          title="SWITCH EMULATION"
          description="Written in C++ with cross-platform support for Windows, Linux and Android. (And macOS? Maybe?)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-xs border border-pink-500/30 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(139,69,19,0.1) 50%, rgba(0,0,0,0.8) 100%)',
              }}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-xl blur-sm transition-all duration-500`}
              />

              <div className="relative">
                <div className="flex items-center mb-6">
                  <div
                    className={`p-4 rounded-lg bg-linear-to-r ${feature.color} shadow-lg ${feature.glow} group-hover:shadow-xl transition-all duration-300`}
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
    </div>
  )
}

export default FeaturesPage
