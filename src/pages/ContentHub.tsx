import { motion } from 'framer-motion'
import { Book, Palette, Play, Sparkles, ArrowRight, Star, TrendingUp, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { cn } from '../utils/cn'

const contentCategories = [
  {
    id: 'novels',
    title: 'Light Novels',
    subtitle: 'Epische Geschichten zum Lesen',
    description: 'Tauche ein in fesselnde Romane aus Japan, Korea und der ganzen Welt',
    icon: Book,
    gradient: 'from-purple-600 to-pink-600',
    bgGradient: 'from-purple-900/20 to-pink-900/20',
    available: true,
    count: 12,
    link: '/stories',
    featured: [
      { title: 'Forbidden Desire', rating: 4.8 },
      { title: 'Moonlight Academy', rating: 4.7 },
      { title: 'Code Breakers', rating: 4.9 }
    ]
  },
  {
    id: 'manhwas',
    title: 'Manhwas',
    subtitle: 'Koreanische Webtoons',
    description: 'Visuell beeindruckende Comics mit vertikalem Scroll-Format',
    icon: Palette,
    gradient: 'from-blue-600 to-cyan-600',
    bgGradient: 'from-blue-900/20 to-cyan-900/20',
    available: true,
    count: 8,
    link: '/manhwas',
    featured: [
      { title: 'Solo Leveling', rating: 4.9 },
      { title: 'Tower of God', rating: 4.8 },
      { title: 'The Beginning After The End', rating: 4.7 }
    ]
  },
  {
    id: 'anime',
    title: 'Anime',
    subtitle: 'Streaming & Info',
    description: 'Deine Lieblings-Anime an einem Ort - Reviews, Guides und mehr',
    icon: Play,
    gradient: 'from-red-600 to-orange-600',
    bgGradient: 'from-red-900/20 to-orange-900/20',
    available: false,
    count: 0,
    comingSoon: 'Q4 2025',
    preview: ['Simulcast', 'Klassiker', 'Movies', 'OVAs']
  }
]

export default function ContentHub() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-4 border-purple-400/20 bg-purple-400/10 rounded-lg"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
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

      {/* Navigation */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <Link to="/" className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors group">
            <span className="text-2xl font-black">CROD BABYLON</span>
          </Link>
          <div className="flex items-center gap-6">
            <motion.div className="text-white/60 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>3 Content Types</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Content Universe</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6">
            DEINE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">MEDIA</span> ZENTRALE
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Von Light Novels über Manhwas bis zu Anime - Alles was dein Otaku-Herz begehrt an einem Ort
          </p>
        </motion.div>

        {/* Content Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contentCategories.map((category, index) => {
            const Icon = category.icon
            const isHovered = hoveredCategory === category.id

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="relative group"
              >
                {/* Glow Effect */}
                <motion.div
                  className={cn('absolute -inset-0.5 bg-gradient-to-r rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-1000', category.gradient)}
                />

                {/* Card */}
                <div className={cn('relative h-full bg-gradient-to-br from-gray-900/90 to-black/95 border border-white/20 rounded-3xl p-8 overflow-hidden backdrop-blur-sm', category.bgGradient)}>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {category.available ? (
                      <div className="bg-green-500/20 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Live
                      </div>
                    ) : (
                      <div className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {category.comingSoon}
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={cn('w-20 h-20 mb-6 bg-gradient-to-br rounded-2xl flex items-center justify-center', category.gradient)}
                    animate={isHovered ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-lg text-gray-400 mb-4">{category.subtitle}</p>
                  <p className="text-gray-300 mb-6">{category.description}</p>

                  {/* Stats or Preview */}
                  {category.available ? (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/60 text-sm">Verfügbar</span>
                          <span className="text-white font-bold">{category.count} Stories</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <motion.div
                            className={cn('h-full bg-gradient-to-r rounded-full', category.gradient)}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                          />
                        </div>
                      </div>

                      {/* Featured Items */}
                      <div className="space-y-2 mb-6">
                        <p className="text-white/60 text-sm mb-2">Top Rated:</p>
                        {category.featured?.map((item, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center justify-between text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="text-gray-300">{item.title}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-white/80">{item.rating}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Link to={category.link!}>
                        <motion.button
                          className={cn('w-full bg-gradient-to-r text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group', category.gradient)}
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 0 }}
                        >
                          <span>Jetzt entdecken</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* Coming Soon Preview */}
                      <div className="mb-6">
                        <p className="text-white/60 text-sm mb-3">Geplante Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {category.preview?.map((feature, i) => (
                            <motion.span
                              key={i}
                              className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white/80"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 0.9 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Coming Soon Button */}
                      <motion.button
                        className="w-full bg-white/10 border border-white/20 text-white/60 px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        disabled
                      >
                        <Clock className="w-5 h-5" />
                        <span>Coming Soon</span>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Future Vision Section */}
      <motion.section
        className="relative z-10 container mx-auto px-4 sm:px-6 py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Die Zukunft von CROD BABYLON</h2>
          <p className="text-gray-300 text-lg mb-8">
            Wir bauen das ultimative Entertainment-Universum für Anime, Manga und Novel-Fans. 
            Bleib dran für spannende Updates!
          </p>
          <div className="inline-flex items-center gap-2 text-purple-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Powered by passion for great stories</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </motion.section>

      {/* Mouse follower */}
      <motion.div
        className="pointer-events-none fixed w-4 h-4 bg-white mix-blend-difference rounded-full"
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
    </div>
  )
}