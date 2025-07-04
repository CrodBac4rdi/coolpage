import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronRight, Book, Clock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { loadStories } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'
import { useMemo, useState } from 'react'

export default function ModernManhwaList() {
  const manhwaStories = loadStories()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  
  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set<string>()
    manhwaStories.forEach(story => {
      story.genre?.forEach(g => genreSet.add(g))
    })
    return Array.from(genreSet)
  }, [manhwaStories])

  // Filter stories
  const filteredStories = useMemo(() => {
    let filtered = manhwaStories

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(story =>
        story.genre?.includes(selectedGenre)
      )
    }

    return filtered
  }, [manhwaStories, searchTerm, selectedGenre])

  return (
    <>
      <SEOHead 
        title="Stories - Crod Babylon"
        description="Explore our collection of captivating stories and manhwa"
      />
      
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Story Collection
            </h1>
            <p className="text-xl text-secondary">
              Dive into worlds of romance, mystery, and adventure
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-tertiary" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-12"
                />
              </div>
              
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-secondary"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {selectedGenre !== 'all' && (
                  <span className="badge ml-2">1</span>
                )}
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
                  <div className="card p-6 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-secondary mb-3">Genre</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedGenre('all')}
                          className={`badge ${selectedGenre === 'all' ? 'bg-accent-purple text-white border-accent-purple' : ''}`}
                        >
                          All
                        </button>
                        {genres.map(genre => (
                          <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`badge ${selectedGenre === genre ? 'bg-accent-purple text-white border-accent-purple' : ''}`}
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Count */}
          <motion.p 
            className="text-sm text-tertiary mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
          </motion.p>

          {/* Story Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/reader/${story.id}`}>
                  <div className="card h-full flex flex-col hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    {/* Cover */}
                    <div className="relative h-48 -m-6 mb-6 overflow-hidden rounded-t-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">{story.coverEmoji || '📚'}</span>
                      </div>
                      
                      {/* Mature Badge */}
                      {story.mature && (
                        <div className="absolute top-4 right-4 badge bg-red-500 text-white border-red-500">
                          18+
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-purple transition-colors">
                        {story.title}
                      </h3>
                      
                      <p className="text-secondary text-sm mb-4 line-clamp-2">
                        {story.description}
                      </p>

                      {/* Meta Info */}
                      <div className="mt-auto space-y-3">
                        {/* Author */}
                        <p className="text-sm text-tertiary">
                          by {story.author}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-tertiary">
                          <div className="flex items-center gap-1">
                            <Book className="w-4 h-4" />
                            <span>{story.chapters?.length || 0} chapters</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>~{Math.round((story.chapters?.length || 0) * 10)} min</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {story.genre?.slice(0, 3).map(genre => (
                            <span key={genre} className="badge text-xs">
                              {genre}
                            </span>
                          ))}
                        </div>

                        {/* Read Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                          <span className="text-sm font-medium text-accent-purple group-hover:text-accent-purple-muted transition-colors">
                            Read Story
                          </span>
                          <ChevronRight className="w-5 h-5 text-accent-purple group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredStories.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Sparkles className="w-16 h-16 text-tertiary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No stories found</h3>
              <p className="text-secondary mb-4">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedGenre('all')
                }}
                className="btn btn-secondary"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}