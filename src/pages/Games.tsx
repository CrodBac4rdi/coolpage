import { motion } from 'framer-motion'
import { Gamepad2, Heart, Brain, Zap, Dice1 } from 'lucide-react'
import HeartCollector from '../components/games/HeartCollector'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<string | null>('heart-collector')

  const games = [
    {
      id: 'interactive-stories',
      name: 'Interactive Stories',
      icon: <Gamepad2 className="w-6 h-6" />,
      description: 'Your choices shape the story! Multiple paths and endings.',
      color: 'from-purple-500 to-pink-500',
      isInteractive: true,
      link: '/interactive/shadow-hunter-awakening'
    },
    {
      id: 'heart-collector',
      name: 'Heart Collector',
      icon: <Heart className="w-6 h-6" />,
      description: 'Catch falling hearts and avoid the lightning!',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'emoji-memory',
      name: 'Emoji Memory',
      icon: <Brain className="w-6 h-6" />,
      description: 'Test your memory with cute emojis',
      color: 'from-purple-500 to-indigo-500',
      comingSoon: true
    },
    {
      id: 'speed-clicker',
      name: 'Speed Clicker',
      icon: <Zap className="w-6 h-6" />,
      description: 'How fast can you click?',
      color: 'from-yellow-500 to-orange-500',
      comingSoon: true
    },
    {
      id: 'dice-roller',
      name: 'Lucky Dice',
      icon: <Dice1 className="w-6 h-6" />,
      description: 'Roll the dice and test your luck',
      color: 'from-green-500 to-teal-500',
      comingSoon: true
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Mini Games</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Game Zone
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Take a break and play some fun mini-games!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Game Selector */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="space-y-2 sm:space-y-3">
              {games.map((game) => 
                game.isInteractive ? (
                  <Link key={game.id} to={game.link}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-3 sm:p-4 rounded-xl transition-all text-left bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border-2 border-purple-500/30 hover:border-purple-500/50"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${game.color}`}>
                          {game.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                            {game.name}
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                              ⚡ Interactive
                            </span>
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">{game.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !game.comingSoon && setSelectedGame(game.id)}
                    disabled={game.comingSoon}
                    className={`w-full p-3 sm:p-4 rounded-xl transition-all text-left ${
                      selectedGame === game.id
                        ? 'bg-white/20 border-2 border-white/30'
                        : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                    } ${game.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${game.color}`}>
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                          {game.name}
                          {game.comingSoon && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                              Soon
                            </span>
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">{game.description}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              )}
            </div>

            {/* Global Leaderboard */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                🏆 Top Players
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded-lg">
                  <span className="flex items-center gap-2">
                    <span>🥇</span>
                    <span className="text-xs sm:text-sm">GamerPro2025</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold">2,450</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-500/10 rounded-lg">
                  <span className="flex items-center gap-2">
                    <span>🥈</span>
                    <span className="text-xs sm:text-sm">HeartHunter</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold">2,120</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-amber-700/10 rounded-lg">
                  <span className="flex items-center gap-2">
                    <span>🥉</span>
                    <span className="text-xs sm:text-sm">You?</span>
                  </span>
                  <span className="text-xs sm:text-sm font-bold">???</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {selectedGame === 'heart-collector' && <HeartCollector />}
            
            {selectedGame === 'emoji-memory' && (
              <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 backdrop-blur-xl border border-white/10 text-center">
                <Brain className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Coming Soon!</h3>
                <p className="text-gray-400 text-sm sm:text-base">This game is under development</p>
              </div>
            )}
          </div>
        </div>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { label: 'Games Played', value: '1,337', emoji: '🎮' },
            { label: 'Hearts Collected', value: '42,069', emoji: '💕' },
            { label: 'High Score', value: '9,001', emoji: '🚀' },
            { label: 'Fun Level', value: 'MAX', emoji: '🎉' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-white/10"
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.emoji}</div>
              <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}