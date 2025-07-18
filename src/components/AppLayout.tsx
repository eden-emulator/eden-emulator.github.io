import { Outlet } from '@tanstack/react-router'
import Header from './Header'
import Footer from './Footer/Footer.tsx'

function AppLayout() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="h-12" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout
