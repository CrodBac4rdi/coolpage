import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/coolpage/' : '/',
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // Aktiviere Source Maps für Debugging
    sourcemap: true,
    // Detailliertere Build-Logs
    minify: 'esbuild',
    reportCompressedSize: true
  },
  // Erhöhe Logging
  logLevel: 'info'
})
        drop_debugger: true
      }
    } : undefined
  },
  // Loggen nur im Development-Modus erhöhen
  logLevel: process.env.NODE_ENV !== 'production' ? 'info' : 'warn'
})

