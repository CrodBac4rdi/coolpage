import { useEffect, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface GestureSettings {
  enabled: boolean
  swipeThreshold: number
  doubleTapDelay: number
  longPressDelay: number
}

interface GestureCallbacks {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  onPinchZoom?: (scale: number) => void
}

export function useGestures(callbacks: GestureCallbacks) {
  const elementRef = useRef<HTMLElement>(null)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const tapCountRef = useRef(0)
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastTouchRef = useRef<{ distance: number; time: number } | null>(null)

  const [gestureSettings, setGestureSettings] = useLocalStorage<GestureSettings>('crod-babylon-gestures', {
    enabled: true,
    swipeThreshold: 50,
    doubleTapDelay: 300,
    longPressDelay: 500
  })

  useEffect(() => {
    const element = elementRef.current
    if (!element || !gestureSettings.enabled) return

    let initialPinchDistance = 0

    const getTouchPoint = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0]
      return { x: touch.clientX, y: touch.clientY }
    }

    const getDistance = (touch1: Touch, touch2: Touch) => {
      const dx = touch1.clientX - touch2.clientX
      const dy = touch1.clientY - touch2.clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const handleTouchStart = (e: TouchEvent) => {
      const point = getTouchPoint(e)
      const now = Date.now()

      // Handle pinch start
      if (e.touches.length === 2) {
        initialPinchDistance = getDistance(e.touches[0], e.touches[1])
        return
      }

      touchStartRef.current = { x: point.x, y: point.y, time: now }

      // Clear any existing timers
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current)
        tapTimerRef.current = null
      }
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }

      // Start long press timer
      longPressTimerRef.current = setTimeout(() => {
        if (callbacks.onLongPress) {
          callbacks.onLongPress()
        }
      }, gestureSettings.longPressDelay)
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Handle pinch zoom
      if (e.touches.length === 2 && callbacks.onPinchZoom) {
        const currentDistance = getDistance(e.touches[0], e.touches[1])
        if (initialPinchDistance > 0) {
          const scale = currentDistance / initialPinchDistance
          callbacks.onPinchZoom(scale)
        }
        return
      }

      // Cancel long press if finger moves
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      // Clear long press timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
        longPressTimerRef.current = null
      }

      // Handle pinch end
      if (e.changedTouches.length > 1) {
        initialPinchDistance = 0
        return
      }

      const point = getTouchPoint(e)
      const start = touchStartRef.current
      const deltaX = point.x - start.x
      const deltaY = point.y - start.y
      const deltaTime = Date.now() - start.time
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // Check for swipe
      if (distance > gestureSettings.swipeThreshold && deltaTime < 500) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0 && callbacks.onSwipeRight) {
            callbacks.onSwipeRight()
          } else if (deltaX < 0 && callbacks.onSwipeLeft) {
            callbacks.onSwipeLeft()
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && callbacks.onSwipeDown) {
            callbacks.onSwipeDown()
          } else if (deltaY < 0 && callbacks.onSwipeUp) {
            callbacks.onSwipeUp()
          }
        }
        touchStartRef.current = null
        return
      }

      // Check for tap (short movement and time)
      if (distance < 10 && deltaTime < 500) {
        tapCountRef.current++

        if (tapCountRef.current === 1) {
          // Start timer for double tap detection
          tapTimerRef.current = setTimeout(() => {
            tapCountRef.current = 0
          }, gestureSettings.doubleTapDelay)
        } else if (tapCountRef.current === 2) {
          // Double tap detected
          if (tapTimerRef.current) {
            clearTimeout(tapTimerRef.current)
            tapTimerRef.current = null
          }
          tapCountRef.current = 0
          if (callbacks.onDoubleTap) {
            callbacks.onDoubleTap()
          }
        }
      }

      touchStartRef.current = null
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current)
      }
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [callbacks, gestureSettings])

  return {
    elementRef,
    gestureSettings,
    updateGestureSettings: setGestureSettings
  }
}