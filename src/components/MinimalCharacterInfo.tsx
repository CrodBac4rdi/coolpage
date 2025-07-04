import { motion, AnimatePresence } from 'framer-motion'
import { User, Heart, Brain, Sparkles } from 'lucide-react'
import type { Character } from '../data/characters'

interface MinimalCharacterInfoProps {
  character: Character
  isActive?: boolean
}

export default function MinimalCharacterInfo({ character, isActive = false }: MinimalCharacterInfoProps) {
  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="fixed bottom-6 left-6 max-w-sm"
      >
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
          {/* Character Name */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{character.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{character.role}</p>
            </div>
          </div>

          {/* Subtle mood indicators */}
          <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>Emotional</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              <span>Thoughtful</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Inspired</span>
            </div>
          </div>

          {/* Minimal progress bar */}
          <div className="mt-3 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-400 to-gray-600"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}