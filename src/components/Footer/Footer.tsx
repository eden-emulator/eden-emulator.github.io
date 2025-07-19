import { Heart, ExternalLink, LinkIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import edenLogo from '@/assets/logo.png'
import { footerLinks, socialLinks } from '@/components/Footer/data.ts'
import { cn } from '@/utils/style'

function Footer() {
  return (
    <footer className="bg-black border-t border-purple-500/30 relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img
                src={edenLogo}
                alt="Eden Emulator Logo"
                className="h-10 w-10"
                style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))' }}
              />
              <span className="text-xl font-bold text-white">EDEN EMULATOR</span>
            </Link>
            <p className="text-blue-200 text-sm mb-4">
              Much inspiring quote here, or something like that.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    'group p-3 bg-black/60 border border-blue-500/30 rounded-lg transition-all duration-300 hover:border-purple-400/50',
                    social.color
                  )}
                >
                  <social.icon className="w-5 h-5 text-gray-50 group-hover:text-purple-300 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-purple-300 font-bold mb-4 tracking-wider">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 hover:text-purple-300 transition-colors duration-300 text-sm inline-flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-blue-200 hover:text-purple-300 transition-colors duration-300 text-sm inline-flex items-center gap-1"
                      >
                        {link.name}
                        <LinkIcon className="w-3 h-3 ml-1" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-blue-200 text-sm">
                © {new Date().getFullYear()} Eden Emulator. All rights reserved.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-blue-200 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-purple-400 mr-2 animate-pulse" />
              <span>by your mom</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-blue-300/60 text-xs">
              Eden Emulator is not affiliated with any game console manufacturer. All trademarks are
              property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
