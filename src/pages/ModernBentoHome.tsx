import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue, useVelocity } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, Search, BookmarkPlus, Book, Users, Gamepad2, 
  TrendingUp, Heart, Star, Zap, Globe, Play, Pause,
  ArrowRight, Github, Twitter, Coffee, Tv, Film,
  Activity, Flame, Award, Clock, Eye, MessageCircle,
  Mail, ExternalLink, Code2, Palette
} from 'lucide-react'
import { cn } from '../utils/cn'
import { getWatchStats, getFavorites } from '../utils/localStorage'
import SEOHead from '../components/SEOHead'
import Interactive3DCard from '../components/Interactive3DCard'
import { useParallax } from '../hooks/useParallax'
import Carousel3D from '../components/Carousel3D'
import MeshGradient, { StaticMeshGradient } from '../components/MeshGradient'
import { carouselAnimeData } from '../data/animeImages'

// Type definitions
type CardSize = 'sm' | 'md' | 'lg' | 'xl'
type GradientColor = 'purple' | 'pink' | 'yellow' | 'blue' | 'green' | 'orange'

interface FeatureCardData {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  iconColor: string
  link?: string
  stats?: Array<{ label: string; value: string | number }>
}

// Enhanced animated gradient with mouse interaction
function AnimatedGradient() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e
    mouseX.set(clientX)
    mouseY.set(clientY)
  }, [])
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])
  
  const blob1X = useTransform(mouseX, [0, window.innerWidth], [-100, 100])
  const blob1Y = useTransform(mouseY, [0, window.innerHeight], [-100, 100])
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[10px] opacity-50">
        <motion.div 
          style={{ x: blob1X, y: blob1Y }}
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" 
        />
        <motion.div 
          style={{ x: useTransform(mouseX, [0, window.innerWidth], [100, -100]) }}
          className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" 
        />
        <motion.div 
          style={{ y: useTransform(mouseY, [0, window.innerHeight], [100, -100]) }}
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" 
        />
      </div>
      
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  )
}

// Enhanced glassmorphic card with more features
interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  gradient?: GradientColor
  size?: CardSize
  interactive?: boolean
}

function GlassCard({ 
  children, 
  className, 
  hover = true,
  glow = false,
  gradient,
  size = 'md',
  interactive = false
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  const sizeClasses: Record<CardSize, string> = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }
  
  const gradientClasses: Record<GradientColor, string> = {
    purple: 'from-purple-600/20 to-indigo-600/20',
    pink: 'from-pink-600/20 to-rose-600/20',
    yellow: 'from-yellow-600/20 to-orange-600/20',
    blue: 'from-blue-600/20 to-cyan-600/20',
    green: 'from-green-600/20 to-emerald-600/20',
    orange: 'from-orange-600/20 to-red-600/20'
  }
  
  if (interactive) {
    return (
      <Interactive3DCard className={className} glowColor={gradient || 'purple'}>
        {children}
      </Interactive3DCard>
    )
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative backdrop-blur-sm bg-white/5 dark:bg-gray-900/20",
        "border border-white/20 dark:border-gray-700/50",
        "rounded-3xl overflow-hidden",
        hover && "hover:bg-white/20 dark:hover:bg-gray-900/40 transition-all duration-300",
        glow && "shadow-2xl",
        gradient && `bg-gradient-to-br ${gradientClasses[gradient]}`,
        sizeClasses[size],
        className
      )}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {glow && isHovered && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${gradient ? gradientClasses[gradient].split(' ')[1] : 'rgba(147, 51, 234, 0.3)'} 0%, transparent 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </motion.div>
  )
}

// Animated counter component
function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < value) {
            return Math.min(prev + Math.ceil(value / 20), value)
          }
          return value
        })
      }, 50)
      return () => clearInterval(timer)
    }
  }, [value, isInView])

  return (
    <div ref={ref} className="text-center">
      <motion.div 
        className="text-4xl font-bold text-white"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {count.toLocaleString()}
      </motion.div>
      <div className="text-sm text-white/70 mt-1">{label}</div>
    </div>
  )
}

// Enhanced live activity feed with real-time updates
interface Activity {
  id: string
  user: string
  action: string
  anime: string
  time: string
  avatar?: string
  type: 'watch' | 'favorite' | 'complete' | 'rate'
}

