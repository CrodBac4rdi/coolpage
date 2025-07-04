import { motion, AnimatePresence } from 'framer-motion'
import { Book, ArrowRight, Sparkles, Users, Mail, Star, Heart, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { characters } from '../data/characters'
import SEOHead from '../components/SEOHead'

const stories = [
  {
    id: 'forbidden-desire',
    title: 'Forbidden Desire',
    subtitle: 'CEO Romance • Slow Burn',
    description: 'Eine verbotene Romanze zwischen einer ambitionierten Account Managerin und dem mysteriösen neuen Creative Director.',
    emoji: '🔥',
    chapters: 35,
    words: '43k',
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
    description: 'Geheimnisse und Magie an einer versteckten Akademie, wo Emilia ihre wahren Kräfte entdeckt.',
    emoji: '🌙',
    chapters: 3,
    words: '12k',
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
    description: 'Eine White-Hat Hackerin und der mysteriöse "Phoenix" kämpfen im Cyberspace um Vertrauen und Liebe.',
    emoji: '💻',
    chapters: 3,
    words: '10k',
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
    description: 'Lena kann in Träume eindringen und muss Jonas aus einem Albtraum-Gefängnis befreien.',
    emoji: '🌙',
    chapters: 3,
    words: '9k',
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
    description: 'Lara entdeckt, dass sich ihr strenger Chef nachts in eine Katze verwandelt.',
    emoji: '🐱',
    chapters: 3,
    words: '8k',
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
    description: 'Sarah\'s Spiegelbild beginnt ein Eigenleben zu führen und konfrontiert sie mit dunklen Wahrheiten.',
    emoji: '🪞',
    chapters: 3,
    words: '11k',
    theme: {
      bg: 'from-gray-500/20 via-slate-500/10 to-zinc-500/20',
      accent: 'from-gray-500 to-slate-500',
      text: 'text-gray-900'
    }
  }
]

export default function FullFeaturedHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showCharacters, setShowCharacters] = useState(false)
  const [selectedStory, setSelectedStory] = useState<string>('all')
  
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
      return 'from-orange-950 via-amber-950 to-rose-950' // Morning
    } else if (hour >= 12 && hour < 18) {
      return 'from-blue-950 via-cyan-950 to-sky-950' // Afternoon
    } else {
      return 'from-indigo-950 via-purple-950 to-slate-950' // Evening/Night
    }
  }

  const filteredCharacters = selectedStory === 'all' 
    ? characters 
    : characters.filter(char => char.storyId === selectedStory)

  return (
    <>
      <SEOHead 
        title="Crod Babylon - Digital Paradise 2025"
        description="Entdecke fesselnde Geschichten in unserem digitalen Paradies. Romance, Fantasy, Thriller und mehr."
      />
      
      <div className={`min-h-screen bg-gradient-to-br ${getTimeTheme()} transition-all duration-1000`}>
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-medium text-gray-300">Crod Babylon</span>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-100 mb-4">
              Digital Paradise
            </h1>
            <p className="text-2xl text-gray-300 mb-2">
              {getTimeGreeting()}
            </p>
            <p className="text-xl text-gray-300 mb-8">
              Welche Geschichte möchtest du heute erleben?
            </p>
          </motion.div>
        </div>

        {/* Stories Grid */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                    rounded-2xl p-6 h-80 overflow-hidden
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
                        <h3 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-gray-300 transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-gray-300 mb-3 text-sm">{story.subtitle}</p>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">{story.description}</p>
                        
                        {/* Stats */}
                        <div className="bg-white/10 rounded-full p-3 mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                              <Book className="w-4 h-4" />
                              <span>{story.chapters} Kapitel</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{story.words} Wörter</span>
                            </div>
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

        {/* Characters Section */}
        <div className="container mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-6xl mx-auto border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-100">Charaktere entdecken</h2>
              </div>
              <button
                onClick={() => setShowCharacters(!showCharacters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-gray-300"
              >
                <span className="text-sm font-medium">Alle anzeigen</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showCharacters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Story Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedStory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedStory === 'all' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Alle Geschichten
              </button>
              {stories.map(story => (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(story.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedStory === story.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {story.emoji} {story.title}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {showCharacters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filteredCharacters.slice(0, 6).map((character, index) => (
                    <motion.div
                      key={character.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xl text-white">
                          {character.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-100">{character.name}</h3>
                          <p className="text-sm text-gray-300">{character.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{character.background}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-gray-400">
                          Aus {stories.find(s => s.id === character.storyId)?.title}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto text-center border border-white/10"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-gray-300" />
              <h2 className="text-2xl font-bold text-gray-100">Wünsch dir eine Geschichte</h2>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Hast du eine Idee für eine Geschichte? Oder möchtest du eine bestimmte Art von Romance, Fantasy oder Thriller? 
              Lass es mich wissen und ich schreibe sie für dich!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Story Request senden
            </Link>
          </motion.div>
        </div>

        {/* Stats Footer */}
        <div className="container mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto text-center border border-white/10"
          >
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-gray-100">{stories.length}</div>
                <div className="text-sm text-gray-400">Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-100">
                  {stories.reduce((acc, story) => acc + story.chapters, 0)}
                </div>
                <div className="text-sm text-gray-400">Kapitel</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-100">60k+</div>
                <div className="text-sm text-gray-400">Wörter</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}