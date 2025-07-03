import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Rocket, Star, Gamepad2, Book, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import AnimatedBackground from '../components/AnimatedBackground'

export default function Home() {
  const bentoItems = [
    {
      id: 'hero',
      size: 'large',
      title: 'I Create Digital Worlds',
      subtitle: '✨ Manhwa • Light Novels • Interactive Stories ✨',
      description: 'Where code meets storytelling, where pixels become poetry',
      gradient: 'from-purple-500/30 to-pink-500/30 via-blue-500/20',
      icon: <Sparkles className="w-8 h-8" />,
      link: '/about',
      anime: true
    },
    {
      id: 'manhwa',
      size: 'medium',
      title: '📚 Light Novels',
      description: '恋愛 Romance stories that steal hearts',
      gradient: 'from-pink-500/25 to-rose-400/25',
      icon: <Book className="w-6 h-6" />,
      link: '/manhwa',
      japanese: '小説'
    },
    {
      id: 'projects',
      size: 'medium',
      title: '🎨 Story Universe',
      description: 'My digital novel collections',
      gradient: 'from-indigo-500/25 to-purple-500/25',
      icon: <Star className="w-6 h-6" />,
      link: '/projects',
      japanese: '作品'
    },
    {
      id: 'features',
      size: 'small',
      title: '⚡ Reader Mode',
      description: 'Perfect reading experience',
      gradient: 'from-cyan-500/25 to-blue-500/25',
      icon: <Zap className="w-5 h-5" />,
      link: '/features',
      japanese: '機能'
    },
    {
      id: 'games',
      size: 'small',
      title: '🎮 Mini Games',
      description: 'Interactive story elements',
      gradient: 'from-emerald-500/25 to-green-500/25',
      icon: <Gamepad2 className="w-5 h-5" />,
      link: '/games',
      japanese: 'ゲーム'
    },
    {
      id: 'blog',
      size: 'small',
      title: '📖 Chronicles',
      description: 'Behind the stories',
      gradient: 'from-orange-500/25 to-red-500/25',
      icon: <Heart className="w-5 h-5" />,
      link: '/blog',
      japanese: '日記'
    },
    {
      id: 'contact',
      size: 'wide',
      title: '💌 Connect with me',
      description: 'Join the story creation journey • コミュニティ参加',
      gradient: 'from-violet-500/25 to-pink-500/25',
      icon: <Rocket className="w-6 h-6" />,
      link: '/contact',
      cta: true,
      japanese: '連絡'
    }
  ]

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2'
      case 'wide':
        return 'col-span-2 sm:col-span-2'
      case 'medium':
        return 'col-span-1 row-span-2 sm:col-span-1 sm:row-span-2'
      case 'small':
      default:
        return 'col-span-1 sm:col-span-1'
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Crod Babylon
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            A modern digital experience crafted with passion for anime, games, and storytelling
          </p>
        </motion.div>

        {/* Clean Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${getSizeClasses(item.size)} group`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.link}
                className="block h-full"
              >
                <div className={`h-full min-h-[120px] sm:min-h-[160px] rounded-2xl sm:rounded-3xl bg-gradient-to-br ${item.gradient} dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/30 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:border-gray-300/30 dark:hover:border-gray-600/50`}>
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-3 sm:mb-4">
                      <div className="inline-flex p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className={`font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white ${
                        item.size === 'large' ? 'text-lg sm:text-xl md:text-2xl' : 
                        item.size === 'small' ? 'text-sm sm:text-base md:text-lg' : 
                        'text-base sm:text-lg md:text-xl'
                      }`}>
                        {item.title}
                      </h3>
                      
                      {item.subtitle && (
                        <p className="text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">
                          {item.subtitle}
                        </p>
                      )}
                      
                      {item.description && (
                        <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm hidden sm:block">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* CTA for wide items */}
                    {item.cta && (
                      <div className="mt-4 sm:mt-6 flex items-center gap-2 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        <span className="font-medium text-sm sm:text-base">Get Started</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Clean Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto px-4"
        >
          {[
            { label: 'Stories', value: '3+' },
            { label: 'Mini Games', value: '1+' },
            { label: 'Experiences', value: '∞' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}