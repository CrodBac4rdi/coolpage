import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [reduceMotion, setReduceMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)
    
    // Check if device is mobile
    setIsMobile(window.innerWidth <= 768)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!reduceMotion && !isMobile) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
        })
      }
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [reduceMotion, isMobile])

  return (
    <>
      {/* Gradient orbs - only show on non-mobile devices */}
      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"
            animate={!reduceMotion ? {
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            } : {}}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />
          <motion.div 
            className="absolute w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 right-0 bottom-0"
            animate={!reduceMotion ? {
              x: -mousePosition.x * 0.02,
              y: -mousePosition.y * 0.02,
            } : {}}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />
        </div>
      )}

      {/* Animated particles - reduced count on mobile */}
      {!reduceMotion && (
        <div className="fixed inset-0 overflow-hidden">
          {[...Array(isMobile ? 5 : 15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                filter: 'blur(1px)',
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: Math.random() * (isMobile ? 60 : 40) + (isMobile ? 45 : 30),
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}