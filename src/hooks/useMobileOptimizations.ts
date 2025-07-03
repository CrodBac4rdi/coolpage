import { useEffect, useState } from 'react'

export const useMobileOptimizations = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent
      
      // Check if mobile device
      const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      setIsMobile(mobileCheck || width <= 768)
      
      // Check if touch device
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
      
      // Determine screen size
      if (width < 475) setScreenSize('xs')
      else if (width < 640) setScreenSize('sm')
      else if (width < 768) setScreenSize('md')
      else if (width < 1024) setScreenSize('lg')
      else setScreenSize('xl')
    }

    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    
    return () => window.removeEventListener('resize', checkDeviceType)
  }, [])

  // Add haptic feedback for supported devices
  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator && isMobile) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      }
      navigator.vibrate(patterns[type])
    }
  }

  // Prevent zoom on input focus (iOS)
  useEffect(() => {
    if (isMobile) {
      const preventZoom = (e: Event) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          const viewport = document.querySelector('meta[name="viewport"]')
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
            setTimeout(() => {
              viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
            }, 500)
          }
        }
      }

      document.addEventListener('focusin', preventZoom)
      return () => document.removeEventListener('focusin', preventZoom)
    }
  }, [isMobile])

  return {
    isMobile,
    isTouch,
    screenSize,
    hapticFeedback,
    // Utility classes for conditional rendering
    mobileOnly: isMobile,
    desktopOnly: !isMobile,
    touchOnly: isTouch,
    hoverCapable: !isTouch
  }
}