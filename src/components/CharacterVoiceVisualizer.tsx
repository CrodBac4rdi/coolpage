import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Mic, Activity, Heart, Brain, Sparkles } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type { Character } from '../data/characters'

interface CharacterVoiceVisualizerProps {
  character: Character
  dialogue: string
  isActive: boolean
}

interface VoiceProfile {
  pitch: 'low' | 'medium' | 'high'
  speed: 'slow' | 'normal' | 'fast'
  emotion: 'happy' | 'sad' | 'angry' | 'nervous' | 'confident' | 'mysterious'
  intensity: number // 0-100
}

const emotionColors = {
  happy: { primary: '#fbbf24', secondary: '#fde047', gradient: 'from-yellow-400 to-amber-400' },
  sad: { primary: '#60a5fa', secondary: '#3b82f6', gradient: 'from-blue-400 to-indigo-400' },
  angry: { primary: '#f87171', secondary: '#dc2626', gradient: 'from-red-400 to-rose-500' },
  nervous: { primary: '#a78bfa', secondary: '#8b5cf6', gradient: 'from-purple-400 to-violet-400' },
  confident: { primary: '#34d399', secondary: '#10b981', gradient: 'from-emerald-400 to-green-500' },
  mysterious: { primary: '#818cf8', secondary: '#6366f1', gradient: 'from-indigo-400 to-purple-500' }
}

export default function CharacterVoiceVisualizer({ character, dialogue, isActive }: CharacterVoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile>({
    pitch: 'medium',
    speed: 'normal',
    emotion: 'happy',
    intensity: 50
  })
  const [isPlaying, setIsPlaying] = useState(false)

  // Analyze dialogue for emotion and voice characteristics
  useEffect(() => {
    if (!dialogue) return

    const analyzedProfile = analyzeDialogue(dialogue, character)
    setVoiceProfile(analyzedProfile)
  }, [dialogue, character])

  const analyzeDialogue = (text: string, char: Character): VoiceProfile => {
    const lowerText = text.toLowerCase()
    
    // Emotion detection
    let emotion: VoiceProfile['emotion'] = 'happy'
    if (lowerText.includes('traurig') || lowerText.includes('wein') || lowerText.includes('vermiss')) {
      emotion = 'sad'
    } else if (lowerText.includes('wütend') || lowerText.includes('verdammt') || lowerText.includes('hass')) {
      emotion = 'angry'
    } else if (lowerText.includes('nervös') || lowerText.includes('unsicher') || lowerText.includes('zitter')) {
      emotion = 'nervous'
    } else if (lowerText.includes('stark') || lowerText.includes('schaffe') || lowerText.includes('sicher')) {
      emotion = 'confident'
    } else if (lowerText.includes('geheimnis') || lowerText.includes('mysteriös') || lowerText.includes('...')) {
      emotion = 'mysterious'
    }

    // Pitch based on character traits
    let pitch: VoiceProfile['pitch'] = 'medium'
    if (char.personality.includes('sanft') || char.personality.includes('zart')) {
      pitch = 'high'
    } else if (char.personality.includes('stark') || char.personality.includes('dominant')) {
      pitch = 'low'
    }

    // Speed based on text patterns
    let speed: VoiceProfile['speed'] = 'normal'
    if (text.includes('!!!') || text.includes('...')) {
      speed = 'fast'
    } else if (text.length > 100) {
      speed = 'slow'
    }

    // Intensity based on punctuation and caps
    const exclamationCount = (text.match(/!/g) || []).length
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length
    const intensity = Math.min(100, 50 + exclamationCount * 10 + capsRatio * 100)

    return { pitch, speed, emotion, intensity }
  }

  // Animated waveform visualization
  useEffect(() => {
    if (!canvasRef.current || !isActive || !isPlaying) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    let time = 0
    const bars = 40
    const barWidth = canvas.width / bars / 2
    const color = emotionColors[voiceProfile.emotion]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width / 2, 0)
      gradient.addColorStop(0, color.primary)
      gradient.addColorStop(1, color.secondary)
      ctx.fillStyle = gradient

      // Draw waveform bars
      for (let i = 0; i < bars; i++) {
        const x = i * (barWidth + 2)
        const frequencyHeight = Math.sin(time * 0.05 + i * 0.2) * 20 + 20
        const emotionModifier = voiceProfile.emotion === 'angry' ? 1.5 : 
                               voiceProfile.emotion === 'sad' ? 0.7 : 1
        const height = frequencyHeight * (voiceProfile.intensity / 100) * emotionModifier
        
        ctx.globalAlpha = 0.8
        ctx.fillRect(x, (canvas.height / 4) - height / 2, barWidth, height)
      }

      time += voiceProfile.speed === 'fast' ? 3 : voiceProfile.speed === 'slow' ? 1 : 2
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, isPlaying, voiceProfile])

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    
    // Simulate voice playback with localStorage
    if (!isPlaying) {
      const voiceData = {
        characterId: character.id,
        dialogue,
        timestamp: Date.now(),
        profile: voiceProfile
      }
      
      // Store in localStorage as "voice memory"
      const voiceMemory = JSON.parse(localStorage.getItem('voice-memory') || '[]')
      voiceMemory.push(voiceData)
      if (voiceMemory.length > 50) voiceMemory.shift() // Keep last 50
      localStorage.setItem('voice-memory', JSON.stringify(voiceMemory))
    }
  }

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-6"
        >
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
            {/* Character Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${emotionColors[voiceProfile.emotion].gradient}`}>
                  <span className="text-2xl">{character.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{character.name}</h3>
                  <p className="text-sm text-gray-400">
                    {voiceProfile.emotion === 'happy' ? 'Fröhlich' :
                     voiceProfile.emotion === 'sad' ? 'Traurig' :
                     voiceProfile.emotion === 'angry' ? 'Wütend' :
                     voiceProfile.emotion === 'nervous' ? 'Nervös' :
                     voiceProfile.emotion === 'confident' ? 'Selbstbewusst' :
                     'Mysteriös'} • {voiceProfile.intensity}% Intensität
                  </p>
                </div>
              </div>
              
              <button
                onClick={togglePlayback}
                className={`p-3 rounded-full transition-all ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {isPlaying ? <Mic className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
            </div>

            {/* Voice Waveform */}
            <div className="relative h-24 bg-black/30 rounded-xl overflow-hidden mb-4">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Klicke zum Abspielen der Stimme</p>
                </div>
              )}
            </div>

            {/* Voice Characteristics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <Activity className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Tonhöhe</p>
                <p className="text-sm font-medium text-white">
                  {voiceProfile.pitch === 'low' ? 'Tief' : 
                   voiceProfile.pitch === 'high' ? 'Hoch' : 'Mittel'}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <Brain className="w-5 h-5 text-pink-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Tempo</p>
                <p className="text-sm font-medium text-white">
                  {voiceProfile.speed === 'slow' ? 'Langsam' : 
                   voiceProfile.speed === 'fast' ? 'Schnell' : 'Normal'}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Emotion</p>
                <p className="text-sm font-medium text-white">
                  {voiceProfile.intensity}%
                </p>
              </div>
            </div>

            {/* Dialogue Preview */}
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-300 italic line-clamp-2">"{dialogue}"</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}