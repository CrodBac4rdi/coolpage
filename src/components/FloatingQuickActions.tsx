import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Volume2, Heart, Settings, Smartphone, HandMetal } from 'lucide-react'

interface FloatingQuickActionsProps {
  onVoiceToggle?: () => void
  onFavoriteToggle?: () => void
  onSettingsToggle?: () => void
  isReading?: boolean
}

export default function FloatingQuickActions({
  onVoiceToggle,
  onFavoriteToggle,
  onSettingsToggle,
  isReading = false
}: FloatingQuickActionsProps) {
  const [showHints, setShowHints] = useState(false)
  const [hasSeenHints, setHasSeenHints] = useState(false)

  useEffect(() => {
    // Show hints on first visit
    const seen = localStorage.getItem('crod-babylon-gesture-hints-seen')
    if (!seen && isReading) {
      setHasSeenHints(false)
      setTimeout(() => setShowHints(true), 2000)
    } else {
      setHasSeenHints(true)
    }
  }, [isReading])

  const dismissHints = () => {
    setShowHints(false)
    setHasSeenHints(true)
    localStorage.setItem('crod-babylon-gesture-hints-seen', 'true')
  }

  const gestures = [
    { icon: '👆', text: 'Doppeltippen: Einstellungen', action: 'Double-tap' },
    { icon: '👈', text: 'Wischen links: Nächstes Kapitel', action: 'Swipe left' },
    { icon: '👉', text: 'Wischen rechts: Zum Anfang', action: 'Swipe right' },
    { icon: '✋', text: 'Lang drücken: Favorit toggle', action: 'Long press' }
  ]

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setShowHints(!showHints)}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <HandMetal className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Gesture Hints Panel */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Touch Gesten
              </h3>
              <button
                onClick={dismissHints}
                className="text-white/60 hover:text-white text-2xl font-light"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {gestures.map((gesture, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                >
                  <span className="text-2xl">{gesture.icon}</span>
                  <div>
                    <div className="text-white font-medium text-sm">{gesture.text}</div>
                    <div className="text-white/60 text-xs">{gesture.action}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {!hasSeenHints && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <button
                  onClick={dismissHints}
                  className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-purple-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Verstanden, nicht mehr zeigen
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}