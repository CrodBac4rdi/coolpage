import { motion, AnimatePresence } from 'framer-motion'
import { Focus, Eye, EyeOff } from 'lucide-react'

interface FocusModeControlProps {
  focusMode: boolean
  focusIntensity: 'light' | 'medium' | 'strong'
  onToggle: () => void
  onIntensityChange: (intensity: 'light' | 'medium' | 'strong') => void
}

export default function FocusModeControl({
  focusMode,
  focusIntensity,
  onToggle,
  onIntensityChange
}: FocusModeControlProps) {
  
  const intensityOptions = [
    { value: 'light', label: 'Leicht', icon: '🌤️', description: 'Sanfte Fokussierung' },
    { value: 'medium', label: 'Mittel', icon: '⚡', description: 'Ausgewogener Fokus' },
    { value: 'strong', label: 'Stark', icon: '🔥', description: 'Maximale Konzentration' }
  ] as const

  return (
    <>
      {/* Focus Mode Toggle Button */}
      <motion.button
        onClick={onToggle}
        className={`fixed bottom-8 left-8 z-50 p-4 rounded-full backdrop-blur-sm border transition-all ${
          focusMode
            ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
            : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={focusMode ? 'Focus Mode deaktivieren' : 'Focus Mode aktivieren'}
      >
        <AnimatePresence mode="wait">
          {focusMode ? (
            <motion.div
              key="on"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <Eye className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="off"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
            >
              <EyeOff className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Focus Mode Settings Panel */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-8 left-24 z-40 bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Focus className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Focus Mode</h3>
            </div>

            <div className="space-y-3">
              {intensityOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => onIntensityChange(option.value)}
                  className={`w-full p-3 rounded-xl border transition-all flex items-center gap-3 ${
                    focusIntensity === option.value
                      ? 'bg-purple-500/20 border-purple-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs opacity-70">{option.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Focus Mode hebt den aktuellen Absatz hervor und dimmt den Rest für bessere Konzentration.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Focus Indicator */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50"
          >
            <motion.div
              className="h-full bg-white/50"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}