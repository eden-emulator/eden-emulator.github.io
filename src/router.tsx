import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import HomePage from './pages/Home/HomePage.tsx'
import FeaturesPage from './pages/Features/FeaturesPage.tsx'
import DownloadPage from './pages/Download/DownloadPage.tsx'
import DocumentationPage from './pages/Documentation/DocumentationPage.tsx'
import CommunityPage from './pages/Community/CommunityPage.tsx'
import AppLayout from './components/AppLayout'

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

const routeTree = rootRoute.addChildren([
  homeRoute,
  featuresRoute,
  downloadRoute,
  docsRoute,
  communityRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
