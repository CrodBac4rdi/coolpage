import { motion, AnimatePresence } from 'framer-motion'
import { Star, ArrowRight, Sparkles, Search, Filter, Clock, Heart, Moon, Computer, Cat, Ghost, School } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStories } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'
import { useMemo, useState } from 'react'
import ModernIcon from '../components/ModernIcon'

export default function ManhwaList() {
  const manhwaStories = loadStories()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedMood, setSelectedMood] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  
  const storyMoods = useMemo(() => ({
    'forbidden-desire': {
      atmosphere: 'Dunkle Eleganz',
      tagline: 'Verbotene Leidenschaft zwischen Macht und Verlangen',
      mood: '🔥 Intense • 💼 Business • 🖤 Forbidden',
      textColor: 'text-emerald-100',
      accentColor: 'emerald',
      backgroundPattern: 'bg-gradient-to-br from-emerald-900/40 via-teal-800/30 to-slate-900/40'
    },
    'moonlight-academy': {
      atmosphere: 'Mystische Magie',
      tagline: 'Mondlicht enthüllt verborgene Kräfte und erste Liebe',
      mood: '🌙 Mystisch • ✨ Magie • 💙 Erwachen',
      textColor: 'text-blue-100',
      accentColor: 'blue',
      backgroundPattern: 'bg-gradient-to-br from-blue-900/40 via-purple-800/30 to-indigo-900/40'
    },
    'code-breakers': {
      atmosphere: 'Cyber Romance',
      tagline: 'Wenn Hacking auf Herzen trifft',
      mood: '💻 Cyber • 💙 Tech • 🔮 Future',
      textColor: 'text-cyan-100',
      accentColor: 'cyan',
      backgroundPattern: 'bg-gradient-to-br from-cyan-900/40 via-blue-800/30 to-slate-900/40'
    },
    'dream-catcher': {
      atmosphere: 'Träume & Realität',
      tagline: 'Zwischen Träumen wandeln, zwischen Welten lieben',
      mood: '🌙 Träume • 💜 Mystik • ✨ Übernatürlich',
      textColor: 'text-purple-100',
      accentColor: 'purple',
      backgroundPattern: 'bg-gradient-to-br from-purple-900/40 via-violet-800/30 to-indigo-900/40'
    },
    'the-transfer-student': {
      atmosphere: 'Schulgeheimnisse',
      tagline: 'Neue Schule, dunkle Geheimnisse, unerwartete Verbindungen',
      mood: '📚 School • 🔍 Mystery • 💙 Drama',
      textColor: 'text-blue-100',
      accentColor: 'blue',
      backgroundPattern: 'bg-gradient-to-br from-blue-900/40 via-slate-800/30 to-gray-900/40'
    },
    'my-boss-is-a-cat': {
      atmosphere: 'Süße Romcom',
      tagline: 'Wenn dein Chef ein flauschiges Geheimnis hat',
      mood: '🐱 Süß • 😄 Comedy • 💕 Romance',
      textColor: 'text-orange-100',
      accentColor: 'orange',
      backgroundPattern: 'bg-gradient-to-br from-orange-900/40 via-pink-800/30 to-rose-900/40'
    },
    'shadow-in-the-mirror': {
      atmosphere: 'Dunkle Geheimnisse',
      tagline: 'Spiegelbilder lügen nicht... oder doch?',
      mood: '🪞 Mystery • 👻 Supernatural • 🖤 Dark',
      textColor: 'text-gray-100',
      accentColor: 'gray',
      backgroundPattern: 'bg-gradient-to-br from-gray-900/40 via-slate-800/30 to-black/40'
    }
  }), [])

  // Story filtering and sorting logic
  const filteredAndSortedStories = useMemo(() => {
    let filtered = manhwaStories

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        storyMoods[story.id as keyof typeof storyMoods]?.tagline.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Genre filter (based on story themes)
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(story => {
        const mood = storyMoods[story.id as keyof typeof storyMoods]
        return mood?.mood.toLowerCase().includes(selectedGenre.toLowerCase())
      })
    }

    // Mood filter
    if (selectedMood !== 'all') {
      filtered = filtered.filter(story => {
        const mood = storyMoods[story.id as keyof typeof storyMoods]
        return mood?.atmosphere.toLowerCase().includes(selectedMood.toLowerCase())
      })
    }

    // Sorting
    switch (sortBy) {
      case 'title':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      case 'length':
        return [...filtered].sort((a, b) => (b.chapters?.length || 0) - (a.chapters?.length || 0))
      case 'newest':
        return [...filtered].reverse()
      default:
        return filtered
    }
  }, [manhwaStories, searchTerm, selectedGenre, selectedMood, sortBy, storyMoods])

  // Get unique genres and moods for filters
  const availableGenres = useMemo(() => {
    const genres = new Set<string>()
    manhwaStories.forEach(story => {
      const mood = storyMoods[story.id as keyof typeof storyMoods]
      if (mood?.mood) {
        mood.mood.split('•').forEach(genre => {
          const cleanGenre = genre.trim().replace(/[🔥💼🖤🌙✨💙💻🔮📚🔍🐱😄💕👻🪞]/g, '').trim()
          if (cleanGenre) genres.add(cleanGenre)
        })
      }
    })
    return Array.from(genres)
  }, [manhwaStories, storyMoods])

  const availableMoods = useMemo(() => {
    const moods = new Set<string>()
    manhwaStories.forEach(story => {
      const mood = storyMoods[story.id as keyof typeof storyMoods]
      if (mood?.atmosphere) {
        moods.add(mood.atmosphere)
      }
    })
    return Array.from(moods)
  }, [manhwaStories, storyMoods])

  const getReadingTime = (story: any) => {
    const avgWordsPerChapter = 800
    const totalWords = (story.chapters?.length || 1) * avgWordsPerChapter
    const readingSpeed = 200 // words per minute
    const minutes = Math.ceil(totalWords / readingSpeed)
    
    if (minutes < 60) return `${minutes} Min.`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }

  const getStoryIcon = (storyId: string) => {
    if (storyId.includes('desire')) return <Heart className="w-4 h-4" />
    if (storyId.includes('academy')) return <Moon className="w-4 h-4" />
    if (storyId.includes('code')) return <Computer className="w-4 h-4" />
    if (storyId.includes('dream')) return <Sparkles className="w-4 h-4" />
    if (storyId.includes('transfer')) return <School className="w-4 h-4" />
    if (storyId.includes('cat')) return <Cat className="w-4 h-4" />
    if (storyId.includes('mirror')) return <Ghost className="w-4 h-4" />
    return <Star className="w-4 h-4" />
  }

  
  return (
    <>
      <SEOHead 
        title="Digital Love Stories"
        description="Entdecke leidenschaftliche Romanzen, mystische Abenteuer und herzerwärmende Geschichten. Von Forbidden Desire bis Moonlight Academy - 12+ einzigartige Welten voller Emotionen."
        keywords={['Love Stories', 'Romance', 'Fantasy', 'Digital Fiction', 'Manhwa', 'Interactive Stories']}
      />
      
      <div className="min-h-screen pt-20 pb-20 relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Magical Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500/20 border border-pink-500/30 mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-medium text-pink-300">Digital Storytelling Universe</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200">
                Love Stories
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Tauche ein in Welten voller <span className="text-pink-400">Leidenschaft</span>, 
              <span className="text-purple-400"> Magie</span> und <span className="text-cyan-400">unvergesslicher Momente</span>
            </p>
          </motion.div>

          {/* Smart Story Browser Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Suche nach Geschichten, Charakteren oder Stimmungen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:bg-white/15 transition-all"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all ${
                    showFilters 
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                      : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Genre Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                          <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500/50"
                          >
                            <option value="all" className="text-black">Alle Genres</option>
                            {availableGenres.map(genre => (
                              <option key={genre} value={genre} className="text-black">{genre}</option>
                            ))}
                          </select>
                        </div>

                        {/* Mood Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Stimmung</label>
                          <select
                            value={selectedMood}
                            onChange={(e) => setSelectedMood(e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500/50"
                          >
                            <option value="all" className="text-black">Alle Stimmungen</option>
                            {availableMoods.map(mood => (
                              <option key={mood} value={mood} className="text-black">{mood}</option>
                            ))}
                          </select>
                        </div>

                        {/* Sort Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Sortierung</label>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500/50"
                          >
                            <option value="default" className="text-black">Standard</option>
                            <option value="title" className="text-black">Alphabetisch</option>
                            <option value="length" className="text-black">Nach Länge</option>
                            <option value="newest" className="text-black">Neueste zuerst</option>
                          </select>
                        </div>
                      </div>

                      {/* Active Filters Display */}
                      {(searchTerm || selectedGenre !== 'all' || selectedMood !== 'all' || sortBy !== 'default') && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-gray-400">Aktive Filter:</span>
                            {searchTerm && (
                              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm border border-pink-500/30">
                                "{searchTerm}"
                              </span>
                            )}
                            {selectedGenre !== 'all' && (
                              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                                {selectedGenre}
                              </span>
                            )}
                            {selectedMood !== 'all' && (
                              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                                {selectedMood}
                              </span>
                            )}
                            <button
                              onClick={() => {
                                setSearchTerm('')
                                setSelectedGenre('all')
                                setSelectedMood('all')
                                setSortBy('default')
                              }}
                              className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-500/30 hover:bg-red-500/30 transition-all"
                            >
                              Filter zurücksetzen
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Counter */}
              <div className="text-center mb-8">
                <p className="text-gray-400">
                  {filteredAndSortedStories.length} von {manhwaStories.length} Geschichten
                  {searchTerm && ` für "${searchTerm}"`}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Beautiful Story Cards - Book Cover Style */}
          {filteredAndSortedStories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-white mb-4">Keine Geschichten gefunden</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm 
                  ? `Keine Ergebnisse für "${searchTerm}". Versuche andere Suchbegriffe.`
                  : 'Keine Geschichten entsprechen den gewählten Filtern.'
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedGenre('all')
                  setSelectedMood('all')
                  setSortBy('default')
                }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Filter zurücksetzen
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 lg:gap-10">
              {filteredAndSortedStories.map((story, index) => {
              const mood = storyMoods[story.id as keyof typeof storyMoods] || storyMoods['forbidden-desire']
              
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", damping: 30, stiffness: 200 }}
                  className="group relative preserve-3d"
                >
                  {/* Book Shadow */}
                  <div className="book-shadow" />
                  
                  <Link to={`/reader/${story.id}`} className="block">
                    {/* Book Cover Card with 3D Effect */}
                    <div className={`book-3d story-card-mobile relative h-[380px] xs:h-[420px] sm:h-[460px] lg:h-[480px] rounded-2xl xs:rounded-3xl overflow-hidden border border-white/20 transition-all duration-500 hover:border-white/40 group-hover:shadow-2xl group-hover:shadow-${mood.accentColor}-500/20 touch-action-manipulation`}>
                      
                      {/* Background with Mood */}
                      <div className={`absolute inset-0 ${mood.backgroundPattern}`} />
                      
                      {/* Atmospheric Pattern Overlay */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-20 -translate-y-20" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-16 translate-y-16" />
                      </div>

                      {/* Story Cover Content */}
                      <div className="relative z-10 h-full flex flex-col p-4 xs:p-6 sm:p-8">
                        
                        {/* Top Section - Title & Atmosphere */}
                        <div className="flex-1 flex flex-col justify-center text-center">
                          {/* Magical Emoji */}
                          <ModernIcon 
                            type={story.id.includes('desire') ? 'romance' : 
                                  story.id.includes('academy') ? 'magic' :
                                  story.id.includes('code') ? 'cyberpunk' :
                                  story.id.includes('dream') ? 'fantasy' :
                                  story.id.includes('cat') ? 'comedy' :
                                  story.id.includes('mirror') ? 'supernatural' :
                                  story.id.includes('transfer') ? 'drama' : 'sparkles'}
                            size="lg"
                            className="mb-3 xs:mb-4 sm:mb-6"
                          />
                          
                          {/* Title */}
                          <h3 className={`story-title-mobile text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold mb-2 xs:mb-3 ${mood.textColor} leading-tight`}>
                            {story.title}
                          </h3>
                          
                          {/* Atmosphere Badge */}
                          <div className={`inline-flex items-center px-3 xs:px-4 py-1 xs:py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-3 xs:mb-4`}>
                            <span className={`text-xs xs:text-sm font-medium ${mood.textColor}`}>
                              {mood.atmosphere}
                            </span>
                          </div>
                          
                          {/* Story Info */}
                          <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="flex items-center gap-1 text-xs text-white/70">
                              <Clock className="w-3 h-3" />
                              <span>{getReadingTime(story)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-white/70">
                              {getStoryIcon(story.id)}
                              <span>{story.chapters?.length || 1} Kapitel</span>
                            </div>
                          </div>
                          
                          {/* Emotional Tagline */}
                          <p className={`text-sm xs:text-base lg:text-lg ${mood.textColor} leading-relaxed font-medium mb-4 xs:mb-6 opacity-90`}>
                            {mood.tagline}
                          </p>
                        </div>

                        {/* Bottom Section - Mood & CTA */}
                        <div className="space-y-4">
                          {/* Mood Indicators */}
                          <div className="text-center">
                            <p className={`text-xs xs:text-sm ${mood.textColor} opacity-80 font-medium`}>
                              {mood.mood}
                            </p>
                          </div>
                          
                          {/* Beautiful Read Button */}
                          <motion.div
                            className={`w-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 text-white py-3 xs:py-4 px-4 xs:px-6 rounded-xl xs:rounded-2xl font-semibold text-center transition-all duration-300 hover:from-white/30 hover:to-white/20 hover:border-white/50 flex items-center justify-center gap-2 xs:gap-3 text-sm xs:text-base`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          >
                            <span>Geschichte entdecken</span>
                            <motion.div
                              animate={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <ArrowRight className="w-5 h-5" />
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-${mood.accentColor}-500/0 via-${mood.accentColor}-500/0 to-${mood.accentColor}-500/0 group-hover:from-${mood.accentColor}-500/10 group-hover:via-${mood.accentColor}-500/5 group-hover:to-${mood.accentColor}-500/10 rounded-3xl transition-all duration-500`} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
                )
              })}
            </div>
          )}

          {/* Magical Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 lg:mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4">
                Unendliche Welten warten
              </h2>
              <p className="text-gray-400 text-lg">Jede Geschichte ein neues Abenteuer des Herzens</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { emoji: '💕', title: 'Emotionale Tiefe', desc: 'Geschichten, die dein Herz berühren' },
                { emoji: '✨', title: 'Magische Welten', desc: 'Von Realität bis Fantasy' },
                { emoji: '🌟', title: 'Unvergesslich', desc: 'Charaktere, die bei dir bleiben' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-16 text-center"
          >
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-cyan-500/20 backdrop-blur-xl rounded-3xl border border-white/20">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Bereit für dein nächstes Lieblingsabenteuer?
              </h2>
              <p className="text-gray-300 mb-6">
                Wähle eine Geschichte und lass dich von emotionalen Welten verzaubern
              </p>
              <Link to="/blog">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl font-bold text-lg shadow-2xl shadow-pink-500/25"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(236, 72, 153, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Charaktere kennenlernen ✨
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}