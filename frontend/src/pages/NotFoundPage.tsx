import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>Page Not Found | Paradise International Academy</title></Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
            <GraduationCap size={48} className="text-primary-600" />
          </div>
          <p className="text-8xl font-serif font-bold text-primary-100 select-none">404</p>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mt-2 mb-3">Page Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">Go to Homepage</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
