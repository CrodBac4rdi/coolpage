import { motion, AnimatePresence } from 'framer-motion'
import { Book, Heart, ChevronUp, Menu, X, ArrowLeft, Bookmark, Settings } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryById } from '../utils/storyLoader'

export default function Reader() {
  const { id } = useParams<{ id: string }>()
  const [showMenu, setShowMenu] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [lastScrollDirection, setLastScrollDirection] = useState<'up' | 'down'>('down')
  const [fontSize, setFontSize] = useState(18)
  const [isDark, setIsDark] = useState(true)
  const lastScrollY = useRef(0)
  const chapterRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const [activeChapter, setActiveChapter] = useState(0)

  const story = id ? getStoryById(id) : null

  // Handle scroll to detect direction
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > lastScrollY.current) {
        setLastScrollDirection('down')
      } else {
        setLastScrollDirection('up')
      }
      lastScrollY.current = scrollY

      // Update active chapter based on scroll position
      const chapterElements = Object.entries(chapterRefs.current)
      const viewportHeight = window.innerHeight
      const scrollPos = scrollY + viewportHeight / 2

      for (const [index, element] of chapterElements) {
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPos >= elementTop && scrollPos <= elementBottom) {
            setActiveChapter(parseInt(index))
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-hide menu when scrolling down
  useEffect(() => {
    if (lastScrollDirection === 'down' && showMenu) {
      const timer = setTimeout(() => setShowMenu(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [lastScrollDirection, showMenu])

  if (!story) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Story nicht gefunden</h1>
          <Link to="/manhwa" className="text-pink-400 hover:text-pink-300">
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    )
  }

  const toggleFavorite = (chapterId: number) => {
    setFavorites(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const scrollToChapter = (chapterIndex: number) => {
    const element = chapterRefs.current[chapterIndex]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setShowMenu(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Floating Menu Button */}
      <AnimatePresence>
        {(lastScrollDirection === 'up' || showMenu) && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className={`flex items-center gap-4 px-6 py-3 rounded-full shadow-lg backdrop-blur-xl border ${isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'}`}>
              <Link 
                to="/manhwa" 
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="text-sm font-medium">
                {story.title} - Chapter {activeChapter + 1}
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowMenu(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`fixed left-0 top-0 h-full w-80 z-50 shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">{story.coverEmoji}</div>
                  <div>
                    <h2 className="text-xl font-bold">{story.title}</h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {story.author}
                    </p>
                  </div>
                </div>

                {/* Reading Settings */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Einstellungen
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Schriftgröße: {fontSize}px
                      </label>
                      <input
                        type="range"
                        min="14"
                        max="24"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="w-full mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Chapter List */}
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Kapitel ({story.chapters.length})
                </h3>
                <div className="space-y-2">
                  {story.chapters.map((chapter, index) => (
                    <motion.button
                      key={chapter.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToChapter(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all border ${
                        activeChapter === index
                          ? isDark 
                            ? 'bg-blue-500/20 border-blue-500/50' 
                            : 'bg-blue-100 border-blue-300'
                          : isDark
                            ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{story.coverEmoji}</span>
                          <div>
                            <p className="font-medium text-sm">Chapter {chapter.id}</p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {chapter.title}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(chapter.id)
                          }}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(chapter.id)
                                ? 'fill-red-500 text-red-500'
                                : isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          />
                        </button>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Reading Progress */}
                <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    Fortschritt
                  </h3>
                  <div className="space-y-2">
                    <div className={`flex justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span>Aktuelles Kapitel:</span>
                      <span>{activeChapter + 1}/{story.chapters.length}</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}>
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((activeChapter + 1) / story.chapters.length) * 100}%` }}
                      />
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {Math.round(((activeChapter + 1) / story.chapters.length) * 100)}% abgeschlossen
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Story Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-16"
        >
          <div className="text-6xl mb-4">{story.coverEmoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              {story.title}
            </span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {story.description}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>von</span>
            <span className="font-medium">{story.author}</span>
            <span className="mx-2">•</span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {story.genre?.join(', ')}
            </span>
          </div>
        </motion.div>

        {/* Chapters */}
        <div className="space-y-16">
          {story.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              ref={(el) => (chapterRefs.current[index] = el)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className={`${isDark ? 'bg-gray-800/30' : 'bg-white/70'} backdrop-blur-sm rounded-2xl p-8 border ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'}`}
            >
              {/* Chapter Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{story.coverEmoji}</div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Chapter {chapter.id}
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {chapter.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(chapter.id)}
                  className="p-3 rounded-full transition-all hover:scale-110"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.includes(chapter.id)
                        ? 'fill-red-500 text-red-500'
                        : isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                    }`}
                  />
                </button>
              </div>

              {/* Chapter Content */}
              <div className="prose prose-lg max-w-none">
                {chapter.content.map((paragraph, paragraphIndex) => (
                  <motion.p
                    key={paragraphIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: paragraphIndex * 0.05 }}
                    className={`leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Chapter Footer */}
              <div className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Chapter {chapter.id} von {story.chapters.length}
                </div>
                <div className="flex items-center gap-2">
                  {index < story.chapters.length - 1 && (
                    <button
                      onClick={() => scrollToChapter(index + 1)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark 
                          ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      Nächstes Kapitel
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story End */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              Ende von {story.title}
            </span>
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Danke fürs Lesen! Wie hat dir die Geschichte gefallen?
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/manhwa"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Mehr Geschichten
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
            >
              Nochmal lesen
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}