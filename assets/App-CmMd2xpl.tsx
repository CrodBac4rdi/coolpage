import { lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './contexts/ThemeContext'
import UserPreferences from './components/UserPreferences'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastProvider } from './components/ToastProvider'
import Layout from './components/Layout'

// Lazy load all pages with optimized chunks
const Home = lazy(() => import('./pages/ModernBentoHome').then(module => ({ default: module.default })))
const About = lazy(() => import('./pages/ModernAbout').then(module => ({ default: module.default })))
const Contact = lazy(() => import('./pages/ModernContact').then(module => ({ default: module.default })))
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.default })))
const Stories = lazy(() => import('./pages/StoryFocusedHome').then(module => ({ default: module.default })))
const Reader = lazy(() => import('./components/ContinuousReader').then(module => ({ default: module.default })))
const ContentHub = lazy(() => import('./pages/ContentHub').then(module => ({ default: module.default })))
const UserDashboard = lazy(() => import('./pages/UserDashboard').then(module => ({ default: module.default })))
const RomanceAnimeGuide = lazy(() => import('./components/RomanceAnimeGuide').then(module => ({ default: module.default })))
const ManhwaHub = lazy(() => import('./pages/ManhwaHub').then(module => ({ default: module.default })))
const EnhancedAnimeSearcher = lazy(() => import('./components/EnhancedAnimeSearcher').then(module => ({ default: module.default })))
const Watchlist = lazy(() => import('./pages/Watchlist').then(module => ({ default: module.default })))

// Lazy load heavy components
const HeavyComponents = {
  BrutalistHero: lazy(() => import('./components/BrutalistHero').then(module => ({ default: module.default }))),
  CharacterGallery: lazy(() => import('./components/CharacterGallery').then(module => ({ default: module.default })))
}

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <UserPreferences />
            <Layout>
              <Routes>
                <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
                <Route path="content" element={<Suspense fallback={<PageLoader />}><ContentHub /></Suspense>} />
                <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><UserDashboard /></Suspense>} />
                <Route path="stories" element={<Suspense fallback={<PageLoader />}><Stories /></Suspense>} />
                <Route path="manhwas" element={<Suspense fallback={<PageLoader />}><ManhwaHub /></Suspense>} />
                <Route path="anime-guide" element={<Suspense fallback={<PageLoader />}><RomanceAnimeGuide /></Suspense>} />
                <Route path="romance-search" element={<Suspense fallback={<PageLoader />}><EnhancedAnimeSearcher /></Suspense>} />
                <Route path="watchlist" element={<Suspense fallback={<PageLoader />}><Watchlist /></Suspense>} />
                <Route path="reader/:storyId" element={<Suspense fallback={<PageLoader />}><Reader /></Suspense>} />
                <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
                <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
                <Route path="/404" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Layout>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App