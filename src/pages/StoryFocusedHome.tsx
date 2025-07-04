import { motion } from 'framer-motion'
import { Book, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const stories = [
  {
    id: 'forbidden-desire',
    title: 'Forbidden Desire',
    subtitle: 'CEO Romance • Slow Burn • 🔥 Passion',
    emoji: '🔥',
    chapters: 50,
    enhanced: true, // NEW: Enhanced version available
    theme: {
      bg: 'from-rose-500/20 via-pink-500/10 to-purple-500/20',
      accent: 'from-rose-500 to-pink-500',
      text: 'text-rose-900'
    }
  },
  {
    id: 'moonlight-academy',
    title: 'Moonlight Academy',
    subtitle: 'Magical School • Fantasy Romance • 🌙 Mystik',
    emoji: '🌙',
    chapters: 12,
    theme: {
      bg: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20',
      accent: 'from-blue-500 to-indigo-500',
      text: 'text-blue-900'
    }
  },
  {
    id: 'code-breakers',
    title: 'Code Breakers',
    subtitle: 'Hacker Romance • Cyberpunk • 💻 Tech',
    emoji: '💻',
    chapters: 50,
    theme: {
      bg: 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
      accent: 'from-green-500 to-emerald-500',
      text: 'text-green-900'
    }
  },
  {
    id: 'dream-catcher',
    title: 'Dream Catcher',
    subtitle: 'Supernatural • Mystery Romance • ✨ Träume',
    emoji: '✨',
    chapters: 25,
    theme: {
      bg: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
      accent: 'from-purple-500 to-violet-500',
      text: 'text-purple-900'
    }
  },
  {
    id: 'my-boss-is-a-cat',
    title: 'My Boss is a Cat',
    subtitle: 'Comedy • Urban Fantasy • 🐱 Süß',
    emoji: '🐱',
    chapters: 15,
    theme: {
      bg: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
      accent: 'from-orange-500 to-amber-500',
      text: 'text-orange-900'
    }
  },
  {
    id: 'shadow-in-the-mirror',
    title: 'Shadow in the Mirror',
    subtitle: 'Psychological Thriller • Dark Romance • 🪞 Mystery',
    emoji: '🪞',
    chapters: 20,
    theme: {
      bg: 'from-gray-500/20 via-slate-500/10 to-zinc-500/20',
      accent: 'from-gray-500 to-slate-500',
      text: 'text-gray-900'
    }
  },
  {
    id: 'the-transfer-student',
    title: 'The Transfer Student',
    subtitle: 'School Drama • Romance • 📚 Academy',
    emoji: '📚',
    chapters: 18,
    theme: {
      bg: 'from-cyan-500/20 via-sky-500/10 to-blue-500/20',
      accent: 'from-cyan-500 to-sky-500',
      text: 'text-cyan-900'
    }
  },
  {
    id: 'summer-temptation',
    title: 'Summer Temptation',
    subtitle: 'Beach Romance • Summer Love • 🌅 Sonne',
    emoji: '🌅',
    chapters: 12,
    theme: {
      bg: 'from-yellow-500/20 via-orange-500/10 to-red-500/20',
      accent: 'from-yellow-500 to-orange-500',
      text: 'text-yellow-900'
    }
  }
]

export default function StoryFocusedHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getTimeGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Guten Morgen'
    if (hour < 18) return 'Guten Tag'
    return 'Guten Abend'
  }

  const getTimeTheme = () => {
    const hour = currentTime.getHours()
    if (hour >= 6 && hour < 12) {
      return 'from-purple-900/20 via-black to-pink-900/20' // Morning
    } else if (hour >= 12 && hour < 18) {
      return 'from-cyan-900/20 via-black to-blue-900/20' // Afternoon
    } else {
      return 'from-indigo-900/20 via-black to-purple-900/20' // Evening/Night
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getTimeTheme()} transition-all duration-1000`}>
      {/* Header */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-white">Crod Babylon</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {getTimeGreeting()}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8">
            Welche Geschichte möchtest du heute erleben?
          </p>
        </motion.div>
      </div>

      {/* Stories Grid */}
      <div className="container mx-auto px-4 sm:px-6 pb-16">
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
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 sm:px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto text-center border border-white/20"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6">Die Zahlen sprechen</h2>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">8</div>
              <div className="text-xs sm:text-sm text-gray-300">Stories</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-xs sm:text-sm text-gray-300">Kapitel</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl border border-white/10 hover:border-white/20 transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-xs sm:text-sm text-gray-300">Abenteuer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}