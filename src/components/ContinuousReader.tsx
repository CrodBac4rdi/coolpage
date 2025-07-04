import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Type, Book, Clock } from 'lucide-react'

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
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    const loadStory = async () => {
      if (!storyId) return
      
      try {
        setLoading(true)
        // Direct import from data directory (faster)
        const storyModule = await import(`../data/stories/${storyId}.json`)
        setStory(storyModule.default)
      } catch (err) {
        console.error('Error loading story:', err)
        setError('Story not found')
      } finally {
        setLoading(false)
      }
    }

    loadStory()
  }, [storyId])

  // Story-specific themes
  const storyThemes = {
    'forbidden-desire': {
      background: 'from-red-950 via-red-900 to-black',
      accent: 'text-red-300',
      border: 'border-red-800'
    },
    'moonlight-academy': {
      background: 'from-purple-950 via-blue-900 to-black',
      accent: 'text-purple-300',
      border: 'border-purple-800'
    },
    'code-breakers': {
      background: 'from-green-950 via-emerald-900 to-black',
      accent: 'text-green-300',
      border: 'border-green-800'
    },
    'dream-catcher': {
      background: 'from-indigo-950 via-purple-900 to-black',
      accent: 'text-indigo-300',
      border: 'border-indigo-800'
    },
    'my-boss-is-a-cat': {
      background: 'from-orange-950 via-amber-900 to-black',
      accent: 'text-orange-300',
      border: 'border-orange-800'
    },
    'shadow-in-mirror': {
      background: 'from-gray-950 via-slate-900 to-black',
      accent: 'text-slate-300',
      border: 'border-slate-800'
    },
    'the-transfer-student': {
      background: 'from-pink-950 via-rose-900 to-black',
      accent: 'text-pink-300',
      border: 'border-pink-800'
    },
    'between-the-lines': {
      background: 'from-blue-950 via-cyan-900 to-black',
      accent: 'text-blue-300',
      border: 'border-blue-800'
    },
    'cafe-encounters': {
      background: 'from-yellow-950 via-amber-900 to-black',
      accent: 'text-yellow-300',
      border: 'border-yellow-800'
    },
    'dangerous-attraction': {
      background: 'from-violet-950 via-purple-900 to-black',
      accent: 'text-violet-300',
      border: 'border-violet-800'
    },
    'midnight-confessions': {
      background: 'from-sky-950 via-blue-900 to-black',
      accent: 'text-sky-300',
      border: 'border-sky-800'
    },
    'summer-temptation': {
      background: 'from-teal-950 via-emerald-900 to-black',
      accent: 'text-teal-300',
      border: 'border-teal-800'
    },
    default: {
      background: 'from-slate-950 via-gray-900 to-black',
      accent: 'text-slate-300',
      border: 'border-slate-800'
    }
  }

  const theme = storyThemes[storyId as keyof typeof storyThemes] || storyThemes.default

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error || !story) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background}`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">{story.title}</h1>
                <p className="text-xs sm:text-sm text-gray-300">von {story.author}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Type className="w-4 h-4 text-gray-400" />
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                >
                  <option value={14} className="bg-gray-800">14px</option>
                  <option value={16} className="bg-gray-800">16px</option>
                  <option value={18} className="bg-gray-800">18px</option>
                  <option value={20} className="bg-gray-800">20px</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-8 sm:space-y-12">
          {story.chapters.map((chapter, index) => (
            <div key={chapter.id} className={`p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-sm border ${theme.border}`}>
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
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContinuousReader