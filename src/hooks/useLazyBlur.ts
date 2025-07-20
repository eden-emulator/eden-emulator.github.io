import { useEffect, useRef, useState } from 'react'

interface UseLazyBlurOptions {
  blurAmount?: string
  threshold?: number
  rootMargin?: string
}

export const useLazyBlur = (options: UseLazyBlurOptions = {}) => {
  const { blurAmount = 'blur(8px)', threshold = 0.1, rootMargin = '50px' } = options

  const [isBlurLoaded, setIsBlurLoaded] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isBlurLoaded) {
          // Set CSS custom property for blur amount
          target.style.setProperty('--blur-amount', blurAmount)
          target.classList.add('blur-loaded')
          setIsBlurLoaded(true)

          // Stop observing once blur is loaded
          observer.unobserve(target)
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
  }, [blurAmount, threshold, rootMargin, isBlurLoaded])

  return {
    targetRef,
    isBlurLoaded,
    blurClass: 'lazy-blur',
  }
}
