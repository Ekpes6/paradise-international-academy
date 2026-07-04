import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const facilities = [
  {
    title: 'Digital Classrooms',
    desc: 'Interactive smart boards, broadband, and one-to-one devices in every lesson.',
    icon: '🖥️',
    color: 'bg-primary-50 border-primary-200',
    iconBg: 'bg-primary-100',
  },
  {
    title: 'Modern ICT Labs',
    desc: 'Two purpose-built suites for coding, design, and computer-based testing.',
    icon: '💻',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    title: 'Science Laboratories',
    desc: 'Fully equipped wet labs for biology, chemistry, and physics.',
    icon: '🔬',
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
  },
  {
    title: 'Sports Complex',
    desc: 'Full-size football pitch, basketball court, swimming pool and athletics track.',
    icon: '⚽',
    color: 'bg-primary-50 border-primary-200',
    iconBg: 'bg-primary-100',
  },
  {
    title: 'Library & Resource Centre',
    desc: 'Over 10,000 books plus digital resources and quiet study spaces.',
    icon: '📚',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    title: 'Music & Arts Studio',
    desc: 'Choir, strings, percussion, drama, and visual arts — creativity thrives here.',
    icon: '🎨',
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
  },
  {
    title: 'Robotics & Coding',
    desc: 'Award-winning STEM club with national competition wins.',
    icon: '🤖',
    color: 'bg-primary-50 border-primary-200',
    iconBg: 'bg-primary-100',
  },
  {
    title: 'Safe Campus',
    desc: 'Gated estate, CCTV, trained pastoral staff and qualified school nurses.',
    icon: '🛡️',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
]

export default function FacilitiesSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label">Campus & Facilities</span>
          <h2 className="section-title mt-2">Built for Curious Minds</h2>
          <p className="section-subtitle mx-auto mt-3">
            Eight signature facilities that turn ordinary school days into extraordinary experiences.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facilities.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className={`border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-default ${f.color}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${f.iconBg}`}>
                {f.icon}
              </div>
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
