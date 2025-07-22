import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer/Footer.tsx'
import { useScrollPerformance } from '@/hooks/useScrollPerformance'
import { useBackdropFilterSupport } from '@/hooks/useBackdropFilterSupport'

function AppLayout() {
  // Enable scroll performance optimizations
  useScrollPerformance()
  
  // Check backdrop-filter support
  const { isSupported } = useBackdropFilterSupport()
  
  useEffect(() => {
    if (!isSupported) {
      document.body.classList.add('no-backdrop-filter')
    } else {
      document.body.classList.remove('no-backdrop-filter')
    }
  }, [isSupported])
  return (
    <div className="min-h-screen bg-black">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-purple-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        Skip to main content
      </a>

      <Header />
      <main id="main-content" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
