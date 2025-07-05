import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Trophy, Zap, Target } from 'lucide-react'

interface StatProps {
  label: string
  value: number
  suffix?: string
  icon: React.ReactNode
  color: string
  delay: number
}

function AnimatedStat({ label, value, suffix = '', icon, color, delay }: StatProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
    >
      {/* Hexagon background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-32 h-32" viewBox="0 0 100 100">
          <motion.path
            d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: delay + 0.2, duration: 1 }}
          />
          <motion.path
            d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z"
            fill={color}
            fillOpacity="0.1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-8">
        <motion.div
          className="mb-2"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            delay: delay + 1,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          {icon}
        </motion.div>
        
        <motion.div
          className="text-4xl font-black text-white mb-1"
          style={{ textShadow: `0 0 20px ${color}` }}
        >
          {count.toLocaleString()}{suffix}
        </motion.div>
        
        <div className="text-sm uppercase tracking-wider text-white/60">
          {label}
        </div>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"
        style={{ backgroundImage: `linear-gradient(45deg, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function GamingStats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Static background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            ACHIEVEMENT UNLOCKED
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedStat
            label="Stories Available"
            value={12}
            icon={<Trophy className="w-8 h-8 text-yellow-400" />}
            color="#facc15"
            delay={0}
          />
          <AnimatedStat
            label="Total Chapters"
            value={60}
            suffix="+"
            icon={<Zap className="w-8 h-8 text-purple-400" />}
            color="#a855f7"
            delay={0.2}
          />
          <AnimatedStat
            label="Words Written"
            value={100000}
            suffix="+"
            icon={<Target className="w-8 h-8 text-cyan-400" />}
            color="#22d3ee"
            delay={0.4}
          />
        </div>

        {/* Character Quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Character 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 h-full">
                <div className="text-6xl mb-4">👑</div>
                <p className="text-white/80 italic mb-2">"Power isn't given, it's taken."</p>
                <p className="text-purple-400 text-sm font-semibold">- CEO Alexander</p>
              </div>
            </motion.div>
            
            {/* Character 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6 h-full">
                <div className="text-6xl mb-4">🌙</div>
                <p className="text-white/80 italic mb-2">"Magic flows where hearts connect."</p>
                <p className="text-blue-400 text-sm font-semibold">- Luna from Moonlight Academy</p>
              </div>
            </motion.div>
            
            {/* Character 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-pink-900/30 to-red-900/30 backdrop-blur-sm border border-pink-400/30 rounded-2xl p-6 h-full">
                <div className="text-6xl mb-4">💕</div>
                <p className="text-white/80 italic mb-2">"Love finds a way, even in code."</p>
                <p className="text-pink-400 text-sm font-semibold">- The Transfer Student</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}