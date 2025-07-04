import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useGestureNavigation } from '../hooks/useGestureNavigation'

export default function RootLayout() {
  useGestureNavigation()
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}