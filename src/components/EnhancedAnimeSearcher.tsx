import { useState, useEffect, useCallback } from 'react'
import { Search, Heart, Loader2, Star, Calendar, Filter, X, ChevronDown, Tv2, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'
import { getStreamingPlatforms } from '../utils/streamingData'
import { checkNetflixAvailabilityCached, getNetflixUrl } from '../utils/unogsApi'

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
  streaming?: Array<{
    name: string
    url: string
  }>
  netflixInfo?: {
    available: boolean
    countries: string[]
    netflixId?: string
  }
}

// Streaming platform data (simulated - in production you'd use a real API)
const streamingPlatforms = {
  'Crunchyroll': { color: 'bg-orange-500', icon: '🍊' },
  'Netflix': { color: 'bg-red-600', icon: '📺' },
  'Prime Video': { color: 'bg-blue-600', icon: '🎬' },
  'Hulu': { color: 'bg-green-500', icon: '🟢' },
  'Funimation': { color: 'bg-purple-600', icon: '🟣' }
}

// Common anime genres
const genres = [
  { id: 22, name: 'Romance' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 23, name: 'School' },
  { id: 24, name: 'Sci-Fi' },
  { id: 10, name: 'Fantasy' },
  { id: 1, name: 'Action' },
  { id: 37, name: 'Supernatural' },
  { id: 36, name: 'Slice of Life' },
  { id: 7, name: 'Mystery' }
]

