import { useState, useEffect, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface AmbientSettings {
  enabled: boolean
  volume: number
  currentSound: string | null
}

interface SoundConfig {
  id: string
  name: string
  url?: string
  type: 'generated' | 'web' | 'offline'
  mood: string[]
  description: string
}

export function useAmbientSounds(storyMood?: string) {
  const [settings, setSettings] = useLocalStorage<AmbientSettings>('crod-babylon-ambient', {
    enabled: false,
    volume: 0.3,
    currentSound: null
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [availableSounds, setAvailableSounds] = useState<SoundConfig[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainNodeRef = useRef<GainNode | null>(null)

  // Predefined ambient sound configurations
  const soundConfigs: SoundConfig[] = [
    {
      id: 'rain',
      name: 'Sanfter Regen',
      type: 'generated',
      mood: ['romantic', 'mysterious', 'dramatic'],
      description: 'Beruhigende Regentropfen für entspanntes Lesen'
    },
    {
      id: 'forest',
      name: 'Waldgeräusche',
      type: 'generated',
      mood: ['fantasy', 'adventure', 'mysterious'],
      description: 'Naturgeräusche und Vogelgezwitscher'
    },
    {
      id: 'fireplace',
      name: 'Kaminfeuer',
      type: 'generated',
      mood: ['romantic', 'dramatic'],
      description: 'Knisterndes Feuer für gemütliche Atmosphäre'
    },
    {
      id: 'ocean',
      name: 'Meeresrauschen',
      type: 'generated',
      mood: ['romantic', 'adventure'],
      description: 'Sanfte Wellen am Strand'
    },
    {
      id: 'city_night',
      name: 'Nächtliche Stadt',
      type: 'generated',
      mood: ['modern', 'dramatic'],
      description: 'Urbane Geräusche und ferne Musik'
    },
    {
      id: 'cafe',
      name: 'Café Atmosphäre',
      type: 'generated',
      mood: ['modern', 'romantic'],
      description: 'Gemurmel und Kaffeetassen-Klirren'
    }
  ]

  useEffect(() => {
    // Filter sounds based on story mood
    if (storyMood) {
      const matchingSounds = soundConfigs.filter(sound => 
        sound.mood.includes(storyMood)
      )
      setAvailableSounds(matchingSounds.length > 0 ? matchingSounds : soundConfigs)
    } else {
      setAvailableSounds(soundConfigs)
    }
  }, [storyMood])

  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
      gainNodeRef.current.gain.value = settings.volume
    }
  }

  const generateRainSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    const bufferSize = audioContextRef.current.sampleRate * 2
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
    const output = buffer.getChannelData(0)

    // Generate brown noise for rain
    let lastOut = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      output[i] = (lastOut + (0.02 * white)) / 1.02
      lastOut = output[i]
      output[i] *= 0.3 // Reduce volume
    }

    const source = audioContextRef.current.createBufferSource()
    source.buffer = buffer
    source.loop = true
    source.connect(gainNodeRef.current)
    source.start(0)
    
    oscillatorsRef.current.push(source as any)
  }

  const generateForestSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    // Create multiple oscillators for wind and rustling
    const windOsc = audioContextRef.current.createOscillator()
    const windGain = audioContextRef.current.createGain()
    
    windOsc.type = 'sine'
    windOsc.frequency.setValueAtTime(60, audioContextRef.current.currentTime)
    windGain.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    
    windOsc.connect(windGain)
    windGain.connect(gainNodeRef.current)
    windOsc.start()

    oscillatorsRef.current.push(windOsc)

    // Add periodic bird chirps
    const addBirdChirp = () => {
      if (!audioContextRef.current || !gainNodeRef.current) return
      
      const chirpOsc = audioContextRef.current.createOscillator()
      const chirpGain = audioContextRef.current.createGain()
      
      chirpOsc.type = 'sine'
      chirpOsc.frequency.setValueAtTime(800 + Math.random() * 400, audioContextRef.current.currentTime)
      chirpGain.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      chirpGain.gain.linearRampToValueAtTime(0.05, audioContextRef.current.currentTime + 0.1)
      chirpGain.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.3)
      
      chirpOsc.connect(chirpGain)
      chirpGain.connect(gainNodeRef.current)
      chirpOsc.start()
      chirpOsc.stop(audioContextRef.current.currentTime + 0.3)

      // Schedule next chirp
      setTimeout(addBirdChirp, 3000 + Math.random() * 7000)
    }

    setTimeout(addBirdChirp, 2000)
  }

  const generateFireplaceSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    // Create crackling sound using filtered noise
    const bufferSize = audioContextRef.current.sampleRate * 0.1
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
    const output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.2
    }

    const playcrackle = () => {
      if (!audioContextRef.current || !gainNodeRef.current) return
      
      const source = audioContextRef.current.createBufferSource()
      source.buffer = buffer
      
      const filter = audioContextRef.current.createBiquadFilter()
      filter.type = 'highpass'
      filter.frequency.value = 300
      
      source.connect(filter)
      filter.connect(gainNodeRef.current)
      source.start(0)
      
      setTimeout(playcrackle, 500 + Math.random() * 2000)
    }

    playcrackle()
  }

  const generateOceanSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return

    // Create wave sound using multiple sine waves
    const frequencies = [80, 120, 160, 200]
    
    frequencies.forEach((freq, index) => {
      const osc = audioContextRef.current!.createOscillator()
      const gain = audioContextRef.current!.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, audioContextRef.current!.currentTime)
      gain.gain.setValueAtTime(0.1 / frequencies.length, audioContextRef.current!.currentTime)
      
      // Add slow modulation for wave effect
      const lfo = audioContextRef.current!.createOscillator()
      const lfoGain = audioContextRef.current!.createGain()
      lfo.frequency.setValueAtTime(0.1 + index * 0.05, audioContextRef.current!.currentTime)
      lfoGain.gain.setValueAtTime(0.02, audioContextRef.current!.currentTime)
      
      lfo.connect(lfoGain)
      lfoGain.connect(gain.gain)
      
      osc.connect(gain)
      gain.connect(gainNodeRef.current!)
      osc.start()
      lfo.start()
      
      oscillatorsRef.current.push(osc, lfo)
    })
  }

  const generateSound = (soundId: string) => {
    stopAllSounds()
    initAudioContext()

    switch (soundId) {
      case 'rain':
        generateRainSound()
        break
      case 'forest':
        generateForestSound()
        break
      case 'fireplace':
        generateFireplaceSound()
        break
      case 'ocean':
        generateOceanSound()
        break
      case 'city_night':
        // Combine multiple low-frequency sounds
        generateOceanSound() // Use as base urban rumble
        break
      case 'cafe':
        // Generate cafe murmur
        generateRainSound() // Use as base murmur
        break
      default:
        break
    }
  }

  const playSound = (soundId: string) => {
    if (!settings.enabled) return

    generateSound(soundId)
    setSettings(prev => ({ ...prev, currentSound: soundId }))
    setIsPlaying(true)
  }

  const stopAllSounds = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop()
      } catch (e) {
        // Oscillator might already be stopped
      }
    })
    oscillatorsRef.current = []
    setIsPlaying(false)
  }

  const updateVolume = (volume: number) => {
    setSettings(prev => ({ ...prev, volume }))
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume
    }
  }

  const toggleEnabled = () => {
    const newEnabled = !settings.enabled
    setSettings(prev => ({ ...prev, enabled: newEnabled }))
    
    if (!newEnabled) {
      stopAllSounds()
    }
  }

  // Auto-play based on story mood
  useEffect(() => {
    if (settings.enabled && storyMood && availableSounds.length > 0) {
      const defaultSound = availableSounds[0]
      if (defaultSound && (!settings.currentSound || !isPlaying)) {
        playSound(defaultSound.id)
      }
    }
  }, [storyMood, availableSounds, settings.enabled])

  return {
    settings,
    isPlaying,
    availableSounds,
    playSound,
    stopAllSounds,
    updateVolume,
    toggleEnabled,
    currentSound: settings.currentSound
  }
}