import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Rocket, Star, Gamepad2, Pizza, Book, Smile, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedBackground from '../components/AnimatedBackground'
import { useState } from 'react'

export default function Home() {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null)
  const [clickCount, setClickCount] = useState(0)

  const bentoItems = [
    {
      id: 'hero',
      size: 'xlarge',
      title: 'Welcome to Crod Babylon',
      subtitle: 'Your Digital Playground',
      gradient: 'from-purple-600 to-pink-600',
      icon: <Sparkles className="w-8 h-8" />,
      link: '/about',
      emoji: '🚀'
    },
    {
      id: 'games',
      size: 'large',
      title: 'Play Games',
      description: 'Mini-games galore!',
      gradient: 'from-green-500 to-teal-500',
      icon: <Gamepad2 className="w-6 h-6" />,
      link: '/games',
      floatingEmoji: '🎮'
    },
    {
      id: 'manhwa',
      size: 'large',
      title: 'Read Manhwa',
      description: 'Romance story awaits',
      gradient: 'from-pink-500 to-red-500',
      icon: <Book className="w-6 h-6" />,
      link: '/manhwa',
      floatingEmoji: '💕'
    },
    {
      id: 'stats1',
      size: 'tiny',
      title: '42',
      subtitle: 'Vibes',
      gradient: 'from-blue-500 to-cyan-500',
      emoji: '✨'
    },
    {
      id: 'stats2',
      size: 'tiny',
      title: '∞',
      subtitle: 'Fun',
      gradient: 'from-purple-500 to-violet-500',
      emoji: '🎉'
    },
    {
      id: 'stats3',
      size: 'tiny',
      title: '24/7',
      subtitle: 'Online',
      gradient: 'from-green-500 to-emerald-500',
      emoji: '🌟'
    },
    {
      id: 'stats4',
      size: 'tiny',
      title: '100%',
      subtitle: 'Cool',
      gradient: 'from-orange-500 to-red-500',
      emoji: '🔥'
    },
    {
      id: 'feature1',
      size: 'medium',
      title: 'Lightning Fast',
      gradient: 'from-yellow-500 to-orange-500',
      icon: <Zap className="w-6 h-6" />,
      link: '/features'
    },
    {
      id: 'projects',
      size: 'small',
      title: 'Projects',
      gradient: 'from-indigo-500 to-purple-500',
      icon: <Star className="w-5 h-5" />,
      link: '/projects'
    },
    {
      id: 'blog',
      size: 'small',
      title: 'Blog',
      gradient: 'from-red-500 to-pink-500',
      icon: <Pizza className="w-5 h-5" />,
      link: '/blog'
    },
    {
      id: 'music',
      size: 'tiny',
      title: '🎵',
      gradient: 'from-purple-500 to-pink-500',
      animated: true
    },
    {
      id: 'coffee',
      size: 'tiny',
      title: '☕',
      gradient: 'from-amber-600 to-orange-600',
      animated: true
    },
    {
      id: 'trophy',
      size: 'tiny',
      title: '🏆',
      gradient: 'from-yellow-500 to-amber-500',
      animated: true
    },
    {
      id: 'diamond',
      size: 'tiny',
      title: '💎',
      gradient: 'from-cyan-500 to-blue-500',
      animated: true
    },
    {
      id: 'mood',
      size: 'small',
      title: 'Mood',
      subtitle: getRandomMood(),
      gradient: 'from-pink-500 to-purple-500',
      icon: <Smile className="w-5 h-5" />,
      interactive: true
    },
    {
      id: 'counter',
      size: 'small',
      title: 'Clicks',
      subtitle: clickCount.toString(),
      gradient: 'from-green-500 to-blue-500',
      icon: <Flame className="w-5 h-5" />,
      clickable: true
    },
    {
      id: 'easter1',
      size: 'tiny',
      title: '👻',
      gradient: 'from-gray-600 to-gray-700',
      easter: true
    },
    {
      id: 'rainbow',
      size: 'tiny',
      title: '🌈',
      gradient: 'from-red-500 via-yellow-500 to-blue-500',
      animated: true
    },
    {
      id: 'party',
      size: 'tiny',
      title: '🎊',
      gradient: 'from-purple-500 to-pink-500',
      animated: true
    },
    {
      id: 'cta',
      size: 'wide',
      title: 'Ready to explore?',
      gradient: 'from-indigo-600 to-purple-600',
      icon: <Rocket className="w-6 h-6" />,
      link: '/contact',
      cta: true
    }
  ]

  function getRandomMood() {
    const moods = ['Happy', 'Excited', 'Chill', 'Hyped', 'Groovy', 'Blessed', 'Vibing']
    return moods[Math.floor(Math.random() * moods.length)]
  }

  const handleEasterEgg = () => {
    const messages = [
      'Boo! You found me! 👻',
      'Secret unlocked! Here\'s a cookie 🍪',
      'You\'re awesome! 🌟',
      'Ghost mode activated! 👻',
      'Spooky vibes only! 🎃'
    ]
    alert(messages[Math.floor(Math.random() * messages.length)])
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'xlarge':
        return 'col-span-2 row-span-2 md:col-span-3 md:row-span-2'
      case 'large':
        return 'col-span-2 row-span-2'
      case 'wide':
        return 'col-span-2 md:col-span-3'
      case 'medium':
        return 'col-span-1 md:col-span-2'
      case 'small':
        return 'col-span-1'
      case 'tiny':
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
            Where every pixel tells a story 🎨
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[120px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${getSizeClasses(item.size)} relative group`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
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
                  onClick={() => {
                    if (item.easter) {
                      handleEasterEgg()
                    } else if (item.clickable) {
                      setClickCount(prev => prev + 1)
                    } else if (item.interactive) {
                      // Force re-render to get new mood
                      setHoveredBox(null)
                      setTimeout(() => setHoveredBox(item.id), 10)
                    }
                  }}
                >
                  <BentoBox 
                    item={{
                      ...item,
                      subtitle: item.id === 'counter' ? clickCount.toString() : 
                               item.id === 'mood' && hoveredBox === item.id ? getRandomMood() : 
                               item.subtitle
                    }} 
                    isHovered={hoveredBox === item.id} 
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fun Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-gray-400"
        >
          <p>Made with 💜 and lots of ☕</p>
        </motion.div>
      </div>
    </div>
  )
}

function BentoBox({ item, isHovered }: { item: any; isHovered: boolean }) {
  return (
    <div className={`relative h-full rounded-2xl bg-gradient-to-br ${item.gradient} p-[1px] overflow-hidden`}>
      <div className="h-full bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 flex flex-col justify-center items-center">
        {/* Floating Emoji */}
        {item.floatingEmoji && (
          <motion.div
            className="absolute top-2 right-2 text-xl"
            animate={{
              y: isHovered ? -5 : 0,
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {item.floatingEmoji}
          </motion.div>
        )}

        {/* Static Emoji */}
        {item.emoji && !item.floatingEmoji && (
          <div className="text-2xl mb-2 opacity-70">
            {item.emoji}
          </div>
        )}

        {/* Just Emoji for tiny boxes */}
        {item.size === 'tiny' && !item.subtitle && !item.icon && (
          <motion.div 
            className="text-4xl"
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              rotate: item.animated && isHovered ? 360 : 0 
            }}
          >
            {item.title}
          </motion.div>
        )}

        {/* Content for other boxes */}
        {(item.size !== 'tiny' || item.subtitle || item.icon) && (
          <>
            {item.icon && (
              <div className={`mb-2 ${item.size === 'tiny' ? 'p-1' : 'p-2'} rounded-xl bg-white/10`}>
                {item.icon}
              </div>
            )}
            
            <h3 className={`font-bold text-center ${
              item.size === 'xlarge' ? 'text-2xl' :
              item.size === 'large' ? 'text-xl' :
              item.size === 'tiny' ? 'text-sm' :
              'text-base'
            }`}>
              {item.title}
            </h3>
            
            {item.subtitle && (
              <p className={`text-gray-400 text-center ${
                item.size === 'tiny' ? 'text-xs' : 'text-sm'
              }`}>
                {item.subtitle}
              </p>
            )}
            
            {item.description && item.size !== 'tiny' && (
              <p className="text-gray-300 text-sm mt-2 text-center">
                {item.description}
              </p>
            )}
          </>
        )}

        {/* CTA */}
        {item.cta && (
          <motion.div
            className="flex items-center gap-2 text-white font-semibold mt-4"
            animate={{ x: isHovered ? 10 : 0 }}
          >
            Let's Go <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}

        {/* Hover Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl`}
        />
      </div>
    </div>
  )
}