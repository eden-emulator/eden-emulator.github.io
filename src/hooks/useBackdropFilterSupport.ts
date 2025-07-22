import { useState, useEffect } from 'react'

const STORAGE_KEY = 'eden-backdrop-filter-enabled'

export const useBackdropFilterSupport = () => {
  const [isSupported, setIsSupported] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      return stored === 'true'
    }
    // Default to enabled
    return true
  })

  useEffect(() => {
    // Only run test if we don't have a stored preference
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) return

    // Simple performance test
    const testElement = document.createElement('div')
    testElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      backdrop-filter: blur(10px);
      pointer-events: none;
      z-index: 99999;
    `
    
    document.body.appendChild(testElement)
    
    let frameCount = 0
    let startTime = performance.now()
    
    const measurePerformance = () => {
      frameCount++
      
      if (performance.now() - startTime >= 1000) {
        // If we get less than 50fps with backdrop-filter, disable it
        const fps = frameCount
        const shouldEnable = fps >= 50
        
        setIsSupported(shouldEnable)
        localStorage.setItem(STORAGE_KEY, String(shouldEnable))
        
        document.body.removeChild(testElement)
        
        if (!shouldEnable) {
          console.log(`Backdrop-filter disabled due to low performance (${fps} FPS)`)
        }
      } else {
        requestAnimationFrame(measurePerformance)
      }
    }
    
    requestAnimationFrame(measurePerformance)
  }, [])

  const toggleSupport = (enabled: boolean) => {
    setIsSupported(enabled)
    localStorage.setItem(STORAGE_KEY, String(enabled))
    // Reload to apply changes
    window.location.reload()
  }

  return { isSupported, toggleSupport }
}