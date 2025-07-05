import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, BookOpen } from 'lucide-react'

interface StoryPreviewProps {
  story: {
    id: string
    title: string
    description: string
    chapters: Array<{
      title: string
      content: string[]
    }>
  }
  isOpen: boolean
  onClose: () => void
}

export default function StoryPreview({ story, isOpen, onClose }: StoryPreviewProps) {
  if (!story || !isOpen) return null

  const firstChapter = story.chapters[0]
  const previewText = firstChapter?.content.slice(0, 3).join(' ') || ''

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Preview Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.6 
            }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-50 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            {/* Content */}
            <div className="h-full flex flex-col p-6 sm:p-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-6"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-purple-400" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{story.title}</h2>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">{story.description}</p>
              </motion.div>

              {/* Preview Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex-1 overflow-auto"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      {firstChapter?.title || 'Erstes Kapitel'}
                    </h3>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-200 leading-relaxed text-lg">
                        {previewText}
                        <span className="text-gray-400 italic">... [Preview-Ende]</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 mt-6 justify-center"
              >
                <motion.button
                  onClick={onClose}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schließen
                </motion.button>
                
                <motion.a
                  href={`#/reader/${story.id}`}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Story lesen
                </motion.a>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}