import { motion } from 'framer-motion'
import { Book, Heart, Sparkles, Coffee, Moon, Sun, Star } from 'lucide-react'
import { useState } from 'react'
import { storyChapters } from '../data/manhwaStory'

export default function Manhwa() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const story = storyChapters

  const toggleFavorite = (chapterId: number) => {
    setFavorites(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
            <Book className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-300">Manhwa Romance</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
              Pixels of Love
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A heartwarming tale of two gamers finding love in the most unexpected place
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chapter List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Chapters
              </h2>
              <div className="space-y-2">
                {story.map((chapter, index) => (
                  <motion.button
                    key={chapter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentChapter(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      currentChapter === index
                        ? 'bg-gradient-to-r from-pink-500/30 to-red-500/30 border border-pink-500/50'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{chapter.emoji}</span>
                        <div>
                          <p className="font-semibold">Chapter {chapter.id}</p>
                          <p className="text-sm text-gray-400">{chapter.title}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(chapter.id)
                        }}
                        className="p-2 hover:scale-110 transition-transform"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(chapter.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Reading Stats */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                <p className="text-sm text-gray-300 mb-2">Your Reading Stats</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">
                    Chapters Read: {currentChapter + 1}/50
                  </p>
                  <p className="text-xs text-gray-400">
                    Favorites: {favorites.length}
                  </p>
                  <p className="text-xs text-gray-400">
                    Romance Level: {currentChapter >= 2 ? '💕 Maximum' : '💗 Building'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story Content */}
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{story[currentChapter].emoji}</span>
                  {story[currentChapter].title}
                </h2>
                <div className="flex items-center gap-2">
                  {currentChapter === 0 && <Sun className="w-5 h-5 text-yellow-400" />}
                  {currentChapter === 1 && <Moon className="w-5 h-5 text-blue-400" />}
                  {currentChapter === 2 && <Star className="w-5 h-5 text-purple-400" />}
                  {currentChapter === 3 && <Coffee className="w-5 h-5 text-amber-400" />}
                  {currentChapter === 4 && <Heart className="w-5 h-5 text-red-400" />}
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                {story[currentChapter].content.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 leading-relaxed mb-4 text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                  disabled={currentChapter === 0}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous Chapter
                </button>
                <button
                  onClick={() => setCurrentChapter(Math.min(story.length - 1, currentChapter + 1))}
                  disabled={currentChapter === story.length - 1}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next Chapter
                </button>
              </div>
            </div>

            {/* Fun Reader Reactions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-3">Reader Reactions</p>
              <div className="flex gap-3 flex-wrap">
                {['😍', '🥺', '💕', '😭', '🥰', '✨', '💗', '🌸'].map((emoji, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl hover:drop-shadow-glow"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}