import { memo } from 'react'
import MusicBars from '@/components/MusicBars'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'

function SynthWaveBackground() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })
  const {
    isMobile,
    prefersReducedMotion,
    shouldDisableAllAnimations,
    shouldUseReducedAnimations,
    browser,
  } = usePerformanceOptimization()

  return (
    <div ref={targetRef} className="absolute inset-0 performance-contain">
      {/* Full animated background for desktop */}
      {!shouldDisableAllAnimations && !isMobile && (
        <div
          className={`synthwave-animated-bg ${!isVisible ? 'animations-paused' : ''} ${prefersReducedMotion ? 'reduced-motion' : ''}`}
          aria-hidden="true"
        >
          <div className="synthwave-gradient-animated" />
          <div className="synthwave-horizon" />
          <div className="synthwave-lines" />
        </div>
      )}

      {/* Optimized animated background for capable mobile devices */}
      {!shouldDisableAllAnimations && isMobile && !shouldUseReducedAnimations && (
        <div
          className={`synthwave-animated-bg ${!isVisible ? 'animations-paused' : ''}`}
          aria-hidden="true"
        >
          <div className="synthwave-gradient-animated" />
          <div className="synthwave-horizon" style={{ opacity: 0.6 }} />
          <div className="synthwave-lines" style={{ opacity: 0.5 }} />
        </div>
      )}

      {/* Reduced version for lower-performance mobile */}
      {!shouldDisableAllAnimations && isMobile && shouldUseReducedAnimations && (
        <div
          className="absolute inset-0 synthwave-gradient-animated"
          style={{
            opacity: 0.3,
            animation: 'synthwave-gradient-mobile 10s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
      )}

      {/* Ultra-minimal version for problematic browsers */}
      {(shouldDisableAllAnimations || browser.isFirefox) && (
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(16, 4, 88, 0.3)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Music Bars positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <MusicBars />
      </div>

      {/* Glow Effects - Optimized for each platform */}
      {!shouldDisableAllAnimations && !isMobile && (
        <>
          {/* Full effects for desktop */}
          <div
            className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-xl ${prefersReducedMotion ? '' : 'animate-subtle-pulse-neon'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
              opacity: browser.isChrome ? 0.12 : 0.08,
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute top-64 right-10 w-60 h-48 rounded-full blur-xl ${prefersReducedMotion ? '' : 'animate-subtle-pulse-neon-delay-2'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-yellow) 0%, transparent 70%)',
              opacity: browser.isChrome ? 0.12 : 0.08,
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-20 right-10 w-72 h-72 rounded-full blur-xl ${prefersReducedMotion ? '' : 'animate-pulse-neon'} gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 90%)',
              opacity: browser.isChrome ? 0.12 : 0.08,
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Mobile: Optimized animated glows */}
      {!shouldDisableAllAnimations && isMobile && !shouldUseReducedAnimations && (
        <>
          <div
            className={`absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-md ${!isVisible ? 'animations-paused' : ''} gpu-accelerated`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
              opacity: 0.08,
              animation: 'synthwave-glow-mobile 3s ease-in-out infinite',
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-md ${!isVisible ? 'animations-paused' : ''} gpu-accelerated`}
            style={{
              background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 70%)',
              opacity: 0.08,
              animation: 'synthwave-glow-mobile 3s ease-in-out infinite 1.5s',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Mobile: Minimal static glow for reduced animations */}
      {!shouldDisableAllAnimations && isMobile && shouldUseReducedAnimations && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-lg"
          style={{
            background: 'radial-gradient(circle, var(--synthwave-purple) 0%, transparent 80%)',
            opacity: 0.05,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
export default memo(SynthWaveBackground)
