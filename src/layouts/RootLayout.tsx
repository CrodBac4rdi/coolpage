import { Outlet } from 'react-router-dom'
import ModernNavbar from '../components/ModernNavbar'
import ModernFooter from '../components/ModernFooter'
import { useGestureNavigation } from '../hooks/useGestureNavigation'

export default function RootLayout() {
  useGestureNavigation()
  
  return (
    <div className="min-h-screen surface-base text-primary transition-colors">
      <ModernNavbar />
      <main>
        <Outlet />
      </main>
      <ModernFooter />
    </div>
  )
}