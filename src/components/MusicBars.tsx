import { memo, useMemo } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization'

function MusicBars() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })
  const { isMobile, prefersReducedMotion } = usePerformanceOptimization()

  // Smart bar count: reduce on mobile for better performance, but still show effects
  const barCount = isMobile ? 18 : 25

  const bars = useMemo(
    () =>
      [...Array(barCount)].map((_, i) => ({
        height: 20 + Math.sin(i * 0.3) * 30,
        delay: i * 0.08,
        opacity: 0.6 - Math.abs(i - Math.floor(barCount / 2)) * 0.025,
      })),
    [barCount],
  )

  return (
    <div
      ref={targetRef}
      className={`music-bars gpu-accelerated performance-contain ${prefersReducedMotion ? 'reduced-motion' : ''}`}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`music-bar gpu-accelerated ${!isVisible ? 'animations-paused' : ''}`}
          style={{
            height: `${bar.height}px`,
            animationDelay: `${bar.delay}s`,
            opacity: bar.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default memo(MusicBars)