export default function EnhancedAnimeSearcher() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<AnimeResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnime, setSelectedAnime] = useState<AnimeResult | null>(null)
  const [popularAnime, setPopularAnime] = useState<AnimeResult[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([22]) // Romance by default
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Get streaming platform URLs
  const streamingUrls: Record<string, string> = {
    'Crunchyroll': 'https://www.crunchyroll.com',
    'Netflix': 'https://www.netflix.com',
    'Prime Video': 'https://www.primevideo.com',
    'Hulu': 'https://www.hulu.com',
    'Funimation': 'https://www.funimation.com',
    'HIDIVE': 'https://www.hidive.com',
    'HBO Max': 'https://www.hbomax.com'
  }
  
  // Add streaming info to anime results using our database
  const addStreamingInfo = async (anime: AnimeResult[]): Promise<AnimeResult[]> => {
    // Process anime in parallel for better performance
    const promises = anime.map(async (item) => {
      const platforms = getStreamingPlatforms(item.title_english || item.title)
      const streaming = platforms.map(platform => ({
        name: platform,
        url: streamingUrls[platform] || '#'
      }))
      
      // Check Netflix availability via uNoGS API
      let netflixInfo = undefined
      if (process.env.NODE_ENV === 'production' || process.env.VITE_UNOGS_API_KEY) {
        try {
          const netflixData = await checkNetflixAvailabilityCached(item.title_english || item.title)
          if (netflixData.available) {
            netflixInfo = netflixData
            // Update streaming info if Netflix is available
            const hasNetflix = streaming.some(s => s.name === 'Netflix')
            if (!hasNetflix && netflixData.available) {
              streaming.push({
                name: 'Netflix',
                url: getNetflixUrl(netflixData.netflixId)
              })
            }
          }
        } catch (error) {
          console.error('Error checking Netflix for', item.title, error)
        }
      }
      
      return { ...item, streaming, netflixInfo }
    })
    
    return Promise.all(promises)
  }

  const searchAnime = useCallback(async (searchQuery: string, genreIds: number[], pageNum: number = 1) => {
    if (!searchQuery.trim() && genreIds.length === 0) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const genreParam = genreIds.length > 0 ? `&genres=${genreIds.join(',')}` : ''
      const queryParam = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''
      
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?${queryParam}${genreParam}&order_by=score&sort=desc&limit=24&page=${pageNum}&sfw=true`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch results')
      }

      const data = await response.json()
      const animeWithStreaming = await addStreamingInfo(data.data || [])
      
      if (pageNum === 1) {
        setResults(animeWithStreaming)
      } else {
        setResults(prev => [...prev, ...animeWithStreaming])
      }
      
      setHasMore(data.pagination?.has_next_page || false)
    } catch (err) {
      setError('Failed to search. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load popular anime on mount
  useEffect(() => {
    const loadPopularAnime = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          'https://api.jikan.moe/v4/anime?genres=22&order_by=score&sort=desc&limit=24&sfw=true'
        )
        
        if (response.ok) {
          const data = await response.json()
          const animeWithStreaming = await addStreamingInfo(data.data || [])
          setPopularAnime(animeWithStreaming)
        }
      } catch (err) {
        console.error('Failed to load popular anime:', err)
      } finally {
        setLoading(false)
      }
    }
    
    loadPopularAnime()
  }, [])

  // Search when query or genres change
  useEffect(() => {
    setPage(1)
    const timer = setTimeout(() => {
      searchAnime(query, selectedGenres, 1)
    }, 500)

    return () => clearTimeout(timer)
  }, [query, selectedGenres, searchAnime])

  // Toggle genre selection
  const toggleGenre = (genreId: number) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    )
  }

  // Load more
  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    searchAnime(query, selectedGenres, nextPage)
  }

  // Display anime list
  const displayAnime = query || selectedGenres.length > 1 ? results : popularAnime

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
            Anime Discovery Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find your next favorite anime with filters and streaming info
          </p>
          {!process.env.VITE_UNOGS_API_KEY && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              💡 For live Netflix availability, add your uNoGS API key to .env file
            </p>
          )}
        </motion.div>

        {/* Search Bar and Filters */}
        <motion.div 
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anime by title..."
              className={cn(
                "w-full pl-12 pr-32 py-4 rounded-2xl",
                "bg-white dark:bg-gray-800",
                "border-2 border-gray-200 dark:border-gray-700",
                "focus:border-pink-500 dark:focus:border-pink-400",
                "focus:outline-none focus:ring-4 focus:ring-pink-500/20",
                "text-gray-800 dark:text-gray-200",
                "placeholder:text-gray-400",
                "transition-all duration-300"
              )}
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2",
                "px-4 py-2 rounded-lg",
                "bg-purple-500 hover:bg-purple-600",
                "text-white font-medium",
                "flex items-center gap-2",
                "transition-colors"
              )}
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </button>
            {loading && (
              <Loader2 className="absolute right-36 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500 animate-spin" />
            )}
          </div>

          {/* Genre Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Select Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map(genre => (
                      <button
                        key={genre.id}
                        onClick={() => toggleGenre(genre.id)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all",
                          selectedGenres.includes(genre.id)
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        )}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {displayAnime.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {!query && selectedGenres.length === 1 && selectedGenres[0] === 22 && (
                <motion.h2 
                  className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  🔥 Popular Romance Anime
                </motion.h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayAnime.map((anime, index) => (
                  <motion.div
                    key={`${anime.mal_id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
                        loading="lazy"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {anime.title_english || anime.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm mb-2">
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
                      
                      {/* Streaming Platforms */}
                      {anime.streaming && anime.streaming.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {anime.streaming.map((platform, idx) => {
                            const platformInfo = streamingPlatforms[platform.name as keyof typeof streamingPlatforms]
                            const isNetflix = platform.name === 'Netflix'
                            return platformInfo ? (
                              <div
                                key={idx}
                                className={cn(
                                  "px-2 py-1 rounded text-xs text-white font-medium flex items-center gap-1",
                                  platformInfo.color
                                )}
                              >
                                {platform.name}
                                {isNetflix && anime.netflixInfo?.countries && (
                                  <Globe className="w-3 h-3" />
                                )}
                              </div>
                            ) : null
                          })}
                        </div>
                      )}
                    </div>

                    {/* Quick Info Badge */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {anime.genres.slice(0, 2).map((genre, idx) => (
                        <div
                          key={idx}
                          className="bg-pink-500/90 text-white px-3 py-1 rounded-full text-xs"
                        >
                          {genre.name}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && !loading && (query || selectedGenres.length > 1) && (
                <motion.div 
                  className="text-center mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <button
                    onClick={loadMore}
                    className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold transition-colors"
                  >
                    Load More Anime
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && query && displayAnime.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No anime found. Try different filters!</p>
          </motion.div>
        )}
        
        {/* Loading State */}
        {loading && displayAnime.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Loading amazing anime...</p>
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
                className="bg-white dark:bg-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <button
                    onClick={() => setSelectedAnime(null)}
                    className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <img
                      src={selectedAnime.images.jpg.image_url}
                      alt={selectedAnime.title}
                      className="w-full md:w-64 rounded-xl"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedAnime.title_english || selectedAnime.title}
                      </h2>
                      {selectedAnime.title_japanese && (
                        <p className="text-gray-500 mb-4">{selectedAnime.title_japanese}</p>
                      )}
                      
                      {/* Genres */}
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
                      
                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <div>
                          <span className="text-gray-500">Score:</span>
                          <span className="ml-2 font-semibold flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 inline" />
                            {selectedAnime.score || 'N/A'}
                          </span>
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

                      {/* Streaming Platforms */}
                      {selectedAnime.streaming && selectedAnime.streaming.length > 0 && (
                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Available on:</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedAnime.streaming.map((platform, idx) => {
                              const platformInfo = streamingPlatforms[platform.name as keyof typeof streamingPlatforms]
                              const isNetflix = platform.name === 'Netflix'
                              return platformInfo ? (
                                <a
                                  key={idx}
                                  href={platform.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    "px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity",
                                    platformInfo.color
                                  )}
                                >
                                  <Tv2 className="w-4 h-4" />
                                  {platform.name}
                                  {isNetflix && selectedAnime.netflixInfo?.countries && (
                                    <span className="text-xs opacity-90">
                                      ({selectedAnime.netflixInfo.countries.length} regions)
                                    </span>
                                  )}
                                </a>
                              ) : null
                            })}
                          </div>
                          {selectedAnime.netflixInfo?.countries && selectedAnime.netflixInfo.countries.length > 0 && (
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <Globe className="w-4 h-4 inline mr-1" />
                              Netflix available in: {selectedAnime.netflixInfo.countries.slice(0, 5).join(', ')}
                              {selectedAnime.netflixInfo.countries.length > 5 && ` and ${selectedAnime.netflixInfo.countries.length - 5} more regions`}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Synopsis */}
                  {selectedAnime.synopsis && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">Synopsis</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedAnime.synopsis}
                      </p>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={selectedAnime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl text-center transition-colors font-semibold"
                    >
                      View on MyAnimeList
                    </a>
                    <button
                      onClick={() => setSelectedAnime(null)}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-colors font-semibold"
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