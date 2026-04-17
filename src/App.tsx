import { Suspense, lazy, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ScrollProvider } from './providers/ScrollProvider'
import Navbar from './components/layout/Navbar'
import PageWrapper from './components/layout/PageWrapper'
import PageLoader from './components/ui/PageLoader'
import ErrorBoundary from './components/ui/ErrorBoundary'
import SkipToContent from './components/ui/SkipToContent'

const Footer = lazy(() => import('./components/layout/Footer'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Experiments = lazy(() => import('./pages/Experiments'))
const ExperimentDetail = lazy(() => import('./pages/ExperimentDetail'))
const Observations = lazy(() => import('./pages/Observations'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const FieldWork = lazy(() => import('./pages/FieldWork'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const NotFound = lazy(() => import('./pages/NotFound'))

function FocusManager({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip focus management on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Focus the main content area on route change for screen readers
    // Use a small delay to ensure the new content is rendered
    const timeoutId = setTimeout(() => {
      mainRef.current?.focus({ preventScroll: true })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <main 
      ref={mainRef}
      id="main-content" 
      className="pt-16 outline-none" 
      tabIndex={-1}
    >
      {children}
    </main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  const showFooter = location.pathname === '/' || location.pathname === '/about'

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route path="/experiments" element={<Experiments />} />
        <Route path="/experiments/:slug" element={<ExperimentDetail />} />
        <Route path="/observations" element={<Observations />} />
        <Route path="/observations/:slug" element={<BlogPost />} />
        <Route path="/field-work" element={<FieldWork />} />
        <Route path="/field-work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <Footer />}
    </Suspense>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollProvider>
          <SkipToContent />
          <Navbar />
          <FocusManager>
            <AnimatedRoutes />
          </FocusManager>
        </ScrollProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
