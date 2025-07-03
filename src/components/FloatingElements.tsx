import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingElement {
  id: number
  emoji: string
  x: number
  y: number
  duration: number
  delay: number
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [, setWindowSize] = useState({ width: 0, height: 0 })

  const emojis = ['✨', '🌟', '💫', '🎯', '🚀', '🎨', '💎', '🌈', '⚡', '🔥', '🌙', '☄️', '🪐', '🛸']

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    // Generate random floating elements
    const newElements: FloatingElement[] = []
    for (let i = 0; i < 5; i++) {
      newElements.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 20 + Math.random() * 10,
        delay: Math.random() * 3
      })
    }
    setElements(newElements)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-2xl opacity-10 dark:opacity-20"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
      
      {/* Interactive floating element that follows mouse */}
      <InteractiveFloater />
    </div>
  )
}

function InteractiveFloater() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed text-4xl pointer-events-none"
      style={{
        left: mousePos.x - 50,
        top: mousePos.y - 50,
      }}
      animate={{
        scale: isVisible ? [0, 1] : 0,
        rotate: [0, 360],
      }}
      transition={{
        scale: { duration: 0.2 },
        rotate: { duration: 2, repeat: Infinity, ease: "linear" }
      }}
    >
      <span className="opacity-30">🌀</span>
    </motion.div>
  )
}