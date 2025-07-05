import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, RefreshCw, TrendingUp, Users, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReadingList } from '../hooks/useReadingList'
import { useFavorites } from '../hooks/useFavorites'

interface StoryRecommendation {
  id: string
  title: string
  reason: string
  matchScore: number
  genre: string[]
  emoji: string
}

export default function StoryRecommendations() {
  const { readingList } = useReadingList()
  const { favorites } = useFavorites()
  const [recommendations, setRecommendations] = useState<StoryRecommendation[]>([])
  const [loading, setLoading] = useState(false)

  // Mock story database for recommendations
  const allStories = [
    { id: 'forbidden-desire', title: 'Forbidden Desire', genre: ['Romance', 'Drama'], emoji: '🔥' },
    { id: 'moonlight-academy', title: 'Moonlight Academy', genre: ['Fantasy', 'Romance'], emoji: '🌙' },
    { id: 'code-breakers', title: 'Code Breakers', genre: ['Cyberpunk', 'Thriller'], emoji: '💻' },
    { id: 'dream-catcher', title: 'Dream Catcher', genre: ['Fantasy', 'Mystery'], emoji: '✨' },
    { id: 'my-boss-is-a-cat', title: 'My Boss is a Cat', genre: ['Slice of Life', 'Romance'], emoji: '🐱' },
    { id: 'shadow-in-the-mirror', title: 'Shadow in the Mirror', genre: ['Mystery', 'Thriller'], emoji: '🪞' },
    { id: 'the-transfer-student', title: 'The Transfer Student', genre: ['Romance', 'Drama'], emoji: '📚' },
    { id: 'between-the-lines', title: 'Between the Lines', genre: ['Romance', 'Drama'], emoji: '📖' },
    { id: 'cafe-encounters', title: 'Cafe Encounters', genre: ['Slice of Life', 'Romance'], emoji: '☕' },
    { id: 'dangerous-attraction', title: 'Dangerous Attraction', genre: ['Thriller', 'Romance'], emoji: '⚡' },
    { id: 'midnight-confessions', title: 'Midnight Confessions', genre: ['Romance', 'Mystery'], emoji: '🌃' },
    { id: 'summer-temptation', title: 'Summer Temptation', genre: ['Romance', 'Drama'], emoji: '🌺' }
  ]

  const generateRecommendations = () => {
    setLoading(true)
    
    // Get genres from reading list and favorites
    const readGenres = new Map<string, number>()
    const readStoryIds = new Set<string>()
    
    // Process reading list
    readingList.forEach(item => {
      readStoryIds.add(item.storyId)
      const story = allStories.find(s => s.id === item.storyId)
      if (story) {
        story.genre.forEach(g => {
          readGenres.set(g, (readGenres.get(g) || 0) + 1)
        })
      }
    })

    // Process favorites
    favorites.forEach(storyId => {
      readStoryIds.add(storyId)
      const story = allStories.find(s => s.id === storyId)
      if (story) {
        story.genre.forEach(g => {
          readGenres.set(g, (readGenres.get(g) || 0) + 1)
        })
      }
    })

    // Generate recommendations based on genre preferences
    const recommendations: StoryRecommendation[] = []
    const reasons = [
      'Basierend auf deinen Favoriten',
      'Ähnlich zu Stories die du magst',
      'Trending in deinem Lieblingsgenre',
      'Von anderen Lesern empfohlen',
      'Perfekt für deinen Geschmack'
    ]

    allStories.forEach(story => {
      if (!readStoryIds.has(story.id)) {
        let matchScore = 0
        story.genre.forEach(g => {
          matchScore += readGenres.get(g) || 0
        })
        
        if (matchScore > 0 || Math.random() > 0.5) {
          recommendations.push({
            ...story,
            reason: reasons[Math.floor(Math.random() * reasons.length)],
            matchScore: matchScore || Math.random() * 50 + 50
          })
        }
      }
    })

    // Sort by match score and take top 5
    recommendations.sort((a, b) => b.matchScore - a.matchScore)
    setRecommendations(recommendations.slice(0, 5))
    
    setTimeout(() => setLoading(false), 500)
  }

  useEffect(() => {
    generateRecommendations()
  }, [readingList, favorites])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-6 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Für dich empfohlen</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={generateRecommendations}
          disabled={loading}
          className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Lies ein paar Stories, damit wir dir Empfehlungen geben können!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/reader/${rec.id}`}>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {rec.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                      {rec.title}
                    </h4>
                    <p className="text-gray-400 text-sm mt-1">{rec.reason}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <TrendingUp className="w-3 h-3" />
                        <span>{Math.round(rec.matchScore)}% Match</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{Math.floor(Math.random() * 900 + 100)} Leser</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-purple-400" />
          <p className="text-sm text-gray-300">
            Je mehr du liest, desto besser werden unsere Empfehlungen!
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}