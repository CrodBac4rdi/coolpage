import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Clock, TrendingUp, BarChart3, Eye, Calendar, Target, Award } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface ReadingSession {
  id: string
  storyId: string
  chapterId: number
  startTime: number
  endTime?: number
  wordsRead: number
  pauseCount: number
  scrollEvents: number
  averageWPM: number
  focusScore: number // 0-100
  distractionCount: number
}

interface ReadingPattern {
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'night'
  averageSessionLength: number
  totalReadingTime: number
  streakDays: number
  favoriteGenre: string
  readingSpeedTrend: 'increasing' | 'decreasing' | 'stable'
}

interface ReadingRhythmAnalyzerProps {
  currentStoryId?: string
  onInsightGenerated?: (insight: string) => void
}

export default function ReadingRhythmAnalyzer({ currentStoryId, onInsightGenerated }: ReadingRhythmAnalyzerProps) {
  const [sessions, setSessions] = useState<ReadingSession[]>([])
  const [currentSession, setCurrentSession] = useState<ReadingSession | null>(null)
  const [pattern, setPattern] = useState<ReadingPattern | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [insights, setInsights] = useState<string[]>([])
  const [showFullAnalysis, setShowFullAnalysis] = useState(false)
  
  const sessionStartRef = useRef<number>(0)
  const scrollCountRef = useRef(0)
  const pauseCountRef = useRef(0)
  const lastActivityRef = useRef<number>(Date.now())
  const focusTimeRef = useRef<number>(0)
  const totalTimeRef = useRef<number>(0)

  // Load existing data
  useEffect(() => {
    const savedSessions = localStorage.getItem('reading-sessions')
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    }
  }, [])

  // Start tracking session
  const startSession = (storyId: string, chapterId: number) => {
    const session: ReadingSession = {
      id: `session-${Date.now()}`,
      storyId,
      chapterId,
      startTime: Date.now(),
      wordsRead: 0,
      pauseCount: 0,
      scrollEvents: 0,
      averageWPM: 0,
      focusScore: 100,
      distractionCount: 0
    }
    
    setCurrentSession(session)
    setIsActive(true)
    sessionStartRef.current = Date.now()
    lastActivityRef.current = Date.now()
    focusTimeRef.current = 0
    totalTimeRef.current = 0
    scrollCountRef.current = 0
    pauseCountRef.current = 0
  }

  // End session and save
  const endSession = () => {
    if (!currentSession) return

    const endTime = Date.now()
    const duration = endTime - sessionStartRef.current
    const focusScore = duration > 0 ? Math.round((focusTimeRef.current / duration) * 100) : 0
    
    const completedSession: ReadingSession = {
      ...currentSession,
      endTime,
      pauseCount: pauseCountRef.current,
      scrollEvents: scrollCountRef.current,
      averageWPM: calculateWPM(duration),
      focusScore: Math.min(100, focusScore),
      distractionCount: Math.floor(duration / 30000) - Math.floor(focusTimeRef.current / 30000)
    }

    const updatedSessions = [...sessions, completedSession]
    setSessions(updatedSessions)
    localStorage.setItem('reading-sessions', JSON.stringify(updatedSessions))
    
    // Generate insights
    analyzePattern(updatedSessions)
    generateInsights(completedSession, updatedSessions)
    
    setCurrentSession(null)
    setIsActive(false)
  }

  // Calculate reading speed
  const calculateWPM = (duration: number): number => {
    if (!currentSession || duration === 0) return 0
    const minutes = duration / 60000
    return Math.round(currentSession.wordsRead / minutes)
  }

  // Track user activity
  useEffect(() => {
    if (!isActive) return

    const trackActivity = () => {
      const now = Date.now()
      const timeSinceLastActivity = now - lastActivityRef.current
      
      // If more than 10 seconds of inactivity, count as pause
      if (timeSinceLastActivity > 10000) {
        pauseCountRef.current++
      } else {
        // User is active, add to focus time
        focusTimeRef.current += 1000
      }
      
      totalTimeRef.current += 1000
      lastActivityRef.current = now
    }

    // Track scroll events
    const handleScroll = () => {
      scrollCountRef.current++
      lastActivityRef.current = Date.now()
    }

    // Track mouse/touch activity
    const handleActivity = () => {
      lastActivityRef.current = Date.now()
    }

    const interval = setInterval(trackActivity, 1000)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('touchstart', handleActivity)
    window.addEventListener('click', handleActivity)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('touchstart', handleActivity)
      window.removeEventListener('click', handleActivity)
    }
  }, [isActive])

  // Analyze reading patterns
  const analyzePattern = (allSessions: ReadingSession[]) => {
    if (allSessions.length === 0) return

    // Calculate preferred reading time
    const timeSlots = { morning: 0, afternoon: 0, evening: 0, night: 0 }
    allSessions.forEach(session => {
      const hour = new Date(session.startTime).getHours()
      if (hour >= 6 && hour < 12) timeSlots.morning++
      else if (hour >= 12 && hour < 18) timeSlots.afternoon++
      else if (hour >= 18 && hour < 22) timeSlots.evening++
      else timeSlots.night++
    })
    
    const preferredTime = Object.entries(timeSlots).sort(([,a], [,b]) => b - a)[0][0] as ReadingPattern['preferredTime']

    // Calculate averages
    const totalDuration = allSessions.reduce((acc, s) => acc + ((s.endTime || Date.now()) - s.startTime), 0)
    const averageSessionLength = totalDuration / allSessions.length

    // Calculate streak
    const today = new Date().toDateString()
    let streakDays = 0
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toDateString()
      const hasSession = allSessions.some(s => new Date(s.startTime).toDateString() === checkDate)
      if (hasSession) {
        if (checkDate === today || streakDays > 0) {
          streakDays++
        }
      } else if (checkDate !== today) {
        break
      }
    }

    // Speed trend
    const recentSessions = allSessions.slice(-10)
    const oldSessions = allSessions.slice(-20, -10)
    const recentAvgWPM = recentSessions.reduce((acc, s) => acc + s.averageWPM, 0) / recentSessions.length
    const oldAvgWPM = oldSessions.length > 0 ? oldSessions.reduce((acc, s) => acc + s.averageWPM, 0) / oldSessions.length : recentAvgWPM

    let readingSpeedTrend: ReadingPattern['readingSpeedTrend'] = 'stable'
    if (recentAvgWPM > oldAvgWPM * 1.1) readingSpeedTrend = 'increasing'
    else if (recentAvgWPM < oldAvgWPM * 0.9) readingSpeedTrend = 'decreasing'

    setPattern({
      preferredTime,
      averageSessionLength,
      totalReadingTime: totalDuration,
      streakDays,
      favoriteGenre: 'Romance', // Would need story data to determine
      readingSpeedTrend
    })
  }

  // Generate reading insights
  const generateInsights = (session: ReadingSession, allSessions: ReadingSession[]) => {
    const newInsights: string[] = []

    // Session-specific insights
    if (session.focusScore > 90) {
      newInsights.push("🎯 Ausgezeichnete Konzentration! Du warst fast die ganze Zeit fokussiert.")
    } else if (session.focusScore < 60) {
      newInsights.push("😴 Vielleicht versuchst du es später noch mal? Deine Konzentration war heute etwas niedrig.")
    }

    if (session.averageWPM > 300) {
      newInsights.push("🚀 Wow! Du liest überdurchschnittlich schnell.")
    } else if (session.averageWPM < 150) {
      newInsights.push("📚 Du nimmst dir Zeit zum Verstehen - das ist wertvoll!")
    }

    // Pattern insights
    if (allSessions.length >= 7) {
      const avgFocus = allSessions.reduce((acc, s) => acc + s.focusScore, 0) / allSessions.length
      if (avgFocus > 80) {
        newInsights.push("⭐ Du bist ein sehr fokussierter Leser! Durchschnittlich " + Math.round(avgFocus) + "% Konzentration.")
      }
    }

    // Streak insights
    if (pattern?.streakDays && pattern.streakDays >= 7) {
      newInsights.push(`🔥 Fantastisch! Du hast ${pattern.streakDays} Tage in Folge gelesen.`)
    }

    setInsights(prev => [...prev, ...newInsights].slice(-5)) // Keep last 5 insights
    
    if (newInsights.length > 0 && onInsightGenerated) {
      onInsightGenerated(newInsights[0])
    }
  }

  // Update word count (called externally)
  const updateWordsRead = (words: number) => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, wordsRead: prev.wordsRead + words } : null)
    }
  }

  // Auto-start/stop based on story reading
  useEffect(() => {
    if (currentStoryId && !isActive) {
      startSession(currentStoryId, 0)
    } else if (!currentStoryId && isActive) {
      endSession()
    }
  }, [currentStoryId])

  if (!showFullAnalysis && !isActive) {
    return (
      <motion.button
        onClick={() => setShowFullAnalysis(true)}
        className="fixed bottom-4 left-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-xl z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Activity className="w-6 h-6 text-white" />
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      {(showFullAnalysis || isActive) && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 w-80"
        >
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Lese-Rhythmus
              </h3>
              <button
                onClick={() => setShowFullAnalysis(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Current Session */}
            {isActive && currentSession && (
              <div className="mb-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <h4 className="font-semibold text-blue-300 mb-2">Aktuelle Session</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-400">Dauer</p>
                    <p className="text-white font-medium">
                      {Math.round((Date.now() - sessionStartRef.current) / 60000)} Min
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Wörter</p>
                    <p className="text-white font-medium">{currentSession.wordsRead}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">WPM</p>
                    <p className="text-white font-medium">
                      {calculateWPM(Date.now() - sessionStartRef.current)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Fokus</p>
                    <p className="text-white font-medium">
                      {Math.round((focusTimeRef.current / Math.max(1, totalTimeRef.current)) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pattern Analysis */}
            {pattern && (
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Deine Muster</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-400">Bevorzugte Zeit</p>
                      <p className="text-white font-medium">
                        {pattern.preferredTime === 'morning' ? 'Morgens' :
                         pattern.preferredTime === 'afternoon' ? 'Nachmittags' :
                         pattern.preferredTime === 'evening' ? 'Abends' : 'Nachts'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <TrendingUp className={`w-4 h-4 ${
                      pattern.readingSpeedTrend === 'increasing' ? 'text-green-400' :
                      pattern.readingSpeedTrend === 'decreasing' ? 'text-red-400' : 'text-gray-400'
                    }`} />
                    <div>
                      <p className="text-sm text-gray-400">Geschwindigkeit</p>
                      <p className="text-white font-medium">
                        {pattern.readingSpeedTrend === 'increasing' ? 'Wird schneller' :
                         pattern.readingSpeedTrend === 'decreasing' ? 'Wird langsamer' : 'Stabil'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-400">Streak</p>
                      <p className="text-white font-medium">{pattern.streakDays} Tage</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Insights */}
            {insights.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-3">Erkenntnisse</h4>
                <div className="space-y-2">
                  {insights.slice(-3).map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
                    >
                      <p className="text-sm text-white">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-gray-400">Sessions</p>
                <p className="text-white font-bold">{sessions.length}</p>
              </div>
              <div className="text-center p-2 bg-white/5 rounded-lg">
                <p className="text-gray-400">Gesamtzeit</p>
                <p className="text-white font-bold">
                  {Math.round((pattern?.totalReadingTime || 0) / 60000)} Min
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}