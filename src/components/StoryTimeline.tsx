import { motion } from 'framer-motion'
import { Clock, CheckCircle, Circle, Lock, Sparkles, BookOpen, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface TimelineEvent {
  id: string
  chapterNumber: number
  title: string
  description: string
  status: 'completed' | 'current' | 'locked'
  readingTime: number
  wordCount: number
  keyMoments?: string[]
  emotionalIntensity: 1 | 2 | 3 | 4 | 5
}

interface StoryTimelineProps {
  storyId: string
  chapters: any[]
  currentChapter: number
  readProgress: Record<string, number>
}

export default function StoryTimeline({ 
  storyId, 
  chapters, 
  currentChapter,
  readProgress 
}: StoryTimelineProps) {
  const navigate = useNavigate()
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null)
  const [totalProgress, setTotalProgress] = useState(0)

  useEffect(() => {
    // Calculate total progress across all chapters
    const progress = Object.values(readProgress).reduce((acc, curr) => acc + curr, 0) / chapters.length
    setTotalProgress(Math.round(progress))
  }, [readProgress, chapters.length])

  const getChapterStatus = (index: number): 'completed' | 'current' | 'locked' => {
    const chapterProgress = readProgress[`${storyId}-${index}`] || 0
    if (chapterProgress >= 98) return 'completed'
    if (index === currentChapter) return 'current'
    if (index > currentChapter && chapterProgress === 0) return 'locked'
    return 'current'
  }

  const getEmotionalColor = (intensity: number) => {
    const colors = [
      'from-blue-400 to-cyan-400',
      'from-green-400 to-emerald-400',
      'from-yellow-400 to-orange-400',
      'from-pink-400 to-red-400',
      'from-purple-400 to-pink-400'
    ]
    return colors[intensity - 1]
  }

  const timelineEvents: TimelineEvent[] = chapters.map((chapter, index) => ({
    id: `${storyId}-${index}`,
    chapterNumber: index + 1,
    title: chapter.title,
    description: chapter.description || chapter.content[0].substring(0, 100) + '...',
    status: getChapterStatus(index),
    readingTime: Math.ceil(chapter.content.join(' ').split(' ').length / 200),
    wordCount: chapter.content.join(' ').split(' ').length,
    keyMoments: chapter.keyMoments,
    emotionalIntensity: chapter.emotionalIntensity || 3
  }))

  return (
    <div className="w-full space-y-8">
      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Story Progress
          </h3>
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            {totalProgress}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-300">
          {timelineEvents.filter(e => e.status === 'completed').length} von {chapters.length} Kapiteln abgeschlossen
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50" />

        {/* Timeline Events */}
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredChapter(index)}
              onMouseLeave={() => setHoveredChapter(null)}
              className="relative"
            >
              {/* Timeline Node */}
              <motion.div
                className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center ${
                  event.status === 'completed' 
                    ? 'bg-green-500' 
                    : event.status === 'current'
                    ? 'bg-purple-500'
                    : 'bg-gray-600'
                } ${event.status !== 'locked' ? 'cursor-pointer' : ''}`}
                whileHover={event.status !== 'locked' ? { scale: 1.2 } : {}}
                onClick={() => event.status !== 'locked' && navigate(`/reader/${storyId}?chapter=${index}`)}
              >
                {event.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : event.status === 'current' ? (
                  <Circle className="w-5 h-5 text-white" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </motion.div>

              {/* Event Card */}
              <motion.div
                className={`ml-16 p-6 rounded-xl border transition-all ${
                  event.status === 'locked'
                    ? 'bg-gray-800/50 border-gray-700/50 opacity-50'
                    : hoveredChapter === index
                    ? 'bg-white/10 border-white/30 shadow-xl'
                    : 'bg-white/5 border-white/10'
                }`}
                animate={{
                  scale: hoveredChapter === index ? 1.02 : 1
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Kapitel {event.chapterNumber}: {event.title}
                    </h4>
                    <p className="text-sm text-gray-400">{event.description}</p>
                  </div>
                  {event.status !== 'locked' && (
                    <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getEmotionalColor(event.emotionalIntensity)}`}>
                      Intensität
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.readingTime} Min
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {event.wordCount.toLocaleString()} Wörter
                  </span>
                  {event.status === 'completed' && (
                    <span className="flex items-center gap-1 text-green-400">
                      <Sparkles className="w-3 h-3" />
                      Abgeschlossen
                    </span>
                  )}
                </div>

                {/* Key Moments (if available and unlocked) */}
                {event.keyMoments && event.status !== 'locked' && hoveredChapter === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <p className="text-xs font-medium text-purple-400 mb-2">Schlüsselmomente:</p>
                    <ul className="space-y-1">
                      {event.keyMoments.map((moment, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>{moment}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Progress Bar for Current Chapter */}
                {event.status === 'current' && readProgress[event.id] > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${readProgress[event.id]}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{readProgress[event.id]}% gelesen</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue Reading Button */}
      {currentChapter < chapters.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-8"
        >
          <button
            onClick={() => navigate(`/reader/${storyId}?chapter=${currentChapter}`)}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Weiterlesen
          </button>
        </motion.div>
      )}
    </div>
  )
}