import { motion, AnimatePresence } from 'framer-motion'
import { Book, Menu, X, Settings, Moon, Sun, Home, Minus, Plus, ArrowLeft } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryById } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'

const storyThemes = {
  'forbidden-desire': {
    light: {
      bg: 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50',
      text: 'text-rose-900',
      accent: 'bg-gradient-to-r from-rose-500 to-pink-500',
      panel: 'bg-rose-50/80 border-rose-200',
      button: 'hover:bg-rose-100'
    },
    dark: {
      bg: 'bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950',
      text: 'text-rose-100',
      accent: 'bg-gradient-to-r from-rose-600 to-pink-600',
      panel: 'bg-rose-950/80 border-rose-800',
      button: 'hover:bg-rose-900'
    }
  },
  'moonlight-academy': {
    light: {
      bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      text: 'text-blue-900',
      accent: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      panel: 'bg-blue-50/80 border-blue-200',
      button: 'hover:bg-blue-100'
    },
    dark: {
      bg: 'bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950',
      text: 'text-blue-100',
      accent: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      panel: 'bg-blue-950/80 border-blue-800',
      button: 'hover:bg-blue-900'
    }
  },
  'code-breakers': {
    light: {
      bg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      text: 'text-green-900',
      accent: 'bg-gradient-to-r from-green-500 to-emerald-500',
      panel: 'bg-green-50/80 border-green-200',
      button: 'hover:bg-green-100'
    },
    dark: {
      bg: 'bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950',
      text: 'text-green-100',
      accent: 'bg-gradient-to-r from-green-600 to-emerald-600',
      panel: 'bg-green-950/80 border-green-800',
      button: 'hover:bg-green-900'
    }
  },
  'default': {
    light: {
      bg: 'bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50',
      text: 'text-gray-900',
      accent: 'bg-gradient-to-r from-gray-500 to-slate-500',
      panel: 'bg-white/80 border-gray-200',
      button: 'hover:bg-gray-100'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-950 via-slate-950 to-zinc-950',
      text: 'text-gray-100',
      accent: 'bg-gradient-to-r from-gray-600 to-slate-600',
      panel: 'bg-gray-950/80 border-gray-800',
      button: 'hover:bg-gray-900'
    }
  }
}

