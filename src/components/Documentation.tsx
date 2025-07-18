import { Book, FileText, Video, MessageCircle, ExternalLink } from 'lucide-react'

function Documentation() {
  const docSections = [
    {
      icon: Book,
      title: 'GETTING STARTED',
      description: 'Quick setup guide and basic configuration',
      links: ['Installation Guide', 'First Time Setup', 'Basic Controls', 'ROM Management'],
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: FileText,
      title: 'USER MANUAL',
      description: 'Comprehensive documentation for all features',
      links: ['Advanced Settings', 'Controller Configuration', 'Save States', 'Cheats & Codes'],
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Video,
      title: 'VIDEO TUTORIALS',
      description: 'Step-by-step video guides and walkthroughs',
      links: [
        'Setup Walkthrough',
        'Performance Optimization',
        'Shader Configuration',
        'Multiplayer Setup',
      ],
      color: 'from-pink-400 to-red-500',
    },
    {
      icon: MessageCircle,
      title: 'FAQ & SUPPORT',
      description: 'Common questions and troubleshooting help',
      links: [
        'Frequently Asked Questions',
        'Troubleshooting Guide',
        'Performance Issues',
        'Contact Support',
      ],
      color: 'from-green-400 to-cyan-500',
    },
  ]

  return (
    <section
      id="docs"
      className="py-20 bg-linear-to-b from-black via-cyan-900/10 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              DOCUMENTATION
            </span>
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto font-light">
            Everything you need to master the art of retro gaming emulation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docSections.map((section, index) => (
            <div
              key={index}
              className="group relative bg-black/60 backdrop-blur-xs border border-cyan-500/30 rounded-xl p-8 hover:border-pink-400/50 transition-all duration-500"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 bg-linear-to-r ${section.color} opacity-0 group-hover:opacity-10 rounded-xl blur-sm transition-all duration-500`}
              ></div>

              <div className="relative">
                <div className="flex items-center mb-6">
                  <div
                    className={`p-4 bg-linear-to-r ${section.color} rounded-lg mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <section.icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-cyan-300 tracking-wider">
                      {section.title}
                    </h3>
                    <p className="text-cyan-200 text-sm font-light">{section.description}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="group/link flex items-center justify-between text-cyan-200 hover:text-pink-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-pink-500/10 border border-transparent hover:border-pink-500/30"
                      >
                        <span className="font-light">{link}</span>
                        <ExternalLink className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transition-opacity duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative bg-black/60 backdrop-blur-xs border border-pink-500/30 rounded-xl p-8">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl blur-sm"></div>

            <div className="relative">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-cyan-400 mb-4 tracking-wider">
                NEED MORE HELP?
              </h3>
              <p className="text-cyan-100 mb-8 font-light">
                Join our neon-lit community for real-time support and discussions
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-pink-500/50">
                  JOIN DISCORD
                </button>
                <button className="border-2 border-cyan-400 text-cyan-300 hover:text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-cyan-400/10">
                  VISIT FORUMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Documentation
