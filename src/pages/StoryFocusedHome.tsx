import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, ArrowLeft, Filter, Search, TrendingUp, Clock, Star, Grid, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ModernStoryCard from '../components/ModernStoryCard'
import { cn } from '../utils/cn'
// Story metadata for initial display
const storyMetadata = [
  { id: 'forbidden-desire', title: 'Forbidden Desire', genre: ['Romance', 'Drama'], emoji: '🔥', chapters: 45, mature: true },
  { id: 'moonlight-academy', title: 'Moonlight Academy', genre: ['Fantasy', 'Romance'], emoji: '🌙', chapters: 52, mature: false },
  { id: 'code-breakers', title: 'Code Breakers', genre: ['Cyberpunk', 'Thriller'], emoji: '💻', chapters: 38, mature: false },
  { id: 'dream-catcher', title: 'Dream Catcher', genre: ['Fantasy', 'Mystery'], emoji: '✨', chapters: 41, mature: false },
  { id: 'my-boss-is-a-cat', title: 'My Boss is a Cat', genre: ['Slice of Life', 'Romance'], emoji: '🐱', chapters: 67, mature: false },
  { id: 'shadow-in-the-mirror', title: 'Shadow in the Mirror', genre: ['Mystery', 'Thriller'], emoji: '🪞', chapters: 48, mature: true },
  { id: 'the-transfer-student', title: 'The Transfer Student', genre: ['Romance', 'Drama'], emoji: '📚', chapters: 35, mature: false },
  { id: 'between-the-lines', title: 'Between the Lines', genre: ['Romance', 'Drama'], emoji: '📖', chapters: 42, mature: false },
  { id: 'cafe-encounters', title: 'Cafe Encounters', genre: ['Slice of Life', 'Romance'], emoji: '☕', chapters: 55, mature: false },
  { id: 'dangerous-attraction', title: 'Dangerous Attraction', genre: ['Thriller', 'Romance'], emoji: '⚡', chapters: 49, mature: true },
  { id: 'midnight-confessions', title: 'Midnight Confessions', genre: ['Romance', 'Mystery'], emoji: '🌃', chapters: 39, mature: true },
  { id: 'summer-temptation', title: 'Summer Temptation', genre: ['Romance', 'Drama'], emoji: '🌺', chapters: 44, mature: true }
]


export default function StoryFocusedHome() {
  const [stories, setStories] = useState<any[]>([])
  const [filteredStories, setFilteredStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState<'title' | 'rating' | 'newest'>('title')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const genres = ['all', 'Romance', 'Fantasy', 'Mystery', 'Drama', 'Slice of Life', 'Cyberpunk']

  // Load stories metadata
  useEffect(() => {
    setStories(storyMetadata)
    setFilteredStories(storyMetadata)
    setLoading(false)
  }, [])
  
  // Filter and sort logic
  useEffect(() => {
    let filtered = [...stories]
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(story => 
        story.genre.includes(selectedGenre)
      )
    }
    
    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'rating':
          // Mock ratings
          return (Math.random() * 0.5 + 4.5) - (Math.random() * 0.5 + 4.5)
        case 'newest':
          return b.id.localeCompare(a.id)
        default:
          return 0
      }
    })
    
    setFilteredStories(filtered)
  }, [searchTerm, selectedGenre, sortBy, stories])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black">
      {/* Static background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px)
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
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/" className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xl font-bold">Crod Babylon</span>
          </Link>
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Story suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
              
              {/* Filter Controls */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn('px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-2',
                    showFilters 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  )}
                >
                  <Filter className="w-5 h-5" />
                  <span className="hidden sm:inline">Filter</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                >
                  {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>
            
            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Genre Filter */}
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Genre</label>
                      <div className="flex flex-wrap gap-2">
                        {genres.map(genre => (
                          <motion.button
                            key={genre}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedGenre(genre)}
                            className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                              selectedGenre === genre
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            )}
                          >
                            {genre === 'all' ? 'Alle' : genre}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sort Options */}
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Sortierung</label>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSortBy('title')}
                          className={cn('flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors',
                            sortBy === 'title'
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          )}
                        >
                          <span>A-Z</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSortBy('rating')}
                          className={cn('flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors',
                            sortBy === 'rating'
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          )}
                        >
                          <Star className="w-3 h-3" />
                          <span>Bewertung</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSortBy('newest')}
                          className={cn('flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors',
                            sortBy === 'newest'
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          )}
                        >
                          <Clock className="w-3 h-3" />
                          <span>Neueste</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              {filteredStories.length} {filteredStories.length === 1 ? 'Story' : 'Stories'} gefunden
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-5 h-5 text-pink-400" />
            <span className="text-sm font-medium text-gray-300">Story Collection</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Stories</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tauche ein in fesselnde Welten voller Romantik, Fantasy und Abenteuer. 
            12 einzigartige Geschichten warten darauf, entdeckt zu werden.
          </p>
        </motion.div>

        {/* Stories Grid */}
        {loading ? (
          <div className="text-center py-16">
            <motion.div
              className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-300 text-lg">Loading stories...</p>
          </div>
        ) : (
          <div className={cn(
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-4',
            'max-w-7xl mx-auto'
          )}>
            {filteredStories.map((story, index) => (
              <ModernStoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                genre={story.genre}
                emoji={story.emoji}
                mature={story.mature}
                delay={index * 0.1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}