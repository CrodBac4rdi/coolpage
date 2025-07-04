import { motion } from 'framer-motion'
import { Heart, Swords, Users, Sparkles, Zap, Shield, Brain } from 'lucide-react'
import { useState } from 'react'
import type { Character } from '../data/characters'

interface Relationship {
  from: string
  to: string
  type: 'love' | 'friendship' | 'rivalry' | 'mentor' | 'family' | 'complicated'
  description: string
  intensity: 1 | 2 | 3 // 1 = weak, 2 = moderate, 3 = strong
}

interface CharacterRelationshipMapProps {
  characters: Character[]
  relationships: Relationship[]
  selectedCharacterId?: string
}

const relationshipConfig = {
  love: {
    color: 'from-pink-500 to-red-500',
    icon: Heart,
    label: 'Liebe'
  },
  friendship: {
    color: 'from-blue-500 to-cyan-500',
    icon: Users,
    label: 'Freundschaft'
  },
  rivalry: {
    color: 'from-orange-500 to-red-500',
    icon: Swords,
    label: 'Rivalität'
  },
  mentor: {
    color: 'from-purple-500 to-indigo-500',
    icon: Brain,
    label: 'Mentor'
  },
  family: {
    color: 'from-green-500 to-emerald-500',
    icon: Shield,
    label: 'Familie'
  },
  complicated: {
    color: 'from-gray-500 to-purple-500',
    icon: Zap,
    label: 'Kompliziert'
  }
}

