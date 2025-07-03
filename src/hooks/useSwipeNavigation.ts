import { useEffect, useRef } from 'react'

interface SwipeNavigationConfig {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  preventScroll?: boolean
}

export const useSwipeNavigation = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  preventScroll = false
}: SwipeNavigationConfig) => {
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (preventScroll) {
        const touchCurrentX = e.touches[0].clientX
        const touchCurrentY = e.touches[0].clientY
        const diffX = Math.abs(touchCurrentX - touchStartX.current)
        const diffY = Math.abs(touchCurrentY - touchStartY.current)
        
        // Prevent scroll if horizontal swipe is stronger than vertical
        if (diffX > diffY) {
          e.preventDefault()
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      
      const diffX = touchStartX.current - touchEndX
      const diffY = Math.abs(touchStartY.current - touchEndY)
      
      // Only trigger if horizontal swipe is stronger than vertical
      if (Math.abs(diffX) > threshold && Math.abs(diffX) > diffY) {
        if (diffX > 0 && onSwipeLeft) {
          onSwipeLeft()
        } else if (diffX < 0 && onSwipeRight) {
          onSwipeRight()
        }
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, threshold, preventScroll])

  return elementRef
}