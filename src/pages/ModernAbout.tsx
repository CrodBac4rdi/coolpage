import { motion } from 'framer-motion'
import { Code, Heart, Sparkles, BookOpen, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { cn } from '../utils/cn'

const journey = [
  {
    icon: Code,
    title: "The Developer Path",
    description: "Started as a passionate coder, building digital worlds one line at a time",
    color: "text-accent-purple"
  },
  {
    icon: BookOpen,
    title: "Discovering Stories",
    description: "Found my love for manhwa, light novels, and the art of storytelling",
    color: "text-accent-blue"
  },
  {
    icon: Heart,
    title: "Romance Writer",
    description: "Combined technical skills with passion for romance to create digital love stories",
    color: "text-accent-pink"
  },
  {
    icon: Sparkles,
    title: "Digital Storyteller",
    description: "Now creating immersive romance experiences that blend code and emotion",
    color: "text-accent-amber"
  }
]

const values = [
  {
    title: "Quality over Quantity",
    description: "Every story is crafted with care and attention to detail"
  },
  {
    title: "Character First",
    description: "Building deep, relatable characters that readers fall in love with"
  },
  {
    title: "Innovation",
    description: "Pushing the boundaries of digital storytelling"
  },
  {
    title: "Community",
    description: "Creating spaces where readers can connect and share"
  }
]

export default function ModernAbout() {
  return (
    <>
      <SEOHead 
        title="About - Crod Babylon"
        description="Learn about the journey behind Crod Babylon and our mission to revolutionize digital storytelling"
      />
      
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="text-gradient">Crod Babylon</span>
              </h1>
              <p className="text-xl text-secondary mb-8">
                Where passion for code meets the art of storytelling
              </p>
            </motion.div>

            <motion.div
              className="prose prose-lg max-w-3xl mx-auto text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="mb-6">
                Welcome to Crod Babylon, a digital universe where technology and storytelling 
                converge to create unforgettable experiences. I'm a developer turned digital 
                storyteller, passionate about crafting immersive romance narratives that touch 
                hearts and inspire minds.
              </p>
              <p>
                What started as a love for coding evolved into something more—a desire to 
                create stories that resonate, characters that feel real, and experiences 
                that linger long after the last page.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-surface-subtle">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Journey
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {journey.map((step, index) => (
                <motion.div
                  key={index}
                  className="card group hover:shadow-lg transition-all"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn('p-3 rounded-lg bg-surface-subtle', step.color)}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-secondary">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="p-6 border border-border-default rounded-lg hover:border-accent-purple transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-secondary text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-surface-subtle">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '2020', label: 'Founded' },
                { value: '12+', label: 'Stories' },
                { value: '500+', label: 'Chapters' },
                { value: '10k+', label: 'Readers' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-secondary mb-8">
              Join our community of readers and discover stories that will stay with you forever
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/manhwa">
                <button className="btn btn-primary group">
                  <span>Explore Stories</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="btn btn-secondary">
                  Get in Touch
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}