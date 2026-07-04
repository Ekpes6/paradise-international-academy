import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ZoomIn } from 'lucide-react'
import { Link } from 'react-router-dom'

const images = [
  { id: 1, src: '/images/gallery-1.jpg', alt: 'Students in science lab', category: 'Academics' },
  { id: 2, src: '/images/gallery-2.jpg', alt: 'Sports day action',       category: 'Sports' },
  { id: 3, src: '/images/gallery-3.jpg', alt: 'School choir performance', category: 'Arts' },
  { id: 4, src: '/images/gallery-4.jpg', alt: 'Robotics competition',    category: 'STEM' },
  { id: 5, src: '/images/gallery-5.jpg', alt: 'Graduation ceremony',     category: 'Events' },
  { id: 6, src: '/images/gallery-6.jpg', alt: 'Art exhibition',          category: 'Arts' },
]

export default function GalleryPreview() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [lightbox, setLightbox] = useState<(typeof images)[0] | null>(null)

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-label">Around the Campus</span>
          <h2 className="section-title mt-2">Life at Paradise</h2>
          <p className="section-subtitle mx-auto mt-3">
            Quiet, ordinary, extraordinary days — captured in photographs.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              onClick={() => setLightbox(img)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-gray-200 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${
                i === 0 || i === 4 ? 'row-span-2' : ''
              }`}
              style={{ minHeight: i === 0 || i === 4 ? '400px' : '200px' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-white text-sm font-medium">{img.alt}</span>
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    <ZoomIn size={15} className="text-gray-900" />
                  </div>
                </div>
              </div>
              {/* Category badge */}
              <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {img.category}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/gallery" className="btn-primary">View Full Gallery</Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
