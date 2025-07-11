import { motion } from 'framer-motion'
import { useState } from 'react'

interface ModernIconProps {
  type: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
}

const iconMap = {
  // Character Icons - 3D Illustrated Style
  'lawyer': '⚖️',
  'businesswoman': '💼',
  'ceo': '👔',
  'witch': '🔮',
  'hacker': '💻',
  'assistant': '📋',
  'student': '📚',
  'therapist': '🌟',
  'cat': '🐱',
  'mirror': '🪞',

  // Story Genre Icons
  'romance': '💕',
  'fantasy': '✨',
  'mystery': '🔍',
  'cyberpunk': '🌐',
  'comedy': '😄',
  'supernatural': '👻',
  'drama': '🎭',
  'magic': '🪄',

  // UI Icons
  'heart': '❤️',
  'star': '⭐',
  'book': '📖',
  'sparkles': '✨',
  'moon': '🌙',
  'fire': '🔥',
  'crystal': '💎',
  'scroll': '📜'
}

export default function ModernIcon({ type, size = 'md', className = '', animate = true }: ModernIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const sizeMap = {
    sm: 'text-2xl',
    md: 'text-4xl', 
    lg: 'text-6xl',
    xl: 'text-8xl'
  }

  const icon = iconMap[type as keyof typeof iconMap] || '✨'

  return (
    <motion.div
      className={className ? `relative inline-block select-none ${sizeMap[size]} ${className}` : `relative inline-block select-none ${sizeMap[size]}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ scale: 1 }}
      whileHover={animate ? { 
        scale: 1.1,
        rotateY: 15,
        rotateX: 5
      } : undefined}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D Shadow Layer */}
      <div 
        className="absolute inset-0 blur-lg opacity-30 -z-10"
        style={{
          background: `linear-gradient(135deg, rgba(139, 69, 19, 0.3), rgba(160, 82, 45, 0.3))`,
          transform: `translateZ(-10px) translateY(4px) translateX(2px)`,
          filter: 'blur(8px)',
          borderRadius: '50%'
        }}
      />
      
      {/* Main Icon with 3D Effect */}
      <motion.div
        className="relative z-10"
        style={{
          filter: `
            drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3))
            drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))
          `,
          textShadow: `
            0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 10px rgba(255, 255, 255, 0.2)
          `,
          transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)',
          transition: 'transform 0.3s ease-out'
        }}
        animate={animate ? {
          rotateZ: isHovered ? [0, -2, 2, 0] : 0,
        } : undefined}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut",
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        {icon}
      </motion.div>

      {/* Subtle Glow Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            background: `radial-gradient(circle, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(255, 192, 203, 0.1) 30%, 
              rgba(138, 43, 226, 0.1) 60%, 
              transparent 100%)`,
            filter: 'blur(20px)',
            zIndex: -5
          }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

// Helper function to get the right icon type for characters
export const getCharacterIconType = (character: any): string => {
  // Map character roles to icon types
  const roleMap: { [key: string]: string } = {
    'CEO': 'ceo',
    'Anwältin': 'lawyer', 
    'Business': 'businesswoman',
    'Mondhexe': 'witch',
    'Träumerin': 'witch',
    'Cyber-Warrior': 'hacker',
    'Hacker': 'hacker',
    'Assistant': 'assistant',
    'Student': 'student',
    'Therapist': 'therapist',
    'Cat': 'cat',
    'Katze': 'cat'
  }

  // Try to match by role first
  for (const [key, iconType] of Object.entries(roleMap)) {
    if (character.role?.includes(key)) {
      return iconType
    }
  }

  // Try to match by story theme
  if (character.story?.includes('Cat') || character.story?.includes('Katze')) return 'cat'
  if (character.story?.includes('Academy') || character.story?.includes('Magic')) return 'witch'
  if (character.story?.includes('Code') || character.story?.includes('Cyber')) return 'hacker'
  if (character.story?.includes('Mirror') || character.story?.includes('Spiegel')) return 'mirror'
  if (character.story?.includes('Transfer') || character.story?.includes('School')) return 'student'
  if (character.story?.includes('Dream') || character.story?.includes('Traum')) return 'therapist'
  if (character.story?.includes('Desire') || character.story?.includes('Business')) return 'businesswoman'

  // Default fallback
  return 'sparkles'
}