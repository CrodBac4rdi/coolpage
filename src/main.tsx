import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './styles/mobile-enhancements.css'
import App from './App.tsx'
import { patchDOMTokenList } from './utils/domTokenListPatch.js'

// Apply DOMTokenList patch before app loads
patchDOMTokenList()

// Debug: Log any errors with className
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = function(...args) {
    if (args[0] && args[0].toString().includes('DOMTokenList')) {
      console.warn('DOMTokenList Error caught:', args);
      // Try to find the source
      try {
        throw new Error('Stack trace');
      } catch (e) {
        console.warn('Stack:', e.stack);
      }
    }
    return originalError.apply(console, args);
  };
}

// Register service worker for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
