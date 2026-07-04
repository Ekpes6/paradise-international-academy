import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ScrollToTop from '@/components/ui/ScrollToTop'

// Lazy-loaded pages
const HomePage        = lazy(() => import('@/pages/HomePage'))
const AboutPage       = lazy(() => import('@/pages/AboutPage'))
const AcademicsPage   = lazy(() => import('@/pages/AcademicsPage'))
const AdmissionsPage  = lazy(() => import('@/pages/AdmissionsPage'))
const LifePage        = lazy(() => import('@/pages/LifePage'))
const ParentsPage     = lazy(() => import('@/pages/ParentsPage'))
const NewsPage        = lazy(() => import('@/pages/NewsPage'))
const NewsDetailPage  = lazy(() => import('@/pages/NewsDetailPage'))
const ContactPage     = lazy(() => import('@/pages/ContactPage'))
const GalleryPage     = lazy(() => import('@/pages/GalleryPage'))
const LoginPage       = lazy(() => import('@/pages/portals/LoginPage'))
const ParentPortal    = lazy(() => import('@/pages/portals/ParentPortalPage'))
const StudentPortal   = lazy(() => import('@/pages/portals/StudentPortalPage'))
const AdminPanel      = lazy(() => import('@/pages/portals/AdminPanelPage'))
const NotFoundPage    = lazy(() => import('@/pages/NotFoundPage'))

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

function AnimatedRoutes() {
  const location = useLocation()

  // Portals use their own full-screen layout (no shared Header/Footer)
  const isPortal = location.pathname.startsWith('/portal') || location.pathname.startsWith('/admin')

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes location={location}>
            {/* Public site */}
            <Route path="/"           element={<><Header /><main><HomePage /></main><Footer /></>} />
            <Route path="/about"      element={<><Header /><main><AboutPage /></main><Footer /></>} />
            <Route path="/academics"  element={<><Header /><main><AcademicsPage /></main><Footer /></>} />
            <Route path="/admissions" element={<><Header /><main><AdmissionsPage /></main><Footer /></>} />
            <Route path="/life"       element={<><Header /><main><LifePage /></main><Footer /></>} />
            <Route path="/parents"    element={<><Header /><main><ParentsPage /></main><Footer /></>} />
            <Route path="/news"       element={<><Header /><main><NewsPage /></main><Footer /></>} />
            <Route path="/news/:slug" element={<><Header /><main><NewsDetailPage /></main><Footer /></>} />
            <Route path="/gallery"    element={<><Header /><main><GalleryPage /></main><Footer /></>} />
            <Route path="/contact"    element={<><Header /><main><ContactPage /></main><Footer /></>} />

            {/* Portals */}
            <Route path="/login"           element={<LoginPage />} />
            <Route path="/portal/parent"   element={<ParentPortal />} />
            <Route path="/portal/student"  element={<StudentPortal />} />
            <Route path="/admin/*"         element={<AdminPanel />} />

            {/* 404 */}
            <Route path="*" element={<><Header /><main><NotFoundPage /></main><Footer /></>} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
      <WhatsAppButton />
    </BrowserRouter>
  )
}
