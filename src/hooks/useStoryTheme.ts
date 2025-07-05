import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface ThemeSettings {
  enableDynamicTheming: boolean
  enableParticles: boolean
  enableMoodLighting: boolean
  intensity: number
}

interface StoryTheme {
  background: string
  accent: string
  border: string
  particles?: string
  mood: 'romantic' | 'mysterious' | 'adventure' | 'dramatic' | 'fantasy' | 'modern'
  atmosphere: {
    primary: string
    secondary: string
    glow: string
  }
}

export function useStoryTheme(storyId: string) {
  const [themeSettings, setThemeSettings] = useLocalStorage<ThemeSettings>('crod-babylon-theme', {
    enableDynamicTheming: true,
    enableParticles: true,
    enableMoodLighting: true,
    intensity: 0.7
  })

  const storyThemes: Record<string, StoryTheme> = {
    'forbidden-desire': {
      background: 'from-red-950 via-red-900 to-black',
      accent: 'text-red-300',
      border: 'border-red-800',
      particles: 'red',
      mood: 'romantic',
      atmosphere: {
        primary: 'rgba(220, 38, 38, 0.1)',
        secondary: 'rgba(239, 68, 68, 0.05)', 
        glow: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.3))'
      }
    },
    'moonlight-academy': {
      background: 'from-purple-950 via-blue-900 to-black',
      accent: 'text-purple-300',
      border: 'border-purple-800',
      particles: 'purple',
      mood: 'fantasy',
      atmosphere: {
        primary: 'rgba(147, 51, 234, 0.1)',
        secondary: 'rgba(168, 85, 247, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))'
      }
    },
    'code-breakers': {
      background: 'from-green-950 via-emerald-900 to-black',
      accent: 'text-green-300',
      border: 'border-green-800',
      particles: 'green',
      mood: 'modern',
      atmosphere: {
        primary: 'rgba(34, 197, 94, 0.1)',
        secondary: 'rgba(74, 222, 128, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))'
      }
    },
    'dream-catcher': {
      background: 'from-indigo-950 via-purple-900 to-black',
      accent: 'text-indigo-300',
      border: 'border-indigo-800',
      particles: 'indigo',
      mood: 'mysterious',
      atmosphere: {
        primary: 'rgba(99, 102, 241, 0.1)',
        secondary: 'rgba(129, 140, 248, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))'
      }
    },
    'my-boss-is-a-cat': {
      background: 'from-orange-950 via-amber-900 to-black',
      accent: 'text-orange-300',
      border: 'border-orange-800',
      particles: 'orange',
      mood: 'adventure',
      atmosphere: {
        primary: 'rgba(249, 115, 22, 0.1)',
        secondary: 'rgba(251, 146, 60, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.3))'
      }
    },
    'shadow-in-mirror': {
      background: 'from-gray-950 via-slate-900 to-black',
      accent: 'text-slate-300',
      border: 'border-slate-800',
      particles: 'gray',
      mood: 'mysterious',
      atmosphere: {
        primary: 'rgba(71, 85, 105, 0.1)',
        secondary: 'rgba(100, 116, 139, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(71, 85, 105, 0.3))'
      }
    },
    'the-transfer-student': {
      background: 'from-pink-950 via-rose-900 to-black',
      accent: 'text-pink-300',
      border: 'border-pink-800',
      particles: 'pink',
      mood: 'romantic',
      atmosphere: {
        primary: 'rgba(236, 72, 153, 0.1)',
        secondary: 'rgba(244, 114, 182, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.3))'
      }
    },
    'between-the-lines': {
      background: 'from-blue-950 via-cyan-900 to-black',
      accent: 'text-blue-300',
      border: 'border-blue-800',
      particles: 'blue',
      mood: 'dramatic',
      atmosphere: {
        primary: 'rgba(59, 130, 246, 0.1)',
        secondary: 'rgba(96, 165, 250, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
      }
    },
    'cafe-encounters': {
      background: 'from-yellow-950 via-amber-900 to-black',
      accent: 'text-yellow-300',
      border: 'border-yellow-800',
      particles: 'yellow',
      mood: 'modern',
      atmosphere: {
        primary: 'rgba(245, 158, 11, 0.1)',
        secondary: 'rgba(251, 191, 36, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.3))'
      }
    },
    'dangerous-attraction': {
      background: 'from-violet-950 via-purple-900 to-black',
      accent: 'text-violet-300',
      border: 'border-violet-800',
      particles: 'violet',
      mood: 'dramatic',
      atmosphere: {
        primary: 'rgba(139, 92, 246, 0.1)',
        secondary: 'rgba(167, 139, 250, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'
      }
    },
    'midnight-confessions': {
      background: 'from-sky-950 via-blue-900 to-black',
      accent: 'text-sky-300',
      border: 'border-sky-800',
      particles: 'sky',
      mood: 'romantic',
      atmosphere: {
        primary: 'rgba(14, 165, 233, 0.1)',
        secondary: 'rgba(56, 189, 248, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.3))'
      }
    },
    'summer-temptation': {
      background: 'from-teal-950 via-emerald-900 to-black',
      accent: 'text-teal-300',
      border: 'border-teal-800',
      particles: 'teal',
      mood: 'adventure',
      atmosphere: {
        primary: 'rgba(20, 184, 166, 0.1)',
        secondary: 'rgba(45, 212, 191, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(20, 184, 166, 0.3))'
      }
    },
    default: {
      background: 'from-slate-950 via-gray-900 to-black',
      accent: 'text-slate-300',
      border: 'border-slate-800',
      particles: 'gray',
      mood: 'modern',
      atmosphere: {
        primary: 'rgba(71, 85, 105, 0.1)',
        secondary: 'rgba(100, 116, 139, 0.05)',
        glow: 'drop-shadow(0 0 20px rgba(71, 85, 105, 0.3))'
      }
    }
  }

  const theme = storyThemes[storyId] || storyThemes.default
  
  const [currentTheme, setCurrentTheme] = useState(theme)

  useEffect(() => {
    if (themeSettings.enableDynamicTheming) {
      setCurrentTheme(theme)
    } else {
      setCurrentTheme(storyThemes.default)
    }
  }, [storyId, themeSettings.enableDynamicTheming])

  return {
    theme: currentTheme,
    themeSettings,
    updateThemeSettings: setThemeSettings
  }
}