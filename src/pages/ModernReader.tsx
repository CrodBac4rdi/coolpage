import { motion, AnimatePresence } from 'framer-motion'
import { Book, Menu, X, Settings, Moon, Sun, Home, Minus, Plus } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryById } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'

export default function ModernReader() {
  const { id } = useParams<{ id: string }>()
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light')
  const [fontSize, setFontSize] = useState(18)
  const [fontFamily, setFontFamily] = useState('serif')
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  
  const story = id ? getStoryById(id) : undefined
  
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Story not found</p>
      </div>
    )
  }

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (currentScrollY / maxScroll) * 100
      setScrollProgress(progress)
      
      lastScrollY.current = currentScrollY
      
      // Update active chapter
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

  // Theme classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100'
      case 'sepia':
        return 'bg-amber-50 text-gray-800'
      default:
        return 'bg-white text-gray-900'
    }
  }

  // Font family
  const getFontFamily = () => {
    switch (fontFamily) {
      case 'sans':
        return 'font-sans'
      case 'mono':
        return 'font-mono'
      default:
        return 'font-serif'
    }
  }

  return (
    <>
      <SEOHead 
        title={`${story.title} - Reading`}
        description={story.description}
      />
      
      <div className={`min-h-screen transition-all duration-300 ${getThemeClasses()}`}>
        {/* Minimal Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-200/20 z-50">
          <motion.div 
            className="h-full bg-gray-900 dark:bg-white"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Fixed Header Bar */}
        <div className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md ${
          theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'
        } border-b border-gray-200 dark:border-gray-800`}>
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Left: Menu */}
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Center: Chapter Title */}
            <div className="text-sm font-medium opacity-60">
              {story.chapters[activeChapter]?.title || 'Loading...'}
            </div>

            {/* Right: Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel - Always accessible */}
        <AnimatePresence>
          {showSettings && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSettings(false)}
                className="fixed inset-0 bg-black/20 z-30"
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`fixed top-16 right-4 z-40 rounded-xl shadow-xl p-4 w-80 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } border border-gray-200 dark:border-gray-700`}
              >
                {/* Theme Selection */}
                <div className="mb-6">
                  <p className="text-xs font-medium opacity-60 mb-3">THEME</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-3 rounded-lg border transition-all ${
                        theme === 'light' 
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Sun className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-3 rounded-lg border transition-all ${
                        theme === 'dark' 
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Moon className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme('sepia')}
                      className={`p-3 rounded-lg border transition-all ${
                        theme === 'sepia' 
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Book className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">Sepia</span>
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-6">
                  <p className="text-xs font-medium opacity-60 mb-3">FONT SIZE</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                      className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-2xl font-serif">Aa</span>
                      <p className="text-xs opacity-60 mt-1">{fontSize}px</p>
                    </div>
                    <button
                      onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                      className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Font Style */}
                <div>
                  <p className="text-xs font-medium opacity-60 mb-3">FONT STYLE</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setFontFamily('serif')}
                      className={`p-3 rounded-lg border text-xs transition-all ${
                        fontFamily === 'serif' 
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-serif">Serif</span>
                    </button>
                    <button
                      onClick={() => setFontFamily('sans')}
                      className={`p-3 rounded-lg border text-xs transition-all ${
                        fontFamily === 'sans' 
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-sans">Sans</span>
                    </button>
                    <button
                      onClick={() => setFontFamily('mono')}
                      className={`p-3 rounded-lg border text-xs transition-all ${
                        fontFamily === 'mono' 
                          ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-700' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-mono">Mono</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Navigation Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSidebar(false)}
                className="fixed inset-0 bg-black/20 z-40"
              />
              
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className={`fixed left-0 top-0 h-full w-80 shadow-xl z-50 overflow-y-auto ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">{story.title}</h2>
                      <p className="text-sm opacity-60">{story.author}</p>
                    </div>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <Link
                    to="/manhwa"
                    className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Home className="w-4 h-4" />
                    Back to Library
                  </Link>
                </div>
                
                <div className="p-4">
                  <p className="text-xs font-medium opacity-60 mb-4">CHAPTERS</p>
                  
                  {story.chapters.map((chapter, index) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        const element = document.querySelector(`[data-chapter="${index}"]`)
                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        setShowSidebar(false)
                      }}
                      className={`w-full text-left p-4 rounded-lg mb-2 transition-all ${
                        activeChapter === index
                          ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">{chapter.title}</p>
                          <p className="text-xs opacity-60 mt-1">Chapter {index + 1}</p>
                        </div>
                        {activeChapter === index && (
                          <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="pt-16">
          <div 
            ref={contentRef}
            className={`max-w-3xl mx-auto px-6 py-12 ${getFontFamily()}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {/* Story Header */}
            <div className="mb-16 text-center">
              <h1 className="text-4xl font-bold mb-3">{story.title}</h1>
              <p className="opacity-60">{story.author}</p>
            </div>

            {/* Chapters */}
            {story.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} data-chapter={chapterIndex} className="mb-24">
                {/* Chapter Header */}
                <div className="mb-12 text-center">
                  <p className="text-sm opacity-40 mb-2">CHAPTER {chapterIndex + 1}</p>
                  <h2 className="text-2xl font-semibold">{chapter.title}</h2>
                </div>
                
                {/* Chapter Content */}
                <div className="space-y-6 leading-relaxed">
                  {chapter.content.map((paragraph, pIndex) => (
                    <p 
                      key={pIndex}
                      className={`${
                        pIndex === 0 && chapterIndex === 0 
                          ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none' 
                          : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Chapter Separator */}
                {chapterIndex < story.chapters.length - 1 && (
                  <div className="mt-24 flex items-center justify-center">
                    <div className="w-24 h-px bg-gray-200 dark:bg-gray-700" />
                  </div>
                )}
              </div>
            ))}

            {/* End */}
            <div className="text-center py-24">
              <p className="text-xl mb-8 opacity-60">End of Story</p>
              <Link
                to="/manhwa"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-80 transition-opacity"
              >
                <Book className="w-5 h-5" />
                Discover More Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}