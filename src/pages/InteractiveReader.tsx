import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Zap, RotateCcw, TrendingUp } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { getInteractiveStoryById } from '../utils/interactiveStoryLoader'
import { useInteractiveStory } from '../hooks/useInteractiveStory'

export default function InteractiveReader() {
  const { id } = useParams<{ id: string }>()
  const story = id ? getInteractiveStoryById(id) : null

  if (!story) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Interactive Story nicht gefunden</h1>
          <Link to="/games" className="text-pink-400 hover:text-pink-300">
            Zurück zu Games
          </Link>
        </div>
      </div>
    )
  }

  const {
    readerState,
    getCurrentChapter,
    makeChoice,
    goToNextChapter,
    goToPreviousChapter,
    resetStory,
    getAvailableChapters,
    getPathProgress
  } = useInteractiveStory(story)

  const currentChapter = getCurrentChapter()
  const availableChapters = getAvailableChapters()
  const mainProgress = getPathProgress('main')

  if (!currentChapter) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Kapitel nicht gefunden</h1>
          <button 
            onClick={resetStory}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold"
          >
            Story zurücksetzen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to="/games" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zu Games
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">{story.coverEmoji}</span>
                {story.title}
              </h1>
              <p className="text-gray-300 mt-2">{story.description}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={resetStory}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 sticky top-24">
              {/* Current Path */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Current Path
                </h3>
                <div className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl text-center">
                  <div className="font-semibold capitalize">{readerState.currentPath}</div>
                  <div className="text-sm text-gray-400">
                    Chapter {currentChapter.id}
                  </div>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl">
                <h4 className="font-semibold mb-3">Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Main Story</span>
                    <span>{Math.round(mainProgress.percentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all"
                      style={{ width: `${mainProgress.percentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{readerState.choiceHistory.length}</div>
                    <div className="text-xs text-gray-400">Choices Made</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{readerState.unlockedPaths.length}</div>
                    <div className="text-xs text-gray-400">Paths Unlocked</div>
                  </div>
                </div>
              </div>

              {/* Quick Chapter Navigation */}
              <div>
                <h4 className="font-semibold mb-3">Available Chapters</h4>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {availableChapters.slice(0, 10).map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                        chapter.id === currentChapter.id
                          ? 'bg-purple-500/30 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{chapter.emoji}</span>
                        <div>
                          <div className="font-medium">Ch. {chapter.id}</div>
                          <div className="text-xs opacity-75">{chapter.title}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentChapter.id}-${readerState.currentPath}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
              >
                {/* Chapter Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                      <span className="text-4xl">{currentChapter.emoji}</span>
                      {currentChapter.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <BookOpen className="w-4 h-4" />
                      Chapter {currentChapter.id}
                    </div>
                  </div>
                  {currentChapter.arc && (
                    <div className="inline-flex px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-sm text-purple-300">
                      {currentChapter.arc}
                    </div>
                  )}
                </div>

                {/* Story Content */}
                <div className="prose prose-invert max-w-none mb-8">
                  {currentChapter.content.map((paragraph, index) => (
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

                {/* Choices */}
                {currentChapter.choices && currentChapter.choices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-xl font-bold">Was machst du?</h3>
                    </div>
                    
                    {currentChapter.choices.map((choice, index) => (
                      <motion.button
                        key={choice.id}
                        onClick={() => {
                          makeChoice(choice)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className="w-full p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-white/20 hover:border-white/40 rounded-xl transition-all text-left group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          {choice.emoji && (
                            <span className="text-2xl group-hover:scale-110 transition-transform">
                              {choice.emoji}
                            </span>
                          )}
                          <div className="flex-1">
                            <div className="font-semibold text-white mb-1">
                              {choice.text}
                            </div>
                            {choice.consequences && choice.consequences.length > 0 && (
                              <div className="text-sm text-gray-400">
                                Konsequenzen: {choice.consequences.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Continue Button (if no choices or can continue main) */}
                {(!currentChapter.choices || currentChapter.canContinueMain) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-between items-center mt-8 pt-6 border-t border-white/10"
                  >
                    <button
                      onClick={() => {
                        goToPreviousChapter()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      disabled={currentChapter.id === 1}
                      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Previous Chapter
                    </button>
                    
                    <button
                      onClick={() => {
                        goToNextChapter()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      Continue Story
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Reader Reactions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-6 p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-3">Your Reaction</p>
              <div className="flex gap-3 flex-wrap">
                {['😮', '😍', '😨', '🔥', '💪', '🤔', '😤', '❤️'].map((emoji, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl hover:drop-shadow-glow p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}