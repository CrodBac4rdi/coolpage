import { useLocalStorage } from './useLocalStorage'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>('crod-babylon-favorites', [])

  const addToFavorites = (storyId: string) => {
    setFavorites(prev => [...prev.filter(id => id !== storyId), storyId])
  }

  const removeFromFavorites = (storyId: string) => {
    setFavorites(prev => prev.filter(id => id !== storyId))
  }

  const toggleFavorite = (storyId: string) => {
    if (favorites.includes(storyId)) {
      removeFromFavorites(storyId)
    } else {
      addToFavorites(storyId)
    }
  }

  const isFavorite = (storyId: string) => favorites.includes(storyId)

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  }
}