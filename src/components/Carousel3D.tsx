import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../utils/cn'

interface Carousel3DProps {
  items: Array<{
    id: string
    title: string
    image: string
    description?: string
    gradient?: string
  }>
  className?: string
  autoPlay?: boolean
  interval?: number
}

export default function Carousel3D({ 
  items, 
  className,
  autoPlay = true,
  interval = 5000 
}: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  
  const dragX = useMotionValue(0)
  const rotateY = useTransform(dragX, [-200, 200], [-45, 45])
  const scale = useTransform(dragX, [-200, 0, 200], [0.9, 1, 0.9])
  
  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isInteracting) return
    
    const timer = setInterval(() => {
      handleNext()
    }, interval)
    
    return () => clearInterval(timer)
  }, [currentIndex, autoPlay, interval, isInteracting])
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const threshold = 50
    
    if (info.offset.x > threshold) {
      handlePrevious()
    } else if (info.offset.x < -threshold) {
      handleNext()
    }
    
    controls.start({ x: 0 })
    setIsInteracting(false)
  }
  
  const getItemStyle = (index: number) => {
    const diff = index - currentIndex
    const totalItems = items.length
    
    // Calculate position in the circle
    let position = diff
    if (Math.abs(diff) > totalItems / 2) {
      position = diff > 0 ? diff - totalItems : diff + totalItems
    }
    
    const angle = (position * 360) / totalItems
    const radius = 300
    const z = Math.cos((angle * Math.PI) / 180) * radius
    const x = Math.sin((angle * Math.PI) / 180) * radius
    const rotateYAngle = -angle
    
    const isActive = index === currentIndex
    const opacity = isActive ? 1 : Math.max(0.3, 1 - Math.abs(position) * 0.3)
    const scale = isActive ? 1 : 0.8
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateYAngle}deg)`,
      opacity,
      scale,
      zIndex: z > 0 ? Math.round(z) : 0,
      filter: isActive ? 'none' : 'blur(2px)'
    }
  }
  
  return (
    <div className={cn("relative", className)}>
      <div className="relative h-[400px] perspective-[1200px]">
        <motion.div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotateY, scale }}
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          dragElastic={0.2}
          onDragStart={() => setIsInteracting(true)}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {items.map((item, index) => {
            const style = getItemStyle(index)
            const isActive = index === currentIndex
            
            return (
              <motion.div
                key={item.id}
                className="absolute w-[300px] h-[350px] cursor-grab active:cursor-grabbing"
                style={{
                  ...style,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
                initial={false}
                animate={style}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                whileHover={isActive ? { scale: 1.05 } : {}}
              >
                <div className={cn(
                  "relative w-full h-full rounded-2xl overflow-hidden",
                  "bg-gradient-to-br",
                  item.gradient || "from-purple-600 to-pink-600",
                  "shadow-2xl"
                )}>
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-white/80 text-sm line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Glow effect for active item */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
                      <div className="absolute inset-0 border-2 border-white/20 rounded-2xl" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "w-8 bg-white" 
                : "bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  )
}