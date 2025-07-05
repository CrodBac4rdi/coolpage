import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Home, ArrowUp, List, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface FloatingNavigationProps {
  onSettingsClick: () => void
  showScrollToTop: boolean
}

export default function FloatingNavigation({ onSettingsClick, showScrollToTop }: FloatingNavigationProps) {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    navigate(-1)
  }

  const goHome = () => {
    navigate('/')
  }

  const goToStories = () => {
    navigate('/stories')
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Expanded Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 sm:bottom-16 right-0 space-y-2 sm:space-y-3"
            >
              {/* Scroll to Top */}
              {showScrollToTop && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollToTop}
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/90 hover:bg-blue-500 text-white rounded-full backdrop-blur-sm shadow-lg transition-colors"
                  title="Nach oben scrollen"
                >
                  <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              )}

              {/* Settings */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onSettingsClick}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/90 hover:bg-purple-500 text-white rounded-full backdrop-blur-sm shadow-lg transition-colors"
                title="Lese-Einstellungen"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Stories List */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goToStories}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-pink-600/90 hover:bg-pink-500 text-white rounded-full backdrop-blur-sm shadow-lg transition-colors"
                title="Alle Stories"
              >
                <List className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Home */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goHome}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-600/90 hover:bg-green-500 text-white rounded-full backdrop-blur-sm shadow-lg transition-colors"
                title="Startseite"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Back */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={goBack}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gray-600/90 hover:bg-gray-500 text-white rounded-full backdrop-blur-sm shadow-lg transition-colors"
                title="Zurück"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full shadow-lg transition-all duration-300 ${
            isExpanded ? 'rotate-45' : ''
          }`}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="w-6 h-0.5 bg-white rounded-full" />
              <div className="w-6 h-0.5 bg-white rounded-full rotate-90 absolute top-0" />
            </div>
          </motion.div>
        </motion.button>

        {/* Pulse Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400/50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}