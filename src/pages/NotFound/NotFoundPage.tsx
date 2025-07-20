import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { Home, AlertTriangle } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'

function NotFoundPage() {
  return (
    <PageWrapper className="flex items-center justify-center">
      {/* Neon Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-xl animate-pulse will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-xl animate-pulse delay-1000 will-change-transform" />

      <div className="relative text-center px-4">
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[200px] font-bold leading-none">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400">
              404
            </span>
          </h1>
          <div className="flex justify-center mt-8">
            <AlertTriangle className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 mb-4">
          PAGE NOT FOUND
        </h2>

        <p className="text-lg md:text-xl text-cyan-100/80 font-light mb-12 max-w-2xl mx-auto">
          New phone, who dis?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70"
          >
            <Home className="w-5 h-5" />
            <span>BACK TO HOME</span>
          </Link>

          <Link
            to="/download"
            className="inline-flex items-center gap-3 border-2 border-cyan-400 text-cyan-300 hover:text-white px-8 py-4 rounded-lg font-bold tracking-wider transition-all duration-300 hover:bg-cyan-400/10"
          >
            <span>DOWNLOAD EDEN</span>
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}

export default memo(NotFoundPage)
