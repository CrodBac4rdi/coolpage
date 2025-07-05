import { motion } from 'framer-motion'
import { Sparkles, Heart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ModernStoryCard from '../components/ModernStoryCard'
// Import stories directly from the data directory
import forbiddenDesire from '../data/stories/forbidden-desire.json'
import moonlightAcademy from '../data/stories/moonlight-academy.json'
import codeBreakers from '../data/stories/code-breakers.json'
import dreamCatcher from '../data/stories/dream-catcher.json'
import myBossIsACat from '../data/stories/my-boss-is-a-cat.json'
import shadowInMirror from '../data/stories/shadow-in-the-mirror.json'
import transferStudent from '../data/stories/the-transfer-student.json'
import betweenTheLines from '../data/stories/between-the-lines.json'
import cafeEncounters from '../data/stories/cafe-encounters.json'
import dangerousAttraction from '../data/stories/dangerous-attraction.json'
import midnightConfessions from '../data/stories/midnight-confessions.json'
import summerTemptation from '../data/stories/summer-temptation.json'

// Convert story data to display format
const convertStoryToDisplay = (story: any) => ({
  id: story.id,
  title: story.title,
  genre: story.genre || ['Romance'],
  emoji: story.coverEmoji || '📚',
  chapters: story.chapters?.length || 0,
  mature: story.mature || false
})

export default function StoryFocusedHome() {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Load stories
  useEffect(() => {
    const loadStoriesData = () => {
      setLoading(true)
      try {
        const allStories = [
          forbiddenDesire,
          moonlightAcademy,
          codeBreakers,
          dreamCatcher,
          myBossIsACat,
          shadowInMirror,
          transferStudent,
          betweenTheLines,
          cafeEncounters,
          dangerousAttraction,
          midnightConfessions,
          summerTemptation
        ]
        const displayStories = allStories.map(convertStoryToDisplay)
        setStories(displayStories)
      } catch (error) {
        console.error('Failed to load stories:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadStoriesData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px),
              linear-gradient(rgba(147, 51, 234, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {stories.map((story, index) => (
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