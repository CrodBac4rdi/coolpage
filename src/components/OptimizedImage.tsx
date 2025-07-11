import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>('')

  useEffect(() => {
    // Generate a low quality placeholder
    const canvas = document.createElement('canvas')
    canvas.width = 40
    canvas.height = 40
    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Create a gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, 40, 40)
      gradient.addColorStop(0, '#e0e7ff')
      gradient.addColorStop(1, '#c7d2fe')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 40, 40)
    }
    const placeholder = canvas.toDataURL()
    setImageSrc(placeholder)

    // Preload the actual image
    const img = new Image()
    if (width) img.width = width
    if (height) img.height = height
    
    img.onload = () => {
      setImageSrc(src)
      setIsLoaded(true)
      onLoad?.()
    }
    
    img.onerror = () => {
      setHasError(true)
      onError?.()
    }
    
    // Start loading
    if (priority) {
      img.src = src
    } else {
      // Lazy load with Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              img.src = src
              observer.disconnect()
            }
          })
        },
        { rootMargin: '50px' }
      )
      
      const element = document.getElementById(`img-${src}`)
      if (element) {
        observer.observe(element)
      }
      
      return () => observer.disconnect()
    }
  }, [src, width, height, priority, onLoad, onError])

  if (hasError) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center bg-gray-200 dark:bg-gray-700",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Failed to load</span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)} id={`img-${src}`}>
      <motion.img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover",
          !isLoaded && "blur-xl scale-110"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-pulse" />
      )}
    </div>
  )
}