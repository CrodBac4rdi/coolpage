import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown, Heart, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { cn } from '../utils/cn'
import { getFavorites } from '../utils/localStorage'
import QuickSearch from './QuickSearch'

interface NavLink {
  to: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavLink[]
}

export default function ImprovedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [favoriteCount, setFavoriteCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setFavoriteCount(getFavorites().length)
  }, [location])

  const navStructure: NavLink[] = [
    { to: '/', label: 'Home' },
    {
      to: '#',
      label: 'Anime',
      children: [
        { to: '/romance-search', label: 'Search Anime' },
        { to: '/watchlist', label: 'My Watchlist' },
        { to: '/anime-guide', label: 'Romance Guide' }
      ]
    },
    {
      to: '#',
      label: 'Reading',
      children: [
        { to: '/stories', label: 'Stories' },
        { to: '/manhwas', label: 'Manhwas' },
        { to: '/content', label: 'Content Hub' }
      ]
    },
    { to: '/dashboard', label: 'Dashboard' }
  ]

  const renderDesktopNav = () => (
    <div className="hidden md:flex items-center gap-1">
      {navStructure.map((link) => {
        const isActive = location.pathname === link.to
        const hasChildren = link.children && link.children.length > 0
        const isDropdownOpen = hoveredDropdown === link.label

        if (hasChildren) {
          return (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setHoveredDropdown(link.label)}
              onMouseLeave={() => setHoveredDropdown(null)}
            >
              <button
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all',
                  'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                )}
              >
                <span>{link.label}</span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  isDropdownOpen && "rotate-180"
                )} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {link.children.map((child) => {
                      const isChildActive = location.pathname === child.to
                      return (
                        <Link
                          key={child.to}
                          to={child.to}
                          className={cn(
                            'block px-4 py-3 text-sm transition-colors',
                            isChildActive
                              ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          )}
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        }

        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              isActive
                ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
            )}
          >
            {link.label}
          </Link>
        )
      })}
    </div>
  )

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white dark:bg-gray-800 rounded-xl p-2.5 border border-gray-200 dark:border-gray-700">
                  <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </motion.div>
              <div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Crod Babylon
                </span>
                <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400">
                  Your Anime & Story Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {renderDesktopNav()}

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Quick Search */}
              <QuickSearch />
              
              {/* Favorites Counter */}
              <Link to="/watchlist" className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  {favoriteCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {favoriteCount}
                    </motion.span>
                  )}
                </button>
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <Link to="/contact">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                  Contact
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                className="p-2 rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 z-40 md:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-4">
                {navStructure.map((link) => {
                  if (link.children) {
                    return (
                      <div key={link.label} className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          {link.label}
                        </h3>
                        <div className="space-y-1">
                          {link.children.map((child) => {
                            const isActive = location.pathname === child.to
                            return (
                              <Link
                                key={child.to}
                                to={child.to}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  'block px-4 py-3 rounded-lg transition-colors',
                                  isActive
                                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                                    : 'text-gray-700 dark:text-gray-300'
                                )}
                              >
                                {child.label}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }

                  const isActive = location.pathname === link.to
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'block px-4 py-3 rounded-lg mb-2 transition-colors',
                        isActive
                          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}