import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Settings } from 'lucide-react'
import { enhancedStoryLoader } from '../utils/enhancedStoryLoader'
import type { EnhancedStory, EnhancedChapter } from '../types/story'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

const ContinuousReader: React.FC = () => {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState<EnhancedStory | null>(null)
  const [allChapters, setAllChapters] = useState<EnhancedChapter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState(18)
  const [showSettings, setShowSettings] = useState(false)

  // Story-specific themes
  const storyThemes = {
    'forbidden-desire': {
      background: 'from-red-950 via-red-900 to-black',
      accent: 'text-red-300',
      border: 'border-red-800'
    },
    'moonlight-academy': {
      background: 'from-blue-950 via-blue-900 to-black',
      accent: 'text-blue-300',
      border: 'border-blue-800'
    },
    'code-breakers': {
      background: 'from-green-950 via-green-900 to-black',
      accent: 'text-green-300',
      border: 'border-green-800'
    }
  } as const

  const currentTheme = storyThemes[storyId as keyof typeof storyThemes] || storyThemes['forbidden-desire']

  // Configure marked for better formatting
  marked.setOptions({
    breaks: true,
    gfm: true
  })

  const formatContent = (content: string): string => {
    // Convert markdown to HTML
    const html = marked(content)
    // Sanitize the HTML
    return DOMPurify.sanitize(html)
  }

  useEffect(() => {
    const loadStory = async () => {
      if (!storyId) return
      
      try {
        setLoading(true)
        const loadedStory = await enhancedStoryLoader.loadStory(storyId)
        setStory(loadedStory)
        
        // Load all chapters
        const chapters = await Promise.all(
          loadedStory.chapters.map(async (chapter) => {
            try {
              return await enhancedStoryLoader.loadChapter(storyId, chapter.id)
            } catch (err) {
              console.warn(`Failed to load chapter ${chapter.id}:`, err)
              return null
            }
          })
        )
        
        setAllChapters(chapters.filter(Boolean) as EnhancedChapter[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load story')
      } finally {
        setLoading(false)
      }
    }

    loadStory()
  }, [storyId])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Lade Geschichte...</p>
        </div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Fehler beim Laden der Geschichte</p>
          <button
            onClick={() => navigate('/stories')}
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Zurück zu den Geschichten
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background} text-white`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/stories')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück
          </button>
          
          <div className="text-center">
            <h1 className={`text-lg font-bold ${currentTheme.accent}`}>{story.title}</h1>
            <p className="text-sm text-gray-400">{allChapters.length} Kapitel • Continuous Reading</p>
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-gray-900/95 border-t border-gray-800 px-4 py-3">
            <div className="max-w-4xl mx-auto flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Schriftgröße:</span>
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm">{fontSize}</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded text-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Story Info */}
        <div className="mb-12 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${currentTheme.accent}`}>{story.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{story.description}</p>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <span>📚 {allChapters.length} Kapitel</span>
            <span>⏱️ {allChapters.reduce((total, ch) => total + ch.readTime, 0)} Min. Lesezeit</span>
            <span>📝 {allChapters.reduce((total, ch) => total + ch.wordCount, 0).toLocaleString()} Wörter</span>
          </div>
        </div>

        {/* All Chapters */}
        <div className="space-y-16">
          {allChapters.map((chapter, index) => (
            <article
              key={chapter.id}
              className={`border-l-4 ${currentTheme.border} pl-8 py-6`}
            >
              {/* Chapter Header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-sm ${currentTheme.accent} font-medium`}>
                    Kapitel {index + 1}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {chapter.readTime} Min. • {chapter.wordCount.toLocaleString()} Wörter
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
                {chapter.subtitle && (
                  <p className="text-lg text-gray-400 italic">{chapter.subtitle}</p>
                )}
              </header>

              {/* Chapter Content */}
              <div 
                className="prose prose-invert prose-lg max-w-none prose-p:text-gray-100 prose-p:leading-relaxed prose-strong:text-white prose-em:text-gray-300"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: formatContent(chapter.content) }}
              />

              {/* Chapter Footer */}
              <footer className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {chapter.metadata && (
                    <>
                      <span>👤 {chapter.metadata.pov}</span>
                      <span>📍 {chapter.metadata.setting}</span>
                      <span>🎭 {chapter.metadata.characters.join(', ')}</span>
                    </>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* Story End */}
        <div className="mt-16 text-center py-12">
          <div className={`inline-block px-6 py-3 border ${currentTheme.border} rounded-lg`}>
            <p className={`text-lg ${currentTheme.accent} mb-2`}>Ende der Geschichte</p>
            <p className="text-gray-400">Danke fürs Lesen!</p>
          </div>
          
          <div className="mt-8">
            <button
              onClick={() => navigate('/stories')}
              className={`px-6 py-3 bg-gradient-to-r ${currentTheme.background} border ${currentTheme.border} rounded-lg hover:opacity-80 transition-opacity`}
            >
              Mehr Geschichten entdecken
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContinuousReader