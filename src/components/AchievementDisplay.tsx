import { motion } from 'framer-motion'
import { Trophy, Lock, TrendingUp } from 'lucide-react'
import type { Achievement } from '../hooks/useAchievements'

interface AchievementDisplayProps {
  achievements: Achievement[]
  totalPoints: number
  level: number
  completionPercentage: number
}

export default function AchievementDisplay({ 
  achievements, 
  totalPoints, 
  level, 
  completionPercentage 
}: AchievementDisplayProps) {
  
  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-yellow-600'
    }
  }

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-500'
      case 'rare': return 'border-blue-500'
      case 'epic': return 'border-purple-500'
      case 'legendary': return 'border-yellow-500'
    }
  }

  // const nextLevelPoints = level * 100
  const currentLevelProgress = totalPoints % 100
  const progressPercentage = (currentLevelProgress / 100) * 100

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-3">
              <span className="text-2xl font-bold text-white">{level}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Level</h3>
            <div className="w-full bg-black/20 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{currentLevelProgress}/100 XP</p>
          </div>

          {/* Total Points */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 mb-3">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Punkte</h3>
            <p className="text-3xl font-bold text-yellow-400">{totalPoints}</p>
          </div>

          {/* Completion */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-3">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Fortschritt</h3>
            <p className="text-3xl font-bold text-green-400">{completionPercentage}%</p>
          </div>
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group ${achievement.unlockedAt ? '' : 'opacity-60'}`}
          >
            <div className={`bg-black/40 backdrop-blur-sm rounded-2xl p-4 border-2 transition-all duration-300 ${
              achievement.unlockedAt 
                ? `${getRarityBorder(achievement.rarity)} hover:scale-105` 
                : 'border-gray-700 hover:border-gray-600'
            }`}>
              {/* Lock Overlay */}
              {!achievement.unlockedAt && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                  <Lock className="w-8 h-8 text-gray-500" />
                </div>
              )}

              {/* Icon */}
              <div className="text-4xl mb-3 text-center">
                {achievement.icon}
              </div>

              {/* Title */}
              <h4 className="font-semibold text-white text-sm mb-1 text-center">
                {achievement.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-gray-400 text-center mb-3">
                {achievement.description}
              </p>

              {/* Progress Bar (if applicable) */}
              {achievement.maxProgress && !achievement.unlockedAt && (
                <div className="mt-3">
                  <div className="bg-gray-700 rounded-full h-1.5">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress || 0) / achievement.maxProgress * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    {achievement.progress || 0}/{achievement.maxProgress}
                  </p>
                </div>
              )}

              {/* Rarity Badge */}
              <div className="mt-3 text-center">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  achievement.unlockedAt 
                    ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white` 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {achievement.rarity.toUpperCase()}
                </span>
              </div>

              {/* Unlock Date */}
              {achievement.unlockedAt && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  {new Date(achievement.unlockedAt).toLocaleDateString('de-DE')}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}