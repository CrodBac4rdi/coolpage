import { motion, AnimatePresence } from 'framer-motion'
import { Book, Menu, X, Settings, Home, Minus, Plus, ArrowLeft, Bookmark, Eye } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryById } from '../utils/storyLoader'
import SEOHead from '../components/SEOHead'

const storyThemes = {
  'forbidden-desire': {
    bg: 'bg-gradient-to-br from-rose-950 via-pink-950 to-purple-950',
    text: 'text-rose-100',
    accent: 'bg-gradient-to-r from-rose-600 to-pink-600',
    panel: 'bg-rose-950/90 border-rose-800',
    button: 'hover:bg-rose-900'
  },
  'moonlight-academy': {
    bg: 'bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950',
    text: 'text-blue-100',
    accent: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    panel: 'bg-blue-950/90 border-blue-800',
    button: 'hover:bg-blue-900'
  },
  'code-breakers': {
    bg: 'bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950',
    text: 'text-green-100',
    accent: 'bg-gradient-to-r from-green-600 to-emerald-600',
    panel: 'bg-green-950/90 border-green-800',
    button: 'hover:bg-green-900'
  },
  'dream-catcher': {
    bg: 'bg-gradient-to-br from-purple-950 via-violet-950 to-indigo-950',
    text: 'text-purple-100',
    accent: 'bg-gradient-to-r from-purple-600 to-violet-600',
    panel: 'bg-purple-950/90 border-purple-800',
    button: 'hover:bg-purple-900'
  },
  'my-boss-is-a-cat': {
    bg: 'bg-gradient-to-br from-orange-950 via-amber-950 to-yellow-950',
    text: 'text-orange-100',
    accent: 'bg-gradient-to-r from-orange-600 to-amber-600',
    panel: 'bg-orange-950/90 border-orange-800',
    button: 'hover:bg-orange-900'
  },
  'shadow-in-mirror': {
    bg: 'bg-gradient-to-br from-gray-950 via-slate-950 to-zinc-950',
    text: 'text-gray-100',
    accent: 'bg-gradient-to-r from-gray-600 to-slate-600',
    panel: 'bg-gray-950/90 border-gray-800',
    button: 'hover:bg-gray-900'
  },
  'transfer-student': {
    bg: 'bg-gradient-to-br from-cyan-950 via-sky-950 to-blue-950',
    text: 'text-cyan-100',
    accent: 'bg-gradient-to-r from-cyan-600 to-sky-600',
    panel: 'bg-cyan-950/90 border-cyan-800',
    button: 'hover:bg-cyan-900'
  },
  'default': {
    bg: 'bg-gradient-to-br from-gray-950 via-slate-950 to-zinc-950',
    text: 'text-gray-100',
    accent: 'bg-gradient-to-r from-gray-600 to-slate-600',
    panel: 'bg-gray-950/90 border-gray-800',
    button: 'hover:bg-gray-900'
  }
}

