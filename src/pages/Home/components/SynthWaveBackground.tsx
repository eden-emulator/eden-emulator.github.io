import { memo } from 'react'
import MusicBars from '@/components/MusicBars'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'

function SynthWaveBackground() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })
  const { isMobile, prefersReducedMotion, shouldDisableAllAnimations, browser } =
    usePerformanceOptimization()

  if (isMobile || shouldDisableAllAnimations || prefersReducedMotion) {
    return (
      <div
        ref={targetRef}
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, #0a0a0a 0%, #1a0033 30%, #330066 60%, #1a0033 85%, #0a0a0a 100%)',
        }}
      />
    )
  }

  if (browser.isFirefox) {
    return (
      <div
        ref={targetRef}
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'rgba(16, 4, 88, 0.3)' }}
      />
    )
  }

  return (
    <div ref={targetRef} className="absolute inset-0 performance-contain">
      <div
        className={`synthwave-animated-bg ${!isVisible ? 'animations-paused' : ''}`}
        aria-hidden="true"
      >
        <div className="synthwave-gradient-animated" />
        <div className="synthwave-horizon" />
        <div className="synthwave-lines" />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <MusicBars />
      </div>

      <div
        className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-xl animate-subtle-pulse-neon ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(circle, var(--synthwave-hot-pink) 0%, transparent 70%)',
          opacity: 0.12,
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute top-64 right-10 w-60 h-48 rounded-full blur-xl animate-subtle-pulse-neon-delay-2 ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(circle, var(--synthwave-yellow) 0%, transparent 70%)',
          opacity: 0.12,
        }}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-20 right-10 w-72 h-72 rounded-full blur-xl animate-pulse-neon ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          background: 'radial-gradient(circle, var(--synthwave-cyan) 0%, transparent 90%)',
          opacity: 0.12,
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export default memo(SynthWaveBackground)
