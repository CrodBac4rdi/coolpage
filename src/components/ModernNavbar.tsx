import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Book, Users, Clock, Gamepad2, Home } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/manhwa', label: 'Stories', icon: Book },
    { to: '/blog', label: 'Characters', icon: Users },
    { to: '/timeline', label: 'Timeline', icon: Clock },
    { to: '/games', label: 'Games', icon: Gamepad2 },
  ]

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-surface-overlay backdrop-blur-xl border-b border-border-default' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-surface-base border border-border-default rounded-lg p-2">
                  <span className="text-xl font-bold text-gradient">CB</span>
                </div>
              </div>
              <span className="text-lg font-semibold text-primary hidden sm:block">
                Crod Babylon
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.to
                
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium
                      flex items-center gap-2 transition-all
                      ${isActive 
                        ? 'text-primary bg-surface-subtle' 
                        : 'text-secondary hover:text-primary hover:bg-surface-subtle'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/contact">
                <button className="btn btn-primary">
                  Contact
                </button>
              </Link>
              
              <button
                onClick={toggleTheme}
                className="btn btn-ghost"
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
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn btn-ghost"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                className="btn btn-ghost"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
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
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-16 left-0 right-0 bg-surface-elevated border-b border-border-default z-40 md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="px-4 py-6 space-y-1">
                {links.map((link) => {
                  const Icon = link.icon
                  const isActive = location.pathname === link.to
                  
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg
                        text-base font-medium transition-all
                        ${isActive 
                          ? 'text-primary bg-surface-subtle' 
                          : 'text-secondary hover:text-primary hover:bg-surface-subtle'
                        }
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
                
                <div className="pt-4 mt-4 border-t border-border-subtle">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <button className="btn btn-primary w-full">
                      Contact
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