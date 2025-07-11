import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface MeshGradientProps {
  colors?: string[]
  speed?: number
  className?: string
}

export default function MeshGradient({ 
  colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
  speed = 0.5,
  className = ''
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    
    // Color points for the gradient
    const colorPoints = colors.map((color, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      color,
      radius: 200 + Math.random() * 300
    }))
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw color points
      colorPoints.forEach(point => {
        // Update position
        point.x += point.vx
        point.y += point.vy
        
        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1
        
        // Keep within bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x))
        point.y = Math.max(0, Math.min(canvas.height, point.y))
        
        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius
        )
        gradient.addColorStop(0, point.color + '40')
        gradient.addColorStop(0.5, point.color + '20')
        gradient.addColorStop(1, point.color + '00')
        
        // Draw gradient
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })
      
      // Blend mode for better effect
      ctx.globalCompositeOperation = 'screen'
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [colors, speed])
  
  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ filter: 'blur(40px)' }}
    />
  )
}

// Static mesh gradient with CSS
export function StaticMeshGradient({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />
        
        {/* Mesh overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 80%, rgba(120, 119, 198, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 20%, rgba(255, 119, 198, 0.3) 0px, transparent 50%),
              radial-gradient(at 40% 40%, rgba(255, 219, 112, 0.3) 0px, transparent 50%),
              radial-gradient(at 90% 70%, rgba(120, 219, 255, 0.3) 0px, transparent 50%)
            `
          }}
        />
        
        {/* Animated blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    </div>
  )
}