import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Book, Clock, Settings, Plus, Minus, Heart } from 'lucide-react'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useGestures } from '../hooks/useGestures'
import { useFavorites } from '../hooks/useFavorites'
import { useStoryTheme } from '../hooks/useStoryTheme'
import { useReadingAnalytics } from '../hooks/useReadingAnalytics'
import VoiceControls from './VoiceControls'
import { cn } from '../utils/cn'
import FloatingQuickActions from './FloatingQuickActions'
// import ParticleBackground from './ParticleBackground' // Removed

interface Story {
  id: string
  title: string
  author: string
  description: string
  chapters: Array<{
    id: number
    title: string
    emoji?: string
    content: string[]
  }>
}

const ContinuousReader: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const navigate = useNavigate()
  const scrollDirection = useScrollDirection()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [readingPrefs, setReadingPrefs] = useLocalStorage('crod-babylon-reading', {
    fontSize: 18,
    fontFamily: 'Inter'
  })
  const [showSettings, setShowSettings] = useState(false)
  const { toggleFavorite, isFavorite } = useFavorites()
  const isStoryFavorite = story ? isFavorite(story.id) : false
  const { theme, themeSettings, updateThemeSettings } = useStoryTheme(storyId || '')
  
  // Reading analytics
  const { startSession, endSession, trackChapterRead, trackActivity } = useReadingAnalytics(storyId)
  
  // Voice synthesis for current chapter
  const [currentChapterText, setCurrentChapterText] = useState('')
  
  // Gesture handling
  const { elementRef } = useGestures({
    onSwipeLeft: () => {
      // Navigate to next chapter or story
      if (story && story.chapters.length > 1) {
        // Scroll to next chapter
        const nextChapter = document.querySelector('[data-chapter="' + (story.chapters.length) + '"]')
        if (nextChapter) nextChapter.scrollIntoView({ behavior: 'smooth' })
      }
    },
    onSwipeRight: () => {
      // Navigate to previous chapter or back
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    onDoubleTap: () => {
      // Toggle reading settings
      setShowSettings(!showSettings)
    },
    onLongPress: () => {
      // Toggle favorite
      if (story) toggleFavorite(story.id)
    }
  })

  useEffect(() => {
    const loadStory = async () => {
      if (!storyId) return
      
      try {
        setLoading(true)
        // Direct import from data directory (faster)
        const storyModule = await import(`../data/stories/${storyId}.json`)
        setStory(storyModule.default)
        
        // Start reading analytics session
        if (storyModule.default) {
          startSession(storyId)
        }
      } catch (err) {
        console.error('Error loading story:', err)
        setError('Story not found')
      } finally {
        setLoading(false)
      }
    }

    loadStory()

    // End session when component unmounts
    return () => {
      endSession()
    }
  }, [storyId])



  if (loading) {
    return (
      <div className={cn('min-h-screen bg-gradient-to-br flex items-center justify-center', ...(theme.background?.split(' ') || []))}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className={cn('min-h-screen bg-gradient-to-br flex items-center justify-center', ...(theme.background?.split(' ') || []))}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{error || 'Story not found'}</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const contentJSX = (
    <div 
      ref={elementRef}
      className={cn('min-h-screen bg-gradient-to-br relative', ...(theme.background?.split(' ') || []))} 
      style={{ fontFamily: readingPrefs.fontFamily }}
      onScroll={trackActivity}
      onClick={trackActivity}
    >
      {/* Dynamic Particle Background - Removed for optimization */}
      {/* <ParticleBackground 
        color={theme.particles || 'purple'}
        mood={theme.mood}
        enabled={themeSettings.enableParticles}
        density={themeSettings.intensity}
      /> */}
      {/* Auto-Hide Header */}
      <div className={cn('fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 transition-transform duration-300', scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0')}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-white">{story.title}</h1>
                <p className="text-sm text-gray-300">von {story.author}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Voice Controls */}
              <VoiceControls 
                text={currentChapterText}
                className="mr-2"
              />
              
              {/* Favorite Toggle */}
              <button
                onClick={() => toggleFavorite(story.id)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Heart className={cn('w-5 h-5', isStoryFavorite ? 'fill-red-500 text-red-500' : 'text-white')} />
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-4 z-50 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 sm:w-80">
          <h3 className="text-lg font-bold text-white mb-4">Lese-Einstellungen</h3>
          
          {/* Font Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Schriftgröße</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setReadingPrefs(prev => ({ ...prev, fontSize: Math.max(12, prev.fontSize - 2) }))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Minus className="w-4 h-4 text-white" />
              </button>
              <span className="text-white font-medium w-12 text-center">{readingPrefs.fontSize}px</span>
              <button
                onClick={() => setReadingPrefs(prev => ({ ...prev, fontSize: Math.min(28, prev.fontSize + 2) }))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Font Family */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Schriftart</label>
            <select
              value={readingPrefs.fontFamily}
              onChange={(e) => setReadingPrefs(prev => ({ ...prev, fontFamily: e.target.value }))}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
            >
              <option value="Inter" className="bg-gray-800">Inter (Standard)</option>
              <option value="Georgia" className="bg-gray-800">Georgia (Serif)</option>
              <option value="Crimson Pro" className="bg-gray-800">Crimson Pro (Elegant)</option>
              <option value="ui-monospace" className="bg-gray-800">Monospace</option>
            </select>
          </div>

          {/* Theme Effects */}
          <div className="mb-6 p-3 bg-white/5 rounded-lg">
            <h4 className="text-sm font-bold text-white mb-3">Atmosphäre Effekte</h4>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Dynamisches Theming</span>
                <input
                  type="checkbox"
                  checked={themeSettings.enableDynamicTheming}
                  onChange={(e) => updateThemeSettings({...themeSettings, enableDynamicTheming: e.target.checked})}
                  className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded"
                />
              </label>
              
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Partikel Effekte</span>
                <input
                  type="checkbox"
                  checked={themeSettings.enableParticles}
                  onChange={(e) => updateThemeSettings({...themeSettings, enableParticles: e.target.checked})}
                  className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded"
                />
              </label>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Effekt Intensität: {Math.round(themeSettings.intensity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={themeSettings.intensity}
                  onChange={(e) => updateThemeSettings({...themeSettings, intensity: Number(e.target.value)})}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {/* Story Mood Indicator */}
            <div className="mt-3 p-2 bg-black/30 rounded text-center">
              <span className="text-xs text-gray-400">Aktuelle Stimmung: </span>
              <span className={cn('text-xs font-medium', ...(theme.accent?.split(' ') || []))}>
                {theme.mood === 'romantic' ? '💕 Romantisch' :
                 theme.mood === 'mysterious' ? '🌙 Mysteriös' :
                 theme.mood === 'adventure' ? '⚡ Abenteuer' :
                 theme.mood === 'dramatic' ? '🎭 Dramatisch' :
                 theme.mood === 'fantasy' ? '✨ Fantasy' : '🎯 Modern'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Schließen
          </button>
        </div>
      )}

      {/* Overlay to close settings */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-8">
        <div className="space-y-8 sm:space-y-12">
          {story.chapters.map((chapter, index) => {
            const chapterText = chapter.content.join(' ')
            
            return (
            <div 
              key={chapter.id} 
              data-chapter={chapter.id}
              className={cn('p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-sm border', ...(theme.border?.split(' ') || []))}
              onMouseEnter={() => {
                setCurrentChapterText(chapterText)
                trackChapterRead(chapter.id, chapter.content.length * 50) // Estimate word count
              }}
            >
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 mb-2 flex-wrap">
                  <span className="text-xl sm:text-2xl">{chapter.emoji || '📖'}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Kapitel {chapter.id}: {chapter.title}
                  </h2>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Book className="w-4 h-4" />
                    <span>~{chapter.content.length * 50} Wörter</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{Math.ceil(chapter.content.length * 50 / 200)} Min. Lesezeit</span>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                {chapter.content.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className="mb-4 leading-relaxed text-gray-200"
                    style={{ fontSize: `${readingPrefs.fontSize}px` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            )
          })}
        </div>
      </div>

      {/* Floating Quick Actions */}
      <FloatingQuickActions 
        onSettingsToggle={() => setShowSettings(!showSettings)}
        onFavoriteToggle={() => toggleFavorite(story.id)}
        isReading={true}
      />

    </div>
  )

  return contentJSX
}

export default ContinuousReader