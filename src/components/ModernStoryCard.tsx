import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import { Book, ArrowRight, Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

interface ModernStoryCardProps {
  id: string
  title: string
  genre: string[]
  emoji: string
  delay?: number
  mature?: boolean
}

export default function ModernStoryCard({
  id,
  title,
  genre,
  emoji,
  delay = 0,
  mature = false
}: ModernStoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toggleFavorite, isFavorite } = useFavorites()
  const isStoryFavorite = isFavorite(id)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [15, -15])
  const rotateY = useTransform(x, [-100, 100], [-15, 15])

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((event.clientX - centerX) * 0.3)
    y.set((event.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const getGradient = () => {
    const gradients: Record<string, string> = {
      'Romance': 'from-pink-500/20 via-rose-500/10 to-red-500/20',
      'Fantasy': 'from-purple-500/20 via-blue-500/10 to-indigo-500/20', 
      'Mystery': 'from-violet-500/20 via-purple-500/10 to-indigo-500/20',
      'Thriller': 'from-red-500/20 via-orange-500/10 to-yellow-500/20',
      'Drama': 'from-gray-500/20 via-slate-500/10 to-zinc-500/20',
      'Cyberpunk': 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
      'Slice of Life': 'from-orange-500/20 via-amber-500/10 to-yellow-500/20'
    }
    return gradients[genre[0]] || gradients['Romance']
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <Link to={`/reader/${id}`}>
        <motion.div
          className="group relative h-96"
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
            className={`absolute -inset-0.5 bg-gradient-to-r ${getGradient()} rounded-3xl blur opacity-0 group-hover:opacity-50 transition duration-1000`}
            animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
          />

          {/* Card content */}
          <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-8 overflow-hidden backdrop-blur-sm">
            
            {/* Static decoration */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full" />
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full" />
              <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-white rounded-full" />
            </div>

            {/* Badges */}
            <div className="absolute top-4 right-4 flex gap-2">
              {mature && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-3 py-1 rounded-full text-xs font-medium">
                  18+
                </div>
              )}
              
              {/* Favorite Heart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleFavorite(id)
                }}
                className="w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-colors"
              >
                <Heart 
                  className={`w-4 h-4 transition-all ${
                    isStoryFavorite ? 'fill-red-500 text-red-500' : 'text-white/60 hover:text-white'
                  }`}
                />
              </motion.button>
            </div>

            {/* Story emoji - large */}
            <motion.div
              className="text-8xl mb-6 text-center"
              animate={isHovered ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              {emoji}
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3 text-center leading-tight">
              {title}
            </h3>

            {/* Genre tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {genre.slice(0, 2).map((g, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/80"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-6 text-white/60">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">4.{Math.floor(Math.random() * 5) + 3}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-sm">{Math.floor(Math.random() * 90) + 10}%</span>
              </div>
            </div>

            {/* Interactive elements */}
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-white/40 text-sm">
                {Math.floor(Math.random() * 50) + 10}k Reads
              </div>
            </motion.div>

            {/* Read button */}
            <motion.div
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <span>Geschichte lesen</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}