import { motion, AnimatePresence } from 'framer-motion'
import { Book, Heart, Menu, X, ArrowLeft, Bookmark, Settings } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryById } from '../utils/storyLoader'
import ModernIcon from '../components/ModernIcon'
import ScrollProgressBar from '../components/ScrollProgressBar'

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
      {/* Scroll Progress Bar */}
      <ScrollProgressBar 
        color={isDark ? 'from-purple-500 to-pink-500' : 'from-purple-400 to-pink-400'}
        showMilestones={true}
        height={6}
      />
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
                {story.title}
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
          <ModernIcon 
            type={story.id.includes('desire') ? 'romance' : 
                  story.id.includes('academy') ? 'magic' :
                  story.id.includes('code') ? 'cyberpunk' :
                  story.id.includes('dream') ? 'fantasy' :
                  story.id.includes('cat') ? 'comedy' :
                  story.id.includes('mirror') ? 'supernatural' :
                  story.id.includes('transfer') ? 'drama' : 'sparkles'}
            size="xl"
            className="mb-4"
          />
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

        {/* Continuous Story Flow - 2025 Scrollytelling Style */}
        <div className="relative">
          {/* Seamless Story Content */}
          <div className="prose prose-lg max-w-none">
            {story.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} className="relative">
                {/* Subtle Chapter Transition */}
                {chapterIndex > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-200px" }}
                    className="flex items-center justify-center py-16 my-8"
                  >
                    <div className={`flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-sm border ${isDark ? 'bg-gray-800/50 border-gray-600/30' : 'bg-white/50 border-gray-300/30'}`}>
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {chapter.title}
                      </span>
                      <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    </div>
                  </motion.div>
                )}

                {/* Chapter Reference for Navigation */}
                <div 
                  ref={(el) => { chapterRefs.current[chapterIndex] = el }}
                  className="absolute -top-24"
                />

                {/* Flowing Content */}
                {chapter.content.map((paragraph, paragraphIndex) => {
                  const isFirstParagraph = chapterIndex === 0 && paragraphIndex === 0
                  
                  return (
                    <motion.p
                      key={`${chapter.id}-${paragraphIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        delay: paragraphIndex * 0.03,
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                      }}
                      className={`
                        leading-relaxed transition-all duration-300
                        ${isDark ? 'text-gray-300' : 'text-gray-700'}
                        ${
                          isFirstParagraph 
                            ? 'text-xl md:text-2xl font-medium mb-8 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-transparent first-letter:bg-clip-text first-letter:bg-gradient-to-br first-letter:from-pink-400 first-letter:to-purple-500' 
                            : 'mb-6'
                        }
                      `}
                      style={{ fontSize: isFirstParagraph ? undefined : `${fontSize}px` }}
                    >
                      {paragraph}
                    </motion.p>
                  )
                })}

                {/* Breathing Space Between Chapters */}
                {chapterIndex < story.chapters.length - 1 && (
                  <div className="h-16" />
                )}
              </div>
            ))}
          </div>

          {/* Floating Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30"
          >
            <div className={`w-1 h-32 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'} relative overflow-hidden`}>
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"
                style={{ 
                  height: `${((activeChapter + 1) / story.chapters.length) * 100}%`,
                  transition: 'height 0.3s ease-out'
                }}
              />
            </div>
            <div className={`text-xs mt-2 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {activeChapter + 1}/{story.chapters.length}
            </div>
          </motion.div>
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