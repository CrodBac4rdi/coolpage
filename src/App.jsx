import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ClassNameDebugger } from './ClassNameDebugger';

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

function App() {
  return (
    <>
      <ClassNameDebugger />
      {/* ...existing code... */}
    </>
  );
}