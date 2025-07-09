import { useEffect, useRef, useCallback } from 'react'

export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) return

    const container = containerRef.current
    if (!container) return

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement

    // Get all focusable elements
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus the first element
    firstFocusable?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab (backward)
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        // Tab (forward)
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Return focus to the previously focused element
        previousFocusRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleEscape)
      
      // Return focus to the previously focused element when trap is disabled
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isActive])

  return containerRef
}

export function useKeyboardNavigation(
  items: string[],
  onSelect: (item: string) => void,
  isActive: boolean = true
) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % items.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + items.length) % items.length)
          break
        case 'Enter':
          e.preventDefault()
          onSelect(items[selectedIndex])
          break
        case 'Escape':
          e.preventDefault()
          setSelectedIndex(0)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isActive, items, selectedIndex, onSelect])

  return {
    selectedIndex,
    setSelectedIndex
  }
}

export function useArrowNavigation(
  containerRef: React.RefObject<HTMLElement>,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
) {
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!containerRef.current) return

    const focusableElements = Array.from(
      containerRef.current.querySelectorAll(focusableSelector)
    ) as HTMLElement[]

    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
    if (currentIndex === -1) return

    let nextIndex = currentIndex

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % focusableElements.length
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length
      }
    } else {
      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % focusableElements.length
      } else if (e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length
      }
    }

    if (nextIndex !== currentIndex) {
      e.preventDefault()
      focusableElements[nextIndex]?.focus()
    }
  }, [orientation])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export function useAutoFocus(condition: boolean = true) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (condition && elementRef.current) {
      elementRef.current.focus()
    }
  }, [condition])

  return elementRef
}

import { useState } from 'react'

export function useFocusVisible() {
  const [focusVisible, setFocusVisible] = useState(false)
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState(false)

  useEffect(() => {
    const handlePointerDown = () => {
      setHadKeyboardEvent(false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Shift') {
        setHadKeyboardEvent(true)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const onFocus = () => {
    setFocusVisible(hadKeyboardEvent)
  }

  const onBlur = () => {
    setFocusVisible(false)
  }

  return {
    focusVisible,
    onFocus,
    onBlur
  }
}