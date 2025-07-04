import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Menu, X, Sun, Moon, Book, Users, Sparkles, Clock, Gamepad2, Map } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const [currentReadingProgress, setCurrentReadingProgress] = useState(0)

  // Get reading progress from localStorage
  useEffect(() => {
    const lastSession = localStorage.getItem('reading-session')
    if (lastSession) {
      const session = JSON.parse(lastSession)
      setCurrentReadingProgress(session.progress || 0)
    }
  }, [location])

  const links = [
    { to: '/', label: 'Home', icon: Rocket, description: 'Startseite' },
    { to: '/manhwa', label: 'Stories', icon: Book, description: 'Alle Geschichten' },
    { to: '/blog', label: 'Characters', icon: Users, description: 'Charaktere & Mood Board' },
    { to: '/timeline', label: 'Timeline', icon: Clock, description: 'Story Timeline' },
    { to: '/memory', label: 'Memory', icon: Map, description: 'Memory Palace' },
    { to: '/games', label: 'Games', icon: Gamepad2, description: 'Story Universe' },
  ]

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 dark:bg-black/20 border-b border-gray-200 dark:border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="w-8 h-8 text-purple-400" />
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Crod Babylon
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group relative"
                >
                  <motion.div
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`} />
                    <span>{link.label}</span>
                    
                    {/* Enhanced Reading Progress for Stories */}
                    {link.to === '/manhwa' && currentReadingProgress > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </motion.div>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {link.description}
                    </div>
                  </div>
                </Link>
              )
            })}
            <Link to="/contact">
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ Contact
              </motion.button>
            </Link>
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={theme === 'dark' ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle for Mobile */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={theme === 'dark' ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            {/* Mobile Menu Toggle */}
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-3">
              {links.map((link, index) => {
                const Icon = link.icon
                const isActive = location.pathname === link.to
                
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <div>{link.label}</div>
                        <div className="text-xs text-gray-500">{link.description}</div>
                      </div>
                      {link.to === '/manhwa' && currentReadingProgress > 0 && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
              <div className="pt-4 border-t border-white/10">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sparkles className="w-5 h-5" />
                    Contact
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}