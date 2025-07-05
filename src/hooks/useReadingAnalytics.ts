import { useState, useEffect, useRef } from 'react'
import { useLocalStorage } from './useLocalStorage'

interface ReadingSession {
  storyId: string
  startTime: number
  endTime?: number
  chaptersRead: number[]
  wordsRead: number
  readingSpeed: number // words per minute
  pauseCount: number
  totalPauseDuration: number
}

interface ReadingStats {
  totalTimeRead: number // minutes
  averageReadingSpeed: number // wpm
  storiesCompleted: string[]
  favoriteGenres: string[]
  readingStreaks: number
  lastReadDate: string
  sessionsToday: number
  sessionHistory: ReadingSession[]
}

interface ReadingInsight {
  type: 'speed' | 'time' | 'completion' | 'recommendation' | 'achievement'
  title: string
  message: string
  icon: string
  priority: 'low' | 'medium' | 'high'
}

export function useReadingAnalytics(storyId?: string) {
  const [stats, setStats] = useLocalStorage<ReadingStats>('crod-babylon-reading-stats', {
    totalTimeRead: 0,
    averageReadingSpeed: 200,
    storiesCompleted: [],
    favoriteGenres: [],
    readingStreaks: 0,
    lastReadDate: new Date().toDateString(),
    sessionsToday: 0,
    sessionHistory: []
  })

  const [currentSession, setCurrentSession] = useState<ReadingSession | null>(null)
  const [insights, setInsights] = useState<ReadingInsight[]>([])
  const startTimeRef = useRef<number | null>(null)
  const wordsReadRef = useRef(0)
  const isActiveRef = useRef(false)
  const lastActivityRef = useRef(Date.now())

  // Start reading session
  const startSession = (storyId: string) => {
    if (currentSession) return // Already active

    const now = Date.now()
    const newSession: ReadingSession = {
      storyId,
      startTime: now,
      chaptersRead: [],
      wordsRead: 0,
      readingSpeed: 200,
      pauseCount: 0,
      totalPauseDuration: 0
    }
    
    setCurrentSession(newSession)
    startTimeRef.current = now
    isActiveRef.current = true
    lastActivityRef.current = now

    // Update daily session count
    const today = new Date().toDateString()
    if (stats.lastReadDate !== today) {
      setStats(prev => ({
        ...prev,
        lastReadDate: today,
        sessionsToday: 1
      }))
    } else {
      setStats(prev => ({
        ...prev,
        sessionsToday: prev.sessionsToday + 1
      }))
    }
  }

  // Track chapter read
  const trackChapterRead = (chapterId: number, wordCount: number) => {
    if (!currentSession) return

    wordsReadRef.current += wordCount
    setCurrentSession(prev => prev ? {
      ...prev,
      chaptersRead: [...prev.chaptersRead, chapterId],
      wordsRead: wordsReadRef.current
    } : null)
  }

  // Track reading activity (called on scroll, click, etc.)
  const trackActivity = () => {
    const now = Date.now()
    
    // If we were inactive for more than 30 seconds, count it as a pause
    if (isActiveRef.current && now - lastActivityRef.current > 30000) {
      setCurrentSession(prev => prev ? {
        ...prev,
        pauseCount: prev.pauseCount + 1,
        totalPauseDuration: prev.totalPauseDuration + (now - lastActivityRef.current)
      } : null)
    }
    
    lastActivityRef.current = now
    isActiveRef.current = true
  }

  // End reading session
  const endSession = () => {
    if (!currentSession) return

    const now = Date.now()
    const sessionDuration = (now - currentSession.startTime) / 1000 / 60 // minutes
    const activeTime = sessionDuration - (currentSession.totalPauseDuration / 1000 / 60)
    const readingSpeed = activeTime > 0 ? currentSession.wordsRead / activeTime : 200

    const completedSession: ReadingSession = {
      ...currentSession,
      endTime: now,
      readingSpeed
    }

    // Update global stats
    setStats(prev => ({
      ...prev,
      totalTimeRead: prev.totalTimeRead + activeTime,
      averageReadingSpeed: Math.round((prev.averageReadingSpeed + readingSpeed) / 2),
      sessionHistory: [...prev.sessionHistory.slice(-49), completedSession] // Keep last 50 sessions
    }))

    setCurrentSession(null)
    isActiveRef.current = false
    generateInsights(completedSession)
  }

  // Generate personalized insights
  const generateInsights = (session: ReadingSession) => {
    const newInsights: ReadingInsight[] = []

    // Reading speed insights
    if (session.readingSpeed > 300) {
      newInsights.push({
        type: 'speed',
        title: 'Schneller Leser! 🚀',
        message: `Du liest mit ${Math.round(session.readingSpeed)} WPM - das ist überdurchschnittlich schnell!`,
        icon: '⚡',
        priority: 'medium'
      })
    } else if (session.readingSpeed < 150) {
      newInsights.push({
        type: 'speed',
        title: 'Gemütlicher Genießer 📚',
        message: 'Du nimmst dir Zeit für jedes Detail - das ist perfekt für Romance Stories!',
        icon: '🌙',
        priority: 'low'
      })
    }

    // Session time insights
    const sessionMinutes = (session.endTime! - session.startTime) / 1000 / 60
    if (sessionMinutes > 60) {
      newInsights.push({
        type: 'time',
        title: 'Marathon-Leser! 🏃‍♀️',
        message: `${Math.round(sessionMinutes)} Minuten am Stück gelesen - beeindruckend!`,
        icon: '⏰',
        priority: 'high'
      })
    }

    // Pause insights
    if (session.pauseCount === 0 && sessionMinutes > 20) {
      newInsights.push({
        type: 'completion',
        title: 'Voll fokussiert! 🎯',
        message: 'Keine Unterbrechung - du warst komplett in der Geschichte versunken!',
        icon: '🔥',
        priority: 'medium'
      })
    }

    // Achievement insights
    if (stats.sessionsToday >= 3) {
      newInsights.push({
        type: 'achievement',
        title: 'Tägliche Leseratte! 📖',
        message: `${stats.sessionsToday} Lesesitzungen heute - du liebst es wirklich!`,
        icon: '🏆',
        priority: 'high'
      })
    }

    setInsights(newInsights)
  }

  // Get reading recommendations
  const getRecommendations = () => {
    const recentStories = stats.sessionHistory
      .slice(-10)
      .map(s => s.storyId)
      .filter((id, index, arr) => arr.indexOf(id) === index)

    const recommendations: ReadingInsight[] = []

    if (stats.averageReadingSpeed > 250 && recentStories.length > 0) {
      recommendations.push({
        type: 'recommendation',
        title: 'Perfekt für dich! ✨',
        message: 'Basierend auf deiner Lesegeschwindigkeit empfehlen wir längere Kapitel.',
        icon: '📚',
        priority: 'medium'
      })
    }

    return recommendations
  }

  // Auto-save progress periodically
  useEffect(() => {
    if (!currentSession) return

    const interval = setInterval(() => {
      trackActivity() // Check for pauses
    }, 10000) // Every 10 seconds

    return () => clearInterval(interval)
  }, [currentSession])

  // Detect when user leaves/returns to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false
      } else {
        trackActivity()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return {
    stats,
    currentSession,
    insights,
    recommendations: getRecommendations(),
    startSession,
    endSession,
    trackChapterRead,
    trackActivity,
    clearInsights: () => setInsights([])
  }
}