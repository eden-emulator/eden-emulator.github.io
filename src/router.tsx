import { lazy, Suspense, type ComponentType } from 'react'
import { createRouter, createRoute, createRootRoute, redirect } from '@tanstack/react-router'
import HomePage from './pages/Home/HomePage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import AppLayout from './components/AppLayout'
import { loadBlogIndex } from './utils/blogLoader'
import type { BlogIndex } from './types/blog'

const FeaturesPage = lazy(() => import('./pages/Features/FeaturesPage'))
const DownloadPage = lazy(() => import('./pages/Download/DownloadPage'))
const CommunityPage = lazy(() => import('./pages/Community/CommunityPage'))
const SystemRequirementsPage = lazy(
  () => import('./pages/SystemRequirements/SystemRequirementsPage'),
)
const CompatibilityReportsPage = lazy(
  () => import('./pages/CompatibilityReports/CompatibilityReportsPage'),
)
const TeamPage = lazy(() => import('./pages/Team/TeamPage'))
const DonationsPage = lazy(() => import('./pages/Donations/DonationsPage'))
const BlogLayout = lazy(() => import('./pages/Blog/BlogLayout'))
const BlogList = lazy(() => import('./pages/Blog/BlogList'))
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'))

const withSuspense = <P extends object>(Component: ComponentType<P>) => {
  return function SuspenseWrapped(props: P) {
    return (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    )
  }
}

const rootRoute = createRootRoute({ component: AppLayout })

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/features',
  component: withSuspense(FeaturesPage),
})

const downloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/download',
  component: withSuspense(DownloadPage),
})

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  beforeLoad: () => {
    throw redirect({
      href: 'https://git.eden-emu.dev/eden-emu/eden/src/branch/master/docs/user/README.md',
    })
  },
})

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/community',
  component: withSuspense(CommunityPage),
})

const systemRequirementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/system-requirements',
  component: withSuspense(SystemRequirementsPage),
})

const compatibilityReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/compatibility',
  component: withSuspense(CompatibilityReportsPage),
})

const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/team',
  component: withSuspense(TeamPage),
})

const donationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/donations',
  component: withSuspense(DonationsPage),
})

const blogLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: withSuspense(BlogLayout),
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
    return (
      <Suspense fallback={null}>
        <BlogList blogIndex={blogIndex} />
      </Suspense>
    )
  },
})

const blogPostRoute = createRoute({
  getParentRoute: () => blogLayoutRoute,
  path: '/$slug',
  component: () => {
    const { blogIndex } = blogLayoutRoute.useLoaderData()
    return (
      <Suspense fallback={null}>
        <BlogPost blogIndex={blogIndex} />
      </Suspense>
    )
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
