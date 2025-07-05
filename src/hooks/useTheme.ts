import { useLocalStorage } from './useLocalStorage'
import { useEffect } from 'react'

type Theme = 'light' | 'dark' | 'auto'

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('crod-babylon-theme', 'auto')

  useEffect(() => {
    const root = document.documentElement
    
    // Remove all theme classes
    root.classList.remove('light', 'dark')
    
    if (theme === 'auto') {
      // Use system preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const applySystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
        root.classList.toggle('dark', e.matches)
        root.classList.toggle('light', !e.matches)
      }
      
      applySystemTheme(mediaQuery)
      mediaQuery.addEventListener('change', applySystemTheme)
      
      return () => mediaQuery.removeEventListener('change', applySystemTheme)
    } else {
      // Apply selected theme
      root.classList.add(theme)
    }
  }, [theme])

  return { theme, setTheme }
}