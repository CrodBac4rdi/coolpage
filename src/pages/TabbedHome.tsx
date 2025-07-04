import { motion } from 'framer-motion'
import { Book, Mail, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function TabbedHome() {

  return (
    <>
      <SEOHead 
        title="Crod Babylon - Welcome"
        description="Welcome to Crod Babylon - Digital Paradise für fesselnde Geschichten"
      />
      
      <div className="min-h-screen bg-surface-base">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-overlay border border-border-default mb-8">
                <Sparkles className="w-4 h-4 text-color-primary" />
                <span className="text-sm font-medium text-text-secondary">Digital Paradise</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary">
                Welcome to <span className="text-color-primary">Crod Babylon</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
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
                <div className="bg-surface-overlay backdrop-blur-sm rounded-2xl p-8 border border-border-default hover:bg-surface-elevated hover:border-border-strong transition-all duration-300 group h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-color-primary/20 text-color-primary group-hover:bg-color-primary/30 transition-all">
                      <Book className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary mb-1">Stories</h2>
                      <p className="text-text-tertiary">Alle Enhanced Stories entdecken</p>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Tauche ein in unsere Sammlung von 12 fesselnden Geschichten. 
                    Von CEO Romance bis Magical Academy - jede Story mit eigenem Stil und Genre-spezifischen Farben.
                  </p>
                  <div className="flex items-center text-color-primary font-medium group-hover:text-color-primary-hover transition-colors">
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
                <div className="bg-surface-overlay backdrop-blur-sm rounded-2xl p-8 border border-border-default hover:bg-surface-elevated hover:border-border-strong transition-all duration-300 group h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-accent-blue/20 text-accent-blue group-hover:bg-accent-blue/30 transition-all">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary mb-1">Contact</h2>
                      <p className="text-text-tertiary">Wünsch dir eine Geschichte</p>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    Hast du eine Idee für eine Geschichte? Einen Charakter-Typ, der dir fehlt? 
                    Teile deine Story-Wünsche mit uns und lass sie zum Leben erwecken.
                  </p>
                  <div className="flex items-center text-accent-blue font-medium group-hover:text-accent-blue-muted transition-colors">
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
            <div className="bg-surface-overlay backdrop-blur-sm rounded-2xl p-8 border border-border-default text-center">
              <h3 className="text-xl font-semibold text-text-primary mb-6">Unsere Story Collection</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-text-primary">12</div>
                  <div className="text-sm text-text-tertiary">Enhanced Stories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-text-primary">60+</div>
                  <div className="text-sm text-text-tertiary">Kapitel</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-text-primary">100k+</div>
                  <div className="text-sm text-text-tertiary">Wörter</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}