import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Maximize, Minimize, Play, Pause, Eye, EyeOff } from 'lucide-react'
import { useAmbientSounds } from '../hooks/useAmbientSounds'

interface ImmersiveModeProps {
  storyMood?: string
  isActive: boolean
  onToggle: () => void
  children: React.ReactNode
}

export default function ImmersiveMode({ 
  storyMood, 
  isActive, 
  onToggle, 
  children 
}: ImmersiveModeProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null)
  
  const {
    settings: soundSettings,
    isPlaying,
    availableSounds,
    playSound,
    stopAllSounds,
    updateVolume,
    toggleEnabled,
    currentSound
  } = useAmbientSounds(storyMood)

  // Hide controls after mouse inactivity
  useEffect(() => {
    if (!isActive) return

    const handleMouseMove = () => {
      setShowControls(true)
      
      if (mouseTimer) {
        clearTimeout(mouseTimer)
      }
      
      const timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)
      
      setMouseTimer(timer)
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (mouseTimer) {
        clearTimeout(mouseTimer)
      }
    }
  }, [isActive, mouseTimer])

  // Fullscreen API
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.log('Fullscreen not supported')
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const getCurrentSoundName = () => {
    const sound = availableSounds.find(s => s.id === currentSound)
    return sound ? sound.name : 'Kein Sound'
  }

  if (!isActive) {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0">
        {/* Ambient lighting based on mood */}
        <div className={`absolute inset-0 opacity-20 ${
          storyMood === 'romantic' ? 'bg-gradient-radial from-rose-500/30 via-transparent to-transparent' :
          storyMood === 'mysterious' ? 'bg-gradient-radial from-purple-500/30 via-transparent to-transparent' :
          storyMood === 'adventure' ? 'bg-gradient-radial from-orange-500/30 via-transparent to-transparent' :
          storyMood === 'dramatic' ? 'bg-gradient-radial from-red-500/30 via-transparent to-transparent' :
          storyMood === 'fantasy' ? 'bg-gradient-radial from-indigo-500/30 via-transparent to-transparent' :
          'bg-gradient-radial from-gray-500/30 via-transparent to-transparent'
        }`} />
        
        {/* Subtle movement effects */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Immersive Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
              
              {/* Exit Immersive Mode */}
              <button
                onClick={onToggle}
                className="p-3 bg-red-600/20 hover:bg-red-600/30 rounded-xl border border-red-400/30 transition-colors"
              >
                <Eye className="w-5 h-5 text-red-300" />
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5 text-white" />
                ) : (
                  <Maximize className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Ambient Sound Controls */}
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
                <button
                  onClick={toggleEnabled}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {soundSettings.enabled ? (
                    <Volume2 className="w-4 h-4 text-white" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-white" />
                  )}
                </button>

                {soundSettings.enabled && (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-400">Ambient</span>
                      <span className="text-xs text-white font-medium">
                        {getCurrentSoundName()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={soundSettings.volume}
                        onChange={(e) => updateVolume(Number(e.target.value))}
                        className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-gray-400 w-8">
                        {Math.round(soundSettings.volume * 100)}%
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Sound Selection */}
              {soundSettings.enabled && availableSounds.length > 0 && (
                <div className="flex items-center gap-2">
                  {availableSounds.slice(0, 3).map((sound) => (
                    <button
                      key={sound.id}
                      onClick={() => playSound(sound.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        currentSound === sound.id
                          ? 'bg-purple-600/30 text-purple-300 border border-purple-400/30'
                          : 'bg-white/10 hover:bg-white/20 text-gray-300'
                      }`}
                    >
                      {sound.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Reading Progress Indicator */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Immersiver Modus</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-6 left-6 z-40"
      >
        <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl p-3 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            storyMood === 'romantic' ? 'bg-rose-400' :
            storyMood === 'mysterious' ? 'bg-purple-400' :
            storyMood === 'adventure' ? 'bg-orange-400' :
            storyMood === 'dramatic' ? 'bg-red-400' :
            storyMood === 'fantasy' ? 'bg-indigo-400' :
            'bg-gray-400'
          }`} />
          <span className="text-xs text-white font-medium">
            {storyMood === 'romantic' ? 'Romantisch' :
             storyMood === 'mysterious' ? 'Mysteriös' :
             storyMood === 'adventure' ? 'Abenteuer' :
             storyMood === 'dramatic' ? 'Dramatisch' :
             storyMood === 'fantasy' ? 'Fantasy' : 'Modern'}
          </span>
        </div>
      </motion.div>

      {/* Gesture Hint */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 right-6 z-40"
          >
            <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-2">
              <span className="text-xs text-gray-400">
                Bewege die Maus um Kontrollen zu zeigen
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}