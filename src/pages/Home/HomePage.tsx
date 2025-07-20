import { memo, useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { Cpu, Heart, Download, Zap } from 'lucide-react'
import edenLogo from '@/assets/logo_neon.png'
import { Link } from '@tanstack/react-router'
import { GitHubIcon } from '@/components/Icons'
import SEO from '@/components/SEO'
import SynthWaveBackground from '@/pages/Home/components/SynthWaveBackground.tsx'
import ErrorBoundary from '@/components/ErrorBoundary'

// Lazy load the game to keep initial bundle size small
const SynthwaveHero = lazy(() => import('@/components/SynthwaveHero'))

function HomePage() {
  const [showGame, setShowGame] = useState(false)
  const [logoRotation, setLogoRotation] = useState(0)
  const [logoSpins, setLogoSpins] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lastAngle, setLastAngle] = useState(0)
  const velocityRef = useRef(0)
  const logoRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastSpinCheck = useRef(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  // Detect touch device once on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  
  // Handle logo click for non-touch devices
  const handleLogoClick = () => {
    if (!isTouchDevice) {
      const newRotation = logoRotation + 360
      setLogoRotation(newRotation)
      checkSpinCount(newRotation)
    }
  }
  
  // Check spin count
  const checkSpinCount = useCallback((rotation: number) => {
    const totalRotations = Math.floor(Math.abs(rotation) / 360)
    const newCompletedSpins = totalRotations - lastSpinCheck.current
    
    if (newCompletedSpins > 0) {
      lastSpinCheck.current = totalRotations
      const newTotalSpins = logoSpins + newCompletedSpins
      setLogoSpins(newTotalSpins)
      
      if (newTotalSpins >= 3) {
        setTimeout(() => {
          setShowGame(true)
          setLogoSpins(0)
          lastSpinCheck.current = 0
          setLogoRotation(0) // Reset rotation
        }, 300)
      }
    }
  }, [logoSpins])
  
  // Get angle from center of logo
  const getAngleFromCenter = (clientX: number, clientY: number) => {
    if (!logoRef.current) return 0
    const rect = logoRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)
    return angle
  }
  
  // Handle drag start
  const handleDragStart = (clientX: number, clientY: number) => {
    if (isTouchDevice) {
      setIsDragging(true)
      setLastAngle(getAngleFromCenter(clientX, clientY))
      velocityRef.current = 0
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }
  
  // Handle drag move
  const handleDragMove = (clientX: number, clientY: number) => {
    if (isDragging && isTouchDevice) {
      const currentAngle = getAngleFromCenter(clientX, clientY)
      let deltaAngle = currentAngle - lastAngle
      
      // Handle angle wrap-around
      if (deltaAngle > 180) deltaAngle -= 360
      if (deltaAngle < -180) deltaAngle += 360
      
      const newRotation = logoRotation + deltaAngle
      setLogoRotation(newRotation)
      velocityRef.current = deltaAngle
      setLastAngle(currentAngle)
      
      checkSpinCount(newRotation)
    }
  }
  
  // Handle drag end
  const handleDragEnd = useCallback(() => {
    if (isTouchDevice) {
      setIsDragging(false)
      // Continue spinning with momentum
      const animate = () => {
        const newVelocity = velocityRef.current * 0.95 // Friction
        velocityRef.current = newVelocity
        
        if (Math.abs(newVelocity) > 0.1) {
          setLogoRotation(current => {
            const newRotation = current + newVelocity
            checkSpinCount(newRotation)
            return newRotation
          })
          animationRef.current = requestAnimationFrame(animate)
        }
      }
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [isTouchDevice, checkSpinCount])
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragStart(touch.clientX, touch.clientY)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleDragMove(touch.clientX, touch.clientY)
  }
  
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY)
  }
  
  // Global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => handleDragEnd()
    const handleGlobalTouchEnd = () => handleDragEnd()
    
    window.addEventListener('mouseup', handleGlobalMouseUp)
    window.addEventListener('touchend', handleGlobalTouchEnd)
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('touchend', handleGlobalTouchEnd)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleDragEnd])
  
  // Reset spin count after 5 seconds of inactivity
  useEffect(() => {
    if (logoSpins > 0 && logoSpins < 3) {
      const timer = setTimeout(() => {
        setLogoSpins(0)
        lastSpinCheck.current = Math.floor(Math.abs(logoRotation) / 360)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [logoSpins, logoRotation])

  return (
    <>
      <SEO />
      <section className="relative bg-black overflow-hidden py-12 sm:py-16 lg:py-20 xl:min-h-screen xl:flex xl:items-center xl:justify-center">
        <SynthWaveBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-8 relative">
            <button
              ref={logoRef}
              onClick={handleLogoClick}
              onMouseDown={isTouchDevice ? undefined : handleMouseDown}
              onMouseMove={isDragging ? handleMouseMove : undefined}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className={`mx-auto block ${isTouchDevice ? 'touch-none' : 'cursor-pointer'} select-none`}
              style={{
                transform: `perspective(1000px) rotateY(${logoRotation}deg)`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              aria-label="Eden logo - click or spin to interact"
            >
              <img
                src={edenLogo}
                alt="Eden Emulator logo"
                className="max-w-full h-auto max-h-60 mb-6 drop-shadow-2xl synthwave-logo-glow pointer-events-none"
                draggable={false}
              />
            </button>
            {logoSpins > 0 && logoSpins < 3 && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-sm" style={{ 
                color: 'var(--synthwave-cyan)',
                textShadow: '0 0 10px var(--synthwave-cyan)',
                fontFamily: 'Orbitron, sans-serif'
              }}>
                {3 - logoSpins} more spin{3 - logoSpins !== 1 ? 's' : ''}...
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight font-orbitron">
            <span className="block text-white mb-2 text-shadow-cyan">Nintendo Switch</span>
            <span className="block text-white mt-2 text-shadow-pink">Emulator</span>
          </h1>

          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200 font-sans">
            <span className="font-bold text-synthwave-pink text-shadow-pink-sm">Eden</span> is an
            experimental open-source emulator for the Nintendo Switch, built with performance and
            stability in mind. It is written in C++ with cross-platform support for Windows, Linux
            and Android.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-14 mb-12">
            <Link
              to="/download"
              className="group relative text-white px-10 py-4 rounded-lg font-bold text-lg transition-transform duration-200 hover:scale-105 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black font-orbitron btn-synthwave-primary will-change-transform"
              aria-label="Download Eden Emulator"
            >
              <div
                className="absolute inset-0 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-200 btn-synthwave-primary-glow will-change-opacity"
                aria-hidden="true"
              />
              <div className="relative flex items-center space-x-3">
                <Download className="w-6 h-6 group-hover:animate-bounce" aria-hidden="true" />
                <span>DOWNLOAD</span>
              </div>
            </Link>

            <a
              href="https://git.eden-emu.dev/eden-emu/eden"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:text-white px-10 py-4 rounded-lg font-bold text-lg transition-transform duration-200 hover:scale-105 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black font-orbitron btn-synthwave-secondary will-change-transform"
              aria-label="View Eden Emulator source code on GitLab (opens in new tab)"
            >
              <div
                className="absolute inset-0 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-200 btn-synthwave-secondary-glow will-change-opacity"
                aria-hidden="true"
              />
              <div className="relative flex items-center space-x-3">
                <GitHubIcon className="w-6 h-6" aria-hidden="true" />
                <span>SOURCE CODE</span>
              </div>
            </a>
          </div>

          <nav
            className="flex flex-wrap justify-center items-center gap-8 text-synthwave-cyan"
            aria-label="Quick links"
          >
            <Link
              to="/features"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black font-audiowide link-synthwave-orange will-change-transform"
              aria-label="View Eden Emulator features"
            >
              <Zap className="w-6 h-6 text-synthwave-orange" aria-hidden="true" />
              <span className="font-bold">Features</span>
            </Link>

            <Link
              to="/system-requirements"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black font-audiowide link-synthwave-pink will-change-transform"
              aria-label="View system requirements for Eden Emulator"
            >
              <Cpu className="w-6 h-6 text-synthwave-pink" aria-hidden="true" />
              <span className="font-bold">System Requirements</span>
            </Link>

            <Link
              to="/donations"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black font-audiowide link-synthwave-yellow will-change-transform"
              aria-label="Download Eden Emulator"
            >
              <Heart className="w-6 h-6 text-synthwave-yellow" aria-hidden="true" />
              <span className="font-bold">Donations</span>
            </Link>
          </nav>
        </div>
      </section>
      
      {/* Synthwave Hero Game - Easter Egg */}
      {showGame && (
        <ErrorBoundary>
          <Suspense 
            fallback={
              <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
                <div className="text-white text-2xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>Loading...</div>
              </div>
            }
          >
            <div className="fixed inset-0 z-[9999]">
              <SynthwaveHero onClose={() => {
                console.log('Closing game')
                setShowGame(false)
              }} />
            </div>
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  )
}

export default memo(HomePage)
