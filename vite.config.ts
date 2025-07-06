import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/coolpage/' : '/',
  server: {
    historyApiFallback: true,
    port: 5174,
    host: true
  },
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
  // Loggen nur im Development-Modus erhöhen
  logLevel: process.env.NODE_ENV !== 'production' ? 'info' : 'warn'
})
