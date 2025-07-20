import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function BackgroundEffect() {
  const { shouldUseReducedAnimations } = usePerformanceOptimization()
  const { targetRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    pauseAnimationsWhenHidden: true,
  })

  return (
    <div ref={targetRef} className="absolute inset-0 opacity-30">
      <div
        className={`absolute inset-0 ${!isVisible ? 'animations-paused' : ''}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: shouldUseReducedAnimations ? 'none' : 'grid-move 20s linear infinite',
        }}
      />
    </div>
  )
}
