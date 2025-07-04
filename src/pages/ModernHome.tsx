import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Book, Users, Clock, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function ModernHome() {
  const features = [
    {
      icon: Book,
      title: 'Captivating Stories',
      description: '12 unique tales of romance, mystery, and adventure',
      link: '/manhwa',
      color: 'text-accent-purple',
      stat: '500+ Chapters'
    },
    {
      icon: Users,
      title: 'Rich Characters',
      description: 'Meet unforgettable heroes and heroines',
      link: '/blog',
      color: 'text-accent-pink',
      stat: '50+ Characters'
    },
    {
      icon: Zap,
      title: 'Modern Reader',
      description: 'Seamless reading experience with dark mode',
      link: '/manhwa',
      color: 'text-accent-blue',
      stat: 'Smooth Scroll'
    },
    {
      icon: Clock,
      title: 'Story Timeline',
      description: 'Track the journey through each tale',
      link: '/timeline',
      color: 'text-accent-green',
      stat: 'Interactive'
    }
  ]

  return (
    <>
      <SEOHead />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-subtle border border-border-default mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-sm font-medium text-secondary">Digital Storytelling Universe</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          >
            <span className="text-gradient">Crod Babylon</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl font-light text-secondary mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Where Dreams Code Reality
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-tertiary max-w-3xl mx-auto mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            Experience the next generation of digital storytelling. 
            12 captivating stories, hundreds of chapters, endless emotions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          >
            <Link to="/manhwa">
              <button className="btn btn-primary group">
                <span>Explore Stories</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link to="/blog">
              <button className="btn btn-secondary">
                Meet Characters
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              A Universe of Stories
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Immerse yourself in carefully crafted narratives and unforgettable characters
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={feature.link}>
                  <div className="card h-full hover:shadow-lg hover:-translate-y-1 transition-all group">
                    <div className={`inline-flex p-3 rounded-lg bg-surface-subtle mb-4 ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-purple transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-secondary mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-accent-purple">
                        {feature.stat}
                      </span>
                      <ArrowRight className="w-5 h-5 text-accent-purple group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-subtle">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-secondary">
              A growing universe of digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12', label: 'Stories', icon: Book },
              { value: '500+', label: 'Chapters', icon: Zap },
              { value: '50+', label: 'Characters', icon: Users },
              { value: '1M+', label: 'Words', icon: Heart }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 text-accent-purple mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="card p-12 bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 border-accent-purple/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-secondary mb-8">
              Join thousands of readers exploring our digital universe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/manhwa">
                <button className="btn btn-primary">
                  <span>Start Reading</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="btn btn-secondary">
                  Join Community
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}