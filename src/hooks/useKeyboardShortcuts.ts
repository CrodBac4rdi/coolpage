import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

interface Shortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()

  const shortcuts: Shortcut[] = [
    // Navigation shortcuts
    { key: 'h', alt: true, action: () => navigate('/'), description: 'Go to Home' },
    { key: 's', alt: true, action: () => navigate('/romance-search'), description: 'Search Anime' },
    { key: 'w', alt: true, action: () => navigate('/watchlist'), description: 'Open Watchlist' },
    { key: 'c', alt: true, action: () => navigate('/content'), description: 'Content Hub' },
    
    // Action shortcuts
    { key: 't', ctrl: true, shift: true, action: toggleTheme, description: 'Toggle Theme' },
    { key: '/', ctrl: true, action: () => {
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]') as HTMLInputElement
      searchInput?.focus()
    }, description: 'Focus Search' },
    
    // Quick actions
    { key: 'Escape', action: () => {
      // Close any open modals
      const closeButtons = document.querySelectorAll('[aria-label*="Close"], button:has(svg[class*="X"])')
      closeButtons.forEach(btn => (btn as HTMLButtonElement).click())
    }, description: 'Close Modal' },
    
    { key: 'ArrowLeft', alt: true, action: () => window.history.back(), description: 'Go Back' },
    { key: 'ArrowRight', alt: true, action: () => window.history.forward(), description: 'Go Forward' },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      shortcuts.forEach(shortcut => {
        const matchesKey = e.key.toLowerCase() === shortcut.key.toLowerCase()
        const matchesCtrl = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true
        const matchesAlt = shortcut.alt ? e.altKey : true
        const matchesShift = shortcut.shift ? e.shiftKey : true

        if (matchesKey && matchesCtrl && matchesAlt && matchesShift) {
          e.preventDefault()
          shortcut.action()
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, toggleTheme])

  return shortcuts
}

// Hook to display shortcuts help
export function useShortcutsHelp() {
  const shortcuts = useKeyboardShortcuts()
  
  const showHelp = () => {
    const formatKey = (shortcut: Shortcut) => {
      const keys = []
      if (shortcut.ctrl) keys.push('Ctrl')
      if (shortcut.alt) keys.push('Alt')
      if (shortcut.shift) keys.push('Shift')
      keys.push(shortcut.key.toUpperCase())
      return keys.join(' + ')
    }

    const helpText = shortcuts
      .map(s => `${formatKey(s)}: ${s.description}`)
      .join('\n')
    
    console.log('⌨️ Keyboard Shortcuts:\n' + helpText)
  }

  useEffect(() => {
    // Show help with ?
    const handleHelp = (e: KeyboardEvent) => {
      if (e.key === '?' && e.shiftKey) {
        showHelp()
      }
    }
    
    window.addEventListener('keydown', handleHelp)
    return () => window.removeEventListener('keydown', handleHelp)
  }, [])
}