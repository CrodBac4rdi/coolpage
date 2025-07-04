import { motion } from 'framer-motion'
import { Book, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const stories = [
  {
    id: 'forbidden-desire',
    title: 'Forbidden Desire',
    subtitle: 'CEO Romance • Slow Burn',
    emoji: '🔥',
    chapters: 35,
    theme: {
      bg: 'from-rose-500/20 via-pink-500/10 to-purple-500/20',
      accent: 'from-rose-500 to-pink-500',
      text: 'text-rose-900'
    }
  },
  {
    id: 'moonlight-academy',
    title: 'Moonlight Academy',
    subtitle: 'Magical School • Fantasy Romance',
    emoji: '🌙',
    chapters: 3,
    theme: {
      bg: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20',
      accent: 'from-blue-500 to-indigo-500',
      text: 'text-blue-900'
    }
  },
  {
    id: 'code-breakers',
    title: 'Code Breakers',
    subtitle: 'Hacker Romance • Thriller',
    emoji: '💻',
    chapters: 3,
    theme: {
      bg: 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
      accent: 'from-green-500 to-emerald-500',
      text: 'text-green-900'
    }
  },
  {
    id: 'dream-catcher',
    title: 'Traumfänger',
    subtitle: 'Supernatural • Mystery Romance',
    emoji: '🌙',
    chapters: 3,
    theme: {
      bg: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
      accent: 'from-purple-500 to-violet-500',
      text: 'text-purple-900'
    }
  },
  {
    id: 'my-boss-is-a-cat',
    title: 'Mein Chef ist eine Katze!',
    subtitle: 'Comedy • Urban Fantasy',
    emoji: '🐱',
    chapters: 3,
    theme: {
      bg: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
      accent: 'from-orange-500 to-amber-500',
      text: 'text-orange-900'
    }
  },
  {
    id: 'shadow-in-mirror',
    title: 'Der Schatten im Spiegel',
    subtitle: 'Psychological Thriller • Dark Romance',
    emoji: '🪞',
    chapters: 3,
    theme: {
      bg: 'from-gray-500/20 via-slate-500/10 to-zinc-500/20',
      accent: 'from-gray-500 to-slate-500',
      text: 'text-gray-900'
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
      return 'from-orange-100 via-yellow-50 to-rose-100' // Morning
    } else if (hour >= 12 && hour < 18) {
      return 'from-blue-50 via-cyan-50 to-sky-100' // Afternoon
    } else {
      return 'from-indigo-100 via-purple-50 to-slate-100' // Evening/Night
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
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Crod Babylon</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {getTimeGreeting()}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welche Geschichte möchtest du heute erleben?
          </p>
        </motion.div>
      </div>

      {/* Stories Grid */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  rounded-2xl p-6 h-72 overflow-hidden
                  backdrop-blur-sm border border-white/20
                  hover:shadow-2xl transition-all duration-300
                  cursor-pointer
                `}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 text-6xl">{story.emoji}</div>
                    <div className="absolute bottom-4 left-4 text-6xl opacity-30">{story.emoji}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="text-4xl mb-4">{story.emoji}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{story.subtitle}</p>
                      
                      {/* Progress */}
                      <div className="bg-white/40 rounded-full p-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Book className="w-4 h-4" />
                          <span>{story.chapters} Kapitel</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Read Button */}
                    <div className={`
                      inline-flex items-center gap-2 
                      bg-gradient-to-r ${story.theme.accent}
                      text-white px-6 py-3 rounded-xl
                      font-medium
                      group-hover:shadow-lg transform transition-all duration-200
                    `}>
                      <span>Lesen</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto text-center"
        >
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-gray-900">7</div>
              <div className="text-sm text-gray-600">Stories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">53</div>
              <div className="text-sm text-gray-600">Kapitel</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">60k+</div>
              <div className="text-sm text-gray-600">Wörter</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}