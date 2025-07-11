import { cn } from '../utils/cn'
import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  count?: number
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  count = 1
}: SkeletonProps) {
  const baseClasses = "bg-gray-200 dark:bg-gray-700 animate-pulse"
  
  const variantClasses = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-xl"
  }

  const defaultSizes = {
    text: { width: '100%', height: '1rem' },
    circular: { width: '3rem', height: '3rem' },
    rectangular: { width: '100%', height: '10rem' },
    card: { width: '100%', height: '20rem' }
  }

  const finalWidth = width || defaultSizes[variant].width
  const finalHeight = height || defaultSizes[variant].height

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(baseClasses, variantClasses[variant], className)}
          style={{ width: finalWidth, height: finalHeight }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </>
  )
}

// Specific skeleton components for common use cases
export function AnimeCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <Skeleton variant="rectangular" height="300px" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <div className="flex gap-2 mt-4">
          <Skeleton variant="text" width="60px" height="24px" />
          <Skeleton variant="text" width="60px" height="24px" />
        </div>
      </div>
    </div>
  )
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
      <Skeleton variant="circular" width="48px" height="48px" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  )
}

export function ContentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="text" width="40%" height="32px" />
      <Skeleton variant="text" count={3} />
      <Skeleton variant="rectangular" height="200px" />
      <Skeleton variant="text" count={2} />
    </div>
  )
}