import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Dice6, RefreshCw, BarChart3, TrendingUp, Heart, Book, Users, Sparkles, Trophy } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { loadStories } from '../utils/storyLoader'
import { characters } from '../data/characters'
import SEOHead from '../components/SEOHead'
import ModernIcon from '../components/ModernIcon'
import { useAchievements } from '../hooks/useAchievements'
import AchievementDisplay from '../components/AchievementDisplay'
import AchievementNotification from '../components/AchievementNotification'

export default function Games() {
  const [selectedSection, setSelectedSection] = useState<string>('stats')
  const [diceResult, setDiceResult] = useState<number | null>(null)
  const [randomStory, setRandomStory] = useState<any>(null)
  const [isRolling, setIsRolling] = useState(false)
  
  const stories = loadStories()
  const { 
    achievements, 
    totalPoints, 
    level, 
    showNotification,
    getCompletionPercentage
  } = useAchievements()

  const sections = [
    {
      id: 'stats',
      name: 'Story Stats',
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'Entdecke Statistiken über unsere Story-Welt',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'discovery',
      name: 'Story Discovery',
      icon: <Dice6 className="w-6 h-6" />,
      description: 'Finde zufällig neue Geschichten zum Lesen',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'collection',
      name: 'Collection',
      icon: <Book className="w-6 h-6" />,
      description: 'Übersicht über alle Stories und Charaktere',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'achievements',
      name: 'Achievements',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Sammle Erfolge und steige im Level auf',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  // Calculate statistics
  const stats = useMemo(() => {
    const totalChapters = stories.reduce((acc, story) => acc + story.chapters.length, 0)
    const totalWords = stories.reduce((acc, story) => {
      return acc + story.chapters.reduce((chapterAcc, chapter) => {
        return chapterAcc + chapter.content.reduce((contentAcc, paragraph) => {
          return contentAcc + paragraph.split(' ').length
        }, 0)
      }, 0)
    }, 0)
    
    const genreCount = stories.reduce((acc, story) => {
      story.genre?.forEach(g => {
        acc[g] = (acc[g] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    return {
      totalStories: stories.length,
      totalChapters,
      totalWords,
      totalCharacters: characters.length,
      averageChaptersPerStory: Math.round(totalChapters / stories.length),
      popularGenres: Object.entries(genreCount).sort(([,a], [,b]) => b - a).slice(0, 3)
    }
  }, [stories])

  const handleRollDice = () => {
    setIsRolling(true)
    setRandomStory(null)
    
    // Animate dice roll
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1)
      rollCount++
      
      if (rollCount > 15) {
        clearInterval(rollInterval)
        const finalResult = Math.floor(Math.random() * stories.length)
        setDiceResult(finalResult + 1)
        setRandomStory(stories[finalResult])
        setIsRolling(false)
      }
    }, 100)
  }

  return (
    <>
      <SEOHead 
        title="Interactive Features"
        description="Entdecke Statistiken, zufällige Stories und mehr über unsere digitale Story-Welt"
        keywords={['Interactive', 'Statistics', 'Story Discovery', 'Games']}
      />
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Interactive Features</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Story Universe
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tauche tiefer in unsere digitale Story-Welt ein mit Statistiken, Entdeckungen und mehr
            </p>
          </motion.div>

          {/* Section Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedSection(section.id)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  selectedSection === section.id
                    ? 'bg-white/10 border-white/30 shadow-2xl scale-105'
                    : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20 hover:scale-102'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color}`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{section.name}</h3>
                    <p className="text-gray-400 text-sm">{section.description}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  selectedSection === section.id ? 'text-purple-400' : 'text-gray-500'
                }`}>
                  {selectedSection === section.id ? 'Aktiv' : 'Klicken zum Öffnen'}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {selectedSection === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                  Story Universe Statistiken
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-6 border border-purple-500/20"
                  >
                    <ModernIcon type="book" size="md" className="mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stats.totalStories}</div>
                    <div className="text-sm text-gray-400">Stories</div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl p-6 border border-pink-500/20"
                  >
                    <ModernIcon type="scroll" size="md" className="mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stats.totalChapters}</div>
                    <div className="text-sm text-gray-400">Kapitel</div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/20"
                  >
                    <TrendingUp className="w-8 h-8 text-cyan-400 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stats.totalWords.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">Wörter</div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl p-6 border border-emerald-500/20"
                  >
                    <Users className="w-8 h-8 text-emerald-400 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stats.totalCharacters}</div>
                    <div className="text-sm text-gray-400">Charaktere</div>
                  </motion.div>
                </div>

                {/* Genre Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Beliebte Genres
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.popularGenres.map(([genre, count]) => (
                      <div key={genre} className="p-4 bg-white/5 rounded-xl">
                        <div className="text-lg font-semibold text-white">{genre}</div>
                        <div className="text-sm text-gray-400">{count} Stories</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Additional Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Quick Facts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">Durchschnittlich {stats.averageChaptersPerStory} Kapitel pro Story</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-300">Über {Math.round(stats.totalWords / 200)} Minuten Lesezeit</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {selectedSection === 'discovery' && (
              <motion.div
                key="discovery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-8">
                  <Dice6 className="w-6 h-6 text-green-400" />
                  Story Discovery
                </h2>

                <div className="text-center">
                  <div className="mb-8">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mb-4"
                      animate={isRolling ? { rotateY: 360 } : {}}
                      transition={{ duration: 0.1, repeat: isRolling ? Infinity : 0 }}
                    >
                      <span className="text-4xl font-bold text-white">
                        {isRolling ? '🎲' : diceResult || '🎲'}
                      </span>
                    </motion.div>
                    <p className="text-gray-400">
                      {isRolling ? 'Entdecke eine neue Welt...' : 'Lass den Zufall entscheiden, welche Story du als nächstes liest!'}
                    </p>
                  </div>

                  <button
                    onClick={handleRollDice}
                    disabled={isRolling}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto mb-8"
                  >
                    <RefreshCw className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
                    {isRolling ? 'Entdecke...' : 'Zufällige Story finden!'}
                  </button>

                  {randomStory && !isRolling && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20"
                    >
                      <ModernIcon 
                        type={randomStory.id.includes('desire') ? 'romance' : 
                              randomStory.id.includes('academy') ? 'magic' :
                              randomStory.id.includes('code') ? 'cyberpunk' :
                              randomStory.id.includes('dream') ? 'fantasy' :
                              randomStory.id.includes('cat') ? 'comedy' :
                              randomStory.id.includes('mirror') ? 'supernatural' :
                              randomStory.id.includes('transfer') ? 'drama' : 'sparkles'}
                        size="lg"
                        className="mb-4"
                      />
                      <h3 className="text-3xl font-bold text-white mb-3">{randomStory.title}</h3>
                      <p className="text-gray-300 mb-6 max-w-lg mx-auto">{randomStory.description}</p>
                      <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-8">
                        <span className="flex items-center gap-1">
                          <Book className="w-4 h-4" />
                          {randomStory.chapters?.length || 0} Kapitel
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {randomStory.genre?.join(', ') || 'Romance'}
                        </span>
                      </div>
                      <div className="flex gap-4 justify-center">
                        <Link
                          to={`/reader/${randomStory.id}`}
                          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                        >
                          Jetzt lesen
                        </Link>
                        <button
                          onClick={handleRollDice}
                          className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
                        >
                          Andere Story
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {selectedSection === 'collection' && (
              <motion.div
                key="collection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                  <Book className="w-6 h-6 text-pink-400" />
                  Story Collection
                </h2>

                {/* Quick Access Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stories.slice(0, 6).map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="text-center mb-4">
                        <ModernIcon 
                          type={story.id.includes('desire') ? 'romance' : 
                                story.id.includes('academy') ? 'magic' :
                                story.id.includes('code') ? 'cyberpunk' :
                                story.id.includes('dream') ? 'fantasy' :
                                story.id.includes('cat') ? 'comedy' :
                                story.id.includes('mirror') ? 'supernatural' :
                                story.id.includes('transfer') ? 'drama' : 'sparkles'}
                          size="md"
                          className="mb-3"
                        />
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-2">
                          {story.chapters.length} Kapitel
                        </p>
                      </div>
                      <Link
                        to={`/reader/${story.id}`}
                        className="block w-full py-2 text-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Lesen →
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    to="/manhwa"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
                  >
                    Alle Stories entdecken
                  </Link>
                </div>
              </motion.div>
            )}

            {selectedSection === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Achievements & Erfolge
                </h2>

                <AchievementDisplay
                  achievements={achievements}
                  totalPoints={totalPoints}
                  level={level}
                  completionPercentage={getCompletionPercentage()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Achievement Notification */}
      <AchievementNotification
        achievement={showNotification}
        onClose={() => {}}
      />
    </>
  )
}