import { memo } from 'react'
import MusicBars from '@/components/MusicBars'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function SynthWaveBackground() {
  const { shouldUseReducedAnimations, isMobile } = usePerformanceOptimization()
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })

  const blurClass = shouldUseReducedAnimations ? (isMobile ? 'blur-sm' : 'blur-md') : 'blur-xl'
  const shouldShowBackgroundEffects = !shouldUseReducedAnimations || !isMobile

  return (
    <div ref={targetRef}>
      {/* Subtle Animated Synthwave Background - Static on mobile */}
      {shouldShowBackgroundEffects && (
        <div
          className={`synthwave-animated-bg ${!isVisible ? 'animations-paused' : ''}`}
          aria-hidden="true"
        >
          <div className="synthwave-gradient-animated" />
          <div className="synthwave-horizon" />
          <div className="synthwave-lines" />
        </div>
      )}

      {/* Music Bars positioned at bottom - Always show but reduced on mobile */}
      <div className="absolute bottom-0 left-0 right-0">
        <MusicBars />
      </div>

      {/* Optimized Synthwave Neon Glow Effects - Reduced on mobile */}
      {!isMobile && (
        <>
          <div
            className={`absolute top-20 left-10 w-72 h-72 rounded-full ${blurClass} ${shouldUseReducedAnimations ? '' : 'animate-subtle-pulse-neon'} will-change-transform ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
              opacity: 0.12,
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute top-64 right-10 w-60 h-48 rounded-full ${blurClass} ${shouldUseReducedAnimations ? '' : 'animate-subtle-pulse-neon-delay-2'} will-change-transform ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-yellow) 0%, transparent 70%)',
              opacity: 0.12,
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={`absolute bottom-20 right-10 w-72 h-72 rounded-full ${blurClass} ${shouldUseReducedAnimations ? '' : 'animate-pulse-neon'} will-change-transform ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 90%)',
          opacity: isMobile ? 0.06 : 0.12,
        }}
        aria-hidden="true"
      />

      {!shouldUseReducedAnimations && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full ${blurClass} will-change-transform ${!isVisible ? 'animations-paused' : ''}`}
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
