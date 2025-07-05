import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BrutalistHero() {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-12 h-full">
          {[...Array(144)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-white/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.01,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Glitch Effect Title */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Glitch Layers */}
          <div className="relative">
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter"
              style={{
                textShadow: isHovered ? `
                  3px 3px 0 #ff00ff,
                  -3px -3px 0 #00ffff,
                  0 0 20px rgba(255, 255, 255, 0.5)
                ` : 'none'
              }}
            >
              CROD
            </motion.h1>
            
            {/* Glitch effect on hover */}
            {isHovered && (
              <>
                <motion.div
                  className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-red-500 uppercase tracking-tighter"
                  animate={{
                    x: [-2, 2, -2],
                    opacity: [0.8, 0.5, 0.8]
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity
                  }}
                >
                  CROD
                </motion.div>
                <motion.div
                  className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-blue-500 uppercase tracking-tighter"
                  animate={{
                    x: [2, -2, 2],
                    opacity: [0.8, 0.5, 0.8]
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity
                  }}
                >
                  CROD
                </motion.div>
              </>
            )}
          </div>

          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-wider mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            BABYLON
          </motion.h2>

          {/* Subtitle with typewriter effect */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white" />
            <span className="text-white/60 uppercase tracking-[0.3em] text-sm font-medium">
              Digital Paradise
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white" />
          </motion.div>

          {/* Interactive element */}
          <motion.div
            className="mt-16 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={() => navigate('/stories')}
              className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-wider overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">Enter Stories</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-white font-bold uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Let's Go ✨
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating colorful shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-4 border-yellow-400/40 bg-yellow-400/10 rounded-lg"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
          borderRadius: ["10%", "30%", "10%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-400/20 backdrop-blur-sm"
        animate={{
          rotate: -360,
          borderRadius: ["0%", "50%", "0%"]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full"
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-20 w-20 h-20 border-3 border-emerald-400/40 bg-emerald-400/10"
        animate={{
          x: [-10, 10, -10],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse follower */}
      <motion.div
        className="pointer-events-none fixed w-4 h-4 bg-white mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
    </section>
  )
}