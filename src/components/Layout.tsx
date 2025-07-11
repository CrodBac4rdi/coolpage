import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ImprovedNavbar from './ImprovedNavbar'
import MobileBottomNav from './MobileBottomNav'
import Breadcrumbs from './Breadcrumbs'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
  showBreadcrumbs?: boolean
  showMobileNav?: boolean
}

export default function Layout({ 
  children, 
  showBreadcrumbs = true,
  showMobileNav = true 
}: LayoutProps) {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <ImprovedNavbar />
      
      {/* Breadcrumbs */}
      {showBreadcrumbs && <Breadcrumbs />}
      
      {/* Page Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={showMobileNav ? "pb-20 md:pb-0" : ""}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      
      {/* Mobile Bottom Navigation */}
      {showMobileNav && <MobileBottomNav />}
      
      {/* Quick Actions Button (Mobile) */}
      <motion.button
        className="fixed bottom-20 right-4 md:hidden bg-purple-600 text-white p-4 rounded-full shadow-lg z-30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  )
}