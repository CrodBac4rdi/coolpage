import { motion, AnimatePresence } from 'framer-motion'
import { Users, Eye, MessageCircle, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ReadingTrace {
  id: string
  storyId: string
  chapterId: number
  paragraphIndex: number
  type: 'highlight' | 'reaction' | 'reading_now' | 'bookmark'
  intensity: number // 0-100, how many people
  timestamp: number
  anonymousData: {
    emotion: 'love' | 'surprise' | 'laugh' | 'cry' | 'angry' | 'think'
    readingTime: number
    isFirstRead: boolean
  }
}

interface SocialStats {
  currentReaders: number
  totalReactions: number
  popularSections: string[]
  readingTrend: 'increasing' | 'stable' | 'decreasing'
}

interface SocialReadingTracesProps {
  storyId: string
  chapterId: number
  currentParagraph?: number
  onTraceClick?: (trace: ReadingTrace) => void
}

export default function SocialReadingTraces({ 
  storyId, 
  chapterId, 
  currentParagraph = 0,
  onTraceClick 
}: SocialReadingTracesProps) {
  const [traces, setTraces] = useState<ReadingTrace[]>([])
  const [socialStats, setSocialStats] = useState<SocialStats>({
    currentReaders: 0,
    totalReactions: 0,
    popularSections: [],
    readingTrend: 'stable'
  })
  const [showTraces, setShowTraces] = useState(true)
  const [userReaction, setUserReaction] = useState<string | null>(null)

  // Load existing traces
  useEffect(() => {
    const savedTraces = localStorage.getItem(`traces-${storyId}-${chapterId}`)
    if (savedTraces) {
      setTraces(JSON.parse(savedTraces))
    } else {
      // Generate some anonymous traces for demonstration
      generateDemoTraces()
    }
  }, [storyId, chapterId])

  // Generate demo traces (simulates other readers)
  const generateDemoTraces = () => {
    const demoTraces: ReadingTrace[] = []
    
    for (let i = 0; i < 15; i++) {
      const emotions: ReadingTrace['anonymousData']['emotion'][] = ['love', 'surprise', 'laugh', 'cry', 'angry', 'think']
      const types: ReadingTrace['type'][] = ['highlight', 'reaction', 'bookmark']
      
      demoTraces.push({
        id: `demo-${i}`,
        storyId,
        chapterId,
        paragraphIndex: Math.floor(Math.random() * 20),
        type: types[Math.floor(Math.random() * types.length)],
        intensity: Math.floor(Math.random() * 40) + 10,
        timestamp: Date.now() - Math.random() * 86400000, // Within last 24h
        anonymousData: {
          emotion: emotions[Math.floor(Math.random() * emotions.length)],
          readingTime: Math.floor(Math.random() * 300) + 60,
          isFirstRead: Math.random() > 0.3
        }
      })
    }
    
    setTraces(demoTraces)
    localStorage.setItem(`traces-${storyId}-${chapterId}`, JSON.stringify(demoTraces))
    
    // Update stats
    setSocialStats({
      currentReaders: Math.floor(Math.random() * 12) + 3,
      totalReactions: demoTraces.length,
      popularSections: ['Kapitel 1: Der Anfang', 'Kapitel 3: Die Wendung'],
      readingTrend: 'increasing'
    })
  }

  // Add user reaction
  const addReaction = (paragraphIndex: number, emotion: ReadingTrace['anonymousData']['emotion']) => {
    const newTrace: ReadingTrace = {
      id: `user-${Date.now()}`,
      storyId,
      chapterId,
      paragraphIndex,
      type: 'reaction',
      intensity: 1,
      timestamp: Date.now(),
      anonymousData: {
        emotion,
        readingTime: 60,
        isFirstRead: true
      }
    }
    
    const updatedTraces = [...traces, newTrace]
    setTraces(updatedTraces)
    localStorage.setItem(`traces-${storyId}-${chapterId}`, JSON.stringify(updatedTraces))
    setUserReaction(emotion)
    
    // Clear reaction after 3 seconds
    setTimeout(() => setUserReaction(null), 3000)
  }

  // Get traces for current paragraph
  const getCurrentParagraphTraces = () => {
    return traces.filter(trace => trace.paragraphIndex === currentParagraph)
  }

  // Get emotion icon
  const getEmotionIcon = (emotion: ReadingTrace['anonymousData']['emotion']) => {
    const icons = {
      love: '💕',
      surprise: '😲',
      laugh: '😂',
      cry: '😢',
      angry: '😠',
      think: '🤔'
    }
    return icons[emotion]
  }

  // Get trace color
  const getTraceColor = (type: ReadingTrace['type']) => {
    const colors = {
      highlight: 'from-yellow-400 to-orange-400',
      reaction: 'from-pink-400 to-red-400',
      reading_now: 'from-green-400 to-emerald-400',
      bookmark: 'from-blue-400 to-cyan-400'
    }
    return colors[type]
  }

  const currentTraces = getCurrentParagraphTraces()
  const hasTraces = currentTraces.length > 0

  return (
    <>
      {/* Social Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 right-4 z-40 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20"
      >
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>{socialStats.currentReaders}</span>
            <Eye className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-1 text-purple-400">
            <MessageCircle className="w-3 h-3" />
            <span>{socialStats.totalReactions}</span>
          </div>
          <button
            onClick={() => setShowTraces(!showTraces)}
            className={`p-1 rounded transition-colors ${
              showTraces ? 'text-white bg-white/20' : 'text-gray-400'
            }`}
          >
            <Users className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Reading Traces Overlay */}
      <AnimatePresence>
        {showTraces && hasTraces && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30"
          >
            <div className="relative">
              {/* Trace Indicators */}
              <div className="flex flex-col gap-2">
                {currentTraces.slice(0, 5).map((trace, index) => (
                  <motion.div
                    key={trace.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onTraceClick?.(trace)}
                    className="relative cursor-pointer group"
                  >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTraceColor(trace.type)} animate-pulse`} />
                    
                    {/* Hover Tooltip */}
                    <div className="absolute left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-xs text-white">
                          <span>{getEmotionIcon(trace.anonymousData.emotion)}</span>
                          <span>{trace.intensity} Leser</span>
                          <span>•</span>
                          <span>{new Date(trace.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Intensity Heatmap */}
              {currentTraces.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -left-2 top-0 w-1 h-full rounded-full opacity-30"
                  style={{
                    background: `linear-gradient(to bottom, transparent, rgba(147, 51, 234, ${Math.min(currentTraces.reduce((acc, t) => acc + t.intensity, 0) / 100, 1)}), transparent)`
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reaction Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-20 right-4 z-50"
      >
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <p className="text-xs text-gray-400 mb-3 text-center">Wie findest du diese Stelle?</p>
          <div className="grid grid-cols-3 gap-2">
            {(['love', 'laugh', 'surprise', 'cry', 'think', 'angry'] as const).map((emotion: ReadingTrace['anonymousData']['emotion']) => (
              <motion.button
                key={emotion}
                onClick={() => addReaction(currentParagraph, emotion)}
                className={`p-2 text-2xl rounded-lg border transition-all ${
                  userReaction === emotion
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={userReaction !== null}
              >
                {getEmotionIcon(emotion)}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* User Reaction Feedback */}
      <AnimatePresence>
        {userReaction && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="fixed bottom-40 right-4 z-50"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              {getEmotionIcon(userReaction as ReadingTrace['anonymousData']['emotion'])} Reaktion gespeichert!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popular Sections Insight */}
      {socialStats.popularSections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-32 right-4 z-30 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <p className="text-xs font-medium text-white">Beliebte Abschnitte</p>
          </div>
          <div className="space-y-1">
            {socialStats.popularSections.slice(0, 2).map((section, index) => (
              <p key={index} className="text-xs text-gray-300">
                📍 {section}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}