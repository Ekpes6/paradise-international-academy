import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Raising Tomorrow\'s Leaders',
    subtitle: 'Excellence in Education from Crèche to Secondary',
    description:
      'Paradise International Academy provides a world-class, holistic education that nurtures every child\'s potential in a safe and inspiring environment.',
    cta: { label: 'Apply for Admission', href: '/admissions' },
    cta2: { label: 'Take a Virtual Tour', href: '/life#gallery' },
    badge: 'Admissions Open 2025/2026',
    bg: 'from-primary-900 via-primary-800 to-primary-700',
    image: '/images/hero-1.jpg',
  },
  {
    id: 2,
    title: 'A Community of Excellence',
    subtitle: 'Where Character Meets Academic Brilliance',
    description:
      'Our award-winning teachers and modern facilities create the perfect environment for intellectual curiosity, creativity and character development.',
    cta: { label: 'Explore Academics', href: '/academics' },
    cta2: { label: 'Meet Our Staff', href: '/about#staff' },
    badge: 'WAEC · NECO · Cambridge Pathways',
    bg: 'from-green-900 via-green-800 to-green-700',
    image: '/images/hero-2.jpg',
  },
  {
    id: 3,
    title: 'Life Beyond the Classroom',
    subtitle: 'Sports, Arts, Clubs & So Much More',
    description:
      'From robotics and coding to inter-house sports, music, drama and community service — we develop well-rounded citizens ready for the future.',
    cta: { label: 'Explore School Life', href: '/life' },
    cta2: { label: 'View Gallery', href: '/gallery' },
    badge: 'Award-Winning Extracurriculars',
    bg: 'from-primary-900 via-red-900 to-primary-800',
    image: '/images/hero-3.jpg',
  },
]

const stats = [
  { value: '20+', label: 'Years of Excellence' },
  { value: '98%',  label: 'Pass Rate' },
  { value: '2,000+', label: 'Graduates' },
  { value: '500+', label: 'Current Students' },
]

export default function HeroSlider() {
  const [current, setCurrent]   = useState(0)
  const [paused, setPaused]     = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(next, 6000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, paused, next])

  const slide = slides[current]

  return (
    <section
      className="relative min-h-[90vh] flex flex-col overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} opacity-90 z-10`} />
          {/* Striped texture */}
          <div className="absolute inset-0 bg-hero-stripe z-10" />
          {/* Background image (falls back gracefully if not present) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Yellow accent bar at top */}
      <div className="relative z-20 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />

      {/* Content */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-primary-700 animate-pulse" />
                {slide.badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-yellow-300 text-xl md:text-2xl font-semibold mb-5"
              >
                {slide.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-100 text-lg max-w-xl leading-relaxed mb-9"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={slide.cta.href}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                >
                  {slide.cta.label}
                </Link>
                <Link
                  to={slide.cta2.href}
                  className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary-700 font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                >
                  {slide.cta2.label}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-20 bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif font-bold text-yellow-400 text-3xl">{s.value}</p>
              <p className="text-gray-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 right-6 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2.5 bg-yellow-400' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