export default function CleanReader() {
  const { id } = useParams<{ id: string }>()
  const [showSidebar, setShowSidebar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [fontSize, setFontSize] = useState(18)
  const [fontFamily, setFontFamily] = useState('serif')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [focusMode, setFocusMode] = useState(false)
  const [bookmarkedParagraphs, setBookmarkedParagraphs] = useState<Set<string>>(new Set())
  
  const contentRef = useRef<HTMLDivElement>(null)
  const story = id ? getStoryById(id) : undefined
  
  // Get theme
  const currentTheme = storyThemes[id as keyof typeof storyThemes] || storyThemes.default
  
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Story not found</p>
          <Link to="/" className="text-blue-400 hover:underline">
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

  // Toggle bookmark for paragraph
  const toggleBookmark = (chapterIndex: number, paragraphIndex: number) => {
    const bookmarkId = `${story.id}-${chapterIndex}-${paragraphIndex}`
    setBookmarkedParagraphs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(bookmarkId)) {
        newSet.delete(bookmarkId)
      } else {
        newSet.add(bookmarkId)
      }
      return newSet
    })
  }

  return (
    <>
      <SEOHead 
        title={`${story.title} - Reading`}
        description={story.description}
      />
      
      <div className={`min-h-screen transition-all duration-500 ${currentTheme.bg} ${currentTheme.text}`}>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
          <motion.div 
            className={`h-full ${currentTheme.accent}`}
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Fixed Header */}
        <div className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md ${currentTheme.panel} border-b`}>
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Left: Back + Menu */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className={`p-2 ${currentTheme.button} rounded-lg transition-colors`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setShowSidebar(true)}
                className={`p-2 ${currentTheme.button} rounded-lg transition-colors`}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Chapter */}
            <div className="text-sm font-medium opacity-70 max-w-xs truncate">
              {story.chapters[activeChapter]?.title || story.title}
            </div>

            {/* Right: Focus Mode + Settings */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFocusMode(!focusMode)}
                className={`p-2 rounded-lg transition-colors ${
                  focusMode ? currentTheme.accent + ' text-white' : currentTheme.button
                }`}
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 ${currentTheme.button} rounded-lg transition-colors`}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
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
                className={`fixed top-16 right-4 z-40 rounded-xl shadow-xl p-4 w-80 ${currentTheme.panel} border backdrop-blur-md`}
              >
                {/* Story Atmosphere */}
                <div className="mb-6">
                  <p className="text-xs font-medium opacity-60 mb-3">STORY ATMOSPHERE</p>
                  <div className="p-3 rounded-lg border border-current/20 text-center">
                    <div className="text-sm opacity-80">
                      Dark mode optimized for {story.title}
                    </div>
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
                <div className="mb-6">
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

                {/* Focus Mode */}
                <div>
                  <p className="text-xs font-medium opacity-60 mb-3">FOCUS MODE</p>
                  <button
                    onClick={() => setFocusMode(!focusMode)}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      focusMode 
                        ? 'border-current bg-current/10' 
                        : 'border-current/20 hover:border-current/40'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">
                        {focusMode ? 'Disable Focus' : 'Enable Focus'}
                      </span>
                    </div>
                  </button>
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
                className={`fixed left-0 top-0 h-full w-80 shadow-xl z-50 overflow-y-auto ${currentTheme.bg} border-r ${currentTheme.panel.split(' ')[1]}`}
              >
                <div className="p-6 border-b border-current/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">{story.title}</h2>
                      <p className="text-sm opacity-60">{story.author}</p>
                    </div>
                    <button
                      onClick={() => setShowSidebar(false)}
                      className={`p-2 ${currentTheme.button} rounded-lg`}
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
                          : currentTheme.button
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
            style={{ 
              fontSize: `${fontSize}px`, 
              lineHeight: 1.7,
              ...(focusMode && {
                filter: 'blur(0px)',
                transition: 'all 0.3s ease'
              })
            }}
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
                <div className="space-y-6">
                  {chapter.content.map((paragraph, pIndex) => {
                    const bookmarkId = `${story.id}-${chapterIndex}-${pIndex}`
                    const isBookmarked = bookmarkedParagraphs.has(bookmarkId)
                    
                    return (
                      <div key={pIndex} className="group relative">
                        <p 
                          className={`leading-relaxed transition-all duration-300 ${
                            pIndex === 0 && chapterIndex === 0 
                              ? 'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-current' 
                              : ''
                          } ${
                            focusMode ? 'hover:opacity-100 opacity-50' : ''
                          }`}
                        >
                          {paragraph}
                        </p>
                        
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleBookmark(chapterIndex, pIndex)}
                          className={`absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded ${
                            isBookmarked ? 'text-yellow-400' : 'hover:text-yellow-400'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    )
                  })}
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
                className={`inline-flex items-center gap-2 px-6 py-3 ${currentTheme.accent} text-white rounded-lg hover:opacity-80 transition-opacity`}
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