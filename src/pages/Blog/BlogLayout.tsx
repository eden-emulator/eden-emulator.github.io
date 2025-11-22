import { Outlet } from '@tanstack/react-router'
import SEO from '@/components/SEO'

export default function BlogLayout() {
  return (
    <>
      <SEO
        title="Blog"
        description="News, updates, and announcements from the Eden Emulator team"
      />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </>
  )
}
