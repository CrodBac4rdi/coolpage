import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Square, Volume2, Settings } from 'lucide-react'
import { useState } from 'react'
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis'

interface VoiceControlsProps {
  text: string
  className?: string
}

export default function VoiceControls({ text, className = '' }: VoiceControlsProps) {
  const [showSettings, setShowSettings] = useState(false)
  const {
    isSupported,
    isPlaying,
    isPaused,
    voices,
    voiceSettings,
    speak,
    pause,
    resume,
    stop,
    updateSettings
  } = useSpeechSynthesis()

  if (!isSupported || !voiceSettings.enabled) {
    return null
  }

  const handlePlayPause = () => {
    if (isPlaying && !isPaused) {
      pause()
    } else if (isPaused) {
      resume()
    } else {
      speak(text)
    }
  }

  return (
    <div className={className ? `relative ${className}` : 'relative'}>
      {/* Main Controls */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={handlePlayPause}
          className="flex items-center justify-center w-10 h-10 bg-purple-600/20 hover:bg-purple-600/30 backdrop-blur-sm rounded-full border border-purple-400/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying && !isPaused ? (
            <Pause className="w-5 h-5 text-purple-300" />
          ) : (
            <Play className="w-5 h-5 text-purple-300" />
          )}
        </motion.button>

        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={stop}
            className="flex items-center justify-center w-8 h-8 bg-red-600/20 hover:bg-red-600/30 backdrop-blur-sm rounded-full border border-red-400/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Square className="w-4 h-4 text-red-300" />
          </motion.button>
        )}

        <motion.button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center justify-center w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings className="w-4 h-4 text-white/60" />
        </motion.button>
      </div>

      {/* Voice Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-12 left-0 z-50 w-80 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl p-4"
          >
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Voice Einstellungen
            </h3>

            {/* Rate */}
            <div className="mb-3">
              <label className="block text-xs text-white/60 mb-1">
                Geschwindigkeit: {voiceSettings.rate.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.rate}
                onChange={(e) => updateSettings({ rate: Number(e.target.value) })}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Volume */}
            <div className="mb-3">
              <label className="block text-xs text-white/60 mb-1">
                Lautstärke: {Math.round(voiceSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceSettings.volume}
                onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Voice Selection */}
            <div className="mb-3">
              <label className="block text-xs text-white/60 mb-1">Stimme</label>
              <select
                value={voiceSettings.voice}
                onChange={(e) => updateSettings({ voice: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="" className="bg-gray-800">Standard</option>
                {voices
                  .filter(voice => voice.lang.startsWith('de') || voice.lang.startsWith('en'))
                  .map(voice => (
                    <option key={voice.name} value={voice.name} className="bg-gray-800">
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
              </select>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
            >
              Schließen
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}