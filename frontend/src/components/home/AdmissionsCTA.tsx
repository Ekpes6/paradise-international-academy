import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, FileDown } from 'lucide-react'

export default function AdmissionsCTA() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative accent lines */}
          <div className="absolute inset-0 bg-hero-stripe opacity-30" />
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-white to-yellow-500" />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-yellow-500/10" />

          <div className="relative px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="inline-block bg-yellow-500 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Admissions 2025/2026
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Begin a Journey That<br />
                <span className="text-yellow-400">Lasts a Lifetime</span>
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-2">
                Applications are open year-round, with priority enrolment available for the next academic
                session. Apply online or schedule a campus visit today.
              </p>
              <ul className="space-y-2 mt-5">
                {[
                  'Simple online application — done in minutes',
                  'Scholarship opportunities available',
                  'Campus tours every Tuesday & Friday',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-gray-100 text-sm">
                    <span className="w-5 h-5 rounded-full bg-yellow-400 flex-shrink-0 flex items-center justify-center text-gray-900 font-bold text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Action cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-4 w-full md:w-auto min-w-[260px]"
            >
              <Link
                to="/admissions#apply"
                className="flex items-center justify-between gap-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <div>
                  <p className="text-lg">Apply Online</p>
                  <p className="text-xs font-normal text-gray-700 mt-0.5">Takes about 10 minutes</p>
                </div>
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-between gap-3 bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-5 rounded-2xl transition-all duration-300 border border-white/20 hover:-translate-y-0.5 group"
              >
                <div>
                  <p className="text-lg">Book a Campus Tour</p>
                  <p className="text-xs font-normal text-gray-300 mt-0.5">See the school in person</p>
                </div>
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="/downloads/prospectus.pdf"
                download
                className="flex items-center justify-between gap-3 bg-green-600/80 hover:bg-green-600 text-white font-bold px-6 py-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div>
                  <p className="text-lg">Download Prospectus</p>
                  <p className="text-xs font-normal text-green-100 mt-0.5">PDF — Full school guide</p>
                </div>
                <FileDown size={22} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
