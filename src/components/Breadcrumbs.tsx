import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

interface BreadcrumbItem {
  label: string
  path?: string
}

export default function Breadcrumbs() {
  const location = useLocation()
  
  // Route to breadcrumb mapping
  const routeMap: Record<string, string> = {
    '/': 'Home',
    '/romance-search': 'Anime Search',
    '/watchlist': 'My Watchlist',
    '/stories': 'Stories',
    '/manhwas': 'Manhwas',
    '/content': 'Content Hub',
    '/dashboard': 'Dashboard',
    '/contact': 'Contact',
    '/about': 'About',
    '/anime-guide': 'Anime Guide'
  }
  
  // Generate breadcrumb items
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }]
    
    if (location.pathname === '/') {
      return []
    }
    
    // For story reader pages
    if (location.pathname.includes('/reader/')) {
      breadcrumbs.push({ label: 'Stories', path: '/stories' })
      breadcrumbs.push({ label: 'Reading', path: undefined })
      return breadcrumbs
    }
    
    // For main routes
    const currentRoute = routeMap[location.pathname]
    if (currentRoute) {
      breadcrumbs.push({ label: currentRoute, path: undefined })
    } else {
      // For dynamic routes, try to build path
      let currentPath = ''
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`
        const label = routeMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
        breadcrumbs.push({
          label,
          path: index === pathSegments.length - 1 ? undefined : currentPath
        })
      })
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = getBreadcrumbs()
  
  if (breadcrumbs.length === 0) {
    return null
  }
  
  return (
    <nav className="px-4 sm:px-6 lg:px-8 pt-20 pb-4">
      <motion.ol 
        className="flex items-center space-x-2 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            )}
            
            {item.path ? (
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-1 text-gray-600 dark:text-gray-400",
                  "hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                )}
              >
                {index === 0 && <Home className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-medium flex items-center gap-1">
                {index === 0 && <Home className="w-4 h-4" />}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </motion.ol>
    </nav>
  )
}