function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', user: "Sarah", action: "started watching", anime: "Horimiya", time: "2m ago", type: 'watch' },
    { id: '2', user: "Alex", action: "added to favorites", anime: "Your Name", time: "5m ago", type: 'favorite' },
    { id: '3', user: "Mike", action: "completed", anime: "Toradora!", time: "12m ago", type: 'complete' },
    { id: '4', user: "Emma", action: "rated 5★", anime: "Violet Evergarden", time: "15m ago", type: 'rate' },
  ])
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        user: ['Kai', 'Luna', 'Max', 'Nina'][Math.floor(Math.random() * 4)],
        action: ['started watching', 'completed', 'rated 4★', 'added to favorites'][Math.floor(Math.random() * 4)],
        anime: ['Attack on Titan', 'Death Note', 'Spirited Away', 'Demon Slayer'][Math.floor(Math.random() * 4)],
        time: 'just now',
        type: ['watch', 'complete', 'rate', 'favorite'][Math.floor(Math.random() * 4)] as Activity['type']
      }
      
      setActivities(prev => [newActivity, ...prev.slice(0, 3)])
    }, 15000) // Update every 15 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'watch': return <Play className="w-3 h-3" />
      case 'favorite': return <Heart className="w-3 h-3" />
      case 'complete': return <Award className="w-3 h-3" />
      case 'rate': return <Star className="w-3 h-3" />
    }
  }
  
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'watch': return 'from-blue-400 to-cyan-400'
      case 'favorite': return 'from-pink-400 to-rose-400'
      case 'complete': return 'from-green-400 to-emerald-400'
      case 'rate': return 'from-yellow-400 to-orange-400'
    }
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            layout
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30,
              delay: i * 0.05
            }}
            className="flex items-center gap-3 text-sm group"
          >
            <div className={`relative w-8 h-8 rounded-full bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center text-white font-bold text-xs`}>
              {activity.user[0]}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
            </div>
            <div className="flex-1">
              <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                {activity.user}
              </span>
              <span className="text-white/60"> {activity.action} </span>
              <span className="text-purple-300 font-medium">{activity.anime}</span>
            </div>
            <span className="text-white/40 text-xs">{activity.time}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Custom hook for intersection animations
function useIntersectionAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  
  return { ref, isInView }
}

// Feature data configuration
const FEATURE_CARDS: FeatureCardData[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with instant loading and smooth animations",
    gradient: "from-yellow-600/20 to-orange-600/20",
    iconColor: "text-yellow-400",
    stats: [
      { label: "Load Time", value: "<1s" },
      { label: "FPS", value: "60+" }
    ]
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Carefully crafted experience for anime and story enthusiasts",
    gradient: "from-pink-600/20 to-red-600/20",
    iconColor: "text-pink-400",
    stats: [
      { label: "Users", value: "10k+" },
      { label: "Rating", value: "4.9★" }
    ]
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Curated content and features for the best experience",
    gradient: "from-purple-600/20 to-indigo-600/20",
    iconColor: "text-purple-400",
    stats: [
      { label: "Content", value: "50k+" },
      { label: "Updates", value: "Daily" }
    ]
  }
]

