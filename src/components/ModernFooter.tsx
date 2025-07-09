import { Link } from 'react-router-dom'
import { Heart, Github, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ModernFooter() {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    product: [
      { label: 'Stories', href: '/stories' },
      { label: 'Characters', href: '/content' },
      { label: 'Timeline', href: '/stories' },
      { label: 'Games', href: '/content' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/content' },
    ],
    legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'License', href: '#' },
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com', icon: Github },
      { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
      { label: 'Email', href: 'mailto:hello@crodbabylon.com', icon: Mail },
    ]
  }

  return (
    <footer className="border-t border-border-default bg-surface-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-lg font-semibold text-gradient">Crod Babylon</h3>
            </Link>
            <p className="text-sm text-secondary mb-4">
              Where dreams code reality. Crafting digital experiences that inspire.
            </p>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost p-2"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-medium text-primary mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-primary mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-medium text-primary mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-secondary hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-tertiary">
              © {currentYear} Crod Babylon. All rights reserved.
            </p>
            <motion.p 
              className="text-sm text-tertiary flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Made with <Heart className="w-4 h-4 text-accent-pink" /> by dreamers
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}