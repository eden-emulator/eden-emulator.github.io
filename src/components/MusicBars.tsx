import { memo, useMemo } from 'react'
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

function MusicBars() {
  const { shouldUseReducedAnimations, isMobile } = usePerformanceOptimization()
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })

  const barCount = shouldUseReducedAnimations ? (isMobile ? 12 : 15) : 25

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
      className={`music-bars ${shouldUseReducedAnimations ? 'reduced-motion' : ''}`}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`music-bar will-change-transform ${!isVisible ? 'animations-paused' : ''}`}
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
