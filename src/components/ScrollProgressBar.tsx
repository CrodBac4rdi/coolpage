import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

interface ScrollProgressBarProps {
  showPercentage?: boolean
  height?: number
  color?: string
  showMilestones?: boolean
  milestones?: number[]
}

export default function ScrollProgressBar({
  showPercentage = true,
  height = 6,
  color = 'from-purple-500 to-pink-500',
  showMilestones = true,
  milestones = [25, 50, 75]
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100))
    })
    return unsubscribe
  }, [scrollYProgress])

  return (
    <>
      {/* Progress Bar Container */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-black/20 backdrop-blur-sm">
        <div className="relative w-full" style={{ height: `${height}px` }}>
          {/* Background Track */}
          <div className="absolute inset-0 bg-white/10" />
          
          {/* Progress Fill */}
          <motion.div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} shadow-lg shadow-purple-500/25`}
            style={{ scaleX, transformOrigin: '0%' }}
          />
          
          {/* Milestones */}
          {showMilestones && milestones.map((milestone) => (
            <div
              key={milestone}
              className={`absolute top-0 bottom-0 w-0.5 transition-all duration-300 ${
                scrollPercent >= milestone 
                  ? 'bg-white/60' 
                  : 'bg-white/20'
              }`}
              style={{ left: `${milestone}%` }}
            >
              {/* Milestone Label */}
              <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium transition-opacity ${
                scrollPercent >= milestone ? 'opacity-100 text-white' : 'opacity-0'
              }`}>
                {milestone}%
              </div>
            </div>
          ))}
          
          {/* Percentage Display */}
          {showPercentage && (
            <motion.div
              className="absolute -bottom-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
              style={{
                left: `${scrollPercent}%`,
                transform: 'translateX(-50%)'
              }}
              animate={{
                opacity: scrollPercent > 0 && scrollPercent < 100 ? 1 : 0
              }}
            >
              {scrollPercent}%
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Chapter Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
          <span>Lesefortschritt: {scrollPercent}%</span>
        </div>
      </motion.div>

      {/* Completion Celebration */}
      {scrollPercent >= 98 && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <div className="text-6xl">🎉</div>
        </motion.div>
      )}
    </>
  )
}