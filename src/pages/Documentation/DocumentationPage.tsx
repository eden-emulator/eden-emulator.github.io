import { Book, FileText, Video, MessageCircle, ExternalLink } from 'lucide-react'

function DocumentationPage() {
  const docSections = [
    {
      icon: Book,
      title: 'GETTING STARTED',
      description: 'Quick setup guide and basic configuration',
      links: ['Installation Guide', 'First Time Setup', 'Basic Controls', 'ROM Management'],
      color: 'from-blue-400 to-blue-500',
    },
    {
      icon: FileText,
      title: 'USER MANUAL',
      description: 'Comprehensive documentation for all features',
      links: ['Advanced Settings', 'Controller Configuration', 'Save States', 'Cheats & Codes'],
      color: 'from-purple-400 to-purple-500',
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
      color: 'from-purple-400 to-blue-500',
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
      color: 'from-green-400 to-blue-500',
    },
  ]

  return (
    <div className="py-20 bg-linear-to-b from-black via-blue-900/10 to-black relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">DOCUMENTATION</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to master the art of retro gaming emulation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docSections.map((section, index) => (
            <div
              key={index}
              className="group relative bg-black/60 backdrop-blur-xs border border-blue-500/30 rounded-xl p-8 hover:border-purple-400/50 transition-all duration-500"
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
                    <h3 className="text-xl font-bold text-purple-300 tracking-wider">
                      {section.title}
                    </h3>
                    <p className="text-blue-200 text-sm">{section.description}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="group/link flex items-center justify-between text-blue-200 hover:text-purple-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30"
                      >
                        <span>{link}</span>
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
          <div className="relative bg-black/60 backdrop-blur-xs border border-purple-500/30 rounded-xl p-8">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-xl blur-sm"></div>

            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-wider">NEED MORE HELP?</h3>
              <p className="text-blue-100 mb-8">
                Join our community for real-time support and discussions
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-linear-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/50">
                  JOIN DISCORD
                </button>
                <button className="border-2 border-blue-400 text-blue-300 hover:text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-blue-400/10">
                  VISIT FORUMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentationPage
