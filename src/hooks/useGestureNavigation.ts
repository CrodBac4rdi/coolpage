import { useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface GestureConfig {
  enableSwipeNavigation: boolean
  enablePinchZoom: boolean
  enableTapActions: boolean
  swipeThreshold: number
  pinchThreshold: number
}

export const useGestureNavigation = (config: GestureConfig = {
  enableSwipeNavigation: true,
  enablePinchZoom: true,
  enableTapActions: true,
  swipeThreshold: 100,
  pinchThreshold: 0.2
}) => {
  const navigate = useNavigate()
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const lastTouchRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const pinchStartRef = useRef<number | null>(null)
  const tapCountRef = useRef(0)
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Save gesture preferences
  useEffect(() => {
    const savedConfig = localStorage.getItem('gesture-config')
    if (savedConfig) {
      Object.assign(config, JSON.parse(savedConfig))
    }
  }, [])

  const saveConfig = useCallback((newConfig: Partial<GestureConfig>) => {
    const updated = { ...config, ...newConfig }
    localStorage.setItem('gesture-config', JSON.stringify(updated))
    Object.assign(config, updated)
  }, [config])

  // Haptic feedback
  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      }
      navigator.vibrate(patterns[type])
    }
  }, [])

  // Swipe navigation
  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up' | 'down', velocity: number) => {
    if (!config.enableSwipeNavigation) return

    const currentPath = window.location.pathname
    
    // Horizontal swipes for page navigation
    if (direction === 'left' && velocity > 0.5) {
      hapticFeedback('medium')
      // Navigate forward in reading order
      if (currentPath === '/') navigate('/manhwa')
      else if (currentPath === '/manhwa') navigate('/blog')
      else if (currentPath === '/blog') navigate('/timeline')
      else if (currentPath === '/timeline') navigate('/memory')
      else if (currentPath === '/memory') navigate('/games')
    } else if (direction === 'right' && velocity > 0.5) {
      hapticFeedback('medium')
      // Navigate backward
      if (currentPath === '/games') navigate('/memory')
      else if (currentPath === '/memory') navigate('/timeline')
      else if (currentPath === '/timeline') navigate('/blog')
      else if (currentPath === '/blog') navigate('/manhwa')
      else if (currentPath === '/manhwa') navigate('/')
      else navigate(-1)
    }

    // Vertical swipes for actions
    if (direction === 'up' && velocity > 0.7) {
      hapticFeedback('light')
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (direction === 'down' && velocity > 0.7) {
      hapticFeedback('light')
      // Quick access to reader if on story pages
      if (currentPath.includes('/manhwa') || currentPath.includes('/blog')) {
        const lastReadStory = localStorage.getItem('last-read-story')
        if (lastReadStory) {
          navigate(`/reader/${lastReadStory}`)
        }
      }
    }
  }, [config.enableSwipeNavigation, navigate, hapticFeedback])

  // Touch handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      }
      lastTouchRef.current = { x: touch.clientX, y: touch.clientY }
    } else if (e.touches.length === 2 && config.enablePinchZoom) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      pinchStartRef.current = distance
    }
  }, [config.enablePinchZoom])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      lastTouchRef.current = { x: touch.clientX, y: touch.clientY }
    } else if (e.touches.length === 2 && config.enablePinchZoom && pinchStartRef.current) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const scale = distance / pinchStartRef.current
      
      // Trigger zoom action
      if (Math.abs(scale - 1) > config.pinchThreshold) {
        const zoomEvent = new CustomEvent('gesture-zoom', {
          detail: { scale, direction: scale > 1 ? 'in' : 'out' }
        })
        window.dispatchEvent(zoomEvent)
      }
    }
  }, [config.enablePinchZoom, config.pinchThreshold])

  const handleTouchEnd = useCallback((_e: TouchEvent) => {
    if (!touchStartRef.current) return

    const endTime = Date.now()
    const duration = endTime - touchStartRef.current.time
    const deltaX = lastTouchRef.current.x - touchStartRef.current.x
    const deltaY = lastTouchRef.current.y - touchStartRef.current.y
    const distance = Math.hypot(deltaX, deltaY)

    // Tap detection
    if (distance < 10 && duration < 300 && config.enableTapActions) {
      tapCountRef.current++
      
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current)
      }
      
      tapTimerRef.current = setTimeout(() => {
        if (tapCountRef.current === 2) {
          // Double tap - toggle reading mode or similar
          hapticFeedback('medium')
          const doubleTabEvent = new CustomEvent('gesture-doubletap', {
            detail: { x: touchStartRef.current!.x, y: touchStartRef.current!.y }
          })
          window.dispatchEvent(doubleTabEvent)
        } else if (tapCountRef.current === 3) {
          // Triple tap - special action
          hapticFeedback('heavy')
          const tripleTabEvent = new CustomEvent('gesture-tripletap')
          window.dispatchEvent(tripleTabEvent)
        }
        tapCountRef.current = 0
      }, 300)
    }

    // Swipe detection
    if (distance > config.swipeThreshold && duration < 500) {
      const velocity = distance / duration
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
      
      let direction: 'left' | 'right' | 'up' | 'down'
      if (Math.abs(angle) < 45) direction = 'left'
      else if (Math.abs(angle) > 135) direction = 'right'
      else if (angle > 0) direction = 'down'
      else direction = 'up'
      
      handleSwipe(direction, velocity)
    }

    touchStartRef.current = null
    pinchStartRef.current = null
  }, [config.swipeThreshold, config.enableTapActions, handleSwipe, hapticFeedback])

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only handle when not in input fields
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }

    switch (e.key) {
      case 'ArrowLeft':
      case 'h':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          navigate(-1)
        }
        break
      case 'ArrowRight':
      case 'l':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          window.history.forward()
        }
        break
      case 'Home':
      case 'g':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          navigate('/')
        }
        break
      case 'r':
        if (e.ctrlKey || e.metaKey && e.shiftKey) {
          e.preventDefault()
          const lastRead = localStorage.getItem('last-read-story')
          if (lastRead) navigate(`/reader/${lastRead}`)
        }
        break
      case 'm':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          navigate('/memory')
        }
        break
      case 't':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          navigate('/timeline')
        }
        break
      case 'Escape':
        // Close modals or return to previous page
        const escapeEvent = new CustomEvent('gesture-escape')
        window.dispatchEvent(escapeEvent)
        break
    }
  }, [navigate])

  // Register event listeners
  useEffect(() => {
    if (!('ontouchstart' in window)) return // Skip if not touch device

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Cleanup
  useEffect(() => {
    return () => {
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current)
      }
    }
  }, [])

  return {
    config,
    saveConfig,
    hapticFeedback
  }
}