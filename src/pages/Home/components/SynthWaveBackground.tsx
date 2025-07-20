import { memo } from 'react'
import MusicBars from '@/components/MusicBars'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'

function SynthWaveBackground() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })
  const { isMobile, prefersReducedMotion } = usePerformanceOptimization()

  return (
    <div ref={targetRef} className="absolute inset-0 performance-contain">
      {/* Subtle Animated Synthwave Background - Mobile gets minimal version */}
      {!isMobile && (
        <div
          className={`synthwave-animated-bg ${!isVisible ? 'animations-paused' : ''} ${prefersReducedMotion ? 'reduced-motion' : ''}`}
          aria-hidden="true"
        >
          <div className="synthwave-gradient-animated" />
          <div className="synthwave-horizon" />
          <div className="synthwave-lines" />
        </div>
      )}
      
      {/* Mobile: Just gradient, no 3D perspective grid */}
      {isMobile && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,0,110,0.02) 50%, rgba(0,0,0,0.3) 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Music Bars positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <MusicBars />
      </div>

      {/* Optimized Synthwave Neon Glow Effects - Aggressive mobile optimization */}
      {!isMobile && (
        <>
          <div
            className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-xl ${prefersReducedMotion ? '' : 'animate-subtle-pulse-neon'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
              opacity: 0.12,
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute top-64 right-10 w-60 h-48 rounded-full blur-xl ${prefersReducedMotion ? '' : 'animate-subtle-pulse-neon-delay-2'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-yellow) 0%, transparent 70%)',
              opacity: 0.12,
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-20 right-10 w-72 h-72 rounded-full blur-xl ${prefersReducedMotion ? '' : 'animate-pulse-neon'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 90%)',
              opacity: 0.12,
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Mobile: Single subtle glow effect only */}
      {isMobile && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--synthwave-purple) 0%, transparent 80%)',
            opacity: 0.04,
          }}
          aria-hidden="true"
        />
      )}

      {/* Desktop: Additional large background glow */}
      {!isMobile && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-xl gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
          style={{
            background: 'radial-gradient(ellipse, var(--synthwave-purple) 0%, transparent 60%)',
            opacity: 0.08,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
export default memo(SynthWaveBackground)
