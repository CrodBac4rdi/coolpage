import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, Heart, Clock, Sparkles, Navigation, RotateCcw } from 'lucide-react'

interface MemoryObject {
  id: string
  type: 'bookmark' | 'favorite' | 'quote' | 'moment'
  storyId: string
  chapterId: number
  content: string
  timestamp: number
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  icon: string
}

interface StoryMemoryPalaceProps {
  memories?: MemoryObject[]
  onMemoryClick?: (memory: MemoryObject) => void
}

export default function StoryMemoryPalace({ memories: propMemories, onMemoryClick }: StoryMemoryPalaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [memories, setMemories] = useState<MemoryObject[]>([])
  const [isRotating, setIsRotating] = useState(true)
  const [selectedMemory, setSelectedMemory] = useState<MemoryObject | null>(null)
  const [cameraRotation, setCameraRotation] = useState({ x: -20, y: 0 })
  const [zoom, setZoom] = useState(1)

  // Load memories from localStorage
  useEffect(() => {
    if (propMemories) {
      setMemories(propMemories)
    } else {
      const savedMemories = localStorage.getItem('story-memories')
      if (savedMemories) {
        setMemories(JSON.parse(savedMemories))
      }
    }
  }, [propMemories])

  // Auto-rotate the palace
  useEffect(() => {
    if (!isRotating) return

    const interval = setInterval(() => {
      setCameraRotation(prev => ({ ...prev, y: prev.y + 0.5 }))
    }, 50)

    return () => clearInterval(interval)
  }, [isRotating])

  // Handle mouse/touch controls
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isDragging = false
    let startX = 0
    let startY = 0

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDragging = true
      setIsRotating(false)
      const point = 'touches' in e ? e.touches[0] : e
      startX = point.clientX
      startY = point.clientY
    }

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return
      const point = 'touches' in e ? e.touches[0] : e
      const deltaX = point.clientX - startX
      const deltaY = point.clientY - startY
      
      setCameraRotation(prev => ({
        x: Math.max(-60, Math.min(60, prev.x + deltaY * 0.5)),
        y: prev.y + deltaX * 0.5
      }))
      
      startX = point.clientX
      startY = point.clientY
    }

    const handleEnd = () => {
      isDragging = false
    }

    // Mouse events
    container.addEventListener('mousedown', handleStart)
    container.addEventListener('mousemove', handleMove)
    container.addEventListener('mouseup', handleEnd)
    container.addEventListener('mouseleave', handleEnd)
    
    // Touch events
    container.addEventListener('touchstart', handleStart)
    container.addEventListener('touchmove', handleMove)
    container.addEventListener('touchend', handleEnd)

    // Wheel zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setZoom(prev => Math.max(0.5, Math.min(2, prev + e.deltaY * -0.001)))
    }
    container.addEventListener('wheel', handleWheel)

    return () => {
      container.removeEventListener('mousedown', handleStart)
      container.removeEventListener('mousemove', handleMove)
      container.removeEventListener('mouseup', handleEnd)
      container.removeEventListener('mouseleave', handleEnd)
      container.removeEventListener('touchstart', handleStart)
      container.removeEventListener('touchmove', handleMove)
      container.removeEventListener('touchend', handleEnd)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const getMemoryIcon = (type: MemoryObject['type']) => {
    switch (type) {
      case 'bookmark': return <Bookmark className="w-4 h-4" />
      case 'favorite': return <Heart className="w-4 h-4" />
      case 'quote': return '💬'
      case 'moment': return <Sparkles className="w-4 h-4" />
    }
  }

  const getMemoryColor = (type: MemoryObject['type']) => {
    switch (type) {
      case 'bookmark': return 'from-blue-400 to-cyan-400'
      case 'favorite': return 'from-pink-400 to-red-400'
      case 'quote': return 'from-purple-400 to-indigo-400'
      case 'moment': return 'from-yellow-400 to-orange-400'
    }
  }

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-50 space-y-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-3 rounded-lg bg-black/50 backdrop-blur-sm border transition-all ${
            isRotating ? 'border-purple-500 text-purple-400' : 'border-white/20 text-white'
          }`}
          title="Toggle Rotation"
        >
          <RotateCcw className={`w-5 h-5 ${isRotating ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={() => setCameraRotation({ x: -20, y: 0 })}
          className="p-3 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:border-purple-500 transition-all"
          title="Reset View"
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <h3 className="text-sm font-medium text-white mb-2">Deine Erinnerungen</h3>
        <div className="space-y-1 text-xs text-gray-300">
          <div>📚 {memories.filter(m => m.type === 'bookmark').length} Lesezeichen</div>
          <div>💕 {memories.filter(m => m.type === 'favorite').length} Favoriten</div>
          <div>💬 {memories.filter(m => m.type === 'quote').length} Zitate</div>
          <div>✨ {memories.filter(m => m.type === 'moment').length} Momente</div>
        </div>
      </div>

      {/* 3D Memory Palace */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%'
        }}
      >
        <div
          className="absolute inset-0 transform-gpu"
          style={{
            transform: `rotateX(${cameraRotation.x}deg) rotateY(${cameraRotation.y}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d',
            transition: isRotating ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {/* Floor Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              transform: 'rotateX(90deg) translateZ(-200px)',
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(139, 92, 246, 0.3) 0px, transparent 1px, transparent 40px, rgba(139, 92, 246, 0.3) 41px),
                repeating-linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0px, transparent 1px, transparent 40px, rgba(139, 92, 246, 0.3) 41px)
              `,
              backgroundSize: '100% 100%'
            }}
          />

          {/* Memory Objects */}
          {memories.map((memory, index) => {
            const angle = (index / memories.length) * Math.PI * 2
            const radius = 150 + (index % 3) * 50
            const height = -100 + (index % 5) * 40
            
            const position = memory.position || {
              x: Math.cos(angle) * radius,
              y: height,
              z: Math.sin(angle) * radius
            }

            return (
              <motion.div
                key={memory.id}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
                  transformStyle: 'preserve-3d'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setSelectedMemory(memory)
                  onMemoryClick?.(memory)
                }}
              >
                {/* Memory Sphere */}
                <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${getMemoryColor(memory.type)} shadow-2xl`}>
                  <div className="absolute inset-0 rounded-full animate-pulse opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
                    {memory.icon || getMemoryIcon(memory.type)}
                  </div>
                </div>
                
                {/* Floating Label */}
                <div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2"
                  style={{ transform: `rotateY(${-cameraRotation.y}deg)` }}
                >
                  <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                    {memory.content.substring(0, 20)}...
                  </div>
                </div>

                {/* Connection Lines */}
                {index > 0 && (
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      width: '200px',
                      height: '200px',
                      left: '-68px',
                      top: '-68px'
                    }}
                  >
                    <line
                      x1="100"
                      y1="100"
                      x2={100 + (memories[index - 1].position?.x || 0) - position.x}
                      y2={100 + (memories[index - 1].position?.z || 0) - position.z}
                      stroke="url(#memory-gradient)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="memory-gradient">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </motion.div>
            )
          })}

          {/* Central Crystal */}
          <div
            className="absolute"
            style={{
              transform: 'translate3d(0, -50px, 0)',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div
              className="w-20 h-20"
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-50 blur-xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rotate-45 transform"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Selected Memory Detail */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-xl rounded-xl p-6 border border-white/20 z-50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${getMemoryColor(selectedMemory.type)}`}>
                  {getMemoryIcon(selectedMemory.type)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedMemory.type === 'bookmark' ? 'Lesezeichen' :
                     selectedMemory.type === 'favorite' ? 'Favorit' :
                     selectedMemory.type === 'quote' ? 'Zitat' : 'Besonderer Moment'}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(selectedMemory.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMemory(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 mb-4">{selectedMemory.content}</p>
            <Link
              to={`/reader/${selectedMemory.storyId}?chapter=${selectedMemory.chapterId}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Zur Stelle springen
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {memories.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Dein Erinnerungspalast ist noch leer</h3>
            <p className="text-gray-400">Speichere Lesezeichen, Favoriten und besondere Momente beim Lesen!</p>
          </div>
        </div>
      )}
    </div>
  )
}