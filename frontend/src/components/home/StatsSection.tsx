import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: 20,  suffix: '+', label: 'Years of Excellence',  color: 'text-yellow-400' },
  { value: 98,  suffix: '%', label: 'WAEC Pass Rate',       color: 'text-white' },
  { value: 2000, suffix: '+', label: 'Happy Graduates',     color: 'text-yellow-400' },
  { value: 500, suffix: '+', label: 'Current Students',     color: 'text-white' },
  { value: 80,  suffix: '+', label: 'Qualified Staff',       color: 'text-yellow-400' },
  { value: 15,  suffix: '+', label: 'Active Clubs',          color: 'text-white' },
]

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #660000 0%, #cc0000 50%, #820000 100%)' }}
    >
      {/* Yellow stripe accent top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      {/* Subtle diagonal lines */}
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-yellow-400 text-sm font-bold uppercase tracking-widest mb-2">
            Our Numbers
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Two Decades, One Calling
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 hover:bg-white/20 transition-colors"
            >
              <p className={`font-serif font-bold text-4xl md:text-5xl mb-2 ${s.color}`}>
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-gray-200 text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-white to-yellow-500" />
    </section>
  )
}
