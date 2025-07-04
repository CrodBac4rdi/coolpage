import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowLeft, Settings, Eye, Clock, Hash } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import { useEnhancedStoryLoader } from '../utils/enhancedStoryLoader'
import type { EnhancedStory, ReaderPreferences } from '../types/story'
import { isEnhancedChapter } from '../types/story'
import ScrollProgressBar from './ScrollProgressBar'
import { useAchievements } from '../hooks/useAchievements'
import AchievementNotification from './AchievementNotification'
import { useFocusMode } from '../hooks/useFocusMode'
import { useAmbientMode } from '../hooks/useAmbientMode'
import AmbientBackground from './AmbientBackground'

// Enhanced Reader Component for long-form chapters
export default function EnhancedReader() {
  const { id } = useParams<{ id: string }>()
  const [story, setStory] = useState<EnhancedStory | null>(null)
  const [currentChapter, setCurrentChapter] = useState<number>(1)
  const [chapterContent, setChapterContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // UI State
  const [showMenu, setShowMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  // Reading Progress
  const [readingProgress, setReadingProgress] = useState(0)
  const [readTime, setReadTime] = useState(0)
  
  // Reader Preferences
  const [preferences, setPreferences] = useState<ReaderPreferences>({
    fontSize: 'medium',
    fontFamily: 'serif',
    theme: 'dark',
    lineHeight: 'normal',
    maxWidth: 'medium',
    autoScroll: false,
    focusMode: false,
    ambientMode: true,
    soundEffects: true
  })

  const storyLoader = useEnhancedStoryLoader()
  const readerRef = useRef<HTMLDivElement>(null)
  
  // Hooks
  const { 
    showNotification
  } = useAchievements()
  
  const {
    getFocusStyles
  } = useFocusMode()
  
  const {
    config
  } = useAmbientMode()

  // Load story and initial chapter
  useEffect(() => {
    if (!id) return

    const loadStory = async () => {
      try {
        setLoading(true)
        const storyData = await storyLoader.loadStoryMetadata(id)
        setStory(storyData)
        
        // Load first chapter
        const chapterData = await storyLoader.loadChapter(id, 1)
        setChapterContent(chapterData.content)
        
        // Preload next chapters
        await storyLoader.preloadNextChapters(id, 1, 3)
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to load story:', error)
        setError('Story could not be loaded')
        setLoading(false)
      }
    }

    loadStory()
  }, [id, storyLoader])

  // Load chapter when currentChapter changes
  useEffect(() => {
    if (!id || !story) return

    const loadChapter = async () => {
      try {
        setLoading(true)
        const chapterData = await storyLoader.loadChapter(id, currentChapter)
        setChapterContent(chapterData.content)
        
        // Preload next chapters
        await storyLoader.preloadNextChapters(id, currentChapter, 2)
        
        // Reset reading progress for new chapter
        setReadingProgress(0)
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to load chapter:', error)
        setError('Chapter could not be loaded')
        setLoading(false)
      }
    }

    loadChapter()
  }, [currentChapter, id, story, storyLoader])

  // Track reading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setReadTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Calculate reading statistics
  const getCurrentChapter = () => {
    return story?.chapters.find(c => c.id === currentChapter)
  }

  const formatReadTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (): number => {
    if (!story) return 0
    const currentIndex = story.chapters.findIndex(c => c.id === currentChapter)
    return ((currentIndex + readingProgress) / story.chapters.length) * 100
  }

  // Navigation functions
  const goToChapter = async (chapterId: number) => {
    if (!story) return
    
    const chapter = story.chapters.find(c => c.id === chapterId)
    if (chapter) {
      setCurrentChapter(chapterId)
      setShowMenu(false)
      
      // Scroll to top
      readerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToNextChapter = () => {
    if (!story) return
    
    const currentIndex = story.chapters.findIndex(c => c.id === currentChapter)
    if (currentIndex < story.chapters.length - 1) {
      const nextChapter = story.chapters[currentIndex + 1]
      goToChapter(nextChapter.id)
    }
  }

  const goToPreviousChapter = () => {
    if (!story) return
    
    const currentIndex = story.chapters.findIndex(c => c.id === currentChapter)
    if (currentIndex > 0) {
      const prevChapter = story.chapters[currentIndex - 1]
      goToChapter(prevChapter.id)
    }
  }

  // Preference handlers
  const updatePreference = <K extends keyof ReaderPreferences>(
    key: K,
    value: ReaderPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  // Font size utilities
  const getFontSizeClass = () => {
    const sizes = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      xl: 'text-xl'
    }
    return sizes[preferences.fontSize]
  }

  const getLineHeightClass = () => {
    const heights = {
      compact: 'leading-relaxed',
      normal: 'leading-loose',
      relaxed: 'leading-loose'
    }
    return heights[preferences.lineHeight]
  }

  const getMaxWidthClass = () => {
    const widths = {
      narrow: 'max-w-2xl',
      medium: 'max-w-4xl',
      wide: 'max-w-6xl'
    }
    return widths[preferences.maxWidth]
  }

  // Render markdown content with enhanced formatting
  const renderContent = (content: string) => {
    // Simple markdown parsing for enhanced display
    const paragraphs = content.split('\n\n').filter(p => p.trim())
    
    return paragraphs.map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-4xl font-bold mb-6 text-center">
            {paragraph.replace('# ', '')}
          </h1>
        )
      }
      
      // Handle subheaders
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        )
      }
      
      // Handle italic text
      if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
        return (
          <p key={index} className={`mb-4 italic text-center text-gray-400 ${getFontSizeClass()} ${getLineHeightClass()}`}>
            {paragraph.replace(/^\*|\*$/g, '')}
          </p>
        )
      }
      
      // Handle separators
      if (paragraph.trim() === '---') {
        return (
          <div key={index} className="flex justify-center my-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        )
      }
      
      // Regular paragraphs
      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`mb-6 ${getFontSizeClass()} ${getLineHeightClass()}`}
        >
          {paragraph}
        </motion.p>
      )
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading story...</div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error || 'Story not found'}</div>
      </div>
    )
  }

  const chapter = getCurrentChapter()

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Ambient Background */}
      {preferences.ambientMode && (
        <AmbientBackground 
          mood="romantic"
          intensity={config.intensity}
          particlesEnabled={true}
          particleConfig={null}
        />
      )}
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <Link to="/stories" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              <Clock className="w-4 h-4 inline mr-1" />
              {formatReadTime(readTime)}
            </div>
            
            <div className="text-sm text-gray-400">
              Chapter {currentChapter} of {story.chapters.length}
            </div>
            
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <ScrollProgressBar />
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700 z-50 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Reading Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Font Size */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <div className="flex space-x-2">
                {(['small', 'medium', 'large', 'xl'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updatePreference('fontSize', size)}
                    className={`px-3 py-1 rounded ${
                      preferences.fontSize === size 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Font Family</label>
              <select
                value={preferences.fontFamily}
                onChange={(e) => updatePreference('fontFamily', e.target.value as any)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
              >
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="mono">Monospace</option>
              </select>
            </div>

            {/* Reading Width */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Reading Width</label>
              <div className="flex space-x-2">
                {(['narrow', 'medium', 'wide'] as const).map(width => (
                  <button
                    key={width}
                    onClick={() => updatePreference('maxWidth', width)}
                    className={`px-3 py-1 rounded ${
                      preferences.maxWidth === width 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {width.charAt(0).toUpperCase() + width.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Mode Control */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Focus Mode</label>
              <button
                onClick={() => updatePreference('focusMode', !preferences.focusMode)}
                className={`px-4 py-2 rounded ${
                  preferences.focusMode ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {preferences.focusMode ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            
            {/* Ambient Mode Controls */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Ambient Mode</label>
              <button
                onClick={() => updatePreference('ambientMode', !preferences.ambientMode)}
                className={`px-4 py-2 rounded ${
                  preferences.ambientMode ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {preferences.ambientMode ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-gray-800 border-r border-gray-700 z-50 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Chapters</h3>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-2">
              {story.chapters.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => goToChapter(chap.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    chap.id === currentChapter
                      ? 'bg-red-500/20 border border-red-500/30'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{chap.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{chap.title}</div>
                      {isEnhancedChapter(chap) && (
                        <div className="text-sm text-gray-400 flex items-center space-x-2 mt-1">
                          <span>{chap.wordCount} words</span>
                          <span>•</span>
                          <span>{chap.readTime} min read</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div 
        ref={readerRef}
        className={`pt-20 pb-20 px-6 mx-auto ${getMaxWidthClass()} ${
          preferences.fontFamily === 'serif' ? 'font-serif' : 
          preferences.fontFamily === 'mono' ? 'font-mono' : 'font-sans'
        }`}
        style={getFocusStyles(false)}
      >
        {/* Chapter Header */}
        {chapter && (
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{chapter.emoji}</div>
            <h1 className="text-4xl font-bold mb-2">{chapter.title}</h1>
            {isEnhancedChapter(chapter) && chapter.subtitle && (
              <p className="text-xl text-gray-400 mb-4">{chapter.subtitle}</p>
            )}
            
            {isEnhancedChapter(chapter) && (
              <div className="flex justify-center items-center space-x-6 text-sm text-gray-400 mb-8">
                <div className="flex items-center space-x-1">
                  <Hash className="w-4 h-4" />
                  <span>{chapter.wordCount} words</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{chapter.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{chapter.metadata.pov}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {renderContent(chapterContent)}
        </div>

        {/* Chapter Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-800">
          <button
            onClick={goToPreviousChapter}
            disabled={story.chapters.findIndex(c => c.id === currentChapter) === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-400">
              {Math.round(getProgressPercentage())}% Complete
            </div>
          </div>

          <button
            onClick={goToNextChapter}
            disabled={story.chapters.findIndex(c => c.id === currentChapter) === story.chapters.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>

      {/* Floating Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-40"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Achievement Notifications */}
      {showNotification && (
        <AchievementNotification 
          achievement={{ id: 'test', title: 'Test', description: 'Test', icon: '🎉', rarity: 'common' }}
          onClose={() => {}}
        />
      )}
    </div>
  )
}