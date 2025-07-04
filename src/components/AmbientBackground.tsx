import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { MoodType } from '../hooks/useAmbientMode'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface AmbientBackgroundProps {
  mood: MoodType
  intensity: number
  particlesEnabled: boolean
  particleConfig: {
    count: number
    color: string
    animation: string
    size: string
  } | null
}

export default function AmbientBackground({
  mood,
  intensity,
  particlesEnabled,
  particleConfig
}: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Generate particles
  const particles: Particle[] = particleConfig ? 
    Array.from({ length: particleConfig.count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: particleConfig.size === 'large' ? Math.random() * 6 + 4 : Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    })) : []

  // Animated gradient effect
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create animated gradient based on mood
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time * 0.001) * 100,
        canvas.height / 2 + Math.cos(time * 0.001) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      )

      // Mood-specific gradient colors
      const colors = {
        romantic: ['rgba(236, 72, 153, 0.1)', 'rgba(147, 51, 234, 0.1)'],
        tense: ['rgba(239, 68, 68, 0.1)', 'rgba(0, 0, 0, 0.2)'],
        mysterious: ['rgba(99, 102, 241, 0.1)', 'rgba(79, 70, 229, 0.1)'],
        peaceful: ['rgba(6, 182, 212, 0.1)', 'rgba(14, 165, 233, 0.1)'],
        exciting: ['rgba(245, 158, 11, 0.1)', 'rgba(239, 68, 68, 0.1)'],
        melancholic: ['rgba(100, 116, 139, 0.1)', 'rgba(71, 85, 105, 0.1)'],
        default: ['rgba(147, 51, 234, 0.05)', 'rgba(99, 102, 241, 0.05)']
      }

      const [color1, color2] = colors[mood]
      gradient.addColorStop(0, color1)
      gradient.addColorStop(1, color2)

      ctx.fillStyle = gradient
      ctx.globalAlpha = intensity / 100
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 16
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mood, intensity])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getParticleAnimation = (animation: string) => {
    switch (animation) {
      case 'float':
        return {
          y: [0, -20, 0],
          x: [0, 10, 0],
          transition: { repeat: Infinity, duration: 10, ease: "easeInOut" }
        }
      case 'pulse':
        return {
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }
      case 'drift':
        return {
          x: [0, 50, 0],
          y: [0, 30, 60],
          transition: { repeat: Infinity, duration: 20, ease: "linear" }
        }
      case 'breathe':
        return {
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.4, 0.2],
          transition: { repeat: Infinity, duration: 8, ease: "easeInOut" }
        }
      case 'spark':
        return {
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          transition: { repeat: Infinity, duration: 3, ease: "easeOut" }
        }
      case 'rain':
        return {
          y: [-10, 110],
          opacity: [0, 0.5, 0],
          transition: { repeat: Infinity, duration: 5, ease: "linear" }
        }
      default:
        return {}
    }
  }

  return (
    <>
      {/* Animated gradient canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particlesEnabled && particleConfig && (
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particleConfig.color,
                  filter: 'blur(1px)'
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: intensity / 200,
                  ...getParticleAnimation(particleConfig.animation)
                }}
                transition={{
                  delay: particle.delay
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Mood overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        animate={{
          backgroundColor: mood === 'tense' ? 'rgba(0, 0, 0, 0.2)' :
                         mood === 'mysterious' ? 'rgba(79, 70, 229, 0.1)' :
                         mood === 'melancholic' ? 'rgba(71, 85, 105, 0.1)' :
                         'transparent',
          transition: { duration: 2 }
        }}
      />
    </>
  )
}