import { lazy, Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ThemeProvider } from './contexts/ThemeContext'
import UserPreferences from './components/UserPreferences'
import ModernNavbar from './components/ModernNavbar'
import ModernFooter from './components/ModernFooter'

// Lazy load all pages
const Home = lazy(() => import('./pages/TabbedHome'))
const About = lazy(() => import('./pages/ModernAbout'))
const Contact = lazy(() => import('./pages/ModernContact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Stories = lazy(() => import('./pages/StoryFocusedHome'))
const Reader = lazy(() => import('./components/ContinuousReader'))
const ContentHub = lazy(() => import('./pages/ContentHub'))
const UserDashboard = lazy(() => import('./pages/UserDashboard'))
const RomanceAnimeGuide = lazy(() => import('./components/RomanceAnimeGuide'))

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
        <UserPreferences />
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <ModernNavbar />
          <main>
            <Routes>
              <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
              <Route path="content" element={<Suspense fallback={<PageLoader />}><ContentHub /></Suspense>} />
              <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><UserDashboard /></Suspense>} />
              <Route path="stories" element={<Suspense fallback={<PageLoader />}><Stories /></Suspense>} />
              <Route path="anime-guide" element={<Suspense fallback={<PageLoader />}><RomanceAnimeGuide /></Suspense>} />
              <Route path="reader/:storyId" element={<Suspense fallback={<PageLoader />}><Reader /></Suspense>} />
              <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
              <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
              <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
            </Routes>
          </main>
          <ModernFooter />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App