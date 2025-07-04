import { lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './contexts/ThemeContext'

// Lazy load all pages
const Home = lazy(() => import('./pages/TabbedHome'))
const About = lazy(() => import('./pages/ModernAbout'))
const Contact = lazy(() => import('./pages/ModernContact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Stories = lazy(() => import('./pages/StoryFocusedHome'))
const Reader = lazy(() => import('./components/ContinuousReader'))

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
)

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="stories" element={<Suspense fallback={<PageLoader />}><Stories /></Suspense>} />
          <Route path="reader/:storyId" element={<Suspense fallback={<PageLoader />}><Reader /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App