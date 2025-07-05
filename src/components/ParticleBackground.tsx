import { useEffect, useRef } from 'react'

interface ParticleBackgroundProps {
  color: string
  density?: number
  enabled?: boolean
  mood?: 'romantic' | 'mysterious' | 'adventure' | 'dramatic' | 'fantasy' | 'modern'
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export default function ParticleBackground({ 
  color = 'purple', 
  density = 0.3, 
  enabled = true,
  mood = 'modern'
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  const colorMap = {
    red: { r: 220, g: 38, b: 38 },
    purple: { r: 147, g: 51, b: 234 },
    green: { r: 34, g: 197, b: 94 },
    blue: { r: 59, g: 130, b: 246 },
    indigo: { r: 99, g: 102, b: 241 },
    orange: { r: 249, g: 115, b: 22 },
    pink: { r: 236, g: 72, b: 153 },
    yellow: { r: 245, g: 158, b: 11 },
    violet: { r: 139, g: 92, b: 246 },
    sky: { r: 14, g: 165, b: 233 },
    teal: { r: 20, g: 184, b: 166 },
    gray: { r: 71, g: 85, b: 105 }
  }

  const moodConfigs = {
    romantic: {
      particleCount: 60,
      speed: 0.3,
      sizeRange: [1, 3],
      shapes: ['heart', 'circle'],
      twinkle: true
    },
    mysterious: {
      particleCount: 40,
      speed: 0.2,
      sizeRange: [0.5, 2],
      shapes: ['circle'],
      twinkle: true,
      drift: true
    },
    adventure: {
      particleCount: 80,
      speed: 0.8,
      sizeRange: [1, 4],
      shapes: ['circle', 'star'],
      twinkle: false
    },
    dramatic: {
      particleCount: 50,
      speed: 0.4,
      sizeRange: [1, 3],
      shapes: ['circle'],
      twinkle: true,
      pulse: true
    },
    fantasy: {
      particleCount: 70,
      speed: 0.5,
      sizeRange: [1, 4],
      shapes: ['circle', 'star'],
      twinkle: true,
      magical: true
    },
    modern: {
      particleCount: 30,
      speed: 0.6,
      sizeRange: [0.5, 2],
      shapes: ['circle'],
      twinkle: false,
      minimal: true
    }
  }

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const config = moodConfigs[mood]
    const colors = colorMap[color as keyof typeof colorMap] || colorMap.purple

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * config.speed,
      vy: (Math.random() - 0.5) * config.speed,
      size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
      opacity: 0.1 + Math.random() * 0.3,
      life: 0,
      maxLife: 200 + Math.random() * 300
    })

    const initParticles = () => {
      particlesRef.current = []
      const count = Math.floor(config.particleCount * density)
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Add some drift for mysterious mood
        if (config.drift) {
          particle.x += Math.sin(particle.life * 0.01) * 0.2
          particle.y += Math.cos(particle.life * 0.015) * 0.2
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Update life
        particle.life++

        // Update opacity based on mood
        if (config.twinkle) {
          particle.opacity = 0.1 + 0.3 * Math.sin(particle.life * 0.05)
        }
        if (config.pulse) {
          particle.opacity = 0.1 + 0.2 * Math.sin(particle.life * 0.02)
        }

        // Respawn particle when it dies
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = createParticle()
        }
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = `rgba(${colors.r}, ${colors.g}, ${colors.b}, 1)`

        // Draw based on shape
        if (config.shapes.includes('heart') && Math.random() > 0.7) {
          // Draw heart shape (simplified)
          ctx.beginPath()
          ctx.arc(particle.x - particle.size/2, particle.y, particle.size/2, 0, Math.PI, true)
          ctx.arc(particle.x + particle.size/2, particle.y, particle.size/2, 0, Math.PI, true)
          ctx.fill()
        } else if (config.shapes.includes('star') && Math.random() > 0.8) {
          // Draw star shape (simplified)
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5
            const x = particle.x + Math.cos(angle) * particle.size
            const y = particle.y + Math.sin(angle) * particle.size
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
        } else {
          // Draw circle (default)
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }

        // Add glow effect for magical mood
        if (config.magical) {
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.5)`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, density, enabled, mood])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}