export default function CharacterRelationshipMap({ 
  characters, 
  relationships,
  selectedCharacterId 
}: CharacterRelationshipMapProps) {
  const [hoveredRelationship, setHoveredRelationship] = useState<Relationship | null>(null)
  const [selectedRelationType, setSelectedRelationType] = useState<string | null>(null)
  
  // Debug log
  console.log('CharacterRelationshipMap render:', {
    charactersCount: characters.length,
    relationshipsCount: relationships.length,
    relationships: relationships.slice(0, 3)
  })

  // Calculate positions for characters in a circle
  const calculatePosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2
    const radius = 200
    const x = Math.cos(angle) * radius + 300
    const y = Math.sin(angle) * radius + 300
    return { x, y }
  }

  // Filter relationships based on selection
  const filteredRelationships = selectedRelationType
    ? relationships.filter(r => r.type === selectedRelationType)
    : relationships

  const getRelationshipPath = (from: Character, to: Character) => {
    const fromPos = calculatePosition(
      characters.findIndex(c => c.id === from.id),
      characters.length
    )
    const toPos = calculatePosition(
      characters.findIndex(c => c.id === to.id),
      characters.length
    )

    // Calculate control point for curved path
    const midX = (fromPos.x + toPos.x) / 2
    const midY = (fromPos.y + toPos.y) / 2
    const distance = Math.sqrt(Math.pow(toPos.x - fromPos.x, 2) + Math.pow(toPos.y - fromPos.y, 2))
    const curvature = distance * 0.2

    // Offset control point perpendicular to the line
    const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x) + Math.PI / 2
    const controlX = midX + Math.cos(angle) * curvature
    const controlY = midY + Math.sin(angle) * curvature

    return `M ${fromPos.x} ${fromPos.y} Q ${controlX} ${controlY} ${toPos.x} ${toPos.y}`
  }

  return (
    <div className="relative">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        <button
          onClick={() => setSelectedRelationType(null)}
          className={`px-4 py-2 rounded-full transition-all ${
            !selectedRelationType 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Alle
        </button>
        {Object.entries(relationshipConfig).map(([type, config]) => {
          const Icon = config.icon
          return (
            <button
              key={type}
              onClick={() => setSelectedRelationType(type)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                selectedRelationType === type
                  ? `bg-gradient-to-r ${config.color} text-white`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{config.label}</span>
            </button>
          )
        })}
      </div>

      {/* Relationship Map */}
      <div className="relative w-full h-[600px] bg-black/20 rounded-3xl overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
          {/* Relationship Lines */}
          {filteredRelationships.map((relationship, index) => {
            const fromChar = characters.find(c => c.id === relationship.from)
            const toChar = characters.find(c => c.id === relationship.to)
            if (!fromChar || !toChar) return null

            const isHighlighted = 
              hoveredRelationship === relationship ||
              (selectedCharacterId && (relationship.from === selectedCharacterId || relationship.to === selectedCharacterId))


            const path = getRelationshipPath(fromChar, toChar)
            console.log(`Path for ${fromChar.name} -> ${toChar.name}:`, path)
            
            return (
              <g key={index}>
                <defs>
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={
                      relationship.type === 'love' ? '#ec4899' :
                      relationship.type === 'friendship' ? '#3b82f6' :
                      relationship.type === 'rivalry' ? '#f97316' :
                      relationship.type === 'mentor' ? '#8b5cf6' :
                      relationship.type === 'family' ? '#10b981' :
                      '#6b7280'
                    } />
                    <stop offset="100%" stopColor={
                      relationship.type === 'love' ? '#ef4444' :
                      relationship.type === 'friendship' ? '#06b6d4' :
                      relationship.type === 'rivalry' ? '#ef4444' :
                      relationship.type === 'mentor' ? '#6366f1' :
                      relationship.type === 'family' ? '#10b981' :
                      '#8b5cf6'
                    } />
                  </linearGradient>
                </defs>
                <motion.path
                  d={getRelationshipPath(fromChar, toChar)}
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth={relationship.intensity * 2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: isHighlighted ? 1 : 0.3,
                    strokeWidth: isHighlighted ? relationship.intensity * 3 : relationship.intensity * 2
                  }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredRelationship(relationship)}
                  onMouseLeave={() => setHoveredRelationship(null)}
                  className="cursor-pointer"
                />
              </g>
            )
          })}
        </svg>

        {/* Character Nodes */}
        {characters.map((character, index) => {
          const position = calculatePosition(index, characters.length)
          const isHighlighted = selectedCharacterId === character.id
          const hasActiveRelationship = hoveredRelationship && 
            (hoveredRelationship.from === character.id || hoveredRelationship.to === character.id)

          return (
            <motion.div
              key={character.id}
              className="absolute"
              style={{ left: position.x - 40, top: position.y - 40 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHighlighted || hasActiveRelationship ? 1.2 : 1, 
                opacity: 1 
              }}
              transition={{ delay: index * 0.05, type: "spring" }}
            >
              <motion.div
                className={`w-20 h-20 rounded-full border-3 flex items-center justify-center cursor-pointer transition-all ${
                  isHighlighted || hasActiveRelationship
                    ? 'border-white shadow-2xl shadow-purple-500/50'
                    : 'border-white/30 hover:border-white/60'
                }`}
                style={{ 
                  background: `linear-gradient(135deg, ${character.gradient.split(' ')[1]}, ${character.gradient.split(' ')[3]})` 
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{character.icon}</span>
              </motion.div>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-xs font-medium text-white whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                  {character.name}
                </p>
              </div>
            </motion.div>
          )
        })}

        {/* Relationship Tooltip */}
        {hoveredRelationship && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-xl rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-2">
              {(() => {
                const Icon = relationshipConfig[hoveredRelationship.type].icon
                return <Icon className="w-5 h-5 text-white" />
              })()}
              <h4 className="font-semibold text-white">
                {characters.find(c => c.id === hoveredRelationship.from)?.name} → {characters.find(c => c.id === hoveredRelationship.to)?.name}
              </h4>
            </div>
            <p className="text-sm text-gray-300">{hoveredRelationship.description}</p>
            <div className="mt-2 flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Sparkles 
                  key={i} 
                  className={`w-4 h-4 ${i < hoveredRelationship.intensity ? 'text-yellow-400' : 'text-gray-600'}`} 
                />
              ))}
              <span className="text-xs text-gray-400 ml-2">Intensität</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 mb-2">Klicke auf die Verbindungen für mehr Details</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(relationshipConfig).map(([type, config]) => {
            const Icon = config.icon
            return (
              <div key={type} className="flex items-center gap-2 text-sm">
                <Icon className={`w-4 h-4 text-${config.color.split(' ')[0].replace('from-', '')}-500`} />
                <span className="text-gray-300">{config.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}