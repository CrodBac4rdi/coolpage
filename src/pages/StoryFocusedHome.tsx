import { motion } from 'framer-motion'
import { Book, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
// Import stories directly from the data directory
import forbiddenDesire from '../data/stories/forbidden-desire.json'
import moonlightAcademy from '../data/stories/moonlight-academy.json'
import codeBreakers from '../data/stories/code-breakers.json'
import dreamCatcher from '../data/stories/dream-catcher.json'
import myBossIsACat from '../data/stories/my-boss-is-a-cat.json'
import shadowInMirror from '../data/stories/shadow-in-the-mirror.json'
import transferStudent from '../data/stories/the-transfer-student.json'

// Convert story data to display format
const convertStoryToDisplay = (story: any) => ({
  id: story.id,
  title: story.title,
  subtitle: story.genre?.join(' • ') || 'Story',
  emoji: story.coverEmoji || '📚',
  chapters: story.chapters?.length || 0,
  enhanced: true,
  theme: getThemeForGenre(story.genre?.[0] || 'Romance')
})

// Get theme colors based on genre
function getThemeForGenre(genre: string) {
  const themes: Record<string, any> = {
    'Romance': {
      bg: 'from-rose-500/20 via-pink-500/10 to-purple-500/20',
      accent: 'from-rose-500 to-pink-500',
      text: 'text-rose-900'
    },
    'Fantasy': {
      bg: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20',
      accent: 'from-blue-500 to-indigo-500',
      text: 'text-blue-900'
    },
    'Cyberpunk': {
      bg: 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
      accent: 'from-green-500 to-emerald-500',
      text: 'text-green-900'
    },
    'Mystery': {
      bg: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
      accent: 'from-purple-500 to-violet-500',
      text: 'text-purple-900'
    },
    'Slice of Life': {
      bg: 'from-amber-500/20 via-orange-500/10 to-red-500/20',
      accent: 'from-amber-500 to-orange-500',
      text: 'text-amber-900'
    }
  }
  
  return themes[genre] || themes['Romance']
}

export default function StoryFocusedHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Load stories
  useEffect(() => {
    const loadStoriesData = () => {
      setLoading(true)
      try {
        const allStories = [
          forbiddenDesire,
          moonlightAcademy,
          codeBreakers,
          dreamCatcher,
          myBossIsACat,
          shadowInMirror,
          transferStudent
        ]
        const displayStories = allStories.map(convertStoryToDisplay)
        setStories(displayStories)
      } catch (error) {
        console.error('Failed to load stories:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadStoriesData()
  }, [])

  const getTimeGreeting = () => {
    const hour = currentTime.getHours()
    
    if (hour < 6) return "✨ Gute Nacht"
    if (hour < 12) return "🌅 Guten Morgen"
    if (hour < 18) return "☀️ Guten Tag"
    if (hour < 22) return "🌆 Guten Abend"
    return "🌙 Gute Nacht"
  }

  const getTimeTheme = () => {
    const hour = currentTime.getHours()
    
    if (hour >= 6 && hour < 8) return "from-amber-400 via-orange-500 to-pink-500" // Sunrise
    if (hour >= 8 && hour < 11) return "from-blue-400 via-cyan-400 to-teal-400" // Morning
    if (hour >= 11 && hour < 14) return "from-yellow-300 via-blue-400 to-indigo-500" // Midday
    if (hour >= 14 && hour < 17) return "from-orange-300 via-pink-400 to-purple-500" // Afternoon
    if (hour >= 17 && hour < 20) return "from-red-400 via-pink-500 to-purple-600" // Evening
    if (hour >= 20 && hour < 22) return "from-purple-600 via-blue-700 to-indigo-800" // Twilight
    return "from-indigo-900 via-purple-900 to-blue-900" // Night
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getTimeTheme()} transition-all duration-1000`}>
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-100 hover:text-gray-300 transition-colors">
            ← Crod Babylon
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-right"
          >
            <p className="text-sm text-gray-300">{getTimeGreeting()}</p>
            <p className="text-xs text-gray-400">
              {currentTime.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Digital Paradise</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-100 mb-4">
            Stories Collection
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-2">
            Entdecke fesselnde Geschichten voller Emotionen
          </p>
          <p className="text-xl text-gray-300 mb-8">
            Welche Geschichte möchtest du heute erleben?
          </p>
        </motion.div>
      </div>

      {/* Stories Grid */}
      <div className="container mx-auto px-4 sm:px-6 pb-16">
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-300">Loading stories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link to={`/reader/${story.id}`}>
                <div className={`
                  relative bg-gradient-to-br ${story.theme.bg} 
                  rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 
                  h-64 sm:h-72 lg:h-80 overflow-hidden
                  backdrop-blur-xl border border-white/20
                  hover:shadow-2xl hover:border-white/40 transition-all duration-300
                  cursor-pointer hover:scale-[1.02]
                `}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 text-4xl sm:text-5xl lg:text-6xl">{story.emoji}</div>
                    <div className="absolute bottom-4 left-4 text-4xl sm:text-5xl lg:text-6xl opacity-30">{story.emoji}</div>
                  </div>
                  
                  {/* Enhanced Badge */}
                  {story.enhanced && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Enhanced
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">{story.emoji}</div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors leading-tight">
                        {story.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">{story.subtitle}</p>
                      
                      {/* Progress */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 mb-4 border border-white/30">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white">
                          <Book className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{story.chapters} Kapitel</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Read Button */}
                    <motion.div 
                      className={`
                        w-full flex items-center justify-center gap-2 
                        bg-gradient-to-r ${story.theme.accent}
                        text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl
                        font-semibold text-sm sm:text-base
                        group-hover:shadow-lg transform transition-all duration-200
                        hover:scale-105 active:scale-95
                      `}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <span>Geschichte entdecken</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}