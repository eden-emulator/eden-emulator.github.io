import { useState, useEffect } from 'react'

interface BrowserInfo {
  isChrome: boolean
  isFirefox: boolean
  isSafari: boolean
  isWebKit: boolean
  isIOS: boolean
  isAndroid: boolean
  version: number
}

interface PerformanceCapabilities {
  isMobile: boolean
  prefersReducedMotion: boolean
  shouldUseReducedAnimations: boolean
  shouldDisableAllAnimations: boolean
  deviceMemory?: number
  hardwareConcurrency?: number
  browser: BrowserInfo
}

function hasDeviceMemory(navigator: Navigator): navigator is Navigator & { deviceMemory: number } {
  return 'deviceMemory' in navigator
}

function detectBrowser(): BrowserInfo {
  const userAgent = navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isAndroid = /Android/.test(userAgent)
  const isChrome = /Chrome/.test(userAgent) && !/Edge/.test(userAgent)
  const isFirefox = /Firefox/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
  const isWebKit = /WebKit/.test(userAgent)

  // Extract version numbers for performance decisions
  let version = 0
  if (isChrome) {
    const match = userAgent.match(/Chrome\/(\d+)/)
    version = match ? parseInt(match[1]) : 0
  } else if (isFirefox) {
    const match = userAgent.match(/Firefox\/(\d+)/)
    version = match ? parseInt(match[1]) : 0
  } else if (isSafari) {
    const match = userAgent.match(/Version\/(\d+)/)
    version = match ? parseInt(match[1]) : 0
  }

  return {
    isChrome,
    isFirefox,
    isSafari,
    isWebKit,
    isIOS,
    isAndroid,
    version,
  }
}

export const usePerformanceOptimization = (): PerformanceCapabilities => {
  const [capabilities, setCapabilities] = useState<PerformanceCapabilities>({
    isMobile: false,
    prefersReducedMotion: false,
    shouldUseReducedAnimations: false,
    shouldDisableAllAnimations: false,
    browser: {
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isWebKit: false,
      isIOS: false,
      isAndroid: false,
      version: 0,
    },
  })

  useEffect(() => {
    const checkCapabilities = () => {
      // Check if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Get browser information
      const browser = detectBrowser()

      // Check if device is mobile
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth <= 768

      // Get device memory (if available) - Navigator DeviceMemory API
      const deviceMemory = hasDeviceMemory(navigator) ? navigator.deviceMemory : undefined
      const hardwareConcurrency = navigator.hardwareConcurrency

      // Browser-specific performance issues
      const firefoxMobile = browser.isFirefox && isMobile // Firefox mobile has poor animation performance
      const oldSafari = browser.isSafari && browser.version < 15 // Older Safari struggles with transforms
      const androidFirefox = browser.isFirefox && browser.isAndroid // Android Firefox is particularly slow
      const iosOldVersion = browser.isIOS && browser.version < 15 // Older iOS versions

      // Determine performance levels
      const lowEndDevice = deviceMemory ? deviceMemory <= 4 : false
      const lowEndCPU = hardwareConcurrency ? hardwareConcurrency <= 4 : false

      // Aggressive conditions for disabling ALL animations
      const shouldDisableAllAnimations =
        prefersReducedMotion ||
        firefoxMobile ||
        androidFirefox ||
        oldSafari ||
        iosOldVersion ||
        (isMobile && lowEndDevice && lowEndCPU)

      // Conditions for reduced animations (but not disabled)
      const shouldUseReducedAnimations =
        shouldDisableAllAnimations ||
        isMobile ||
        browser.isFirefox || // Firefox generally has poorer animation performance
        (deviceMemory && deviceMemory <= 6)

      setCapabilities({
        isMobile,
        prefersReducedMotion,
        shouldUseReducedAnimations: Boolean(shouldUseReducedAnimations),
        shouldDisableAllAnimations: Boolean(shouldDisableAllAnimations),
        deviceMemory,
        hardwareConcurrency,
        browser,
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
