import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Heart, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks: Record<string, Array<{ label: string; to: string; external?: boolean }>> = {
    'Story Universe': [
      { label: 'Alle Stories', to: '/manhwa' },
      { label: 'Charaktere', to: '/blog' },
      { label: 'Timeline', to: '/timeline' },
    ],
    'Features': [
      { label: 'Story Games', to: '/games' },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
    'Connect': [
      { label: 'GitHub', to: 'https://github.com/CrodBac4rdi', external: true },
      { label: 'Contact', to: '/contact' },
      { label: 'Home', to: '/' },
    ],
  }

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/CrodBac4rdi', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative z-10 bg-black/20 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-3 sm:mb-4">
              Crod Babylon
            </h3>
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
              Dein digitales Story-Universum. Tauche ein in Welten voller Emotionen, Magie und unvergesslicher Momente.
            </p>
            <div className="flex items-center gap-2 text-gray-400 mb-2 text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Digital Realm, Internet</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">birkner.daniel@googlemail.com</span>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="sm:col-span-1">
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base py-1 block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base py-1 block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-1 text-gray-400 mb-4 md:mb-0 text-sm sm:text-base text-center">
            <span>© {currentYear} Crod Babylon. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>by the community</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}