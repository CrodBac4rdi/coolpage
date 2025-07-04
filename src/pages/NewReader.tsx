import { motion, AnimatePresence } from 'framer-motion'
import { Book, Menu, X, Settings, Moon, Sun, Bookmark, Home } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryById } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'

export default function NewReader() {
  const { id } = useParams<{ id: string }>()
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [isDark, setIsDark] = useState(true)
  const [fontSize, setFontSize] = useState(20)
  const [fontFamily, setFontFamily] = useState('serif')
  const [lineHeight, setLineHeight] = useState(1.8)
  const [bookmarks] = useState<string[]>([])
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined)
  
  const story = id ? getStoryById(id) : undefined
  
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Story not found</p>
      </div>
    )
  }

  // Smooth scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (currentScrollY / maxScroll) * 100
      setScrollProgress(progress)
      
      // Show settings when scrolling up significantly
      if (currentScrollY < lastScrollY.current - 50) {
        setIsScrollingUp(true)
        clearTimeout(scrollTimeout.current)
        scrollTimeout.current = setTimeout(() => {
          setIsScrollingUp(false)
        }, 3000)
      } else if (currentScrollY > lastScrollY.current) {
        setIsScrollingUp(false)
      }
      
      lastScrollY.current = currentScrollY
      
      // Update active chapter based on scroll position
      if (contentRef.current) {
        const chapters = contentRef.current.querySelectorAll('[data-chapter]')
        chapters.forEach((chapter, index) => {
          const rect = chapter.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveChapter(index)
          }
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Font styles
  const getFontFamily = () => {
    switch (fontFamily) {
      case 'serif': return 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
      case 'sans': return 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      case 'mono': return 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
      default: return 'ui-serif, Georgia, serif'
    }
  }

  // Toggle bookmark - currently unused but kept for future
  // const toggleBookmark = (chapterId: string) => {
  //   setBookmarks(prev => 
  //     prev.includes(chapterId) 
  //       ? prev.filter(id => id !== chapterId)
  //       : [...prev, chapterId]
  //   )
  // }

  return (
    <>
      <SEOHead 
        title={`${story.title} - Reading`}
        description={story.description}
      />
      
      <div className={`min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-amber-50 text-gray-900'
      }`}>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Floating Settings Button - Shows when scrolling up */}
        <AnimatePresence>
          {isScrollingUp && (
            <motion.button
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              onClick={() => setShowSettings(!showSettings)}
              className="fixed top-4 right-4 z-40 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="fixed top-16 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80"
            >
              <h3 className="text-lg font-semibold mb-4">Reading Settings</h3>
              
              {/* Theme Toggle */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Theme</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsDark(false)}
                    className={`flex-1 p-2 rounded flex items-center justify-center gap-2 ${
                      !isDark ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                  <button
                    onClick={() => setIsDark(true)}
                    className={`flex-1 p-2 rounded flex items-center justify-center gap-2 ${
                      isDark ? 'bg-gray-700 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Font Family */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Font Style</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="serif">Serif (Classic)</option>
                  <option value="sans">Sans-serif (Modern)</option>
                  <option value="mono">Monospace (Code)</option>
                </select>
              </div>

              {/* Line Height */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">
                  Line Spacing: {lineHeight}
                </label>
                <input
                  type="range"
                  min="1.4"
                  max="2.2"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSidebar(false)}
                className="fixed inset-0 bg-black/50 z-40"
              />
              
              {/* Sidebar */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
              >
                <div className="p-4 border-b dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{story.title}</h2>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Link>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    CHAPTERS
                  </h3>
                  
                  {story.chapters.map((chapter, index) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        const element = document.querySelector(`[data-chapter="${index}"]`)
                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        setShowSidebar(false)
                      }}
                      className={`w-full text-left p-3 rounded-lg mb-2 transition-colors flex items-center justify-between ${
                        activeChapter === index
                          ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-900 dark:text-pink-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{chapter.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Chapter {index + 1}
                        </div>
                      </div>
                      {bookmarks.includes(String(chapter.id)) && (
                        <Bookmark className="w-4 h-4 fill-current" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Menu Button */}
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed bottom-6 right-6 z-30 p-4 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Header */}
          <div className="py-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{story.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{story.author}</p>
          </div>

          {/* Continuous Content */}
          <div 
            ref={contentRef}
            className="prose prose-lg dark:prose-invert max-w-none"
            style={{
              fontFamily: getFontFamily(),
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight
            }}
          >
            {story.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} data-chapter={chapterIndex}>
                {/* Chapter Title - Subtle */}
                <h2 className="text-2xl font-semibold mt-16 mb-8 text-center opacity-80">
                  {chapter.title}
                </h2>
                
                {/* Chapter Content */}
                {chapter.content.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex}
                    className={`mb-6 ${
                      pIndex === 0 && chapterIndex === 0 
                        ? 'first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-pink-500' 
                        : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
                
                {/* Subtle Chapter Separator */}
                {chapterIndex < story.chapters.length - 1 && (
                  <div className="my-16 flex items-center justify-center">
                    <div className="w-16 h-px bg-gray-300 dark:bg-gray-700" />
                    <div className="mx-4 text-gray-400 dark:text-gray-600">✦</div>
                    <div className="w-16 h-px bg-gray-300 dark:bg-gray-700" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* End of Story */}
          <div className="text-center py-16">
            <p className="text-2xl mb-4">The End</p>
            <Link
              to="/manhwa"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <Book className="w-5 h-5" />
              Read More Stories
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}