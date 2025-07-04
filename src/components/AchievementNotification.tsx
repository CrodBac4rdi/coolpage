import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import type { Achievement } from '../hooks/useAchievements'

interface AchievementNotificationProps {
  achievement: Achievement | null
  onClose: () => void
}

export default function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  if (!achievement) return null

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-yellow-600'
    }
  }

  const getRarityGlow = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-400/50'
      case 'rare': return 'shadow-blue-400/50'
      case 'epic': return 'shadow-purple-400/50'
      case 'legendary': return 'shadow-yellow-400/50'
    }
  }

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            className={`bg-gradient-to-r ${getRarityColor(achievement.rarity)} p-1 rounded-2xl shadow-2xl ${getRarityGlow(achievement.rarity)}`}
            animate={{
              boxShadow: [
                '0 0 20px rgba(168, 85, 247, 0.4)',
                '0 0 40px rgba(168, 85, 247, 0.6)',
                '0 0 20px rgba(168, 85, 247, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-6 flex items-center gap-4 min-w-[320px]">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-5xl"
              >
                {achievement.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-400 uppercase tracking-wide">
                    Achievement Unlocked!
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{achievement.title}</h3>
                <p className="text-gray-300 text-sm">{achievement.description}</p>
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Celebration Particles */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 text-2xl"
                initial={{ x: 0, y: 0 }}
                animate={{
                  x: Math.cos(i * 60 * Math.PI / 180) * 100,
                  y: Math.sin(i * 60 * Math.PI / 180) * 100,
                  opacity: 0,
                  scale: 0
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}