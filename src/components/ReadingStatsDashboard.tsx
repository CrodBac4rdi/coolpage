import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BarChart, TrendingUp, Clock, Award, BookOpen, Target } from 'lucide-react'
import { useReadingList } from '../hooks/useReadingList'

interface ReadingGoal {
  monthly: number
  yearly: number
  current: {
    month: number
    year: number
  }
}

export default function ReadingStatsDashboard() {
  const { readingList, getReadingStats } = useReadingList()
  const stats = getReadingStats()
  const [readingGoals, setReadingGoals] = useState<ReadingGoal>({
    monthly: 5,
    yearly: 50,
    current: {
      month: 0,
      year: 0
    }
  })

  // Calculate reading streaks and other stats
  const [readingStreak, setReadingStreak] = useState(0)
  const [totalReadingTime, setTotalReadingTime] = useState(0)
  const [averageRating, setAverageRating] = useState(4.5)

  useEffect(() => {
    // Load goals from localStorage
    const storedGoals = localStorage.getItem('crod-reading-goals')
    if (storedGoals) {
      setReadingGoals(JSON.parse(storedGoals))
    }

    // Calculate reading streak
    const today = new Date()
    const readingDates = readingList
      .filter(item => item.lastReadAt)
      .map(item => item.lastReadAt!)
      .sort((a, b) => b.getTime() - a.getTime())

    let streak = 0
    let currentDate = new Date(today)
    currentDate.setHours(0, 0, 0, 0)

    for (let i = 0; i < 365; i++) {
      const hasRead = readingDates.some(date => {
        const readDate = new Date(date)
        readDate.setHours(0, 0, 0, 0)
        return readDate.getTime() === currentDate.getTime()
      })

      if (hasRead) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (i === 0) {
        // If no reading today, check yesterday
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    setReadingStreak(streak)

    // Simulate reading time (in production, track actual reading time)
    setTotalReadingTime(readingList.length * 45) // 45 min average per story
  }, [readingList])

  const monthlyProgress = (stats.completed / readingGoals.monthly) * 100
  const yearlyProgress = (stats.completed / readingGoals.yearly) * 100

  const statCards = [
    {
      icon: BookOpen,
      label: 'Aktuell am Lesen',
      value: stats.reading,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Award,
      label: 'Abgeschlossen',
      value: stats.completed,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: Clock,
      label: 'Lesezeit',
      value: `${Math.floor(totalReadingTime / 60)}h`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Streak',
      value: `${readingStreak} Tage`,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/20 to-red-500/20'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-8 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <BarChart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Reading Dashboard</h3>
            <p className="text-gray-400 text-sm">Verfolge deinen Lesefortschritt</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`} />
              <div className="relative bg-black/50 border border-white/10 rounded-2xl p-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Goals Progress */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Monatsziel</span>
            </div>
            <span className="text-gray-400 text-sm">{stats.completed} / {readingGoals.monthly}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(monthlyProgress, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Jahresziel</span>
            </div>
            <span className="text-gray-400 text-sm">{stats.completed} / {readingGoals.yearly}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(yearlyProgress, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Preview */}
      <motion.div
        className="mt-8 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-white font-medium">Nächstes Achievement</p>
            <p className="text-yellow-300 text-sm">Lies 5 Stories für "Bookworm Badge"</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}