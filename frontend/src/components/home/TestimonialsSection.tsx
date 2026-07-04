import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Mrs. Adaeze Okonkwo',
    role: 'Parent — Primary 5',
    rating: 5,
    message:
      'Paradise International Academy has been transformative for my daughter. The teachers genuinely care about each child\'s growth, and the facilities are world-class. Best decision we ever made!',
    avatar: '/images/testimonial-1.jpg',
  },
  {
    id: 2,
    name: 'Mr. Chukwuemeka Nwosu',
    role: 'Parent — JSS 2',
    rating: 5,
    message:
      'My son struggled academically at his previous school. Within one term at Paradise, his confidence soared and he started topping his class. The holistic approach to education here is truly remarkable.',
    avatar: '/images/testimonial-2.jpg',
  },
  {
    id: 3,
    name: 'Zara Abdullahi',
    role: 'Alumni, 2022 Graduate',
    rating: 5,
    message:
      'The values, discipline, and academic foundation I received at Paradise International Academy prepared me for university life and beyond. I am forever grateful to every teacher who invested in me.',
    avatar: '/images/testimonial-3.jpg',
  },
  {
    id: 4,
    name: 'Dr. Funmi Adeleke',
    role: 'Parent — SSS 3',
    rating: 5,
    message:
      'As a professional, I needed a school that would challenge my son academically while building his character. Paradise does both exceptionally well. The WAEC results speak for themselves.',
    avatar: '/images/testimonial-4.jpg',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #006b3c 0%, #008751 60%, #26a566 100%)' }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-yellow-500 to-white" />

      {/* Decorative quote mark */}
      <Quote className="absolute top-10 left-10 text-white/10 w-32 h-32" />
      <Quote className="absolute bottom-10 right-10 text-white/10 w-32 h-32 rotate-180" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-block text-yellow-300 text-sm font-bold uppercase tracking-widest mb-2">
            What Families Say
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Voices of Our Community
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 mb-8"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-white text-lg md:text-xl leading-relaxed mb-8 italic font-light">
              "{t.message}"
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white/20 border-2 border-yellow-400">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">{t.name}</p>
                <p className="text-green-200 text-sm">{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 h-2.5 bg-yellow-400' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-yellow-500 to-primary-600" />
    </section>
  )
}
