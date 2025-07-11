import { motion } from 'framer-motion'
import { Book, Mail, Sparkles, ArrowRight, User, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import BrutalistHero from '../components/BrutalistHero'
import EnhancedStoryCard from '../components/EnhancedStoryCard'
import GamingStats from '../components/GamingStats'
import AnimeQuiz from '../components/AnimeQuiz'

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
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <EnhancedStoryCard
              title="Content Hub"
              description="Dein Tor zu Light Novels, Manhwas und Anime. Entdecke unser wachsendes Universum an Entertainment."
              icon={<Sparkles className="w-8 h-8" />}
              iconBg="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
              iconColor="text-white"
              link="/content"
              delay={0.2}
            />
            
            <EnhancedStoryCard
              title="Stories"
              description="Tauche ein in unsere Sammlung von 12 fesselnden Geschichten. Von CEO Romance bis Magical Academy."
              icon={<Book className="w-8 h-8" />}
              iconBg="bg-gradient-to-br from-green-500/20 to-emerald-500/20"
              iconColor="text-white"
              link="/stories"
              delay={0.3}
            />
            
            <EnhancedStoryCard
              title="Contact"
              description="Hast du eine Idee? Teile deine Story-Wünsche mit uns und lass sie zum Leben erwecken."
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

        {/* Anime Quiz Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Test Your Anime Knowledge</h2>
                <p className="text-gray-400 text-lg">Can you identify these popular anime characters?</p>
              </div>
              <AnimeQuiz />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}