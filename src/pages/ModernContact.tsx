import { motion } from 'framer-motion'
import { Mail, Github, Twitter, MessageCircle, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'
import SEOHead from '../components/SEOHead'

export default function ModernContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@crodbabylon.com',
      href: 'mailto:hello@crodbabylon.com'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@crodbabylon',
      href: 'https://github.com'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@crodbabylon',
      href: 'https://twitter.com'
    }
  ]

  return (
    <>
      <SEOHead 
        title="Contact - Crod Babylon"
        description="Get in touch with Crod Babylon. We'd love to hear from you!"
      />
      
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-subtle border border-border-default mb-8">
                <Sparkles className="w-4 h-4 text-accent-purple" />
                <span className="text-sm font-medium text-secondary">Let's Connect</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-xl text-secondary max-w-2xl mx-auto">
                Have a question, feedback, or just want to say hello? 
                We'd love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-secondary mb-8">
                Feel free to reach out through any of these channels. 
                We typically respond within 24-48 hours.
              </p>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="p-3 rounded-lg bg-surface-subtle text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-all">
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-tertiary">{method.label}</p>
                      <p className="font-medium group-hover:text-accent-purple transition-colors">
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* FAQ */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-1">Story Updates</p>
                    <p className="text-sm text-secondary">New chapters are released weekly</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Collaborations</p>
                    <p className="text-sm text-secondary">Always open to creative partnerships</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">Bug Reports</p>
                    <p className="text-sm text-secondary">Please include browser and device info</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">Select a subject</option>
                      <option value="feedback">General Feedback</option>
                      <option value="story">Story Ideas</option>
                      <option value="bug">Bug Report</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-tertiary">
                      We'll get back to you as soon as possible
                    </p>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || submitted}
                      className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting || submitted ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting || submitted ? 1 : 0.98 }}
                    >
                      {submitted ? (
                        <>
                          <MessageCircle className="w-4 h-4" />
                          <span>Message Sent!</span>
                        </>
                      ) : isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}