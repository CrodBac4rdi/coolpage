import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Code, Palette, Rocket, Heart, Star, Coffee, Music, Gamepad2, Pizza } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedBackground from '../components/AnimatedBackground'
import { useState } from 'react'

export default function Home() {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)

  const bentoItems = [
    {
      id: 'hero',
      size: 'large',
      title: 'Welcome to Crod Babylon',
      subtitle: 'Your Digital Paradise',
      description: 'Where creativity meets technology in the most unexpected ways',
      gradient: 'from-purple-600 to-pink-600',
      icon: <Sparkles className="w-8 h-8" />,
      link: '/about',
      emoji: '🚀'
    },
    {
      id: 'stats1',
      size: 'small',
      title: '42+',
      subtitle: 'Happy Clients',
      gradient: 'from-blue-500 to-cyan-500',
      icon: <Heart className="w-6 h-6" />,
      animated: true
    },
    {
      id: 'stats2',
      size: 'small',
      title: '∞',
      subtitle: 'Lines of Code',
      gradient: 'from-green-500 to-emerald-500',
      icon: <Code className="w-6 h-6" />,
      animated: true
    },
    {
      id: 'feature1',
      size: 'medium',
      title: 'Lightning Fast',
      description: 'Performance that makes your competitors cry',
      gradient: 'from-yellow-500 to-orange-500',
      icon: <Zap className="w-6 h-6" />,
      link: '/features',
      floatingEmoji: '⚡'
    },
    {
      id: 'feature2',
      size: 'medium',
      title: 'Beautiful Design',
      description: 'Pixel-perfect and gorgeous on every device',
      gradient: 'from-pink-500 to-rose-500',
      icon: <Palette className="w-6 h-6" />,
      link: '/features',
      floatingEmoji: '🎨'
    },
    {
      id: 'cta',
      size: 'wide',
      title: 'Ready to Start Your Journey?',
      description: 'Join the digital revolution today',
      gradient: 'from-indigo-600 to-purple-600',
      icon: <Rocket className="w-6 h-6" />,
      link: '/contact',
      cta: true
    },
    {
      id: 'fun1',
      size: 'small',
      title: '24/7',
      subtitle: 'Coffee Consumed',
      gradient: 'from-amber-600 to-orange-600',
      icon: <Coffee className="w-6 h-6" />,
      emoji: '☕'
    },
    {
      id: 'fun2',
      size: 'small',
      title: '100%',
      subtitle: 'Vibes',
      gradient: 'from-purple-500 to-violet-500',
      icon: <Music className="w-6 h-6" />,
      emoji: '🎵'
    },
    {
      id: 'projects',
      size: 'medium',
      title: 'Our Projects',
      description: 'See what we\'ve been cooking',
      gradient: 'from-teal-500 to-cyan-500',
      icon: <Star className="w-6 h-6" />,
      link: '/projects',
      floatingEmoji: '✨'
    },
    {
      id: 'blog',
      size: 'medium',
      title: 'Latest Thoughts',
      description: 'Fresh ideas and hot takes',
      gradient: 'from-red-500 to-pink-500',
      icon: <Pizza className="w-6 h-6" />,
      link: '/blog',
      floatingEmoji: '🍕'
    },
    {
      id: 'easter-egg',
      size: 'small',
      title: '???',
      subtitle: 'Click me!',
      gradient: 'from-gray-600 to-gray-700',
      icon: <Gamepad2 className="w-6 h-6" />,
      easter: true
    }
  ]

  const handleEasterEgg = () => {
    const emojis = ['🎮', '🎯', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎹', '🎸']
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
    alert(`You found the secret! Here's your prize: ${randomEmoji}`)
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'
      case 'wide':
        return 'col-span-2'
      case 'medium':
        return 'col-span-1 row-span-1'
      case 'small':
      default:
        return 'col-span-1'
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Welcome to the Future
          </h1>
          <p className="text-xl text-gray-300">
            A playful digital experience that breaks all the rules
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${getSizeClasses(item.size)} relative group`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredBox(item.id)}
              onMouseLeave={() => setHoveredBox(null)}
            >
              {item.link ? (
                <Link
                  to={item.link}
                  className="block h-full"
                  onClick={item.easter ? handleEasterEgg : undefined}
                >
                  <BentoBox item={item} isHovered={hoveredBox === item.id} />
                </Link>
              ) : (
                <div 
                  className="h-full cursor-pointer"
                  onClick={item.easter ? handleEasterEgg : undefined}
                >
                  <BentoBox item={item} isHovered={hoveredBox === item.id} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BentoBox({ item, isHovered }: { item: any; isHovered: boolean }) {
  return (
    <div className={`relative h-full rounded-3xl bg-gradient-to-br ${item.gradient} p-[2px] overflow-hidden`}>
      <div className="h-full bg-gray-900/90 backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-between">
        {/* Floating Emoji */}
        {item.floatingEmoji && (
          <motion.div
            className="absolute top-4 right-4 text-2xl"
            animate={{
              y: isHovered ? -10 : 0,
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {item.floatingEmoji}
          </motion.div>
        )}

        {/* Static Emoji */}
        {item.emoji && !item.floatingEmoji && (
          <div className="absolute top-4 right-4 text-2xl opacity-50">
            {item.emoji}
          </div>
        )}

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-20`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
          </div>
          
          {item.subtitle && (
            <p className="text-gray-400 text-sm">{item.subtitle}</p>
          )}
          
          {item.description && (
            <p className="text-gray-300 mt-2">{item.description}</p>
          )}
        </div>

        {/* CTA */}
        {item.cta && (
          <motion.div
            className="flex items-center gap-2 text-white font-semibold mt-4"
            animate={{ x: isHovered ? 10 : 0 }}
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}

        {/* Animated Stats */}
        {item.animated && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl font-bold opacity-10">{item.title}</span>
          </motion.div>
        )}

        {/* Hover Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity rounded-3xl`}
        />
      </div>
    </div>
  )
}