import { useState, useEffect } from 'react'

interface PerformanceCapabilities {
  isMobile: boolean
  prefersReducedMotion: boolean
  shouldUseReducedAnimations: boolean
  deviceMemory?: number
  hardwareConcurrency?: number
}

export const usePerformanceOptimization = (): PerformanceCapabilities => {
  const [capabilities, setCapabilities] = useState<PerformanceCapabilities>({
    isMobile: false,
    prefersReducedMotion: false,
    shouldUseReducedAnimations: false,
  })

  useEffect(() => {
    const checkCapabilities = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Check if device is mobile
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth <= 768

      // Get device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory
      const hardwareConcurrency = navigator.hardwareConcurrency

      // Determine if we should use reduced animations
      const lowEndDevice = deviceMemory ? deviceMemory <= 4 : false
      const shouldUseReducedAnimations = prefersReducedMotion || isMobile || lowEndDevice

      setCapabilities({
        isMobile,
        prefersReducedMotion,
        shouldUseReducedAnimations,
        deviceMemory,
        hardwareConcurrency,
      })
    }

    checkCapabilities()

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => checkCapabilities()

    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleChange)
    }
  }, [])

  return capabilities
}
