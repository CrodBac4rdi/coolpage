import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface MobileModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  fullscreen?: boolean
}

export default function MobileModal({
  isOpen,
  onClose,
  title,
  children,
  fullscreen = false
}: MobileModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className={`fixed z-50 md:hidden ${fullscreen ? 'inset-0' : 'bottom-0 left-0 right-0 top-20'}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="bg-surface-elevated rounded-t-3xl h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-default">
                <h2 className="text-xl font-semibold text-primary">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-surface-subtle transition-colors mobile-touch-target"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto h-full pb-20">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}