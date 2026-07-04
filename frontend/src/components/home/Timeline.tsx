import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const milestones = [
  { year: '2005', title: 'The Vision is Born',   desc: 'Founders establish Paradise International Academy with a mission to provide world-class education to Nigerian children.' },
  { year: '2008', title: 'New Campus Opens',      desc: 'A state-of-the-art campus with science labs, ICT suites, and sports facilities is inaugurated.' },
  { year: '2012', title: 'Cambridge Pathways',   desc: 'International academic programmes added, opening doors to universities across the UK and beyond.' },
  { year: '2018', title: 'National Awards',       desc: 'Recognised as one of Nigeria\'s top private schools with multiple national academic excellence awards.' },
  { year: '2022', title: 'Digital Classrooms',   desc: 'Smart boards, robotics labs, and an online learning platform bring the campus fully into the future.' },
  { year: '2025', title: 'Two Decades of Fruit', desc: 'Over 2,000 alumni serving across six continents — and still growing.' },
]

export default function Timeline() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label">Our Story</span>
          <h2 className="section-title mt-2">Milestones Along the Way</h2>
        </motion.div>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 via-green-600 to-yellow-500 hidden md:block" />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                      <span className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${
                        i % 3 === 0 ? 'text-primary-600' : i % 3 === 1 ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {m.year}
                      </span>
                      <h3 className="font-serif font-bold text-gray-900 text-xl mb-2">{m.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  {/* Centre dot */}
                  <div className={`hidden md:flex w-12 h-12 rounded-full flex-shrink-0 items-center justify-center font-bold text-sm text-white shadow-lg z-10 ${
                    i % 3 === 0 ? 'bg-primary-600' : i % 3 === 1 ? 'bg-green-600' : 'bg-yellow-500 text-gray-900'
                  }`}>
                    {m.year.slice(2)}
                  </div>

                  {/* Empty spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
