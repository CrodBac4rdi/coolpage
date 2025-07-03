import { motion } from 'framer-motion'
import { Mail, MapPin, Send, MessageSquare, Clock } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      // In a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Form submitted:', formData)
      setSubmitStatus('success')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: "Digital Realm, Internet",
      subdetails: "Available Worldwide"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "birkner.daniel@googlemail.com",
      subdetails: "We reply within 24 hours"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: "24/7 Digital Presence",
      subdetails: "Always here for you"
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's Build Something
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Amazing Together
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Have a project in mind? We'd love to hear about it. Send us a message and let's create the future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-1 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">{info.title}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{info.details}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{info.subdetails}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors text-base"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors text-base"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors text-base"
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none transition-colors resize-none text-base"
                  rows={6}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 group transition-all ${
                  submitStatus === 'success'
                    ? 'bg-green-500'
                    : submitStatus === 'error'
                    ? 'bg-red-500'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                } ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Sending...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <span>Message Sent!</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <span>Error! Try Again</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/10 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">We're Everywhere</h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              As a digital-first company, we work with clients from all around the globe. 
              No matter where you are, we're just a message away.
            </p>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {['New York', 'London', 'Tokyo', 'Sydney'].map((city) => (
                <div key={city} className="px-3 sm:px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm sm:text-base">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}