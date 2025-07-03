import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingElements from '../components/FloatingElements'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <FloatingElements />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}