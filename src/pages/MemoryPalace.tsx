import { motion } from 'framer-motion'
import { Brain, Sparkles, Book, Heart, Bookmark, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { loadStories } from '../utils/storyLoader'
import StoryMemoryPalace from '../components/StoryMemoryPalace'
import SEOHead from '../components/SEOHead'

interface MemoryStats {
  totalMemories: number
  favoriteStory: string
  mostBookmarked: string
  recentMemory: string
}

export default function MemoryPalace() {
  const [memories, setMemories] = useState<any[]>([])
  const [stats, setStats] = useState<MemoryStats>({
    totalMemories: 0,
    favoriteStory: '',
    mostBookmarked: '',
    recentMemory: ''
  })
  const stories = loadStories()

  useEffect(() => {
    // Load all memory types from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    const favorites = JSON.parse(localStorage.getItem('favorite-chapters') || '[]')
    const quotes = JSON.parse(localStorage.getItem('saved-quotes') || '[]')
    const moments = JSON.parse(localStorage.getItem('special-moments') || '[]')
    
    // Convert to memory objects
    const allMemories: any[] = []
    
    // Process bookmarks
    bookmarks.forEach((bookmark: any) => {
      allMemories.push({
        id: `bookmark-${bookmark.storyId}-${bookmark.chapterId}`,
        type: 'bookmark',
        storyId: bookmark.storyId,
        chapterId: bookmark.chapterId,
        content: bookmark.preview || 'Lesezeichen gesetzt',
        timestamp: bookmark.timestamp || Date.now(),
        icon: '🔖'
      })
    })
    
    // Process favorites
    favorites.forEach((fav: any) => {
      allMemories.push({
        id: `favorite-${fav.storyId}-${fav.chapterId}`,
        type: 'favorite',
        storyId: fav.storyId,
        chapterId: fav.chapterId,
        content: fav.reason || 'Als Favorit markiert',
        timestamp: fav.timestamp || Date.now(),
        icon: '💕'
      })
    })
    
    // Process quotes
    quotes.forEach((quote: any, index: number) => {
      allMemories.push({
        id: `quote-${index}`,
        type: 'quote',
        storyId: quote.storyId,
        chapterId: quote.chapterId || 0,
        content: quote.text,
        timestamp: quote.timestamp || Date.now(),
        icon: '💬'
      })
    })
    
    // Process special moments
    moments.forEach((moment: any, index: number) => {
      allMemories.push({
        id: `moment-${index}`,
        type: 'moment',
        storyId: moment.storyId,
        chapterId: moment.chapterId || 0,
        content: moment.description,
        timestamp: moment.timestamp || Date.now(),
        icon: '✨'
      })
    })
    
    // Sort by timestamp
    allMemories.sort((a, b) => b.timestamp - a.timestamp)
    
    setMemories(allMemories)
    
    // Calculate stats
    if (allMemories.length > 0) {
      // Count memories per story
      const storyCounts: Record<string, number> = {}
      allMemories.forEach(memory => {
        storyCounts[memory.storyId] = (storyCounts[memory.storyId] || 0) + 1
      })
      
      const favoriteStoryId = Object.entries(storyCounts).sort(([,a], [,b]) => b - a)[0]?.[0]
      const favoriteStory = stories.find(s => s.id === favoriteStoryId)?.title || 'Keine'
      
      setStats({
        totalMemories: allMemories.length,
        favoriteStory,
        mostBookmarked: bookmarks.length > 0 ? 'Aktiv' : 'Noch keine',
        recentMemory: allMemories[0]?.content.substring(0, 50) + '...' || 'Keine'
      })
    }
    
    // Save to localStorage
    localStorage.setItem('story-memories', JSON.stringify(allMemories))
  }, [stories])

  const handleMemoryClick = (memory: any) => {
    // Log memory interaction
    const interactions = JSON.parse(localStorage.getItem('memory-interactions') || '[]')
    interactions.push({
      memoryId: memory.id,
      timestamp: Date.now()
    })
    localStorage.setItem('memory-interactions', JSON.stringify(interactions))
  }

  return (
    <>
      <SEOHead 
        title="Memory Palace"
        description="Erkunde deine persönliche 3D-Erinnerungswelt voller Lesezeichen und besonderer Momente"
        keywords={['Memory Palace', '3D Visualization', 'Reading Memories', 'Bookmarks']}
      />
      
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 pt-20 pb-8 px-6"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Memory Palace</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Dein Erinnerungspalast
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Eine 3D-Welt voller deiner Lieblingsstellen, Lesezeichen und besonderen Momente
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-6xl mx-auto px-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
              <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stats.totalMemories}</div>
              <div className="text-sm text-gray-400">Erinnerungen gespeichert</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
              <Book className="w-8 h-8 text-blue-400 mb-3" />
              <div className="text-lg font-bold text-white mb-1">{stats.favoriteStory}</div>
              <div className="text-sm text-gray-400">Lieblingsstory</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-xl p-6 border border-pink-500/30">
              <Heart className="w-8 h-8 text-pink-400 mb-3" />
              <div className="text-lg font-bold text-white mb-1">{stats.mostBookmarked}</div>
              <div className="text-sm text-gray-400">Lesezeichen-Status</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30">
              <Quote className="w-8 h-8 text-yellow-400 mb-3" />
              <div className="text-sm font-medium text-white mb-1 line-clamp-2">{stats.recentMemory}</div>
              <div className="text-sm text-gray-400">Letzte Erinnerung</div>
            </div>
          </div>
        </motion.div>

        {/* 3D Memory Palace */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-[70vh] max-w-7xl mx-auto px-6"
        >
          <div className="h-full bg-black/50 rounded-3xl overflow-hidden border border-white/10">
            <StoryMemoryPalace
              memories={memories}
              onMemoryClick={handleMemoryClick}
            />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto px-6 py-8 text-center"
        >
          <p className="text-sm text-gray-400">
            🖱️ Ziehen zum Drehen • Scrollen zum Zoomen • Klick auf Erinnerungen für Details
          </p>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto px-6 pb-20"
        >
          <div className="bg-purple-500/10 rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              Tipps für deinen Erinnerungspalast
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-400" />
                  Lesezeichen setzen
                </h3>
                <p className="text-sm">
                  Markiere wichtige Stellen beim Lesen mit dem Lesezeichen-Button. 
                  Sie erscheinen als blaue Kugeln in deinem Palast.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  Favoriten speichern
                </h3>
                <p className="text-sm">
                  Markiere deine Lieblingskapitel mit dem Herz-Button. 
                  Sie leuchten rosa in deiner Erinnerungswelt.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-purple-400" />
                  Zitate sammeln
                </h3>
                <p className="text-sm">
                  Speichere inspirierende Zitate und Dialoge. 
                  Sie schweben als lila Gedankenblasen umher.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Momente festhalten
                </h3>
                <p className="text-sm">
                  Besondere Augenblicke werden zu goldenen Sternen, 
                  die deine wichtigsten Leseerlebnisse markieren.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}