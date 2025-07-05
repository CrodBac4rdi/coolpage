import { motion } from 'framer-motion'
import { Book, Mail, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import BrutalistHero from '../components/BrutalistHero'
import EnhancedStoryCard from '../components/EnhancedStoryCard'
import GamingStats from '../components/GamingStats'

export default function TabbedHome() {

  return (
    <>
      <SEOHead 
        title="Crod Babylon - Welcome"
        description="Welcome to Crod Babylon - Digital Paradise für fesselnde Geschichten"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
        {/* Brutalist Hero Section */}
        <BrutalistHero />

        {/* Navigation Cards with Enhanced Interactions */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 -mt-32 relative z-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <EnhancedStoryCard
              title="Stories"
              description="Tauche ein in unsere Sammlung von 12 fesselnden Geschichten. Von CEO Romance bis Magical Academy - jede Story mit eigenem Stil und Genre-spezifischen Farben."
              icon={<Book className="w-8 h-8" />}
              iconBg="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
              iconColor="text-white"
              link="/stories"
              delay={0.2}
            />
            
            <EnhancedStoryCard
              title="Contact"
              description="Hast du eine Idee für eine Geschichte? Einen Charakter-Typ, der dir fehlt? Teile deine Story-Wünsche mit uns und lass sie zum Leben erwecken."
              icon={<Mail className="w-8 h-8" />}
              iconBg="bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
              iconColor="text-white"
              link="/contact"
              delay={0.4}
            />
          </div>
        </section>

        {/* Gaming Stats Section */}
        <GamingStats />
      </div>
    </>
  )
}