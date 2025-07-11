import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../utils/cn'

interface Interactive3DCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export default function Interactive3DCard({ 
  children, 
  className,
  glowColor = 'purple'
}: Interactive3DCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 20 })
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 500, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 500, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const rotateXValue = ((mouseY - height / 2) / height) * -20
    const rotateYValue = ((mouseX - width / 2) / width) * 20
    
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
    
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const glowColors = {
    purple: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(147, 51, 234, 0.2), transparent 40%)',
    pink: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(236, 72, 153, 0.2), transparent 40%)',
    blue: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.2), transparent 40%)',
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        "relative rounded-2xl transition-all duration-200 ease-out",
        className
      )}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"
        style={{
          background: glowColors[glowColor as keyof typeof glowColors],
          '--mouse-x': `${mouseXSpring.get()}px`,
          '--mouse-y': `${mouseYSpring.get()}px`,
        } as any}
      />
      
      {/* Card content */}
      <div
        className="relative h-full w-full rounded-2xl bg-gray-900 p-6"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(75px)',
        }}
      >
        {children}
      </div>
      
      {/* Reflection */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, transparent 50%)`,
            transform: 'translateZ(1px)',
          }}
        />
      )}
    </motion.div>
  )
}