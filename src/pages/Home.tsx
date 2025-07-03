import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Gamepad2, Book, Users, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import SEOHead from '../components/SEOHead'

export default function Home() {
  const bentoItems = useMemo(() => [
    {
      id: 'hero',
      size: 'hero',
      title: 'Digital Storytelling',
      subtitle: '✨ Romance • Fantasy • Thriller ✨',
      description: 'Wo Code auf Geschichtenerzählen trifft - erlebe 12 einzigartige Welten voller Leidenschaft, Magie und Abenteuer',
      gradient: 'from-purple-500/30 via-pink-500/20 to-blue-500/30',
      icon: <Sparkles className="w-12 h-12" />,
      link: '/manhwa',
      featured: true,
      stats: '12 Stories'
    },
    {
      id: 'stories',
      size: 'large',
      title: '📚 Geschichten',
      subtitle: 'Von Cyberpunk bis Träume',
      description: 'Tauche ein in Welten von Code Breakers, Dream Catcher und 10 weitere epische Tales',
      gradient: 'from-pink-500/25 to-rose-400/30',
      icon: <Book className="w-8 h-8" />,
      link: '/manhwa',
      stats: '500+ Kapitel'
    },
    {
      id: 'characters',
      size: 'large', 
      title: '👥 Charaktere',
      subtitle: 'Helden & Heldinnen',
      description: 'Entdecke die faszinierenden Persönlichkeiten unserer Geschichten mit ihren Geheimnissen',
      gradient: 'from-purple-500/25 to-indigo-500/30',
      icon: <Users className="w-8 h-8" />,
      link: '/blog',
      stats: '8+ Profile'
    },
    {
      id: 'reader',
      size: 'medium',
      title: '⚡ Reader',
      subtitle: 'Modernes Lesen',
      description: 'Kontinuierliches Scrollen, Dark Mode, einstellbare Schrift',
      gradient: 'from-cyan-500/25 to-blue-500/30',
      icon: <Zap className="w-6 h-6" />,
      link: '/manhwa',
      stats: 'Scroll & Read'
    },
    {
      id: 'games',
      size: 'medium',
      title: '🎮 Games',
      subtitle: 'Interaktiv',
      description: 'Q&A Quiz über Charaktere und Story-Würfel für zufällige Entdeckungen',
      gradient: 'from-emerald-500/25 to-green-500/30',
      icon: <Gamepad2 className="w-6 h-6" />,
      link: '/games',
      stats: '2 Mini Games'
    },
    {
      id: 'contact',
      size: 'wide',
      title: '✨ Lass uns connecten',
      subtitle: 'Join the Journey',
      description: 'Werde Teil der Community • Feedback • Ideen • Stories gemeinsam erleben',
      gradient: 'from-violet-500/30 to-pink-500/30',
      icon: <Mail className="w-8 h-8" />,
      link: '/contact',
      cta: true,
      stats: 'Schreib mir!'
    }
  ], [])

  const getSizeClasses = useMemo(() => (size: string) => {
    switch (size) {
      case 'hero':
        return 'col-span-1 xs:col-span-2 lg:col-span-3 row-span-2 xs:row-span-3 lg:row-span-2'
      case 'large':
        return 'col-span-1 xs:col-span-2 row-span-2'
      case 'wide':
        return 'col-span-1 xs:col-span-2 lg:col-span-3 row-span-1'
      case 'medium':
      default:
        return 'col-span-1 row-span-2'
    }
  }, [])

  return (
    <>
      <SEOHead />
      <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500/30 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Digital Romance Universe</span>
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
              Crod Babylon
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Ein modernes digitales Erlebnis voller <span className="text-pink-400">Leidenschaft</span>, 
            <span className="text-purple-400"> Magie</span> und <span className="text-cyan-400">Innovation</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/manhwa">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Stories entdecken 📚
              </motion.button>
            </Link>
            <Link to="/blog">
              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Charaktere kennenlernen 👥
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Modern Bento Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${getSizeClasses(item.size)} group relative`}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", damping: 25, stiffness: 120 }}
            >
              <Link to={item.link} className="block h-full">
                <div className={`h-full min-h-[180px] xs:min-h-[200px] lg:min-h-[240px] rounded-2xl xs:rounded-3xl bg-gradient-to-br ${item.gradient} backdrop-blur-xl border border-white/10 p-4 xs:p-6 lg:p-8 transition-all duration-500 hover:scale-[1.02] hover:border-white/30 hover:shadow-2xl group relative overflow-hidden`}>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-xl transform -translate-x-12 translate-y-12" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon & Stats */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className="p-2 xs:p-3 lg:p-4 rounded-xl xs:rounded-2xl bg-white/15 backdrop-blur-sm text-white group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        {item.icon}
                      </motion.div>
                      {item.stats && (
                        <span className="text-xs lg:text-sm font-medium text-white/70 bg-black/20 px-3 py-1 rounded-full">
                          {item.stats}
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className={`font-bold text-white mb-2 group-hover:text-purple-100 transition-colors ${
                        item.size === 'hero' ? 'text-xl xs:text-2xl lg:text-3xl' : 
                        item.size === 'large' ? 'text-lg xs:text-xl lg:text-2xl' : 
                        'text-base xs:text-lg lg:text-xl'
                      }`}>
                        {item.title}
                      </h3>
                      
                      {item.subtitle && (
                        <p className="text-white/80 mb-3 text-xs xs:text-sm lg:text-base font-medium">
                          {item.subtitle}
                        </p>
                      )}
                      
                      <p className={`text-white/70 leading-relaxed ${
                        item.size === 'hero' ? 'text-sm xs:text-base lg:text-lg' : 'text-xs xs:text-sm lg:text-base'
                      }`}>
                        {item.description}
                      </p>
                    </div>

                    {/* CTA */}
                    {item.cta && (
                      <motion.div
                        className="mt-6 flex items-center gap-3 text-white group-hover:text-purple-100 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-semibold text-sm xs:text-base lg:text-lg">Jetzt connecten</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    )}

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/5 group-hover:to-cyan-500/10 rounded-3xl transition-all duration-500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 lg:mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4">
              Die Zahlen sprechen
            </h2>
            <p className="text-gray-400 text-lg">Eine wachsende Welt voller Geschichten</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Geschichten', value: '12', emoji: '📚', color: 'from-pink-500 to-rose-500' },
              { label: 'Kapitel', value: '500+', emoji: '📖', color: 'from-purple-500 to-violet-500' },
              { label: 'Charaktere', value: '50+', emoji: '👥', color: 'from-blue-500 to-cyan-500' },
              { label: 'Erlebnisse', value: '∞', emoji: '✨', color: 'from-amber-500 to-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-4xl mb-3">{stat.emoji}</div>
                <div className={`text-3xl lg:text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 lg:mt-24 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 lg:p-12 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 backdrop-blur-xl rounded-3xl border border-white/20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Bereit für das Abenteuer?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Tauche ein in 12 einzigartige Welten voller Emotionen, Action und unvergesslicher Charaktere
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/manhwa">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-lg shadow-2xl shadow-purple-500/25"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Jetzt lesen starten 🚀
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Community beitreten 💬
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  )
}