import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import HomePage from './pages/Home/HomePage'
import FeaturesPage from './pages/Features/FeaturesPage'
import DownloadPage from './pages/Download/DownloadPage'
import DocumentationPage from './pages/Documentation/DocumentationPage'
import CommunityPage from './pages/Community/CommunityPage'
import SystemRequirementsPage from './pages/SystemRequirements/SystemRequirementsPage'
import CompatibilityReportsPage from './pages/CompatibilityReports/CompatibilityReportsPage'
import TeamPage from './pages/Team/TeamPage'
import DonationsPage from './pages/Donations/DonationsPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import AppLayout from './components/AppLayout'
import BlogLayout from './pages/Blog/BlogLayout'
import BlogList from './pages/Blog/BlogList'
import BlogPost from './pages/Blog/BlogPost'
import { loadBlogIndex } from './utils/blogLoader'
import type { BlogIndex } from './types/blog'

const rootRoute = createRootRoute({ component: AppLayout })

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/features',
  component: FeaturesPage,
})

const downloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/download',
  component: DownloadPage,
})

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  component: DocumentationPage,
})

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community',
  component: CommunityPage,
})

const systemRequirementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/system-requirements',
  component: SystemRequirementsPage,
})

const compatibilityReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/compatibility',
  component: CompatibilityReportsPage,
})

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/team',
  component: TeamPage,
})

const donationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donations',
  component: DonationsPage,
})

const blogLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogLayout,
  loader: async (): Promise<{ blogIndex: BlogIndex }> => {
    const blogIndex = await loadBlogIndex()
    return { blogIndex }
  },
})

const blogIndexRoute = createRoute({
  getParentRoute: () => blogLayoutRoute,
  path: '/',
  component: () => {
    const { blogIndex } = blogLayoutRoute.useLoaderData()
    return <BlogList blogIndex={blogIndex} />
  },
})

const blogPostRoute = createRoute({
  getParentRoute: () => blogLayoutRoute,
  path: '/$slug',
  component: () => {
    const { blogIndex } = blogLayoutRoute.useLoaderData()
    return <BlogPost blogIndex={blogIndex} />
  },
})

const blogRouteTree = blogLayoutRoute.addChildren([blogIndexRoute, blogPostRoute])

const routeTree = rootRoute.addChildren([
  homeRoute,
  featuresRoute,
  downloadRoute,
  docsRoute,
  communityRoute,
  teamRoute,
  donationsRoute,
  systemRequirementsRoute,
  compatibilityReportsRoute,
  blogRouteTree,
])

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
