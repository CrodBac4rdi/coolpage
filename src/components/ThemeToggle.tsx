import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../utils/cn'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { key: 'light' as const, icon: Sun, label: 'Hell' },
    { key: 'dark' as const, icon: Moon, label: 'Dunkel' },
    { key: 'auto' as const, icon: Monitor, label: 'Auto' }
  ]

  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
      {themes.map(({ key, icon: Icon, label }) => (
        <motion.button
          key={key}
          onClick={() => setTheme(key)}
          className={cn('relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors', theme === key ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
          
          {theme === key && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md"
              layoutId="theme-indicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}