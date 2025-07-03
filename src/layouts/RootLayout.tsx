import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingElements from '../components/FloatingElements'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <FloatingElements />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}