import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Character } from '../data/characters'

interface MoodPoint {
  timestamp: number
  mood: number // -100 to 100 (negative = sad, positive = happy)
  trigger?: string
}

interface CharacterMoodIndicatorProps {
  character: Character
  currentText?: string
  compact?: boolean
}

const moodGradients = [
  { range: [-100, -60], gradient: 'from-blue-600 to-indigo-600', label: 'Sehr traurig', emoji: '😢' },
  { range: [-60, -20], gradient: 'from-blue-500 to-cyan-500', label: 'Traurig', emoji: '😔' },
  { range: [-20, 20], gradient: 'from-gray-500 to-slate-500', label: 'Neutral', emoji: '😐' },
  { range: [20, 60], gradient: 'from-yellow-500 to-orange-500', label: 'Fröhlich', emoji: '😊' },
  { range: [60, 100], gradient: 'from-pink-500 to-red-500', label: 'Sehr glücklich', emoji: '😄' }
]

export default function CharacterMoodIndicator({ character, currentText, compact = false }: CharacterMoodIndicatorProps) {
  const [moodHistory, setMoodHistory] = useState<MoodPoint[]>([])
  const [currentMood, setCurrentMood] = useState(0)
  const [moodTrend, setMoodTrend] = useState<'up' | 'down' | 'stable'>('stable')

  // Load mood history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem(`mood-history-${character.id}`)
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory))
    }
  }, [character.id])

  // Analyze text for mood changes
  useEffect(() => {
    if (!currentText) return

    const newMood = analyzeMood(currentText, character)
    const moodChange = newMood - currentMood

    // Update trend
    if (moodChange > 10) {
      setMoodTrend('up')
    } else if (moodChange < -10) {
      setMoodTrend('down')
    } else {
      setMoodTrend('stable')
    }

    // Add to history
    const newPoint: MoodPoint = {
      timestamp: Date.now(),
      mood: newMood,
      trigger: currentText.substring(0, 50)
    }

    const updatedHistory = [...moodHistory, newPoint].slice(-50) // Keep last 50 points
    setMoodHistory(updatedHistory)
    setCurrentMood(newMood)

    // Save to localStorage
    localStorage.setItem(`mood-history-${character.id}`, JSON.stringify(updatedHistory))
  }, [currentText, character])

  const analyzeMood = (text: string, char: Character): number => {
    const lowerText = text.toLowerCase()
    let moodScore = 0

    // Positive mood indicators
    const positiveWords = ['liebe', 'glück', 'freude', 'lachen', 'wunderbar', 'schön', 'hoffnung', 'träume', 'erfolg']
    const negativeWords = ['traurig', 'wein', 'schmerz', 'verlust', 'angst', 'einsamkeit', 'dunkel', 'verzweiflung']

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) moodScore += 15
    })

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) moodScore -= 15
    })

    // Character personality influence
    if (char.personality.includes('optimistisch')) moodScore += 10
    if (char.personality.includes('melancholisch')) moodScore -= 10

    // Clamp between -100 and 100
    return Math.max(-100, Math.min(100, moodScore))
  }

  const getMoodConfig = (mood: number) => {
    return moodGradients.find(config => mood >= config.range[0] && mood <= config.range[1]) || moodGradients[2]
  }

  const moodConfig = getMoodConfig(currentMood)

  if (compact) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 rounded-full backdrop-blur-sm"
      >
        <span className="text-lg">{moodConfig.emoji}</span>
        <span className="text-sm text-white font-medium">{Math.abs(currentMood)}%</span>
        {moodTrend === 'up' && <TrendingUp className="w-3 h-3 text-green-400" />}
        {moodTrend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
        {moodTrend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/90 backdrop-blur-xl rounded-xl p-4 border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white flex items-center gap-2">
          <span className="text-lg">{character.icon}</span>
          {character.name}s Stimmung
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{moodConfig.emoji}</span>
          {moodTrend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
          {moodTrend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
          {moodTrend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
        </div>
      </div>

      {/* Mood Bar */}
      <div className="relative h-8 bg-black/30 rounded-lg overflow-hidden mb-2">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${moodConfig.gradient}`}
          initial={{ width: '50%' }}
          animate={{ width: `${50 + currentMood / 2}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white drop-shadow-lg">
            {moodConfig.label} ({currentMood > 0 ? '+' : ''}{currentMood})
          </span>
        </div>
      </div>

      {/* Mood History Graph */}
      {moodHistory.length > 1 && (
        <div className="h-16 relative">
          <svg className="w-full h-full">
            <polyline
              fill="none"
              stroke="url(#mood-gradient)"
              strokeWidth="2"
              points={moodHistory.map((point, index) => {
                const x = (index / (moodHistory.length - 1)) * 100
                const y = 50 - (point.mood / 2) // Convert -100 to 100 range to 0-100 for SVG
                return `${x},${y}`
              }).join(' ')}
            />
            <defs>
              <linearGradient id="mood-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Recent Triggers */}
      {moodHistory.length > 0 && moodHistory[moodHistory.length - 1].trigger && (
        <p className="text-xs text-gray-400 mt-2 italic">
          "{moodHistory[moodHistory.length - 1].trigger}..."
        </p>
      )}
    </motion.div>
  )
}