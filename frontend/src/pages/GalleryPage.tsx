import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

const categories = ['All', 'Academics', 'Sports', 'Arts', 'STEM', 'Events', 'Life']

const images = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery-${(i % 6) + 1}.jpg`,
  alt: `School life photo ${i + 1}`,
  category: categories[(i % 6) + 1],
}))

function PageHero() {
  return (
    <div className="relative bg-primary-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Gallery</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-gray-200 text-xl max-w-2xl mx-auto">
          Quiet, ordinary, extraordinary days — captured in photographs.
        </motion.p>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [active, setActive]   = useState('All')
  const [lightbox, setLightbox] = useState<(typeof images)[0] | null>(null)
  const { ref } = useInView({ threshold: 0.05, triggerOnce: true })

  const filtered = active === 'All' ? images : images.filter((i) => i.category === active)

  return (
    <>
      <Helmet>
        <title>Gallery | Paradise International Academy</title>
        <meta name="description" content="Browse photos from Paradise International Academy — academics, sports, arts, STEM, events and everyday school life." />
      </Helmet>

      <PageHero />

      <section ref={ref} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === c ? 'bg-primary-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  onClick={() => setLightbox(img)}
                  className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group bg-gray-100 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
                >
                  <img src={img.src} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn size={28} className="text-white" />
                  </div>
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.category}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white">
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
    </>
  )
}
