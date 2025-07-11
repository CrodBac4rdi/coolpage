import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  className?: string
  lines?: number
  avatar?: boolean
  width?: string
  height?: string
  variant?: 'card' | 'text' | 'button' | 'circle' | 'rectangle'
}

const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0']
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'linear'
  }
}

export default function SkeletonLoader({
  className = '',
  lines = 3,
  avatar = false,
  width = '100%',
  height = '1rem',
  variant = 'text'
}: SkeletonLoaderProps) {
  
  const baseClasses = 'bg-gradient-to-r from-surface-subtle via-surface-base to-surface-subtle bg-[length:200%_100%] animate-pulse'
  
  if (variant === 'card') {
    return (
      <div className={`space-y-4 ${className || ''}`}>
        {/* Header */}
        <div className="flex items-center gap-4">
          {avatar && <div className={`w-12 h-12 rounded-full ${baseClasses}`} />}
          <div className="flex-1 space-y-2">
            <div className={`h-4 rounded ${baseClasses}`} style={{ width: '60%' }} />
            <div className={`h-3 rounded ${baseClasses}`} style={{ width: '40%' }} />
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-3 rounded ${baseClasses}`}
              style={{ width: i === lines - 1 ? '80%' : '100%' }}
              {...shimmer}
            />
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex gap-2">
          <div className={`h-8 w-16 rounded ${baseClasses}`} />
          <div className={`h-8 w-16 rounded ${baseClasses}`} />
        </div>
      </div>
    )
  }
  
  if (variant === 'button') {
    return (
      <motion.div
        className={`h-10 w-24 rounded-lg ${baseClasses} ${className || ''}`}
        {...shimmer}
      />
    )
  }
  
  if (variant === 'circle') {
    return (
      <motion.div
        className={`w-12 h-12 rounded-full ${baseClasses} ${className || ''}`}
        {...shimmer}
      />
    )
  }
  
  if (variant === 'rectangle') {
    return (
      <motion.div
        className={`rounded ${baseClasses} ${className || ''}`}
        style={{ width, height }}
        {...shimmer}
      />
    )
  }
  
  // Default text variant
  return (
    <div className={`space-y-2 ${className || ''}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-4 rounded ${baseClasses}`}
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
          {...shimmer}
        />
      ))}
    </div>
  )
}

export function StoryCardSkeleton() {
  return (
    <div className="bg-surface-elevated rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-4">
        <SkeletonLoader variant="circle" />
        <div className="flex-1">
          <SkeletonLoader variant="text" lines={1} />
          <SkeletonLoader variant="text" lines={1} width="60%" />
        </div>
      </div>
      <SkeletonLoader variant="text" lines={3} />
      <div className="flex justify-between items-center">
        <SkeletonLoader variant="button" />
        <SkeletonLoader variant="button" />
      </div>
    </div>
  )
}

export function NavbarSkeleton() {
  return (
    <div className="h-16 bg-surface-elevated border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
        <SkeletonLoader variant="rectangle" width="120px" height="32px" />
        <div className="hidden md:flex gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonLoader key={i} variant="rectangle" width="80px" height="24px" />
          ))}
        </div>
        <div className="flex gap-2">
          <SkeletonLoader variant="button" />
          <SkeletonLoader variant="circle" />
        </div>
      </div>
    </div>
  )
}