import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2, Eye, CheckCircle, Clock, XCircle, BarChart3, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'
import { 
  getWatchlist, 
  getFavorites, 
  removeFromWatchlist, 
  updateWatchlistItem, 
  toggleFavorite,
  getWatchStats,
  setRating,
  getRating
} from '../utils/localStorage'
import type { WatchlistItem } from '../utils/localStorage'

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'watching' | 'completed' | 'plan_to_watch' | 'dropped'>('all')
  const [stats, setStats] = useState(getWatchStats())

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setWatchlist(getWatchlist())
    setFavorites(getFavorites())
    setStats(getWatchStats())
  }

  const handleRemove = (mal_id: number) => {
    removeFromWatchlist(mal_id)
    loadData()
  }

  const handleStatusChange = (mal_id: number, status: WatchlistItem['status']) => {
    updateWatchlistItem(mal_id, { status })
    loadData()
  }

  const handleEpisodeUpdate = (mal_id: number, episodes: number) => {
    updateWatchlistItem(mal_id, { episodes_watched: episodes })
    loadData()
  }

  const handleRating = (mal_id: number, rating: number) => {
    setRating(mal_id, rating)
    updateWatchlistItem(mal_id, { user_rating: rating })
    loadData()
  }

  const handleToggleFavorite = (mal_id: number) => {
    toggleFavorite(mal_id)
    loadData()
  }

  const filteredWatchlist = activeTab === 'all' 
    ? watchlist 
    : watchlist.filter(item => item.status === activeTab)

  const statusIcons = {
    watching: <Eye className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
    plan_to_watch: <Clock className="w-4 h-4" />,
    dropped: <XCircle className="w-4 h-4" />
  }

  const statusColors = {
    watching: 'text-blue-500',
    completed: 'text-green-500',
    plan_to_watch: 'text-yellow-500',
    dropped: 'text-red-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
              My Anime Watchlist
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your anime journey
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{stats.totalAnime}</div>
              <div className="text-sm text-gray-500">Total Anime</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{stats.watching}</div>
              <div className="text-sm text-gray-500">Watching</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{stats.completed}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{stats.planToWatch}</div>
              <div className="text-sm text-gray-500">Plan to Watch</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
              <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{stats.dropped}</div>
              <div className="text-sm text-gray-500">Dropped</div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['all', 'watching', 'completed', 'plan_to_watch', 'dropped'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all",
                  activeTab === tab
                    ? "bg-purple-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                {tab === 'all' ? 'All' : tab.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>

          {/* Watchlist Grid */}
          <AnimatePresence mode="wait">
            {filteredWatchlist.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredWatchlist.map((anime, index) => (
                  <motion.div
                    key={anime.mal_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={anime.image_url}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Actions Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          {/* Status Selector */}
                          <select
                            value={anime.status}
                            onChange={(e) => handleStatusChange(anime.mal_id, e.target.value as WatchlistItem['status'])}
                            className="w-full mb-3 px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/30"
                          >
                            <option value="watching" className="text-gray-900">Watching</option>
                            <option value="completed" className="text-gray-900">Completed</option>
                            <option value="plan_to_watch" className="text-gray-900">Plan to Watch</option>
                            <option value="dropped" className="text-gray-900">Dropped</option>
                          </select>

                          {/* Episode Progress */}
                          {anime.status === 'watching' && anime.total_episodes && (
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-white mb-1">
                                <span>Episode Progress</span>
                                <span>{anime.episodes_watched || 0} / {anime.total_episodes}</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max={anime.total_episodes}
                                value={anime.episodes_watched || 0}
                                onChange={(e) => handleEpisodeUpdate(anime.mal_id, parseInt(e.target.value))}
                                className="w-full"
                              />
                            </div>
                          )}

                          {/* Rating */}
                          <div className="flex justify-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => handleRating(anime.mal_id, star)}
                                className="text-yellow-400 hover:scale-110 transition-transform"
                              >
                                <Star 
                                  className={cn(
                                    "w-5 h-5",
                                    (anime.user_rating || 0) >= star && "fill-current"
                                  )} 
                                />
                              </button>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggleFavorite(anime.mal_id)}
                              className={cn(
                                "flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-2",
                                favorites.includes(anime.mal_id)
                                  ? "bg-red-500 text-white"
                                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-red-500"
                              )}
                            >
                              <Heart className={cn("w-4 h-4", favorites.includes(anime.mal_id) && "fill-current")} />
                              {favorites.includes(anime.mal_id) ? 'Favorited' : 'Favorite'}
                            </button>
                            <button
                              onClick={() => handleRemove(anime.mal_id)}
                              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={cn(
                        "absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1",
                        "bg-white/90 backdrop-blur-sm",
                        statusColors[anime.status]
                      )}>
                        {statusIcons[anime.status]}
                        <span>{anime.status.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">
                        {anime.title_english || anime.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Added {new Date(anime.added_date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">
                  {activeTab === 'all' 
                    ? "Your watchlist is empty. Start adding anime!" 
                    : `No anime in ${activeTab.split('_').join(' ')} status.`}
                </p>
                <Link 
                  to="/romance-search" 
                  className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
                >
                  Discover Anime
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  )
}