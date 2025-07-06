import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/coolpage/' : '/',
  server: {
    port: 5174,
    host: true
  },
  preview: {
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
    sourcemap: true,
    minify: 'esbuild',
    reportCompressedSize: true
  },
  logLevel: process.env.NODE_ENV !== 'production' ? 'info' : 'warn'
})
