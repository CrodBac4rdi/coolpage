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
    // Nur im Development-Modus Source Maps aktivieren
    sourcemap: process.env.NODE_ENV !== 'production',
    // In Produktion optimieren, in Development detaillierter loggen
    minify: process.env.NODE_ENV === 'production' ? 'terser' : 'esbuild',
    reportCompressedSize: process.env.NODE_ENV !== 'production',
    // Terser-Optionen für bessere Optimierung in Produktion
    terserOptions: process.env.NODE_ENV === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    } : undefined
  },
  // Loggen nur im Development-Modus erhöhen
  logLevel: process.env.NODE_ENV !== 'production' ? 'info' : 'warn'
})

