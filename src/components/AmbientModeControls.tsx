import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Sparkles, Volume2, X, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { MoodType } from '../hooks/useAmbientMode'

interface AmbientModeControlsProps {
  config: {
    mood: MoodType
    intensity: number
    particlesEnabled: boolean
    colorShiftEnabled: boolean
  }
  currentKeywords: string[]
  onMoodChange: (mood: MoodType) => void
  onIntensityChange: (intensity: number) => void
  onToggleParticles: () => void
  onToggleColorShift: () => void
  moodPresets: Record<MoodType, any>
}

export default function AmbientModeControls({
  config,
  currentKeywords,
  onMoodChange,
  onIntensityChange,
  onToggleParticles,
  onToggleColorShift,
  moodPresets: _moodPresets
}: AmbientModeControlsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)

  const moodInfo: Record<MoodType, { label: string, icon: string }> = {
    romantic: { label: 'Romantisch', icon: '💕' },
    tense: { label: 'Spannend', icon: '😰' },
    mysterious: { label: 'Mysteriös', icon: '🔮' },
    peaceful: { label: 'Friedlich', icon: '🕊️' },
    exciting: { label: 'Aufregend', icon: '🎯' },
    melancholic: { label: 'Melancholisch', icon: '🌧️' },
    default: { label: 'Standard', icon: '✨' }
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Palette className="w-6 h-6 text-white" />
      </motion.button>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed ${isMinimized ? 'bottom-6 right-6' : 'top-0 right-0 h-full'} z-50 ${
                isMinimized ? 'w-80' : 'w-full md:w-96'
              } bg-gray-900/95 backdrop-blur-xl border ${
                isMinimized ? 'rounded-2xl border-white/20' : 'border-l border-white/10'
              } shadow-2xl`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Ambient Mode</h3>
                    <p className="text-xs text-gray-400">Dynamische Stimmung</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                      isMinimized ? 'rotate-90' : '-rotate-90'
                    }`} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                {/* Current Mood */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Aktuelle Stimmung</span>
                    <span className="text-2xl">{moodInfo[config.mood].icon}</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{moodInfo[config.mood].label}</p>
                  {currentKeywords.length > 0 && config.colorShiftEnabled && (
                    <p className="text-xs text-purple-400 mt-2">
                      Erkannt: {currentKeywords.join(', ')}
                    </p>
                  )}
                </div>

                {/* Mood Selector */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 block">
                    Stimmung wählen
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(moodInfo).map(([mood, info]) => (
                      <button
                        key={mood}
                        onClick={() => onMoodChange(mood as MoodType)}
                        className={`p-3 rounded-lg border transition-all ${
                          config.mood === mood
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xl mb-1 block">{info.icon}</span>
                        <span className="text-xs text-white">{info.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity Slider */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-3 flex items-center justify-between">
                    <span>Intensität</span>
                    <span className="text-purple-400">{config.intensity}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.intensity}
                    onChange={(e) => onIntensityChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #8b5cf6 0%, #ec4899 ${config.intensity}%, rgba(255, 255, 255, 0.1) ${config.intensity}%)`
                    }}
                  />
                </div>

                {/* Toggle Options */}
                <div className="space-y-3">
                  <button
                    onClick={onToggleParticles}
                    className={`w-full p-4 rounded-lg border transition-all flex items-center justify-between ${
                      config.particlesEnabled
                        ? 'bg-purple-500/20 border-purple-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Partikel-Effekte</p>
                        <p className="text-xs text-gray-400">Schwebende Elemente</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      config.particlesEnabled ? 'bg-purple-500' : 'bg-gray-600'
                    }`}>
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full"
                        animate={{ x: config.particlesEnabled ? 26 : 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </button>

                  <button
                    onClick={onToggleColorShift}
                    className={`w-full p-4 rounded-lg border transition-all flex items-center justify-between ${
                      config.colorShiftEnabled
                        ? 'bg-purple-500/20 border-purple-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-purple-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Auto-Anpassung</p>
                        <p className="text-xs text-gray-400">Stimmung nach Text</p>
                      </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      config.colorShiftEnabled ? 'bg-purple-500' : 'bg-gray-600'
                    }`}>
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full"
                        animate={{ x: config.colorShiftEnabled ? 26 : 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </button>
                </div>

                {/* Info */}
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                  <p className="text-xs text-purple-300 leading-relaxed">
                    Ambient Mode passt die Atmosphäre deiner Leseerfahrung an. 
                    {config.colorShiftEnabled && ' Die Stimmung wird automatisch basierend auf dem Text angepasst.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}