import edenLogoPNG from '@/assets/eden_logo.png'
import edenLogoWebP from '@/assets/eden_logo.webp'
import { GitHubIcon, LanguageIcon } from '@/components/Icons'
import { translationLanguages } from '@/i18n'
import { cn } from '@/utils/style'
import { Link, useLocation } from '@tanstack/react-router'
import {
  Book,
  ClipboardList,
  Download,
  Heart,
  Menu,
  Monitor,
  Sparkles,
  Users,
  Users2,
  X,
  FileText,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
  const { i18n, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigation = [
    { name: t("BASICS.FEATURES"), href: '/features', icon: Sparkles },
    { name: t("BASICS.BLOG"), href: '/blog', icon: FileText },
    { name: t("BASICS.DOWNLOAD"), href: '/download', icon: Download },
    { name: t("BASICS.REQUIREMENTS"), href: '/system-requirements', icon: Monitor },
    { name: t("BASICS.COMPATIBILITY"), href: '/compatibility', icon: ClipboardList },
    { name: t("BASICS.DOCS"), href: '/docs', icon: Book },
    { name: t("BASICS.COMMUNITY"), href: '/community', icon: Users },
    { name: t("BASICS.TEAM"), href: '/team', icon: Users2 },
    { name: t("BASICS.DONATIONS"), href: '/donations', icon: Heart },
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

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-purple-500/30">
      <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10" />
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0 focus:outline-none">
            <picture>
              <source srcSet={edenLogoWebP} type="image/webp" />
              <img
                src={edenLogoPNG}
                alt="Eden"
                className="h-10 w-auto max-w-none"
                style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.8))' }}
              />
            </picture>
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

            <div
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 transition-all duration-300 font-bold text-sm tracking-wider relative focus:outline-none rounded-lg"
            >
              <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 rounded-lg blur-sm transition-all duration-300" />
              <div className="relative flex items-center space-x-2">
                <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
                  <div
                    onClick={() => setOpen(!open)}
                    style={{ cursor: "pointer" }}
                    className='text-blue-300'
                  >
                    <LanguageIcon className="w-4 h-4" aria-hidden="true" />
                  </div>

                  {/* Dropdown */}
                  {open && (
                    <div
                      style={{
                        position: "absolute",
                        top: "32px",
                        right: 0,
                        borderRadius: "6px",
                        padding: "8px 0",
                        zIndex: 999
                      }}
                      className='bg-black/80 backdrop-blur-md border border-purple-500/30'
                    >
                      {Object.keys(translationLanguages).map(language => (
                        <div
                          onClick={() => changeLang(language)}
                          className='py-2 px-4 cursor-pointer whitespace-nowrap text-blue-300 hover:text-purple-300 '
                        >
                          {translationLanguages[language].description}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
          className={`xl:hidden overflow-hidden transition-all duration-200 ease-out transform ${isMenuOpen ? 'max-h-[600px] translate-y-0' : 'max-h-0 -translate-y-2'
            }`}
        >
          <div
            className={`py-4 border-t border-purple-500/30 transition-all duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0'
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
                    className={`flex items-center space-x-3 text-blue-300 hover:text-purple-300 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-purple-500/10 font-bold text-sm tracking-wider transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
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
                      `flex items-center space-x-3 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-purple-500/10 font-bold text-sm tracking-wider transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
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
