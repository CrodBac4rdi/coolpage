import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, BookOpen, TrendingUp, Filter } from 'lucide-react'
import { useState, useEffect } from 'react'
import { loadStories } from '../utils/storyLoader'
import StoryTimeline from '../components/StoryTimeline'
import SEOHead from '../components/SEOHead'
import ModernIcon from '../components/ModernIcon'

export default function Timeline() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [readProgress, setReadProgress] = useState<Record<string, number>>({})
  const [currentChapters, setCurrentChapters] = useState<Record<string, number>>({})
  const stories = loadStories()

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('reading-progress')
    const savedCurrentChapters = localStorage.getItem('current-chapters')
    
    if (savedProgress) {
      setReadProgress(JSON.parse(savedProgress))
    }
    
    if (savedCurrentChapters) {
      setCurrentChapters(JSON.parse(savedCurrentChapters))
    }
    
    // Set first story as default if none selected
    if (!selectedStoryId && stories.length > 0) {
      setSelectedStoryId(stories[0].id)
    }
  }, [stories, selectedStoryId])

  const selectedStory = stories.find(s => s.id === selectedStoryId)

  const getStoryProgress = (storyId: string) => {
    const story = stories.find(s => s.id === storyId)
    if (!story) return 0
    
    let totalProgress = 0
    story.chapters.forEach((_, index) => {
      totalProgress += readProgress[`${storyId}-${index}`] || 0
    })
    
    return Math.round(totalProgress / story.chapters.length)
  }

  return (
    <>
      <SEOHead 
        title="Story Timeline"
        description="Verfolge deinen Fortschritt und entdecke deine Lesereise"
        keywords={['Timeline', 'Progress', 'Reading Journey', 'Story Tracking']}
      />
      
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Story Timeline</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Deine Lesereise
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Verfolge deinen Fortschritt, entdecke Schlüsselmomente und tauche tiefer in jede Story ein
            </p>
          </motion.div>

          {/* Story Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Filter className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Wähle eine Story</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map((story) => {
                const progress = getStoryProgress(story.id)
                const isSelected = selectedStoryId === story.id
                
                return (
                  <motion.div
                    key={story.id}
                    onClick={() => setSelectedStoryId(story.id)}
                    className={`relative p-6 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <ModernIcon 
                        type={story.id.includes('desire') ? 'romance' : 
                              story.id.includes('academy') ? 'magic' :
                              story.id.includes('code') ? 'cyberpunk' :
                              story.id.includes('dream') ? 'fantasy' :
                              story.id.includes('cat') ? 'comedy' :
                              story.id.includes('mirror') ? 'supernatural' :
                              story.id.includes('transfer') ? 'drama' : 'sparkles'}
                        size="md"
                      />
                      <span className={`text-2xl font-bold ${
                        progress > 0 ? 'text-purple-400' : 'text-gray-500'
                      }`}>
                        {progress}%
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-1">{story.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{story.chapters.length} Kapitel</p>
                    
                    {/* Mini Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-purple-500 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Timeline Display */}
          <AnimatePresence mode="wait">
            {selectedStory && (
              <motion.div
                key={selectedStoryId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black/20 rounded-3xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">{selectedStory.title}</h2>
                </div>
                
                <StoryTimeline
                  storyId={selectedStoryId!}
                  chapters={selectedStory.chapters}
                  currentChapter={currentChapters[selectedStoryId!] || 0}
                  readProgress={readProgress}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Global Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { 
                label: 'Stories begonnen', 
                value: Object.keys(currentChapters).length,
                icon: <BookOpen className="w-5 h-5" />,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                label: 'Kapitel gelesen', 
                value: Object.values(readProgress).filter(p => p >= 98).length,
                icon: <Calendar className="w-5 h-5" />,
                color: 'from-green-500 to-emerald-500'
              },
              { 
                label: 'Durchschnittlicher Fortschritt', 
                value: Math.round(
                  stories.reduce((acc, story) => acc + getStoryProgress(story.id), 0) / stories.length
                ) + '%',
                icon: <TrendingUp className="w-5 h-5" />,
                color: 'from-purple-500 to-pink-500'
              },
              { 
                label: 'Lesezeit gesamt', 
                value: Math.round(
                  Object.entries(readProgress).reduce((acc, [key, progress]) => {
                    const [storyId, chapterIndex] = key.split('-')
                    const story = stories.find(s => s.id === storyId)
                    if (!story) return acc
                    const chapter = story.chapters[parseInt(chapterIndex)]
                    if (!chapter) return acc
                    const words = chapter.content.join(' ').split(' ').length
                    return acc + (words * progress / 100) / 200
                  }, 0)
                ) + ' Min',
                icon: <Calendar className="w-5 h-5" />,
                color: 'from-orange-500 to-red-500'
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="relative p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}