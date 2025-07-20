import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  pauseAnimationsWhenHidden?: boolean
}

export const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', pauseAnimationsWhenHidden = true } = options

  const [isIntersecting, setIsIntersecting] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setIsIntersecting(isIntersecting)

        if (pauseAnimationsWhenHidden) {
          setIsVisible(isIntersecting)

          // Pause/resume CSS animations by adding/removing a class
          if (isIntersecting) {
            target.style.animationPlayState = 'running'
            target.classList.remove('animations-paused')
          } else {
            target.style.animationPlayState = 'paused'
            target.classList.add('animations-paused')
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [threshold, rootMargin, pauseAnimationsWhenHidden])

  return {
    targetRef,
    isIntersecting,
    isVisible,
  }
}
