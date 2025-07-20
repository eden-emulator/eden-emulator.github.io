import { useEffect, useState, useCallback } from 'react'
import { usePerformanceOptimization } from './usePerformanceOptimization'

interface ScrollPerformanceState {
  isScrolling: boolean
  shouldReduceAnimations: boolean
  scrollVelocity: number
}

export const useScrollPerformance = () => {
  const { isMobile, shouldUseReducedAnimations } = usePerformanceOptimization()
  const [scrollState, setScrollState] = useState<ScrollPerformanceState>({
    isScrolling: false,
    shouldReduceAnimations: false,
    scrollVelocity: 0,
  })

  const throttledScrollHandler = useCallback(() => {
    let scrollTimeout: NodeJS.Timeout
    let lastScrollY = window.scrollY
    let lastTimestamp = Date.now()

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()

      // Calculate scroll velocity
      const distance = Math.abs(currentScrollY - lastScrollY)
      const timeDelta = currentTime - lastTimestamp
      const velocity = distance / Math.max(timeDelta, 1)

      lastScrollY = currentScrollY
      lastTimestamp = currentTime

      // High velocity scrolling on mobile = reduce animations
      const highVelocityScrolling = isMobile && velocity > 2

      setScrollState({
        isScrolling: true,
        shouldReduceAnimations: shouldUseReducedAnimations || highVelocityScrolling,
        scrollVelocity: velocity,
      })

      // Clear previous timeout and set new one
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setScrollState((prev) => ({
          ...prev,
          isScrolling: false,
          shouldReduceAnimations: shouldUseReducedAnimations,
          scrollVelocity: 0,
        }))
      }, 150) // Resume animations 150ms after scroll stops
    }

    return handleScroll
  }, [isMobile, shouldUseReducedAnimations])

  useEffect(() => {
    const scrollHandler = throttledScrollHandler()

    // Use passive listener for better performance
    window.addEventListener('scroll', scrollHandler, { passive: true })

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [throttledScrollHandler])

  return scrollState
}
