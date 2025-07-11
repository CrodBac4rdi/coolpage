import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Heart, Sparkles, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

interface EnhancedStoryCardProps {
  title: string
  description: string
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  link: string
  delay?: number
}

export default function EnhancedStoryCard({
  title,
  description,
  icon,
  iconBg,
  iconColor,
  link,
  delay = 0
}: EnhancedStoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <Link to={link}>
        <motion.div
          className="relative group story-card-mobile mobile-touch-target"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000"
            animate={isHovered ? { opacity: 0.75 } : { opacity: 0 }}
          />

          {/* Card content */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/30 rounded-2xl p-8 overflow-hidden backdrop-blur-sm">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Icon with animation */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className={cn('p-4 rounded-xl transition-all duration-300', ...(iconBg?.split(' ') || []), iconColor)}
                animate={isHovered ? { 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Eye className="w-3 h-3 text-white/40" />
                  <span className="text-xs text-white/40">{Math.floor(Math.random() * 10000)} reads</span>
                </div>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              {description}
            </p>

            {/* Interactive elements */}
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors mobile-touch-target"
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsLiked(!isLiked)
                  }}
                >
                  <Heart 
                    className={cn('w-4 h-4 transition-all', isLiked ? 'fill-red-500 text-red-500' : 'text-white')}
                  />
                </motion.button>
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </motion.div>

              <motion.div
                className="flex items-center text-white font-medium"
                animate={isHovered ? { x: 5 } : { x: 0 }}
              >
                <span>Read Story</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div>
            </div>

            {/* Hover effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}