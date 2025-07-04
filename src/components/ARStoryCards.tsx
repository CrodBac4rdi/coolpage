import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Maximize, RotateCcw, Sparkles, Eye, Hand } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type { Character } from '../data/characters'

interface ARStoryCard {
  id: string
  character: Character
  scene: string
  mood: string
  interactive: boolean
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}

interface ARStoryCardsProps {
  characters: Character[]
  currentStory: string
}

export default function ARStoryCards({ characters, currentStory }: ARStoryCardsProps) {
  const [isARActive, setIsARActive] = useState(false)
  const [arCards, setArCards] = useState<ARStoryCard[]>([])
  const [selectedCard, setSelectedCard] = useState<ARStoryCard | null>(null)
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt')
  const [handTracking, setHandTracking] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Check WebXR support
  const [xrSupported, setXrSupported] = useState(false)
  
  useEffect(() => {
    if ('xr' in navigator) {
      (navigator as any).xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setXrSupported(supported)
      })
    }
  }, [])

  // Generate AR cards for characters
  useEffect(() => {
    const storyCharacters = characters.filter(char => char.storyId === currentStory)
    
    const cards: ARStoryCard[] = storyCharacters.map((character, index) => ({
      id: `ar-card-${character.id}`,
      character,
      scene: character.background.substring(0, 100) + '...',
      mood: character.mood,
      interactive: true,
      position: {
        x: (index % 3 - 1) * 2, // Spread cards horizontally
        y: Math.floor(index / 3) * 1.5,
        z: -3 - Math.floor(index / 3) * 0.5
      },
      rotation: {
        x: Math.random() * 10 - 5,
        y: Math.random() * 20 - 10,
        z: Math.random() * 5 - 2.5
      }
    }))
    
    setArCards(cards)
  }, [characters, currentStory])

  // Request camera permission
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
      
      setCameraPermission('granted')
      return true
    } catch (error) {
      setCameraPermission('denied')
      return false
    }
  }

  // Start AR experience
  const startAR = async () => {
    if (xrSupported) {
      // Use WebXR if available
      try {
        const session = await (navigator as any).xr.requestSession('immersive-ar')
        // Handle WebXR session...
        setIsARActive(true)
      } catch (error) {
        console.log('WebXR failed, falling back to camera AR')
        startCameraAR()
      }
    } else {
      startCameraAR()
    }
  }

  // Fallback camera-based AR
  const startCameraAR = async () => {
    const hasCamera = await requestCameraAccess()
    if (hasCamera) {
      setIsARActive(true)
      startARTracking()
    }
  }

  // Simple AR tracking simulation
  const startARTracking = () => {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const renderLoop = () => {
      if (!isARActive) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw video feed
      if (videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
      }

      // Draw AR cards overlay
      arCards.forEach((card, index) => {
        const screenX = canvas.width * 0.2 + (index % 3) * (canvas.width * 0.25)
        const screenY = canvas.height * 0.3 + Math.floor(index / 3) * 200

        // Card background
        ctx.save()
        ctx.translate(screenX, screenY)
        ctx.rotate(card.rotation.z * Math.PI / 180)
        
        // Draw card
        const gradient = ctx.createLinearGradient(-100, -80, 100, 80)
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)')
        gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)')
        
        ctx.fillStyle = gradient
        ctx.roundRect(-100, -80, 200, 160, 15)
        ctx.fill()
        
        // Character icon
        ctx.font = '40px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(card.character.icon, 0, -20)
        
        // Character name
        ctx.font = '16px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText(card.character.name, 0, 20)
        
        // Mood indicator
        ctx.font = '12px Arial'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fillText(card.mood, 0, 40)
        
        ctx.restore()

        // Add floating particles
        for (let i = 0; i < 3; i++) {
          const particleX = screenX + Math.sin(Date.now() * 0.001 + i) * 30
          const particleY = screenY - 100 + Math.cos(Date.now() * 0.001 + i) * 20
          
          ctx.beginPath()
          ctx.arc(particleX, particleY, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(Date.now() * 0.002 + i) * 0.3})`
          ctx.fill()
        }
      })

      requestAnimationFrame(renderLoop)
    }

    renderLoop()
  }

  // Stop AR
  const stopAR = () => {
    setIsARActive(false)
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  // Handle card interaction
  const handleCardClick = (event: React.MouseEvent, card: ARStoryCard) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Simple hit detection
    const cardIndex = arCards.findIndex(c => c.id === card.id)
    const screenX = canvasRef.current.width * 0.2 + (cardIndex % 3) * (canvasRef.current.width * 0.25)
    const screenY = canvasRef.current.height * 0.3 + Math.floor(cardIndex / 3) * 200

    const distance = Math.sqrt(Math.pow(x - screenX, 2) + Math.pow(y - screenY, 2))
    
    if (distance < 100) {
      setSelectedCard(card)
    }
  }

  if (!xrSupported && cameraPermission === 'denied') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div className="bg-gray-900 rounded-xl p-6 border border-white/20 max-w-md">
          <h3 className="text-xl font-bold text-white mb-4">AR nicht verfügbar</h3>
          <p className="text-gray-300 mb-4">
            Kamera-Zugriff wurde verweigert oder WebXR wird nicht unterstützt.
          </p>
          <button
            onClick={() => setCameraPermission('prompt')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      {/* AR Toggle Button */}
      <motion.button
        onClick={isARActive ? stopAR : startAR}
        className={`fixed top-32 right-4 z-50 p-3 rounded-full shadow-xl transition-all ${
          isARActive
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        {isARActive ? <Eye className="w-6 h-6 text-white" /> : <Camera className="w-6 h-6 text-gray-400" />}
      </motion.button>

      {/* AR Experience */}
      <AnimatePresence>
        {isARActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black"
          >
            {/* Camera feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="hidden"
            />
            
            {/* AR Canvas */}
            <canvas
              ref={canvasRef}
              width={window.innerWidth}
              height={window.innerHeight}
              className="w-full h-full cursor-pointer"
              onClick={(e) => {
                const card = arCards[0] // Simple example
                if (card) handleCardClick(e, card)
              }}
            />

            {/* AR Controls */}
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={stopAR}
                className="p-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/20 text-white"
              >
                ✕
              </button>
              <button
                onClick={() => setHandTracking(!handTracking)}
                className={`p-2 rounded-lg border border-white/20 ${
                  handTracking ? 'bg-purple-500' : 'bg-black/50 backdrop-blur-sm'
                } text-white`}
              >
                <Hand className="w-5 h-5" />
              </button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white text-center text-sm">
                📱 Bewege dein Gerät um die Charaktere zu erkunden
              </p>
            </div>

            {/* AR Stats */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <div className="text-white text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AR Charaktere</span>
                </div>
                <p className="text-xs text-gray-300">{arCards.length} Cards aktiv</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl p-6 border border-white/20 max-w-md mx-4"
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{selectedCard.character.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedCard.character.name}</h3>
                <p className="text-purple-400">{selectedCard.character.role}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-white mb-1">Persönlichkeit</h4>
                  <p className="text-gray-300">{selectedCard.character.personality.join(', ')}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-1">Hintergrund</h4>
                  <p className="text-gray-300">{selectedCard.scene}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-1">Hobbies</h4>
                  <p className="text-gray-300">{selectedCard.character.hobbies?.join(', ') || 'Nicht verfügbar'}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCard(null)}
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Schließen
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback Info */}
      {!isARActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-20 bg-purple-500/20 backdrop-blur-sm rounded-lg p-3 border border-purple-500/30 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-white">AR Story Cards</span>
          </div>
          <p className="text-xs text-gray-300">
            Erlebe Charaktere in Augmented Reality
          </p>
        </motion.div>
      )}
    </>
  )
}