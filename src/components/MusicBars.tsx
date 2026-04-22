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

  const getBarCount = () => {
    if (shouldDisableAllAnimations) return 0
    if (isMobile) return 0
    if (browser.isFirefox) return 8
    return 12
  }

  const barCount = getBarCount()

  const bars = useMemo(
    () =>
      [...Array(barCount)].map((_, i) => ({
        height: isMobile ? 15 + Math.sin(i * 0.5) * 20 : 20 + Math.sin(i * 0.3) * 30,
        delay: isMobile ? i * 0.3 : i * 0.08, // Larger delay on mobile for wave effect
        opacity: 0.6 - Math.abs(i - Math.floor(barCount / 2)) * 0.025,
      })),
    [barCount, isMobile],
  )

  // Don't render anything if no bars should be shown
  if (barCount === 0) return null

  return (
    <div
      ref={targetRef}
      className={`music-bars ${shouldDisableAllAnimations ? '' : 'gpu-accelerated'} performance-contain ${prefersReducedMotion ? 'reduced-motion' : ''}`}
    >
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`music-bar ${!isVisible ? 'animations-paused' : ''}`}
          style={{
            height: `${bar.height}px`,
            animationDelay: `${bar.delay}s`,
            animationDuration: isMobile ? '1.5s' : '1s',
            opacity: bar.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default memo(MusicBars)
