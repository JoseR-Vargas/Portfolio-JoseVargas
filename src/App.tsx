import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import PortfolioPage from './pages/PortfolioPage'

export default function App() {
  const { pathname } = useLocation()

  // Re-initialise Preline components after each client-side navigation.
  useEffect(() => {
    window.HSStaticMethods?.autoInit()
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}
