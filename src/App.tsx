import { lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './contexts/ThemeContext'

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ManhwaList = lazy(() => import('./pages/ManhwaList'))
const Reader = lazy(() => import('./pages/Reader'))
const Games = lazy(() => import('./pages/Games'))

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
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="manhwa" element={<Suspense fallback={<PageLoader />}><ManhwaList /></Suspense>} />
          <Route path="reader/:id" element={<Suspense fallback={<PageLoader />}><Reader /></Suspense>} />
          <Route path="games" element={<Suspense fallback={<PageLoader />}><Games /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App