import { useState, useEffect, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface VoiceSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  voice: string
}

export function useSpeechSynthesis() {
  const [isSupported, setIsSupported] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentText, setCurrentText] = useState('')
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  
  const [voiceSettings, setVoiceSettings] = useLocalStorage<VoiceSettings>('crod-babylon-voice', {
    enabled: false,
    rate: 1,
    pitch: 1,
    volume: 0.8,
    voice: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true)
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices()
        setVoices(availableVoices)
        
        // Set default German voice if available
        if (!voiceSettings.voice && availableVoices.length > 0) {
          const germanVoice = availableVoices.find(voice => 
            voice.lang.startsWith('de') || voice.name.toLowerCase().includes('german')
          )
          if (germanVoice) {
            setVoiceSettings(prev => ({ ...prev, voice: germanVoice.name }))
          }
        }
      }

      loadVoices()
      speechSynthesis.addEventListener('voiceschanged', loadVoices)
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      }
    }
  }, [])

  const speak = (text: string) => {
    if (!isSupported || !voiceSettings.enabled) return

    // Stop any current speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    const selectedVoice = voices.find(voice => voice.name === voiceSettings.voice)
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    utterance.rate = voiceSettings.rate
    utterance.pitch = voiceSettings.pitch
    utterance.volume = voiceSettings.volume
    
    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
      setCurrentText(text)
    }
    
    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentText('')
    }
    
    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentText('')
    }
    
    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }

  const pause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause()
      setIsPaused(true)
    }
  }

  const resume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume()
      setIsPaused(false)
    }
  }

  const stop = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentText('')
  }

  const updateSettings = (newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }))
  }

  return {
    isSupported,
    isPlaying,
    isPaused,
    voices,
    currentText,
    voiceSettings,
    speak,
    pause,
    resume,
    stop,
    updateSettings
  }
}