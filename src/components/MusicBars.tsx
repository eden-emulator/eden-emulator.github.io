import { memo, useMemo } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization'

function MusicBars() {
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })
  const { isMobile, prefersReducedMotion, shouldDisableAllAnimations, browser } =
    usePerformanceOptimization()

  // Browser and performance aware bar count
  const getBarCount = () => {
    if (shouldDisableAllAnimations) return 0 // No bars for very poor performance
    if (browser.isFirefox && isMobile) return 3 // Firefox mobile struggles
    if (browser.isFirefox) return 12 // Firefox desktop reduced
    if (isMobile) return 6 // General mobile reduction
    return 25 // Full desktop experience
  }

  const barCount = getBarCount()

  const bars = useMemo(
    () =>
      [...Array(barCount)].map((_, i) => ({
        height: 20 + Math.sin(i * 0.3) * 30,
        delay: i * 0.08,
        opacity: 0.6 - Math.abs(i - Math.floor(barCount / 2)) * 0.025,
      })),
    [barCount],
  )

  // Don't render anything if no bars should be shown
  if (barCount === 0) {
    return null
  }

  return (
    <div
      ref={targetRef}
      className={`music-bars ${shouldDisableAllAnimations ? '' : 'gpu-accelerated'} performance-contain ${prefersReducedMotion ? 'reduced-motion' : ''}`}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`music-bar ${shouldDisableAllAnimations ? '' : 'gpu-accelerated'} ${!isVisible ? 'animations-paused' : ''}`}
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
