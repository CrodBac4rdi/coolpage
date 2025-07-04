import { useState, useEffect } from 'react'

export const useFocusMode = () => {
  const [focusMode, setFocusMode] = useState(false)
  const [focusIntensity, setFocusIntensity] = useState<'light' | 'medium' | 'strong'>('medium')
  const [currentParagraph, setCurrentParagraph] = useState<number | null>(null)

  useEffect(() => {
    // Load saved focus mode preference
    const saved = localStorage.getItem('focus-mode')
    if (saved) {
      const { enabled, intensity } = JSON.parse(saved)
      setFocusMode(enabled)
      setFocusIntensity(intensity)
    }
  }, [])

  const toggleFocusMode = () => {
    const newState = !focusMode
    setFocusMode(newState)
    saveFocusMode(newState, focusIntensity)
  }

  const changeFocusIntensity = (intensity: 'light' | 'medium' | 'strong') => {
    setFocusIntensity(intensity)
    saveFocusMode(focusMode, intensity)
  }

  const saveFocusMode = (enabled: boolean, intensity: 'light' | 'medium' | 'strong') => {
    localStorage.setItem('focus-mode', JSON.stringify({ enabled, intensity }))
  }

  const getFocusStyles = (isParagraph: boolean, paragraphIndex?: number) => {
    if (!focusMode) return {}

    const isCurrentParagraph = paragraphIndex !== undefined && paragraphIndex === currentParagraph
    
    if (!isParagraph) {
      // Styles for non-paragraph elements
      const opacity = {
        light: 0.7,
        medium: 0.5,
        strong: 0.3
      }[focusIntensity]

      return {
        opacity,
        filter: focusIntensity === 'strong' ? 'blur(1px)' : undefined,
        transition: 'all 0.3s ease'
      }
    }

    // Styles for paragraphs
    if (isCurrentParagraph) {
      return {
        opacity: 1,
        filter: 'none',
        transform: 'scale(1.02)',
        transition: 'all 0.3s ease'
      }
    }

    const opacity = {
      light: 0.6,
      medium: 0.4,
      strong: 0.2
    }[focusIntensity]

    const blur = {
      light: 0,
      medium: 1,
      strong: 2
    }[focusIntensity]

    return {
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
      transition: 'all 0.3s ease'
    }
  }

  return {
    focusMode,
    focusIntensity,
    currentParagraph,
    toggleFocusMode,
    changeFocusIntensity,
    setCurrentParagraph,
    getFocusStyles
  }
}