export default function ModernBentoHome() {
  const { scrollY, scrollYProgress } = useScroll()
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const stats = useMemo(() => getWatchStats(), [])
  const favorites = useMemo(() => getFavorites(), [])
  
  // Enhanced parallax effects
  const heroRef = useRef<HTMLDivElement>(null)
  const { y: heroY, opacity: heroOpacity, scale: heroScale } = useParallax(heroRef, {
    yRange: [0, 150],
    opacityRange: [1, 0],
    scaleRange: [1, 0.9]
  })
  
  // Scroll velocity for dynamic effects
  const scrollVelocity = useVelocity(scrollY)
  const skewY = useTransform(scrollVelocity, [-1000, 1000], [-10, 10])
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const heroYSpring = useSpring(heroY, springConfig)
  const skewYSpring = useSpring(skewY, springConfig)

  return (
    <>
      <SEOHead 
        title="Crod Babylon - Your Modern Anime & Story Hub"
        description="Discover anime, read stories, track your favorites - all in one beautiful place"
      />
      
      <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
        {/* Dynamic mesh gradient background */}
        <MeshGradient 
          colors={['#8B5CF6', '#EC4899', '#F59E0B', '#3B82F6']} 
          speed={0.3}
          className="opacity-30"
        />
        <AnimatedGradient />
        
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center px-4"
          style={{ 
            y: heroYSpring, 
            opacity: heroOpacity, 
            scale: heroScale,
            skewY: skewYSpring
          }}
        >
          <div className="max-w-7xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Animated Logo */}
              <motion.div 
                className="inline-flex items-center justify-center mb-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative bg-gray-900 p-6 rounded-2xl border border-purple-500/30">
                    <Sparkles className="w-16 h-16 text-purple-400" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
                  Crod Babylon
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Your digital paradise for anime, stories, and endless entertainment
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/romance-search">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-lg flex items-center gap-2 hover:shadow-2xl hover:shadow-purple-500/25 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="w-5 h-5" />
                    Explore Anime
                  </motion.button>
                </Link>
                
                <Link to="/watchlist">
                  <motion.button
                    className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl font-semibold text-lg flex items-center gap-2 hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookmarkPlus className="w-5 h-5" />
                    My Watchlist
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Bento Grid Section */}
        <section className="relative px-4 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Everything You Need
              </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
              {/* Large Feature Card - Anime Search with 3D effect */}
              <motion.div
                className="md:col-span-2 md:row-span-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <Link to="/romance-search">
                  <GlassCard 
                    className="h-full relative group" 
                    size="xl"
                    glow
                    gradient="purple"
                    interactive
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <Tv className="w-12 h-12 text-purple-400" />
                        <span className="text-xs px-3 py-1 bg-purple-500/20 rounded-full text-purple-300">
                          Live Search
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">Anime Discovery</h3>
                      <p className="text-gray-400 mb-4 flex-1">
                        Search through thousands of anime with filters, genres, and real-time results
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 mt-auto">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">24k+</div>
                          <div className="text-xs text-gray-500">Anime</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-pink-400">50+</div>
                          <div className="text-xs text-gray-500">Genres</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">Live</div>
                          <div className="text-xs text-gray-500">Updates</div>
                        </div>
                      </div>
                      
                      <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>

              {/* Enhanced Stats Card with progress bars */}
              <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard 
                  className="h-full" 
                  gradient="yellow"
                  hover
                  glow
                >
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Activity className="w-6 h-6 text-yellow-400/50" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-400">Total</span>
                        <span className="text-sm font-bold">{stats.totalAnime}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(stats.totalAnime, 100)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    <AnimatedCounter value={stats.watching} label="Currently Watching" />
                    <AnimatedCounter value={favorites.length} label="Favorites" />
                  </div>
                </GlassCard>
              </motion.div>

              {/* Quick Actions with hover effect */}
              <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link to="/watchlist">
                  <GlassCard 
                    className="h-full group relative overflow-hidden" 
                    gradient="blue"
                    hover
                    glow
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10">
                      <BookmarkPlus className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold mb-2">Watchlist</h3>
                      <p className="text-sm text-gray-400">Track your anime journey</p>
                      
                      {/* Progress indicator */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                            initial={{ width: 0 }}
                            whileInView={{ width: '75%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>

              {/* Recent Updates Card */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="h-full p-6" hover={false}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-400" />
                      Recent Updates
                    </h3>
                    <span className="text-sm text-gray-500">Last 7 days</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm text-gray-300">New anime season announced for Spring 2024</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-sm text-gray-300">Updated romance collection with 15 new titles</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm text-gray-300">12 new stories added to the library</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-sm text-gray-300">Enhanced search features now available</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Stories Card with floating elements */}
              <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link to="/stories">
                  <GlassCard 
                    className="h-full relative overflow-hidden group" 
                    gradient="green"
                    hover
                  >
                    {/* Floating book icons */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute opacity-10"
                        initial={{ 
                          x: Math.random() * 100, 
                          y: Math.random() * 100 
                        }}
                        animate={{
                          x: [null, Math.random() * 200 - 100],
                          y: [null, Math.random() * 200 - 100],
                        }}
                        transition={{
                          duration: 10 + i * 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        <Book className="w-12 h-12 text-green-400" />
                      </motion.div>
                    ))}
                    
                    <div className="relative z-10">
                      <Book className="w-8 h-8 text-green-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Stories</h3>
                      <p className="text-sm text-gray-400 mb-4">12 captivating tales</p>
                      <div className="flex -space-x-2">
                        {['📚', '💕', '🎭', '✨'].map((emoji, i) => (
                          <motion.div 
                            key={i} 
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm border-2 border-gray-700"
                            whileHover={{ scale: 1.2, zIndex: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {emoji}
                          </motion.div>
                        ))}
                      </div>
                      <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>

              {/* Quiz Game Card with gaming effects */}
              <motion.div
                className="md:col-span-1"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/">
                  <GlassCard 
                    className="h-full relative overflow-hidden group" 
                    gradient="purple"
                    hover
                    interactive
                  >
                    <div className="relative z-10">
                      <Gamepad2 className="w-8 h-8 text-purple-400 mb-4 group-hover:animate-pulse" />
                      <h3 className="text-lg font-semibold mb-2">Quiz Game</h3>
                      <p className="text-sm text-gray-400 mb-4">Test your anime knowledge</p>
                      
                      {/* High score display */}
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-yellow-400 font-mono">HIGH SCORE: 9999</span>
                      </div>
                    </div>
                    
                    {/* Animated particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full"
                        initial={{ 
                          x: '50%', 
                          y: '100%',
                          opacity: 0 
                        }}
                        animate={{
                          x: `${Math.random() * 100}%`,
                          y: '-20%',
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                    
                    {/* Neon glow effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{
                        boxShadow: [
                          'inset 0 0 20px rgba(147, 51, 234, 0)',
                          'inset 0 0 20px rgba(147, 51, 234, 0.3)',
                          'inset 0 0 20px rgba(147, 51, 234, 0)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </GlassCard>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3D Carousel Section */}
        <section className="relative px-4 py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  Featured Content
                </span>
              </h2>
              <p className="text-xl text-gray-400">Discover what's trending right now</p>
            </motion.div>
            
            <Carousel3D 
              items={carouselAnimeData}
              className="mb-24"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
                  Why Choose Us?
                </span>
              </h2>
              <p className="text-xl text-gray-400">Everything you need in one place</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURE_CARDS.map((feature, i) => {
                const ref = useRef<HTMLDivElement>(null)
                const isInView = useInView(ref, { once: false, margin: "-100px" })
                
                return (
                  <motion.div
                    key={i}
                    ref={ref}
                    initial={{ opacity: 0, y: 50, rotateX: -30 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0, 
                      rotateX: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: i * 0.1
                      }
                    } : {}}
                    onHoverStart={() => setActiveFeature(i)}
                    onHoverEnd={() => setActiveFeature(null)}
                  >
                    <GlassCard 
                      className={`h-full bg-gradient-to-br ${feature.gradient} relative overflow-hidden`}
                      hover
                      glow={activeFeature === i}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5"
                        initial={{ y: "100%" }}
                        animate={activeFeature === i ? { y: "0%" } : { y: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <feature.icon className={`w-12 h-12 ${feature.iconColor} mb-4 relative z-10`} />
                      <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
                      <p className="text-gray-400 mb-4 relative z-10">{feature.description}</p>
                      
                      {feature.stats && (
                        <div className="grid grid-cols-2 gap-4 mt-auto relative z-10">
                          {feature.stats.map((stat, j) => (
                            <div key={j} className="text-center">
                              <div className="text-xl font-bold text-white">{stat.value}</div>
                              <div className="text-xs text-gray-500">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Animated background pattern */}
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.5'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: '40px 40px'
                        }}
                        animate={{
                          backgroundPosition: activeFeature === i ? ['0px 0px', '40px 40px'] : '0px 0px'
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </GlassCard>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-yellow-600/20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of anime lovers and story enthusiasts
              </p>
              <Link to="/romance-search">
                <motion.button
                  className="px-12 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/25 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                </motion.button>
              </Link>
            </GlassCard>
          </motion.div>
        </section>

        {/* Modern Footer with Effects */}
        <footer className="relative px-4 py-24 mt-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-gray-900 to-transparent" />
          
          {/* Animated grid pattern */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative max-w-7xl mx-auto">
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand section */}
              <div className="md:col-span-2">
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50" />
                    <Sparkles className="relative w-8 h-8 text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Crod Babylon
                  </span>
                </motion.div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Your ultimate destination for anime discovery, story exploration, and entertainment. 
                  Join our growing community of passionate fans.
                </p>
                
                {/* Newsletter */}
                <div className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-4 h-4" />
                    Subscribe
                  </motion.button>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Explore</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Anime Search', link: '/romance-search' },
                    { label: 'Watchlist', link: '/watchlist' },
                    { label: 'Stories', link: '/stories' },
                    { label: 'Content Hub', link: '/content' }
                  ].map((item, i) => (
                    <motion.li key={i} whileHover={{ x: 5 }}>
                      <Link 
                        to={item.link} 
                        className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1"
                      >
                        {item.label}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Connect */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Github, label: 'GitHub', color: 'hover:text-white' },
                    { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-400' },
                    { icon: Coffee, label: 'Ko-fi', color: 'hover:text-yellow-400' },
                    { icon: Code2, label: 'Dev', color: 'hover:text-green-400' }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className={`p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 ${social.color} transition-all`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">10k+</div>
                    <div className="text-xs text-gray-500">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-pink-400">50k+</div>
                    <div className="text-xs text-gray-500">Anime Titles</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom bar */}
            <motion.div 
              className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-500">
                © 2024 Crod Babylon. Crafted with passion and <span className="text-red-500">❤</span>
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-purple-400 transition-colors">API</a>
                <span className="flex items-center gap-1">
                  <Palette className="w-4 h-4" />
                  Dark Mode
                </span>
              </div>
            </motion.div>
          </div>
          
          {/* Floating decoration */}
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </footer>
      </div>
    </>
  )
}