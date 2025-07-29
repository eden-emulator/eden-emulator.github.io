import { useState } from 'react'
import {
  Menu,
  X,
  Download,
  Book,
  Users,
  Monitor,
  ClipboardList,
  Users2,
  Sparkles,
  Heart,
} from 'lucide-react'
import edenLogo from '@/assets/eden_logo.png'
import { GitHubIcon } from '@/components/Icons'
import { Link, useLocation } from '@tanstack/react-router'
import { cn } from '@/utils/style'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'FEATURES', href: '/features', icon: Sparkles },
    { name: 'DOWNLOAD', href: '/download', icon: Download },
    { name: 'REQUIREMENTS', href: '/system-requirements', icon: Monitor },
    { name: 'COMPATIBILITY', href: '/compatibility', icon: ClipboardList },
    { name: 'DOCS', href: '/docs', icon: Book },
    { name: 'COMMUNITY', href: '/community', icon: Users },
    { name: 'TEAM', href: '/team', icon: Users2 },
    { name: 'DONATIONS', href: '/donations', icon: Heart },
    {
      name: '',
      href: 'https://github.com/eden-emulator/Releases/releases',
      icon: GitHubIcon,
      external: true,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
      <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10" />
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0 focus:outline-none">
            <img
              src={edenLogo}
              alt="Eden"
              className="h-10 w-auto max-w-none"
              style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))' }}
            />
            <span className="hidden 2xl:block text-xl font-bold text-white">EDEN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden xl:flex items-center space-x-6 xl:space-x-8"
            aria-label="Main navigation"
          >
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 text-blue-300 hover:text-purple-300 transition-all duration-300 font-bold text-sm tracking-wider relative focus:outline-none rounded-lg"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 rounded-lg blur-sm transition-all duration-300" />
                  <div className="relative flex items-center space-x-2">
                    {item.icon && <item.icon className="w-4 h-4" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </div>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center space-x-2 transition-all duration-300 font-bold text-sm tracking-wider relative focus:outline-none rounded-lg',
                    isActive(item.href) ? 'text-purple-300' : 'text-blue-300 hover:text-purple-300',
                  )}
                >
                  <div
                    className={cn(
                      'absolute inset-0 bg-linear-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 rounded-lg blur transition-all duration-300',
                      isActive(item.href) && 'from-purple-500/20 to-blue-500/20',
                    )}
                  />
                  <div className="relative flex items-center space-x-2">
                    {item.icon && <item.icon className="w-4 h-4" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ),
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 text-blue-300 hover:text-purple-300 border border-blue-500/50 rounded-lg hover:border-purple-500/50 transition-all duration-300 focus:outline-none"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-200 ease-out transform ${
            isMenuOpen ? 'max-h-[600px] translate-y-0' : 'max-h-0 -translate-y-2'
          }`}
        >
          <div
            className={`py-4 border-t border-purple-500/30 transition-all duration-200 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <nav
              id="mobile-navigation"
              className="flex flex-col space-y-2"
              aria-label="Mobile navigation"
            >
              {navigation.map((item, index) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 text-blue-300 hover:text-purple-300 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-purple-500/10 font-bold text-sm tracking-wider transform ${
                      isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 30}ms` : '0ms',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      `flex items-center space-x-3 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-purple-500/10 font-bold text-sm tracking-wider transform ${
                        isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                      }`,
                      isActive(item.href)
                        ? 'text-purple-300 bg-purple-500/10'
                        : 'text-blue-300 hover:text-purple-300',
                    )}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 30}ms` : '0ms',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="w-4 h-4" aria-hidden="true" />}
                    <span>{item.name}</span>
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
