import { memo } from 'react'
import MusicBars from '@/components/MusicBars'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'

function SynthWaveBackground() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })
  const { shouldUseReducedAnimations, isMobile, prefersReducedMotion } =
    usePerformanceOptimization()

  return (
    <div ref={targetRef} className="absolute inset-0 performance-contain">
      {/* Subtle Animated Synthwave Background - Smart performance adaptation */}
      <div
        className={`synthwave-animated-bg ${!isVisible ? 'animations-paused' : ''} ${prefersReducedMotion ? 'reduced-motion' : ''}`}
        aria-hidden="true"
      >
        <div className="synthwave-gradient-animated" />
        <div className="synthwave-horizon" />
        {/* Only show complex grid lines on desktop or when user prefers full animations */}
        {(!isMobile || !shouldUseReducedAnimations) && <div className="synthwave-lines" />}
      </div>

      {/* Music Bars positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <MusicBars />
      </div>

      {/* Optimized Synthwave Neon Glow Effects - Smart performance adaptation */}
      <div
        className={`absolute top-20 left-10 w-72 h-72 rounded-full ${isMobile ? 'blur-md' : 'blur-xl'} ${prefersReducedMotion ? '' : 'animate-subtle-pulse-neon'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
          opacity: isMobile ? 0.08 : 0.12,
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute top-64 right-10 w-60 h-48 rounded-full ${isMobile ? 'blur-md' : 'blur-xl'} ${prefersReducedMotion ? '' : 'animate-subtle-pulse-neon-delay-2'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(circle, var(--synthwave-yellow) 0%, transparent 70%)',
          opacity: isMobile ? 0.08 : 0.12,
        }}
        aria-hidden="true"
      />

      <div
        className={`absolute bottom-20 right-10 w-72 h-72 rounded-full ${isMobile ? 'blur-md' : 'blur-xl'} ${prefersReducedMotion ? '' : 'animate-pulse-neon'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 90%)',
          opacity: isMobile ? 0.08 : 0.12,
        }}
        aria-hidden="true"
      />

      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full ${isMobile ? 'blur-md' : 'blur-xl'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(ellipse, var(--synthwave-purple) 0%, transparent 60%)',
          opacity: isMobile ? 0.05 : 0.08,
        }}
        aria-hidden="true"
      />
    </div>
  )
}
export default memo(SynthWaveBackground)