export default function ThemeAwareReader() {
  const { id } = useParams<{ id: string }>()
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [fontSize, setFontSize] = useState(18)
  const [fontFamily, setFontFamily] = useState('serif')
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const story = id ? getStoryById(id) : undefined
  
  // Get theme based on story ID
  const currentTheme = storyThemes[id as keyof typeof storyThemes] || storyThemes.default
  const theme = currentTheme[isDark ? 'dark' : 'light']
  
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Story not found</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
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

  // Font family
  const getFontFamily = () => {
    switch (fontFamily) {
      case 'sans': return 'font-sans'
      case 'mono': return 'font-mono'
      default: return 'font-serif'
    }
  }

  return (
    <>
      <SEOHead 
        title={`${story.title} - Reading`}
        description={story.description}
      />
      
      <div className={`min-h-screen transition-all duration-500 ${theme.bg} ${theme.text}`}>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
          <motion.div 
            className={`h-full ${theme.accent}`}
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Fixed Header */}
        <div className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md ${theme.panel} border-b`}>
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Left: Back + Menu */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className={`p-2 ${theme.button} rounded-lg transition-colors`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowSidebar(true)}
                className={`p-2 ${theme.button} rounded-lg transition-colors`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Chapter */}
            <div className="text-sm font-medium opacity-70 max-w-xs truncate">
              {story.chapters[activeChapter]?.title || story.title}
            </div>

            {/* Right: Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 ${theme.button} rounded-lg transition-colors`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
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
                className={`fixed top-16 right-4 z-40 rounded-xl shadow-xl p-4 w-80 ${theme.panel} border backdrop-blur-md`}
              >
                {/* Theme Toggle */}
                <div className="mb-6">
                  <p className="text-xs font-medium opacity-60 mb-3">THEME</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsDark(false)}
                      className={`p-3 rounded-lg border transition-all ${
                        !isDark ? 'border-current bg-current/10' : 'border-current/20 hover:border-current/40'
                      }`}
                    >
                      <Sun className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">Light</span>
                    </button>
                    <button
                      onClick={() => setIsDark(true)}
                      className={`p-3 rounded-lg border transition-all ${
                        isDark ? 'border-current bg-current/10' : 'border-current/20 hover:border-current/40'
                      }`}
                    >
                      <Moon className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-xs">Dark</span>
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-6">
                  <p className="text-xs font-medium opacity-60 mb-3">FONT SIZE</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                      className="p-2 rounded-lg border border-current/20 hover:bg-current/10"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-serif">Aa</div>
                      <p className="text-xs opacity-60">{fontSize}px</p>
                    </div>
                    <button
                      onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                      className="p-2 rounded-lg border border-current/20 hover:bg-current/10"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Font Style */}
                <div>
                  <p className="text-xs font-medium opacity-60 mb-3">FONT STYLE</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['serif', 'sans', 'mono'].map((font) => (
                      <button
                        key={font}
                        onClick={() => setFontFamily(font)}
                        className={`p-3 rounded-lg border text-xs transition-all ${
                          fontFamily === font 
                            ? 'border-current bg-current/10' 
                            : 'border-current/20 hover:border-current/40'
                        }`}
                      >
                        <span className={font === 'serif' ? 'font-serif' : font === 'sans' ? 'font-sans' : 'font-mono'}>
                          {font.charAt(0).toUpperCase() + font.slice(1)}
                        </span>
                      </button>
                    ))}
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
                className={`fixed left-0 top-0 h-full w-80 shadow-xl z-50 overflow-y-auto ${theme.bg} border-r ${theme.panel.split(' ')[1]}`}
              >
                <div className="p-6 border-b border-current/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">{story.title}</h2>
                      <p className="text-sm opacity-60">{story.author}</p>
                    </div>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className={`p-2 ${theme.button} rounded-lg`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <Home className="w-4 h-4" />
                    Back to Stories
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
                          ? 'bg-current/10 font-medium'
                          : theme.button
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm">{chapter.title}</p>
                          <p className="text-xs opacity-60 mt-1">Chapter {index + 1}</p>
                        </div>
                        {activeChapter === index && (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="pt-16">
          <div 
            ref={contentRef}
            className={`max-w-3xl mx-auto px-6 py-12 ${getFontFamily()}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
          >
            {/* Story Header */}
            <div className="mb-16 text-center">
              <h1 className="text-4xl font-bold mb-3">{story.title}</h1>
              <p className="opacity-60 text-lg">{story.author}</p>
            </div>

            {/* Chapters */}
            {story.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.id} data-chapter={chapterIndex} className="mb-24">
                {/* Chapter Header */}
                <div className="mb-12 text-center">
                  <p className="text-sm opacity-40 mb-2">KAPITEL {chapterIndex + 1}</p>
                  <h2 className="text-2xl font-semibold">{chapter.title}</h2>
                </div>
                
                {/* Chapter Content */}
                <div className="space-y-6 leading-relaxed">
                  {chapter.content.map((paragraph, pIndex) => (
                    <p 
                      key={pIndex}
                      className={`${
                        pIndex === 0 && chapterIndex === 0 
                          ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-current' 
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
                    <div className="w-24 h-px bg-current/20" />
                  </div>
                )}
              </div>
            ))}

            {/* End */}
            <div className="text-center py-24">
              <p className="text-xl mb-8 opacity-60">Ende der Geschichte</p>
              <Link
                to="/"
                className={`inline-flex items-center gap-2 px-6 py-3 ${theme.accent} text-white rounded-lg hover:opacity-80 transition-opacity`}
              >
                <Book className="w-5 h-5" />
                Mehr Geschichten entdecken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}