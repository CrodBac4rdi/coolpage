import { motion } from 'framer-motion'
import { Book, Mail, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function TabbedHome() {

  return (
    <>
      <SEOHead 
        title="Crod Babylon - Welcome"
        description="Welcome to Crod Babylon - Digital Paradise für fesselnde Geschichten"
      />
      
      <div className="min-h-screen bg-gray-800">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-700/50 mb-8">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Digital Paradise</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Welcome to <span className="text-purple-400">Crod Babylon</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                Fesselnde Geschichten in einem digitalen Paradies. 
                Entdecke Romance, Fantasy, Thriller und mehr.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stories Card */}
            <motion.div
              initial={{ opacity: 1, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/stories" className="block">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 group h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30 transition-all">
                      <Book className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">Stories</h2>
                      <p className="text-gray-400">Alle Enhanced Stories entdecken</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Tauche ein in unsere Sammlung von 12 fesselnden Geschichten. 
                    Von CEO Romance bis Magical Academy - jede Story mit eigenem Stil und Genre-spezifischen Farben.
                  </p>
                  <div className="flex items-center text-purple-400 font-medium group-hover:text-purple-300 transition-colors">
                    <span>Stories erkunden</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 1, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/contact" className="block">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 group h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-all">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">Contact</h2>
                      <p className="text-gray-400">Wünsch dir eine Geschichte</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Hast du eine Idee für eine Geschichte? Einen Charakter-Typ, der dir fehlt? 
                    Teile deine Story-Wünsche mit uns und lass sie zum Leben erwecken.
                  </p>
                  <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                    <span>Story Request senden</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
              <h3 className="text-xl font-semibold text-white mb-6">Unsere Story Collection</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white">12</div>
                  <div className="text-sm text-gray-400">Enhanced Stories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">60+</div>
                  <div className="text-sm text-gray-400">Kapitel</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">100k+</div>
                  <div className="text-sm text-gray-400">Wörter</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}