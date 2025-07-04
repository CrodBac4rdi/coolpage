import { useState, useEffect } from 'react'

export type MoodType = 'romantic' | 'tense' | 'mysterious' | 'peaceful' | 'exciting' | 'melancholic' | 'default'

interface AmbientConfig {
  mood: MoodType
  intensity: number // 0-100
  particlesEnabled: boolean
  colorShiftEnabled: boolean
}

const moodPresets: Record<MoodType, {
  gradient: string
  particleColor: string
  animation: string
  filter?: string
}> = {
  romantic: {
    gradient: 'from-pink-900/20 via-red-900/20 to-purple-900/20',
    particleColor: '#ec4899',
    animation: 'float',
    filter: 'hue-rotate(10deg) saturate(1.2)'
  },
  tense: {
    gradient: 'from-red-950/30 via-gray-900/30 to-black/40',
    particleColor: '#ef4444',
    animation: 'pulse',
    filter: 'contrast(1.2) saturate(0.8)'
  },
  mysterious: {
    gradient: 'from-purple-950/30 via-indigo-950/30 to-blue-950/30',
    particleColor: '#6366f1',
    animation: 'drift',
    filter: 'brightness(0.8) hue-rotate(-10deg)'
  },
  peaceful: {
    gradient: 'from-blue-900/20 via-cyan-900/20 to-teal-900/20',
    particleColor: '#06b6d4',
    animation: 'breathe',
    filter: 'brightness(1.1) saturate(0.9)'
  },
  exciting: {
    gradient: 'from-orange-900/20 via-yellow-900/20 to-red-900/20',
    particleColor: '#f59e0b',
    animation: 'spark',
    filter: 'contrast(1.3) saturate(1.3)'
  },
  melancholic: {
    gradient: 'from-gray-900/30 via-blue-950/30 to-slate-900/30',
    particleColor: '#64748b',
    animation: 'rain',
    filter: 'saturate(0.5) brightness(0.9)'
  },
  default: {
    gradient: 'from-gray-900/10 via-gray-900/10 to-gray-900/10',
    particleColor: '#9333ea',
    animation: 'none',
    filter: undefined
  }
}

export const useAmbientMode = () => {
  const [config, setConfig] = useState<AmbientConfig>(() => {
    const saved = localStorage.getItem('ambient-mode')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      mood: 'default',
      intensity: 50,
      particlesEnabled: true,
      colorShiftEnabled: true
    }
  })

  const [currentKeywords, setCurrentKeywords] = useState<string[]>([])

  useEffect(() => {
    localStorage.setItem('ambient-mode', JSON.stringify(config))
  }, [config])

  // Analyze text for mood keywords
  const analyzeTextMood = (text: string): MoodType => {
    const moodKeywords: Record<MoodType, string[]> = {
      romantic: ['liebe', 'herz', 'kuss', 'umarmung', 'sehnsucht', 'leidenschaft', 'zärtlich'],
      tense: ['gefahr', 'angst', 'dunkel', 'bedrohung', 'kampf', 'flucht', 'spannung'],
      mysterious: ['geheimnis', 'rätsel', 'schatten', 'unbekannt', 'magie', 'mysteriös', 'verborgen'],
      peaceful: ['ruhe', 'frieden', 'stille', 'harmonie', 'gelassen', 'sanft', 'entspannt'],
      exciting: ['abenteuer', 'aufregend', 'energie', 'action', 'rennen', 'springen', 'wild'],
      melancholic: ['traurig', 'verlust', 'einsamkeit', 'tränen', 'seufzen', 'vermissen', 'schwermut'],
      default: []
    }

    const lowerText = text.toLowerCase()
    let detectedMood: MoodType = 'default'
    let highestCount = 0

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      if (mood === 'default') continue
      
      const count = keywords.filter(keyword => lowerText.includes(keyword)).length
      if (count > highestCount) {
        highestCount = count
        detectedMood = mood as MoodType
        setCurrentKeywords(keywords.filter(keyword => lowerText.includes(keyword)))
      }
    }

    return detectedMood
  }

  // Auto-adjust mood based on current text
  const updateMoodFromText = (text: string) => {
    if (!config.colorShiftEnabled) return
    
    const detectedMood = analyzeTextMood(text)
    if (detectedMood !== config.mood) {
      setConfig(prev => ({ ...prev, mood: detectedMood }))
    }
  }

  // Manual mood setting
  const setMood = (mood: MoodType) => {
    setConfig(prev => ({ ...prev, mood }))
  }

  const setIntensity = (intensity: number) => {
    setConfig(prev => ({ ...prev, intensity: Math.max(0, Math.min(100, intensity)) }))
  }

  const toggleParticles = () => {
    setConfig(prev => ({ ...prev, particlesEnabled: !prev.particlesEnabled }))
  }

  const toggleColorShift = () => {
    setConfig(prev => ({ ...prev, colorShiftEnabled: !prev.colorShiftEnabled }))
  }

  // Get current mood styles
  const getAmbientStyles = () => {
    const preset = moodPresets[config.mood]
    const opacity = config.intensity / 100

    return {
      background: `bg-gradient-to-br ${preset.gradient}`,
      filter: preset.filter,
      opacity,
      animation: preset.animation
    }
  }

  // Generate particle effects
  const getParticleConfig = () => {
    if (!config.particlesEnabled) return null

    const preset = moodPresets[config.mood]
    const count = Math.floor((config.intensity / 100) * 50)

    return {
      count,
      color: preset.particleColor,
      animation: preset.animation,
      size: config.mood === 'exciting' ? 'large' : 'normal'
    }
  }

  return {
    config,
    currentKeywords,
    setMood,
    setIntensity,
    toggleParticles,
    toggleColorShift,
    updateMoodFromText,
    getAmbientStyles,
    getParticleConfig,
    moodPresets
  }
}