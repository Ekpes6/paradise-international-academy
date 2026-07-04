import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

const levels = [
  {
    id: 'creche',
    label: 'AGES 0–2',
    title: 'Crèche',
    desc: 'A gentle introduction to community, language, and play — led by trained early-years carers in a nurturing, homelike setting.',
    color: 'bg-yellow-500',
    textColor: 'text-gray-900',
    hoverColor: 'hover:bg-yellow-400',
    image: '/images/level-creche.jpg',
    href: '/academics#creche',
  },
  {
    id: 'nursery',
    label: 'AGES 3–5',
    title: 'Nursery',
    desc: 'Phonics, numeracy, music, and discovery — shaped by the EYFS framework and a deep love for the Nigerian child.',
    color: 'bg-green-600',
    textColor: 'text-white',
    hoverColor: 'hover:bg-green-500',
    image: '/images/level-nursery.jpg',
    href: '/academics#nursery',
  },
  {
    id: 'primary',
    label: 'AGES 6–11',
    title: 'Primary',
    desc: 'Cambridge Primary alongside the Nigerian curriculum — building literate, numerate, and curious learners who love to think.',
    color: 'bg-primary-600',
    textColor: 'text-white',
    hoverColor: 'hover:bg-primary-500',
    image: '/images/level-primary.jpg',
    href: '/academics#primary',
  },
  {
    id: 'secondary',
    label: 'AGES 12–18',
    title: 'Secondary',
    desc: 'IGCSE, WAEC, and NECO pathways with dedicated mentoring for global universities and leading Nigerian institutions.',
    color: 'bg-primary-800',
    textColor: 'text-white',
    hoverColor: 'hover:bg-primary-700',
    image: '/images/level-secondary.jpg',
    href: '/academics#secondary',
  },
]

export default function AcademicLevels() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label">Academic Levels</span>
          <h2 className="section-title mt-2">From First Steps to First Jobs</h2>
          <p className="section-subtitle mx-auto mt-3">
            Four progressive sections, one continuous philosophy of growth and excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level, i) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-52 bg-gray-200 overflow-hidden">
                <img
                  src={level.image}
                  alt={level.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${level.color} ${level.textColor}`}>
                  {level.label}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 bg-white">
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">{level.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{level.desc}</p>
                <Link
                  to={level.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${level.color} ${level.hoverColor} ${level.textColor}`}
                >
                  Explore {level.title} <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
