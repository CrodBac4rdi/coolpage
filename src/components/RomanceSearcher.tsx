import { useState, useEffect, useCallback } from 'react'
import { Search, Heart, Loader2, Star, Calendar, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

interface AnimeResult {
  mal_id: number
  url: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  title: string
  title_english: string | null
  title_japanese: string | null
  type: string
  episodes: number | null
  status: string
  aired: {
    from: string
    to: string | null
  }
  score: number | null
  scored_by: number | null
  rank: number | null
  popularity: number | null
  synopsis: string | null
  genres: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
}

export default function RomanceSearcher() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<AnimeResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnime, setSelectedAnime] = useState<AnimeResult | null>(null)
  const [popularAnime, setPopularAnime] = useState<AnimeResult[]>([])

  const searchAnime = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Jikan API v4 - search for romance anime
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery)}&genres=22&order_by=score&sort=desc&limit=10`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch results')
      }

      const data = await response.json()
      setResults(data.data || [])
    } catch (err) {
      setError('Failed to search. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load popular romance anime on mount
  useEffect(() => {
    const loadPopularAnime = async () => {
      setLoading(true)
      try {
        // Get top romance anime
        const response = await fetch(
          'https://api.jikan.moe/v4/anime?genres=22&order_by=score&sort=desc&limit=12&sfw=true'
        )
        
        if (response.ok) {
          const data = await response.json()
          setPopularAnime(data.data || [])
        }
      } catch (err) {
        console.error('Failed to load popular anime:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadPopularAnime()
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchAnime(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, searchAnime])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Romance Anime Searcher
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find your next favorite romance anime with real-time search
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="relative max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for romance anime..."
              className={cn(
                "w-full pl-12 pr-4 py-4 rounded-2xl",
                "bg-white dark:bg-gray-800",
                "border-2 border-gray-200 dark:border-gray-700",
                "focus:border-pink-500 dark:focus:border-pink-400",
                "focus:outline-none focus:ring-4 focus:ring-pink-500/20",
                "text-gray-800 dark:text-gray-200",
                "placeholder:text-gray-400",
                "transition-all duration-300"
              )}
            />
            {loading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500 animate-spin" />
            )}
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            className="text-center text-red-500 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Results or Popular Anime Grid */}
        <AnimatePresence mode="wait">
          {(query ? results : popularAnime).length > 0 && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence>
                {!query && (
                  <motion.h2 
                    className="col-span-full text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    🔥 Popular Romance Anime
                  </motion.h2>
                )}
              </AnimatePresence>
              {(query ? results : popularAnime).map((anime, index) => (
                <motion.div
                  key={anime.mal_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl",
                    "bg-white dark:bg-gray-800",
                    "shadow-lg hover:shadow-2xl",
                    "transition-all duration-300 transform hover:scale-105",
                    "cursor-pointer"
                  )}
                  onClick={() => setSelectedAnime(anime)}
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {anime.title_english || anime.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      {anime.score && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{anime.score.toFixed(1)}</span>
                        </div>
                      )}
                      {anime.episodes && (
                        <span>{anime.episodes} eps</span>
                      )}
                      <span className="text-pink-400">{anime.status}</span>
                    </div>
                  </div>

                  {/* Quick Info Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-pink-500/90 text-white px-3 py-1 rounded-full text-sm">
                      Romance
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && query && results.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No romance anime found. Try another search!</p>
          </motion.div>
        )}
        
        {/* Loading State for Initial Load */}
        {loading && popularAnime.length === 0 && !query && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Loading popular romance anime...</p>
          </motion.div>
        )}

        {/* Selected Anime Modal */}
        <AnimatePresence>
          {selectedAnime && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnime(null)}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex gap-6 mb-4">
                    <img
                      src={selectedAnime.images.jpg.image_url}
                      alt={selectedAnime.title}
                      className="w-48 rounded-xl"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedAnime.title_english || selectedAnime.title}
                      </h2>
                      {selectedAnime.title_japanese && (
                        <p className="text-gray-500 mb-4">{selectedAnime.title_japanese}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedAnime.genres.map((genre) => (
                          <span
                            key={genre.mal_id}
                            className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Score:</span>
                          <span className="ml-2 font-semibold">{selectedAnime.score || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Episodes:</span>
                          <span className="ml-2 font-semibold">{selectedAnime.episodes || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span className="ml-2 font-semibold">{selectedAnime.status}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <span className="ml-2 font-semibold">{selectedAnime.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedAnime.synopsis && (
                    <div>
                      <h3 className="font-semibold mb-2">Synopsis</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedAnime.synopsis}
                      </p>
                    </div>
                  )}
                  <div className="mt-6 flex gap-3">
                    <a
                      href={selectedAnime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl text-center transition-colors"
                    >
                      View on MyAnimeList
                    </a>
                    <button
                      onClick={() => setSelectedAnime(null)}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}