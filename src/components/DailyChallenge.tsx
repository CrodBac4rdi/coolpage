import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Trophy, Clock, CheckCircle, Flame, Gift, Calendar } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  xpReward: number
  type: 'reading' | 'streak' | 'social' | 'exploration'
  progress: number
  target: number
  completed: boolean
}

export default function DailyChallenge() {
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null)
  const [timeLeft, setTimeLeft] = useState('')
  const [streak, setStreak] = useState(0)
  const [showReward, setShowReward] = useState(false)

  const challenges: Challenge[] = [
    {
      id: 'read-3-chapters',
      title: 'Kapitel-Marathon',
      description: 'Lies 3 Kapitel aus beliebigen Stories',
      xpReward: 50,
      type: 'reading',
      progress: 0,
      target: 3,
      completed: false
    },
    {
      id: 'try-new-genre',
      title: 'Genre Explorer',
      description: 'Lies eine Story aus einem neuen Genre',
      xpReward: 75,
      type: 'exploration',
      progress: 0,
      target: 1,
      completed: false
    },
    {
      id: 'daily-login',
      title: 'Täglicher Besucher',
      description: 'Besuche die Seite 7 Tage in Folge',
      xpReward: 100,
      type: 'streak',
      progress: 0,
      target: 7,
      completed: false
    },
    {
      id: 'favorite-5',
      title: 'Favoriten Sammler',
      description: 'Füge 5 Stories zu deinen Favoriten hinzu',
      xpReward: 60,
      type: 'social',
      progress: 0,
      target: 5,
      completed: false
    }
  ]

  useEffect(() => {
    // Load today's challenge
    const today = new Date().toDateString()
    const savedChallenge = localStorage.getItem('crod-daily-challenge')
    const savedDate = localStorage.getItem('crod-challenge-date')
    
    if (savedChallenge && savedDate === today) {
      setDailyChallenge(JSON.parse(savedChallenge))
    } else {
      // Generate new daily challenge
      const newChallenge = challenges[Math.floor(Math.random() * challenges.length)]
      setDailyChallenge(newChallenge)
      localStorage.setItem('crod-daily-challenge', JSON.stringify(newChallenge))
      localStorage.setItem('crod-challenge-date', today)
    }

    // Load streak
    const savedStreak = localStorage.getItem('crod-challenge-streak')
    if (savedStreak) {
      setStreak(parseInt(savedStreak))
    }

    // Update timer
    const updateTimer = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      
      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      setTimeLeft(`${hours}h ${minutes}m`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const completeChallenge = () => {
    if (!dailyChallenge || dailyChallenge.completed) return

    const completed = { ...dailyChallenge, completed: true, progress: dailyChallenge.target }
    setDailyChallenge(completed)
    localStorage.setItem('crod-daily-challenge', JSON.stringify(completed))
    
    // Update streak
    const newStreak = streak + 1
    setStreak(newStreak)
    localStorage.setItem('crod-challenge-streak', newStreak.toString())
    
    // Show reward animation
    setShowReward(true)
    setTimeout(() => setShowReward(false), 3000)
    
    // Update user XP
    const userData = JSON.parse(localStorage.getItem('crod-user-data') || '{}')
    userData.xp = (userData.xp || 0) + dailyChallenge.xpReward
    localStorage.setItem('crod-user-data', JSON.stringify(userData))
  }

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'reading': return '📖'
      case 'streak': return '🔥'
      case 'social': return '💝'
      case 'exploration': return '🗺️'
      default: return '✨'
    }
  }

  if (!dailyChallenge) return null

  const progress = (dailyChallenge.progress / dailyChallenge.target) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-6 backdrop-blur-sm overflow-hidden relative"
    >
      {/* Streak Badge */}
      {streak > 0 && (
        <motion.div
          className="absolute top-4 right-4 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1 flex items-center gap-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-orange-300 text-sm font-bold">{streak} Tage</span>
        </motion.div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Tägliche Challenge</h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>Noch {timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl">{getChallengeIcon(dailyChallenge.type)}</div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-lg">{dailyChallenge.title}</h4>
            <p className="text-gray-400 text-sm mt-1">{dailyChallenge.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Fortschritt</span>
            <span className="text-purple-400 text-sm font-medium">
              {dailyChallenge.progress} / {dailyChallenge.target}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Reward */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Belohnung</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-yellow-400">+{dailyChallenge.xpReward}</span>
              <span className="text-yellow-300 text-sm">XP</span>
            </div>
          </div>
        </div>

        {/* Complete Button */}
        {!dailyChallenge.completed ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={completeChallenge}
            disabled={dailyChallenge.progress < dailyChallenge.target}
            className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              dailyChallenge.progress >= dailyChallenge.target
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                : 'bg-white/10 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Challenge abschließen</span>
          </motion.button>
        ) : (
          <div className="text-center py-3 bg-green-500/20 border border-green-500/30 rounded-xl">
            <p className="text-green-300 font-medium flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Challenge abgeschlossen!
            </p>
          </div>
        )}
      </div>

      {/* Weekly Progress Hint */}
      <motion.div
        className="mt-4 flex items-center gap-2 text-gray-400 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Calendar className="w-3 h-3" />
        <span>Schließe 7 Challenges für einen Wochenbonus ab!</span>
      </motion.div>

      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl font-bold text-yellow-400"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.5, 1], rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              +{dailyChallenge.xpReward} XP! 🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}