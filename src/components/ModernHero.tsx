import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ModernHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-pink/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-subtle border border-border-default mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <Sparkles className="w-4 h-4 text-accent-purple" />
          <span className="text-sm font-medium text-secondary">Welcome to the Digital Paradise</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <span className="text-gradient">Crod Babylon</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl font-light text-secondary mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          Where Dreams Code Reality
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-tertiary max-w-3xl mx-auto mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          Enter the next generation of digital experiences. 
          We're not just building websites, we're crafting digital worlds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          <Link to="/manhwa">
            <button className="btn btn-primary group">
              <span>Explore Stories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
          <Link to="/about">
            <button className="btn btn-secondary">
              Learn More
            </button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-border-subtle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div>
            <div className="text-3xl font-bold text-primary">12+</div>
            <div className="text-sm text-tertiary mt-1">Stories</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">300+</div>
            <div className="text-sm text-tertiary mt-1">Chapters</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">1M+</div>
            <div className="text-sm text-tertiary mt-1">Words</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-border-default rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-text-tertiary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}