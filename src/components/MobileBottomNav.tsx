import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, BookmarkPlus, Book, LayoutGrid } from 'lucide-react'
import { cn } from '../utils/cn'
import { getWatchlist } from '../utils/localStorage'
import { useEffect, useState } from 'react'

export default function MobileBottomNav() {
  const location = useLocation()
  const [watchlistCount, setWatchlistCount] = useState(0)

  useEffect(() => {
    // Update watchlist count
    const updateCount = () => {
      const watchlist = getWatchlist()
      setWatchlistCount(watchlist.filter(item => item.status === 'watching').length)
    }
    
    updateCount()
    // Listen for storage changes
    window.addEventListener('storage', updateCount)
    return () => window.removeEventListener('storage', updateCount)
  }, [location]) // Re-check on navigation

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/romance-search', icon: Search, label: 'Search' },
    { path: '/content', icon: LayoutGrid, label: 'Hub' },
    { path: '/watchlist', icon: BookmarkPlus, label: 'Watchlist', badge: watchlistCount },
    { path: '/stories', icon: Book, label: 'Stories' }
  ]

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 relative",
                "transition-colors duration-200",
                isActive 
                  ? "text-purple-600 dark:text-purple-400" 
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute -top-0.5 left-1/2 w-12 h-1 bg-purple-600 dark:bg-purple-400 rounded-b-full"
                    initial={{ scaleX: 0, x: '-50%' }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              
              <div className="relative">
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive && "scale-110"
                )} />
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <motion.div
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>
              
              <span className={cn(
                "text-xs font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}