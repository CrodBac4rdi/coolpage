import { motion, AnimatePresence } from 'framer-motion'
import { Search, Key, Lock, Unlock, Eye, EyeOff, Sparkles, Gift } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Secret {
  id: string
  type: 'easter_egg' | 'hidden_story' | 'character_secret' | 'meta_joke' | 'developer_note'
  title: string
  content: string
  hint: string
  unlock_condition: string
  reward?: string
  discovered: boolean
  location: {
    page: string
    element?: string
    coordinates?: { x: number; y: number }
  }
}

interface SecretNetworkProps {
  currentPage: string
  currentScroll?: number
}

export default function SecretNetwork({ currentPage, currentScroll = 0 }: SecretNetworkProps) {
  const [secrets, setSecrets] = useState<Secret[]>([])
  const [discoveredCount, setDiscoveredCount] = useState(0)
  const [showNetwork, setShowNetwork] = useState(false)
  const [activeHunt, setActiveHunt] = useState(false)
  const [foundSecret, setFoundSecret] = useState<Secret | null>(null)
  const [konami, setKonami] = useState<string[]>([])
  // const navigate = useNavigate()

  // Define all hidden secrets
  useEffect(() => {
    const allSecrets: Secret[] = [
      {
        id: 'konami-code',
        type: 'easter_egg',
        title: '↑↑↓↓←→←→BA',
        content: 'Du hast den legendären Konami Code entdeckt! 🎮 Als Belohnung erhältst du Zugang zu einem geheimen Cheat-Menü.',
        hint: 'Eine klassische Tastenkombination aus den 80ern',
        unlock_condition: 'Konami Code eingeben',
        reward: 'Cheat-Menü freigeschaltet',
        discovered: false,
        location: { page: 'any' }
      },
      {
        id: 'title-click',
        type: 'meta_joke',
        title: 'Der neugierige Klicker',
        content: 'Wer 10x auf den Titel klickt, bekommt... diese Nachricht! 🎉 Manchmal ist der Weg das Ziel.',
        hint: 'Manchmal lohnt sich Beharrlichkeit',
        unlock_condition: '10x auf Titel klicken',
        discovered: false,
        location: { page: 'home', element: 'title' }
      },
      {
        id: 'scroll-master',
        type: 'easter_egg',
        title: 'Scroll-Meister',
        content: 'Du hast das Ende der Welt erreicht! 🌍 Hier ist ein geheimes Zitat: "Das Ende ist nur ein neuer Anfang."',
        hint: 'Scrolle bis zum absoluten Ende',
        unlock_condition: 'Bis ganz nach unten scrollen',
        discovered: false,
        location: { page: 'reader' }
      },
      {
        id: 'character-whisper',
        type: 'character_secret',
        title: 'Lunas Geheimnis',
        content: 'Luna Starweaver hatte ursprünglich einen anderen Namen: "Stella Moonwright". Die Entwickler änderten ihn last-minute! 🌙',
        hint: 'Schau dir Lunas Profil genau an',
        unlock_condition: 'Luna 30 Sekunden anstarren',
        discovered: false,
        location: { page: 'blog', element: 'luna-starweaver' }
      },
      {
        id: 'dev-coffee',
        type: 'developer_note',
        title: 'Entwickler-Kaffee',
        content: 'Diese Seite wurde mit 47 Tassen Kaffee und 3 Stunden Schlaf erstellt. ☕ Danke, dass du unsere Arbeit wertschätzt!',
        hint: 'Irgendwo ist ein versteckter Kaffee',
        unlock_condition: 'Versteckten Kaffee finden',
        discovered: false,
        location: { page: 'about', coordinates: { x: 50, y: 80 } }
      },
      {
        id: 'memory-palace-secret',
        type: 'hidden_story',
        title: 'Der vergessene Raum',
        content: 'Im Memory Palace gibt es einen versteckten Raum... Klicke 5x auf den zentralen Kristall um ihn zu öffnen! 💎',
        hint: 'Der Kristall im Zentrum hat mehr zu bieten',
        unlock_condition: '5x auf Kristall klicken',
        discovered: false,
        location: { page: 'memory' }
      },
      {
        id: 'timeline-time-travel',
        type: 'easter_egg',
        title: 'Zeitreisender',
        content: 'Wenn du die Timeline rückwärts scrollst, änderst du vielleicht die Geschichte... 🕰️ (Spoiler: Nicht wirklich, aber cool wärs!)',
        hint: 'Zeit ist relativ, besonders in Timelines',
        unlock_condition: 'Timeline rückwärts scrollen',
        discovered: false,
        location: { page: 'timeline' }
      }
    ]

    // Load discovered secrets from localStorage
    const saved = localStorage.getItem('discovered-secrets')
    if (saved) {
      const discoveredIds = JSON.parse(saved)
      allSecrets.forEach(secret => {
        if (discoveredIds.includes(secret.id)) {
          secret.discovered = true
        }
      })
    }

    setSecrets(allSecrets)
    setDiscoveredCount(allSecrets.filter(s => s.discovered).length)
  }, [])

  // Konami Code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      const newSequence = [...konami, key].slice(-10) // Keep last 10 keys
      setKonami(newSequence)

      // Check for Konami Code: ↑↑↓↓←→←→BA
      const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
      const currentSequence = newSequence.join(',')
      const targetSequence = konamiSequence.join(',')

      if (currentSequence.endsWith(targetSequence)) {
        unlockSecret('konami-code')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konami])

  // Auto-detect scroll secrets
  useEffect(() => {
    if (currentPage === 'reader' && currentScroll > 0.95) {
      unlockSecret('scroll-master')
    }
  }, [currentScroll, currentPage])

  // Unlock secret
  const unlockSecret = (secretId: string) => {
    const secret = secrets.find(s => s.id === secretId)
    if (secret && !secret.discovered) {
      secret.discovered = true
      setFoundSecret(secret)
      setDiscoveredCount(prev => prev + 1)

      // Save to localStorage
      const discovered = secrets.filter(s => s.discovered).map(s => s.id)
      localStorage.setItem('discovered-secrets', JSON.stringify(discovered))

      // Show discovery animation
      setTimeout(() => setFoundSecret(null), 5000)
    }
  }

  // Easter egg triggers (called from other components)
  const triggerTitleClick = () => {
    const clicks = parseInt(localStorage.getItem('title-clicks') || '0') + 1
    localStorage.setItem('title-clicks', clicks.toString())
    
    if (clicks >= 10) {
      unlockSecret('title-click')
    }
  }

  const triggerLunaStare = () => {
    unlockSecret('character-whisper')
  }

  const triggerCoffeeFind = () => {
    unlockSecret('dev-coffee')
  }

  const triggerCrystalClick = () => {
    const clicks = parseInt(localStorage.getItem('crystal-clicks') || '0') + 1
    localStorage.setItem('crystal-clicks', clicks.toString())
    
    if (clicks >= 5) {
      unlockSecret('memory-palace-secret')
    }
  }

  const triggerTimelineReverse = () => {
    unlockSecret('timeline-time-travel')
  }

  // Expose triggers globally for other components
  useEffect(() => {
    (window as any).secretNetwork = {
      triggerTitleClick,
      triggerLunaStare,
      triggerCoffeeFind,
      triggerCrystalClick,
      triggerTimelineReverse
    }
  }, [])

  // Get completion percentage
  const completionPercentage = Math.round((discoveredCount / secrets.length) * 100)

  return (
    <>
      {/* Secret Network Toggle */}
      <motion.button
        onClick={() => setShowNetwork(!showNetwork)}
        className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-r-lg shadow-xl z-50"
        whileHover={{ x: 5 }}
        initial={{ x: -30 }}
        animate={{ x: 0 }}
        transition={{ delay: 2 }}
      >
        <Key className="w-5 h-5 text-white" />
      </motion.button>

      {/* Secret Network Panel */}
      <AnimatePresence>
        {showNetwork && (
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            className="fixed left-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-white/20 z-40 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-400" />
                  Secret Network
                </h2>
                <button
                  onClick={() => setShowNetwork(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Progress */}
              <div className="mb-6 p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-300 font-medium">Entdeckt</span>
                  <span className="text-white font-bold">{discoveredCount}/{secrets.length}</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-purple-200 mt-2">{completionPercentage}% abgeschlossen</p>
              </div>

              {/* Secrets List */}
              <div className="space-y-3">
                {secrets.map(secret => (
                  <motion.div
                    key={secret.id}
                    className={`p-4 rounded-xl border transition-all ${
                      secret.discovered
                        ? 'bg-green-500/20 border-green-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        secret.discovered ? 'bg-green-500' : 'bg-gray-600'
                      }`}>
                        {secret.discovered ? (
                          <Unlock className="w-4 h-4 text-white" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          secret.discovered ? 'text-white' : 'text-gray-400'
                        }`}>
                          {secret.discovered ? secret.title : '???'}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {secret.discovered ? secret.content : secret.hint}
                        </p>
                        {secret.discovered && secret.reward && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-yellow-400">
                            <Gift className="w-3 h-3" />
                            <span>{secret.reward}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hunt Mode Toggle */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => setActiveHunt(!activeHunt)}
                  className={`w-full p-3 rounded-lg border transition-all ${
                    activeHunt
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {activeHunt ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="font-medium">
                      {activeHunt ? 'Jagd aktiv' : 'Schatzsuche starten'}
                    </span>
                  </div>
                </button>
                {activeHunt && (
                  <p className="text-xs text-purple-200 mt-2 text-center">
                    Geheimnisse werden jetzt hervorgehoben!
                  </p>
                )}
              </div>

              {/* Achievement Unlock */}
              {completionPercentage === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/50 text-center"
                >
                  <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-bold text-white mb-1">Meister-Detektiv!</h3>
                  <p className="text-xs text-yellow-200">
                    Du hast alle Geheimnisse entdeckt! 🏆
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Discovery Notification */}
      <AnimatePresence>
        {foundSecret && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 border border-white/20 shadow-2xl max-w-md"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-3 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-black" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">🎉 Geheimnis entdeckt!</h3>
              <h4 className="font-medium text-purple-100 mb-2">{foundSecret.title}</h4>
              <p className="text-sm text-purple-100 opacity-90">{foundSecret.content}</p>
              {foundSecret.reward && (
                <div className="mt-3 p-2 bg-yellow-400/20 rounded-lg">
                  <p className="text-xs text-yellow-200">🎁 {foundSecret.reward}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hunt Mode Indicators */}
      {activeHunt && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {/* Add subtle hints for current page secrets */}
          {secrets
            .filter(s => !s.discovered && (s.location.page === currentPage || s.location.page === 'any'))
            .map(secret => (
              <motion.div
                key={secret.id}
                className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-50 animate-pulse"
                style={{
                  left: secret.location.coordinates?.x ? `${secret.location.coordinates.x}%` : '50%',
                  top: secret.location.coordinates?.y ? `${secret.location.coordinates.y}%` : '50%'
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            ))}
        </div>
      )}
    </>
  )
}