import { Cpu, Download, Zap } from 'lucide-react'
import edenLogo from '@/assets/logo.png'
import { Link } from '@tanstack/react-router'
import { GitHubIcon } from '@/components/Icons'
import SEO from '@/components/SEO'
import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'

// Lazy load the game to keep initial bundle size small
const SynthwaveHero = lazy(() => import('@/components/SynthwaveHero'))

function HomePage() {
  const [showGame, setShowGame] = useState(false)
  const [logoRotation, setLogoRotation] = useState(0)
  const [logoSpins, setLogoSpins] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lastAngle, setLastAngle] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const logoRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number>()
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
  const checkSpinCount = (rotation: number) => {
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
  }
  
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
      setVelocity(0)
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
      setVelocity(deltaAngle)
      setLastAngle(currentAngle)
      
      checkSpinCount(newRotation)
    }
  }
  
  // Handle drag end
  const handleDragEnd = () => {
    if (isTouchDevice) {
      setIsDragging(false)
      // Continue spinning with momentum
      const animate = () => {
        setVelocity(prev => {
          const newVelocity = prev * 0.95 // Friction
          if (Math.abs(newVelocity) > 0.1) {
            setLogoRotation(current => {
              const newRotation = current + newVelocity
              checkSpinCount(newRotation)
              return newRotation
            })
            animationRef.current = requestAnimationFrame(animate)
          }
          return newVelocity
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }
  }
  
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
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Subtle Animated Synthwave Background */}
        <div className="synthwave-animated-bg" aria-hidden="true">
          <div className="synthwave-gradient-animated"></div>
          <div className="synthwave-horizon"></div>
          
          {/* Perspective Grid */}
          <div className="synthwave-grid">
            <div className="synthwave-grid-inner"></div>
          </div>
          
          {/* Perspective Lines */}
          <div className="synthwave-lines">
            <div className="synthwave-line"></div>
            <div className="synthwave-line"></div>
            <div className="synthwave-line"></div>
            <div className="synthwave-line"></div>
            <div className="synthwave-line"></div>
            <div className="synthwave-line"></div>
          </div>
          
          {/* Music Visualizer Bars */}
          <div className="music-bars">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="music-bar"
                style={{
                  height: `${40 + Math.sin(i * 0.2) * 40}px`,
                  animationDelay: `${i * 0.03}s`,
                  opacity: 0.9 - (Math.abs(i - 25) * 0.015)
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle Synthwave Neon Glow Effects */}
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
            opacity: 0.15
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 70%)',
            opacity: 0.15
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, var(--synthwave-purple) 0%, transparent 60%)',
            opacity: 0.1
          }}
          aria-hidden="true"
        />

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
                className="max-w-full h-auto max-h-40 drop-shadow-2xl pointer-events-none"
                style={{
                  filter:
                    'drop-shadow(0 0 30px var(--synthwave-hot-pink)) drop-shadow(0 0 60px var(--synthwave-cyan)) drop-shadow(0 0 90px var(--synthwave-purple))',
                }}
                draggable={false}
              />
            </button>
            {logoSpins > 0 && logoSpins < 3 && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm" style={{ 
                color: 'var(--synthwave-cyan)',
                textShadow: '0 0 10px var(--synthwave-cyan)',
                fontFamily: 'Orbitron, sans-serif'
              }}>
                {3 - logoSpins} more spin{3 - logoSpins !== 1 ? 's' : ''}...
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="block text-white mb-2" style={{ textShadow: '0 0 20px var(--synthwave-cyan), 0 0 40px var(--synthwave-cyan)' }}>Nintendo Switch</span>
            <span className="block text-white mt-2" style={{ textShadow: '0 0 20px var(--synthwave-hot-pink), 0 0 40px var(--synthwave-hot-pink)' }}>Emulator</span>
          </h1>

          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="font-bold" style={{ color: 'var(--synthwave-hot-pink)', textShadow: '0 0 10px var(--synthwave-hot-pink)' }}>Eden</span> is an experimental, open-source Nintendo
            Switch emulator built in C++ for Windows, Linux, macOS, and Android. It focuses on
            performance, accuracy, and a clean user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-14 mb-12">
            <Link
              to="/download"
              className="group relative text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black"
              style={{
                background: 'linear-gradient(135deg, var(--synthwave-hot-pink), var(--synthwave-purple))',
                border: '2px solid var(--synthwave-cyan)',
                boxShadow: '0 0 20px var(--synthwave-hot-pink), 0 0 40px var(--synthwave-purple), inset 0 0 20px rgba(255, 0, 255, 0.2)',
                fontFamily: 'Orbitron, sans-serif',
              }}
              aria-label="Download Eden Emulator"
            >
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--synthwave-hot-pink), var(--synthwave-purple))',
                }}
                aria-hidden="true"
              ></div>
              <div className="relative flex items-center space-x-3">
                <Download className="w-6 h-6 group-hover:animate-bounce" aria-hidden="true" />
                <span>DOWNLOAD NOW</span>
              </div>
            </Link>

            <a
              href="https://git.eden-emu.dev/eden-emu/eden"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:text-white px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-black"
              style={{
                border: '2px solid var(--synthwave-cyan)',
                color: 'var(--synthwave-cyan)',
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                boxShadow: '0 0 15px var(--synthwave-cyan), inset 0 0 15px rgba(0, 255, 255, 0.1)',
                fontFamily: 'Orbitron, sans-serif',
              }}
              aria-label="View Eden Emulator source code on GitLab (opens in new tab)"
            >
              <div
                className="absolute inset-0 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  border: '2px solid var(--synthwave-cyan)',
                  boxShadow: '0 0 20px var(--synthwave-cyan)',
                }}
                aria-hidden="true"
              ></div>
              <div className="relative flex items-center space-x-3">
                <GitHubIcon className="w-6 h-6" aria-hidden="true" />
                <span>VIEW SOURCE</span>
              </div>
            </a>
          </div>

          <nav
            className="flex flex-wrap justify-center items-center gap-8"
            aria-label="Quick links"
            style={{ color: 'var(--synthwave-cyan)' }}
          >
            <Link
              to="/features"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                background: 'rgba(0, 255, 255, 0.1)',
                border: '2px solid var(--synthwave-cyan)',
                boxShadow: '0 0 10px var(--synthwave-cyan)',
                fontFamily: 'Audiowide, sans-serif',
              }}
              aria-label="View Eden Emulator features"
            >
              <Zap className="w-6 h-6" style={{ color: 'var(--synthwave-cyan)' }} aria-hidden="true" />
              <span className="font-bold">Features</span>
            </Link>

            <Link
              to="/system-requirements"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                background: 'rgba(255, 0, 255, 0.1)',
                border: '2px solid var(--synthwave-hot-pink)',
                boxShadow: '0 0 10px var(--synthwave-hot-pink)',
                fontFamily: 'Audiowide, sans-serif',
              }}
              aria-label="View system requirements for Eden Emulator"
            >
              <Cpu className="w-6 h-6" style={{ color: 'var(--synthwave-hot-pink)' }} aria-hidden="true" />
              <span className="font-bold">System Requirements</span>
            </Link>

            <Link
              to="/download"
              className="flex items-center space-x-3 backdrop-blur-xs rounded-full px-6 py-3 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
              style={{
                background: 'rgba(255, 235, 0, 0.1)',
                border: '2px solid var(--synthwave-yellow)',
                boxShadow: '0 0 10px var(--synthwave-yellow)',
                fontFamily: 'Audiowide, sans-serif',
              }}
              aria-label="Download Eden Emulator"
            >
              <Download className="w-6 h-6" style={{ color: 'var(--synthwave-yellow)' }} aria-hidden="true" />
              <span className="font-bold">Download</span>
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

export default HomePage
