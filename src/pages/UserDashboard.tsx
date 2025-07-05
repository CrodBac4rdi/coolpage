import { motion } from 'framer-motion'
import { User, Settings, BookOpen, Heart, TrendingUp, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AnimeNews from '../components/AnimeNews'
import AnimeQuotes from '../components/AnimeQuotes'
import ReadingStatsDashboard from '../components/ReadingStatsDashboard'
import StoryRecommendations from '../components/StoryRecommendations'
import DailyChallenge from '../components/DailyChallenge'
import CharacterGallery from '../components/CharacterGallery'
import { useReadingList } from '../hooks/useReadingList'
import { useFavorites } from '../hooks/useFavorites'

export default function UserDashboard() {
  const [username, setUsername] = useState('Otaku-Reader')
  const [userLevel, setUserLevel] = useState(1)
  const [userXP, setUserXP] = useState(0)
  const { readingList } = useReadingList()
  const { favorites } = useFavorites()

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('crod-user-data')
    if (userData) {
      const parsed = JSON.parse(userData)
      setUsername(parsed.username || 'Otaku-Reader')
      setUserLevel(parsed.level || 1)
      setUserXP(parsed.xp || 0)
    }

    // Calculate XP based on reading activity
    const calculatedXP = (readingList.length * 10) + (favorites.length * 5)
    const calculatedLevel = Math.floor(calculatedXP / 100) + 1
    
    setUserXP(calculatedXP)
    setUserLevel(calculatedLevel)

    // Save updated data
    localStorage.setItem('crod-user-data', JSON.stringify({
      username,
      level: calculatedLevel,
      xp: calculatedXP
    }))
  }, [readingList, favorites, username])

  const xpProgress = (userXP % 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Navigation */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <Link to="/" className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors group">
            <span className="text-2xl font-black">CROD BABYLON</span>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">Settings</span>
          </motion.button>
        </motion.div>
      </div>

      {/* User Header */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* User Avatar */}
          <motion.div
            className="w-32 h-32 mx-auto mb-6 relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-50" />
            <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            {/* Level Badge */}
            <motion.div
              className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full w-12 h-12 flex items-center justify-center border-4 border-gray-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <span className="text-white font-bold text-lg">{userLevel}</span>
            </motion.div>
          </motion.div>

          {/* User Info */}
          <h1 className="text-4xl font-bold text-white mb-2">{username}</h1>
          <p className="text-gray-400 mb-6">Level {userLevel} Reader</p>

          {/* XP Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">XP Progress</span>
              <span className="text-sm text-purple-400">{userXP % 100} / 100 XP</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <BookOpen className="w-5 h-5" />
                <span className="text-2xl font-bold">{readingList.length}</span>
              </div>
              <p className="text-gray-400 text-sm">Stories</p>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-2 text-pink-400 mb-1">
                <Heart className="w-5 h-5" />
                <span className="text-2xl font-bold">{favorites.length}</span>
              </div>
              <p className="text-gray-400 text-sm">Favoriten</p>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold">{Math.floor(userXP / 10)}</span>
              </div>
              <p className="text-gray-400 text-sm">Aktivität</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Reading Stats - Full Width on Mobile, 2 cols on Desktop */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ReadingStatsDashboard />
          </motion.div>

          {/* Daily Challenge - 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DailyChallenge />
          </motion.div>

          {/* Character Gallery - Full width */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CharacterGallery />
          </motion.div>

          {/* Story Recommendations - 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StoryRecommendations />
          </motion.div>

          {/* Anime Quotes - 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AnimeQuotes />
          </motion.div>

          {/* Anime News - 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AnimeNews />
          </motion.div>

          {/* Reading List Preview - 2 cols */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Deine Reading List
                </h3>
                <Link
                  to="/reading-list"
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
                >
                  Alle anzeigen
                  <Sparkles className="w-4 h-4" />
                </Link>
              </div>

              {readingList.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Noch keine Stories in deiner Liste</p>
                  <Link
                    to="/stories"
                    className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300"
                  >
                    Stories entdecken
                    <Sparkles className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {readingList.slice(0, 4).map((item, index) => (
                    <motion.div
                      key={item.storyId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <h4 className="text-white font-medium mb-2">{item.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'reading' ? 'bg-blue-500/20 text-blue-300' :
                          item.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          item.status === 'plan-to-read' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {item.status.replace('-', ' ')}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <div className="w-16 bg-white/10 rounded-full h-1.5">
                            <div 
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <span>{item.progress}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}