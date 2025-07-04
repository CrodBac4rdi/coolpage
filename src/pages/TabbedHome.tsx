import { motion, AnimatePresence } from 'framer-motion'
import { Book, ArrowRight, Sparkles, Users, Mail, Star, Heart, ChevronDown, Info } from 'lucide-react'
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

export default function TabbedHome() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showCharacters, setShowCharacters] = useState(false)
  const [selectedStory, setSelectedStory] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'stories' | 'about' | 'contact'>('stories')
  
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
        {/* Navigation Tabs */}
        <div className="container mx-auto px-6 pt-6">
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <button
                onClick={() => setActiveTab('stories')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'stories' 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Stories
                </div>
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'about' 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  About
                </div>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'contact' 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-8 pb-8">
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto px-6 pb-16"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                    <h2 className="text-3xl font-bold text-gray-100">Über Crod Babylon</h2>
                  </div>
                  <p className="text-xl text-gray-300 mb-8">
                    Digital Paradise für fesselnde Geschichten
                  </p>
                </div>
                
                <div className="space-y-6 text-gray-300">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">Was ist Crod Babylon?</h3>
                    <p className="leading-relaxed">
                      Willkommen in unserem digitalen Paradies! Crod Babylon ist eine Sammlung von fesselnden 
                      Geschichten, die speziell für dich geschrieben wurden. Von romantischen CEO-Romanen bis hin 
                      zu magischen Akademie-Abenteuern - hier findest du Stories, die dich in andere Welten entführen.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-3">Unsere Mission</h3>
                    <p className="leading-relaxed">
                      Wir glauben an die Kraft guter Geschichten. Jede Story wird mit Liebe zum Detail entwickelt, 
                      mit authentischen Charakteren und emotionalen Wendungen, die dich bis zur letzten Seite 
                      fesseln. Unser Ziel ist es, dir einen Rückzugsort zu bieten, wo du in spannende Welten 
                      eintauchen kannst.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-6 text-center">
                      <Book className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-100 mb-2">Vielfältige Genres</h4>
                      <p className="text-sm">Romance, Fantasy, Thriller, Comedy - für jeden Geschmack</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 text-center">
                      <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-100 mb-2">Authentische Charaktere</h4>
                      <p className="text-sm">Tiefgehende Persönlichkeiten mit echten Emotionen</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 text-center">
                      <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-gray-100 mb-2">Regelmäßige Updates</h4>
                      <p className="text-sm">Neue Kapitel und Geschichten erscheinen kontinuierlich</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto px-6 pb-16"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <Mail className="w-8 h-8 text-blue-400" />
                    <h2 className="text-3xl font-bold text-gray-100">Wünsch dir eine Geschichte</h2>
                  </div>
                  <p className="text-xl text-gray-300 mb-8">
                    Hast du eine Idee? Lass sie uns zum Leben erwecken!
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-4">Story Requests</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Du hast eine Idee für eine Geschichte, die du gerne lesen möchtest? Oder einen bestimmten 
                      Charakter-Typ, der dir fehlt? Teile deine Wünsche mit uns!
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-100 mb-2">Genre-Wünsche</h4>
                        <p className="text-sm text-gray-300">Welche Art von Story möchtest du? Romance, Fantasy, Thriller, Comedy?</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-100 mb-2">Charakter-Ideen</h4>
                        <p className="text-sm text-gray-300">Beschreibe deinen Traumcharakter - Persönlichkeit, Beruf, Hintergrund</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-100 mb-2">Setting-Vorschläge</h4>
                        <p className="text-sm text-gray-300">Wo soll die Story spielen? Modern, historisch, futuristisch?</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-100 mb-2">Plot-Twists</h4>
                        <p className="text-sm text-gray-300">Hast du eine spannende Wendung im Kopf? Erzähl uns davon!</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Mail className="w-5 h-5" />
                        Story Request senden
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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