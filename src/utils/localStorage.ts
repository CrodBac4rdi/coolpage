// Local Storage utilities for anime tracking

export interface WatchlistItem {
  mal_id: number
  title: string
  title_english: string | null
  image_url: string
  added_date: string
  status: 'watching' | 'completed' | 'plan_to_watch' | 'dropped'
  episodes_watched?: number
  total_episodes?: number | null
  user_rating?: number
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  defaultGenres: number[]
  hideCompleted: boolean
  viewMode: 'grid' | 'list'
}

const STORAGE_KEYS = {
  WATCHLIST: 'anime_watchlist',
  FAVORITES: 'anime_favorites',
  HISTORY: 'anime_history',
  PREFERENCES: 'user_preferences',
  RATINGS: 'anime_ratings'
}

// Watchlist functions
export function getWatchlist(): WatchlistItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.WATCHLIST)
  return data ? JSON.parse(data) : []
}

export function addToWatchlist(anime: Omit<WatchlistItem, 'added_date'>): void {
  const watchlist = getWatchlist()
  const exists = watchlist.some(item => item.mal_id === anime.mal_id)
  
  if (!exists) {
    watchlist.push({
      ...anime,
      added_date: new Date().toISOString()
    })
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist))
  }
}

export function removeFromWatchlist(mal_id: number): void {
  const watchlist = getWatchlist()
  const filtered = watchlist.filter(item => item.mal_id !== mal_id)
  localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(filtered))
}

export function updateWatchlistItem(mal_id: number, updates: Partial<WatchlistItem>): void {
  const watchlist = getWatchlist()
  const index = watchlist.findIndex(item => item.mal_id === mal_id)
  
  if (index !== -1) {
    watchlist[index] = { ...watchlist[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist))
  }
}

export function isInWatchlist(mal_id: number): boolean {
  const watchlist = getWatchlist()
  return watchlist.some(item => item.mal_id === mal_id)
}

// Favorites functions
export function getFavorites(): number[] {
  const data = localStorage.getItem(STORAGE_KEYS.FAVORITES)
  return data ? JSON.parse(data) : []
}

export function toggleFavorite(mal_id: number): boolean {
  const favorites = getFavorites()
  const index = favorites.indexOf(mal_id)
  
  if (index === -1) {
    favorites.push(mal_id)
  } else {
    favorites.splice(index, 1)
  }
  
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  return index === -1 // returns true if added, false if removed
}

export function isFavorite(mal_id: number): boolean {
  const favorites = getFavorites()
  return favorites.includes(mal_id)
}

// History functions
export interface HistoryItem {
  mal_id: number
  title: string
  viewed_at: string
  episode?: number
}

export function addToHistory(item: Omit<HistoryItem, 'viewed_at'>): void {
  const history = getHistory()
  history.unshift({
    ...item,
    viewed_at: new Date().toISOString()
  })
  
  // Keep only last 50 items
  if (history.length > 50) {
    history.pop()
  }
  
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history))
}

export function getHistory(): HistoryItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY)
  return data ? JSON.parse(data) : []
}

// User preferences
export function getPreferences(): UserPreferences {
  const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES)
  return data ? JSON.parse(data) : {
    theme: 'auto',
    defaultGenres: [22], // Romance by default
    hideCompleted: false,
    viewMode: 'grid'
  }
}

export function updatePreferences(updates: Partial<UserPreferences>): void {
  const current = getPreferences()
  const updated = { ...current, ...updates }
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated))
}

// Ratings
export function getRatings(): Record<number, number> {
  const data = localStorage.getItem(STORAGE_KEYS.RATINGS)
  return data ? JSON.parse(data) : {}
}

export function setRating(mal_id: number, rating: number): void {
  const ratings = getRatings()
  ratings[mal_id] = rating
  localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings))
}

export function getRating(mal_id: number): number | null {
  const ratings = getRatings()
  return ratings[mal_id] || null
}

// Stats functions
export function getWatchStats() {
  const watchlist = getWatchlist()
  const totalAnime = watchlist.length
  const watching = watchlist.filter(item => item.status === 'watching').length
  const completed = watchlist.filter(item => item.status === 'completed').length
  const planToWatch = watchlist.filter(item => item.status === 'plan_to_watch').length
  const dropped = watchlist.filter(item => item.status === 'dropped').length
  
  const totalEpisodes = watchlist.reduce((sum, item) => {
    if (item.status === 'completed' && item.total_episodes) {
      return sum + item.total_episodes
    }
    return sum + (item.episodes_watched || 0)
  }, 0)
  
  return {
    totalAnime,
    watching,
    completed,
    planToWatch,
    dropped,
    totalEpisodes
  }
}

// Clear all data
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key)
  })
}