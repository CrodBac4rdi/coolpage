import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Zap } from 'lucide-react'

interface FallingHeart {
  id: number
  x: number
  y: number
  speed: number
  type: 'heart' | 'star' | 'zap'
}

export default function HeartCollector() {
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState<FallingHeart[]>([])
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [basketX, setBasketX] = useState(50)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('heartCollectorHighScore')
    return saved ? parseInt(saved) : 0
  })

  // Move basket with mouse and touch
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameActive) return
      const x = (e.clientX / window.innerWidth) * 100
      setBasketX(Math.max(5, Math.min(95, x)))
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!gameActive) return
      e.preventDefault()
      const touch = e.touches[0]
      const x = (touch.clientX / window.innerWidth) * 100
      setBasketX(Math.max(5, Math.min(95, x)))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [gameActive])

  // Game timer
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) {
      if (timeLeft <= 0) {
        endGame()
      }
      return
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [gameActive, timeLeft])

  // Spawn hearts
  useEffect(() => {
    if (!gameActive) return

    const spawnInterval = setInterval(() => {
      const types: ('heart' | 'star' | 'zap')[] = ['heart', 'heart', 'heart', 'star', 'zap']
      const type = types[Math.floor(Math.random() * types.length)]
      
      setHearts(prev => [...prev, {
        id: Date.now() + Math.random(),
        x: Math.random() * 90 + 5,
        y: -10,
        speed: Math.random() * 2 + 2,
        type
      }])
    }, 800)

    return () => clearInterval(spawnInterval)
  }, [gameActive])

  // Move hearts down
  useEffect(() => {
    if (!gameActive) return

    const moveInterval = setInterval(() => {
      setHearts(prev => {
        return prev.map(heart => ({
          ...heart,
          y: heart.y + heart.speed
        })).filter(heart => {
          // Check if caught
          if (
            heart.y >= 80 && heart.y <= 90 &&
            Math.abs(heart.x - basketX) < 10
          ) {
            handleCatch(heart.type)
            return false
          }
          // Remove if off screen
          return heart.y < 100
        })
      })
    }, 50)

    return () => clearInterval(moveInterval)
  }, [gameActive, basketX])

  const handleCatch = (type: 'heart' | 'star' | 'zap') => {
    switch (type) {
      case 'heart':
        setScore(prev => prev + 10)
        break
      case 'star':
        setScore(prev => prev + 25)
        break
      case 'zap':
        setScore(prev => Math.max(0, prev - 15))
        break
    }
  }

  const startGame = () => {
    setScore(0)
    setHearts([])
    setTimeLeft(30)
    setGameActive(true)
  }

  const endGame = () => {
    setGameActive(false)
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('heartCollectorHighScore', score.toString())
    }
  }

  return (
    <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl border border-white/10">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center">Heart Collector</h3>
      
      {/* Game Stats */}
      <div className="flex justify-between mb-3 sm:mb-4 text-xs sm:text-sm">
        <div>Score: {score}</div>
        <div>Time: {timeLeft}s</div>
        <div>High: {highScore}</div>
      </div>

      {/* Game Area */}
      <div className="relative h-[300px] sm:h-[400px] bg-black/20 rounded-xl overflow-hidden touch-none">
        {!gameActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Falling Items */}
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              className="absolute"
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {heart.type === 'heart' && (
                <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              )}
              {heart.type === 'star' && (
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              )}
              {heart.type === 'zap' && (
                <Zap className="w-8 h-8 text-blue-400 fill-blue-400" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Basket */}
        {gameActive && (
          <motion.div
            className="absolute bottom-4"
            style={{ left: `${basketX}%` }}
            animate={{ x: '-50%' }}
          >
            <div className="w-16 h-12 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-lg relative">
              <div className="absolute -top-1 left-0 w-full h-2 bg-amber-500 rounded-t-lg" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400">
        <p>Move your mouse or touch to catch hearts! 💕</p>
        <p className="mt-1">
          Hearts: +10 | Stars: +25 | Lightning: -15
        </p>
      </div>
    </div>
  )
}