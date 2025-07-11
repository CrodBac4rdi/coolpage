import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Quote, RefreshCw, Heart } from 'lucide-react'
import { cn } from '../utils/cn'

interface AnimeQuote {
  anime: string
  character: string
  quote: string
}

export default function AnimeQuotes() {
  const [currentQuote, setCurrentQuote] = useState<AnimeQuote | null>(null)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<AnimeQuote[]>([])
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('crod-favorite-quotes')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
    fetchQuote()
  }, [])

  const fetchQuote = async () => {
    setLoading(true)
    try {
      // Using AnimeChan API (free, no auth required)
      const response = await fetch('https://animechan.xyz/api/random')
      if (response.ok) {
        const data = await response.json()
        setCurrentQuote(data)
      } else {
        // Fallback quotes if API fails
        const fallbackQuotes: AnimeQuote[] = [
          {
            anime: "Naruto",
            character: "Naruto Uzumaki",
            quote: "Ich gebe niemals auf! Das ist mein Ninja-Weg!"
          },
          {
            anime: "Attack on Titan",
            character: "Eren Yeager",
            quote: "Wenn du gewinnst, lebst du. Wenn du verlierst, stirbst du. Wenn du nicht kämpfst, kannst du nicht gewinnen!"
          },
          {
            anime: "One Piece",
            character: "Monkey D. Luffy",
            quote: "Ich werde König der Piraten!"
          }
        ]
        setCurrentQuote(fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)])
      }
    } catch (error) {
      // Use fallback quotes on error
      const fallbackQuotes: AnimeQuote[] = [
        {
          anime: "My Hero Academia",
          character: "All Might",
          quote: "Es ist in Ordnung! Warum? Weil ich hier bin!"
        },
        {
          anime: "Demon Slayer",
          character: "Tanjiro Kamado",
          quote: "Die Bindung zwischen Nezuko und mir kann niemand trennen!"
        }
      ]
      setCurrentQuote(fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)])
    }
    setLoading(false)
  }

  const toggleFavorite = () => {
    if (!currentQuote) return
    
    const isFavorite = favorites.some(
      fav => fav.quote === currentQuote.quote && fav.character === currentQuote.character
    )
    
    let newFavorites
    if (isFavorite) {
      newFavorites = favorites.filter(
        fav => !(fav.quote === currentQuote.quote && fav.character === currentQuote.character)
      )
    } else {
      newFavorites = [...favorites, currentQuote]
    }
    
    setFavorites(newFavorites)
    localStorage.setItem('crod-favorite-quotes', JSON.stringify(newFavorites))
  }

  const isFavorite = currentQuote && favorites.some(
    fav => fav.quote === currentQuote.quote && fav.character === currentQuote.character
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-6 backdrop-blur-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Quote className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Anime Wisdom</h3>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFavorites(!showFavorites)}
            className="text-white/60 hover:text-white transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={fetchQuote}
            disabled={loading}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Quote Display */}
      <AnimatePresence mode="wait">
        {showFavorites ? (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 max-h-96 overflow-y-auto"
          >
            {favorites.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Noch keine Favoriten gespeichert</p>
            ) : (
              favorites.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-2 border-purple-500/50 pl-4 py-2"
                >
                  <p className="text-white/90 text-sm italic mb-2">"{quote.quote}"</p>
                  <p className="text-gray-400 text-xs">
                    — {quote.character}, <span className="text-purple-400">{quote.anime}</span>
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8"
          >
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-white/10 rounded w-full" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
              <div className="h-3 bg-white/5 rounded w-1/2 mt-4" />
            </div>
          </motion.div>
        ) : currentQuote ? (
          <motion.div
            key={currentQuote.quote}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            {/* Quote mark decoration */}
            <div className="absolute -top-2 -left-2 text-6xl text-purple-500/20 font-serif">"</div>
            
            {/* Quote content */}
            <div className="relative z-10 space-y-4">
              <p className="text-white text-lg leading-relaxed italic">
                {currentQuote.quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    — {currentQuote.character}
                  </p>
                  <p className="text-purple-400 text-xs mt-1">
                    {currentQuote.anime}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFavorite}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Heart className={cn('w-5 h-5', isFavorite ? 'fill-pink-500 text-pink-500' : '')} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}