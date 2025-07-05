import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { TrendingUp, Clock, BookOpen, Award, X, BarChart3, Target } from 'lucide-react'
import { useReadingAnalytics } from '../hooks/useReadingAnalytics'

interface ReadingInsightsProps {
  storyId?: string
  isOpen: boolean
  onClose: () => void
}

export default function ReadingInsights({ storyId, isOpen, onClose }: ReadingInsightsProps) {
  const { stats, insights, recommendations, clearInsights } = useReadingAnalytics(storyId)
  const [activeTab, setActiveTab] = useState<'insights' | 'stats' | 'achievements'>('insights')

  if (!isOpen) return null

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.round(minutes % 60)
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'speed': return '⚡'
      case 'time': return '⏰'
      case 'completion': return '🎯'
      case 'recommendation': return '✨'
      case 'achievement': return '🏆'
      default: return '📖'
    }
  }

  const achievements = [
    {
      id: 'first_story',
      title: 'Erste Geschichte',
      description: 'Deine erste Romance Story gelesen',
      icon: '📚',
      unlocked: stats.sessionHistory.length > 0
    },
    {
      id: 'speed_reader',
      title: 'Schnell-Leser',
      description: 'Über 300 WPM gelesen',
      icon: '⚡',
      unlocked: stats.averageReadingSpeed > 300
    },
    {
      id: 'marathon',
      title: 'Marathon-Leser',
      description: 'Über 2 Stunden am Tag gelesen',
      icon: '🏃‍♀️',
      unlocked: stats.totalTimeRead > 120
    },
    {
      id: 'focused',
      title: 'Fokussiert',
      description: '30+ Minuten ohne Pause gelesen',
      icon: '🔥',
      unlocked: stats.sessionHistory.some(s => s.pauseCount === 0 && (s.endTime! - s.startTime) > 1800000)
    },
    {
      id: 'daily_reader',
      title: 'Täglicher Leser',
      description: '3+ Sitzungen an einem Tag',
      icon: '🌟',
      unlocked: stats.sessionsToday >= 3
    }
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-2xl bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Deine Lese-Statistiken
              </h2>
              <p className="text-gray-400 text-sm">Erkenne deine Lesegewohnheiten und verbessere dich</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-white/5 rounded-lg p-1">
            {[
              { id: 'insights', label: 'Insights', icon: TrendingUp },
              { id: 'stats', label: 'Statistiken', icon: BarChart3 },
              { id: 'achievements', label: 'Erfolge', icon: Award }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
                  activeTab === id 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            {activeTab === 'insights' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {insights.length === 0 && recommendations.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📚</div>
                    <p className="text-gray-400">Noch keine Insights verfügbar</p>
                    <p className="text-sm text-gray-500">Lese eine Geschichte, um personalisierte Insights zu erhalten!</p>
                  </div>
                ) : (
                  <>
                    {insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${
                          insight.priority === 'high' ? 'bg-purple-900/30 border-purple-400' :
                          insight.priority === 'medium' ? 'bg-blue-900/30 border-blue-400' :
                          'bg-gray-900/30 border-gray-400'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{insight.icon}</span>
                          <div>
                            <h3 className="font-bold text-white mb-1">{insight.title}</h3>
                            <p className="text-gray-300 text-sm">{insight.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={`rec-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (insights.length + index) * 0.1 }}
                        className="p-4 rounded-lg bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-400/30"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{rec.icon}</span>
                          <div>
                            <h3 className="font-bold text-white mb-1">{rec.title}</h3>
                            <p className="text-gray-300 text-sm">{rec.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-white">Lesezeit</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">{formatTime(stats.totalTimeRead)}</p>
                  <p className="text-sm text-gray-400">Insgesamt gelesen</p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h3 className="font-bold text-white">Lesegeschwindigkeit</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-400">{stats.averageReadingSpeed}</p>
                  <p className="text-sm text-gray-400">Wörter pro Minute</p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-white">Heutige Sitzungen</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-400">{stats.sessionsToday}</p>
                  <p className="text-sm text-gray-400">Sessions heute</p>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white">Geschichten</h3>
                  </div>
                  <p className="text-2xl font-bold text-yellow-400">{stats.storiesCompleted.length}</p>
                  <p className="text-sm text-gray-400">Abgeschlossen</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked 
                        ? 'bg-yellow-900/20 border-yellow-400/30' 
                        : 'bg-gray-900/20 border-gray-600/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </span>
                      <div className="flex-1">
                        <h3 className={`font-bold ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className="px-2 py-1 bg-yellow-400/20 rounded text-xs text-yellow-400 font-medium">
                          Erreicht!
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Clear Insights Button */}
          {insights.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={clearInsights}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Insights löschen
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}