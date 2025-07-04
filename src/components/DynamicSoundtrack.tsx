import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music, Waves, Heart, Zap, Moon, Sun } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type { MoodType } from '../hooks/useAmbientMode'

interface SoundLayer {
  id: string
  name: string
  type: 'ambient' | 'rhythm' | 'melody' | 'effect'
  mood: MoodType
  intensity: number
  frequency: number
  waveform: 'sine' | 'square' | 'triangle' | 'sawtooth'
  volume: number
}

interface DynamicSoundtrackProps {
  currentMood: MoodType
  textContent: string
  isReading: boolean
  readingSpeed: number
}

export default function DynamicSoundtrack({
  currentMood,
  textContent,
  isReading,
  readingSpeed
}: DynamicSoundtrackProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [masterVolume, setMasterVolume] = useState(0.3)
  const [soundLayers, setSoundLayers] = useState<SoundLayer[]>([])
  const [showControls, setShowControls] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map())
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map())
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number>()

  // Initialize Web Audio API
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.connect(audioContextRef.current.destination)
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Define mood-based sound layers
  useEffect(() => {
    const moodSounds: Record<MoodType, SoundLayer[]> = {
      romantic: [
        {
          id: 'romantic-ambient',
          name: 'Sanfte Wellen',
          type: 'ambient',
          mood: 'romantic',
          intensity: 0.4,
          frequency: 220,
          waveform: 'sine',
          volume: 0.3
        },
        {
          id: 'romantic-melody',
          name: 'Herzschlag',
          type: 'rhythm',
          mood: 'romantic',
          intensity: 0.6,
          frequency: 80,
          waveform: 'triangle',
          volume: 0.2
        }
      ],
      tense: [
        {
          id: 'tense-drone',
          name: 'Dunkler Drone',
          type: 'ambient',
          mood: 'tense',
          intensity: 0.8,
          frequency: 60,
          waveform: 'sawtooth',
          volume: 0.4
        },
        {
          id: 'tense-pulse',
          name: 'Schneller Puls',
          type: 'rhythm',
          mood: 'tense',
          intensity: 0.9,
          frequency: 180,
          waveform: 'square',
          volume: 0.3
        }
      ],
      mysterious: [
        {
          id: 'mystery-pad',
          name: 'Mystischer Pad',
          type: 'ambient',
          mood: 'mysterious',
          intensity: 0.5,
          frequency: 130,
          waveform: 'triangle',
          volume: 0.35
        },
        {
          id: 'mystery-whisper',
          name: 'Geflüster',
          type: 'effect',
          mood: 'mysterious',
          intensity: 0.3,
          frequency: 400,
          waveform: 'sine',
          volume: 0.15
        }
      ],
      peaceful: [
        {
          id: 'peace-nature',
          name: 'Naturklänge',
          type: 'ambient',
          mood: 'peaceful',
          intensity: 0.3,
          frequency: 250,
          waveform: 'sine',
          volume: 0.25
        },
        {
          id: 'peace-chimes',
          name: 'Windspiel',
          type: 'melody',
          mood: 'peaceful',
          intensity: 0.4,
          frequency: 800,
          waveform: 'triangle',
          volume: 0.2
        }
      ],
      exciting: [
        {
          id: 'exciting-energy',
          name: 'Energie',
          type: 'rhythm',
          mood: 'exciting',
          intensity: 0.8,
          frequency: 150,
          waveform: 'square',
          volume: 0.4
        },
        {
          id: 'exciting-sparkle',
          name: 'Funkeln',
          type: 'effect',
          mood: 'exciting',
          intensity: 0.6,
          frequency: 1200,
          waveform: 'sine',
          volume: 0.25
        }
      ],
      melancholic: [
        {
          id: 'melancholy-strings',
          name: 'Traurige Saiten',
          type: 'melody',
          mood: 'melancholic',
          intensity: 0.5,
          frequency: 110,
          waveform: 'triangle',
          volume: 0.3
        },
        {
          id: 'melancholy-rain',
          name: 'Regen',
          type: 'ambient',
          mood: 'melancholic',
          intensity: 0.4,
          frequency: 300,
          waveform: 'sine',
          volume: 0.2
        }
      ],
      default: [
        {
          id: 'default-calm',
          name: 'Ruhe',
          type: 'ambient',
          mood: 'default',
          intensity: 0.2,
          frequency: 200,
          waveform: 'sine',
          volume: 0.15
        }
      ]
    }

    setSoundLayers(moodSounds[currentMood] || moodSounds.default)
  }, [currentMood])

  // Create and manage oscillators
  useEffect(() => {
    if (!isPlaying || !audioContextRef.current) return

    // Clear existing oscillators
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop()
      } catch (e) {
        // Ignore if already stopped
      }
    })
    oscillatorsRef.current.clear()
    gainNodesRef.current.clear()

    // Create new oscillators for current layers
    soundLayers.forEach(layer => {
      if (audioContextRef.current) {
        const oscillator = audioContextRef.current.createOscillator()
        const gainNode = audioContextRef.current.createGain()
        
        oscillator.type = layer.waveform
        oscillator.frequency.setValueAtTime(layer.frequency, audioContextRef.current.currentTime)
        
        // Modulate frequency based on reading speed and text content
        const speedModifier = Math.max(0.5, Math.min(2, readingSpeed / 200))
        const textComplexity = textContent.length / 100
        const finalFrequency = layer.frequency * speedModifier * (1 + textComplexity * 0.1)
        
        oscillator.frequency.exponentialRampToValueAtTime(
          finalFrequency,
          audioContextRef.current.currentTime + 0.5
        )

        // Set volume with master volume control
        const finalVolume = layer.volume * masterVolume * layer.intensity
        gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(
          Math.max(0.001, finalVolume),
          audioContextRef.current.currentTime + 1
        )

        // Connect nodes
        oscillator.connect(gainNode)
        gainNode.connect(analyserRef.current!)
        
        // Add modulation for ambient layers
        if (layer.type === 'ambient') {
          const lfo = audioContextRef.current.createOscillator()
          const lfoGain = audioContextRef.current.createGain()
          
          lfo.frequency.setValueAtTime(0.1, audioContextRef.current.currentTime)
          lfoGain.gain.setValueAtTime(5, audioContextRef.current.currentTime)
          
          lfo.connect(lfoGain)
          lfoGain.connect(oscillator.frequency)
          
          lfo.start()
        }

        oscillator.start()
        
        oscillatorsRef.current.set(layer.id, oscillator)
        gainNodesRef.current.set(layer.id, gainNode)
      }
    })

    return () => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop()
        } catch (e) {
          // Ignore if already stopped
        }
      })
    }
  }, [isPlaying, soundLayers, masterVolume, readingSpeed, textContent])

  // Audio visualization
  useEffect(() => {
    if (!isPlaying || !analyserRef.current) return

    const canvas = document.getElementById('soundtrack-visualizer') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      analyserRef.current!.getByteFrequencyData(dataArray)
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.7

        const r = Math.floor(147 + (dataArray[i] / 255) * 108) // Purple to pink
        const g = Math.floor(51 + (dataArray[i] / 255) * 181)
        const b = Math.floor(234 + (dataArray[i] / 255) * 21)

        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const togglePlayback = async () => {
    if (!audioContextRef.current) return

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }

    setIsPlaying(!isPlaying)
    
    // Save preference
    localStorage.setItem('soundtrack-enabled', JSON.stringify(!isPlaying))
  }

  const getMoodIcon = () => {
    const icons = {
      romantic: <Heart className="w-4 h-4" />,
      tense: <Zap className="w-4 h-4" />,
      mysterious: <Moon className="w-4 h-4" />,
      peaceful: <Sun className="w-4 h-4" />,
      exciting: <Waves className="w-4 h-4" />,
      melancholic: <Music className="w-4 h-4" />,
      default: <Music className="w-4 h-4" />
    }
    return icons[currentMood]
  }

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('soundtrack-enabled')
    if (saved) {
      setIsPlaying(JSON.parse(saved))
    }
  }, [])

  return (
    <>
      {/* Floating Control */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-32 left-4 z-50"
      >
        <div className="flex flex-col gap-2">
          <button
            onClick={togglePlayback}
            className={`p-3 rounded-full shadow-xl transition-all ${
              isPlaying
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {isPlaying ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
          </button>
          
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-all"
          >
            {getMoodIcon()}
          </button>
        </div>
      </motion.div>

      {/* Extended Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-48 left-4 z-50 bg-gray-900/95 backdrop-blur-xl rounded-xl p-4 border border-white/20 w-64"
          >
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-400" />
              Dynamischer Soundtrack
            </h3>

            {/* Master Volume */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-1">Lautstärke</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Current Mood */}
            <div className="mb-4 p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                {getMoodIcon()}
                <span className="text-sm font-medium text-white">
                  {currentMood === 'romantic' ? 'Romantisch' :
                   currentMood === 'tense' ? 'Spannend' :
                   currentMood === 'mysterious' ? 'Mysteriös' :
                   currentMood === 'peaceful' ? 'Friedlich' :
                   currentMood === 'exciting' ? 'Aufregend' :
                   currentMood === 'melancholic' ? 'Melancholisch' : 'Standard'}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {soundLayers.length} Soundebenen aktiv
              </p>
            </div>

            {/* Visualizer */}
            <div className="mb-4">
              <canvas
                id="soundtrack-visualizer"
                width="240"
                height="60"
                className="w-full h-15 bg-black/30 rounded-lg"
              />
            </div>

            {/* Sound Layers */}
            <div className="space-y-2">
              {soundLayers.map(layer => (
                <div key={layer.id} className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">{layer.name}</span>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                      style={{ opacity: layer.intensity }}
                    />
                    <span className="text-gray-500">{Math.round(layer.intensity * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-400">
                🎵 Passt sich automatisch an Stimmung und Lesegeschwindigkeit an
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}