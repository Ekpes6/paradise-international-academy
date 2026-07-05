import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import AdmissionsCTA from '@/components/home/AdmissionsCTA'

function PageHero() {
  return (
    <div className="relative bg-primary-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
          Academics
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-gray-200 text-xl max-w-2xl mx-auto">
          Four progressive sections, one continuous philosophy of excellence.
        </motion.p>
      </div>
    </div>
  )
}

const levels = [
  {
    id: 'creche',
    color: 'bg-yellow-500',
    textColor: 'text-gray-900',
    borderColor: 'border-yellow-300',
    label: 'Ages 0–2',
    title: 'Crèche',
    intro: 'Our Crèche provides a warm, nurturing environment that mirrors the love and safety of home while gently introducing children to structured routines, social interaction, and early language development.',
    curriculum: ['Sensory play & exploration', 'Language and communication activities', 'Creative music and movement', 'Safe social interaction', 'Basic self-care routines'],
    image: '/images/level-creche-lg.jpg',
  },
  {
    id: 'nursery',
    color: 'bg-green-600',
    textColor: 'text-white',
    borderColor: 'border-green-300',
    label: 'Ages 3–5',
    title: 'Nursery',
    intro: 'Our Nursery section follows the Early Years Foundation Stage (EYFS) framework, blending structured phonics and numeracy sessions with creative play, discovery activities, and social development.',
    curriculum: ['Systematic phonics & early reading', 'Number sense & basic numeracy', 'Arts, crafts, and music', 'Physical education & outdoor learning', 'Social & emotional development'],
    image: '/images/level-nursery-lg.jpg',
  },
  {
    id: 'primary',
    color: 'bg-primary-600',
    textColor: 'text-white',
    borderColor: 'border-primary-300',
    label: 'Ages 6–11',
    title: 'Primary School',
    intro: 'Our Primary curriculum combines Cambridge Primary with the Nigerian National Curriculum, building literate, numerate, and curious learners who develop strong foundations for secondary education.',
    curriculum: ['English Language & Literature', 'Mathematics', 'Basic Science & Technology', 'Social Studies & Civic Education', 'French Language', 'ICT & Digital Literacy', 'Creative Arts, Music & PE'],
    image: '/images/level-primary-lg.jpg',
  },
  {
    id: 'jss',
    color: 'bg-green-700',
    textColor: 'text-white',
    borderColor: 'border-green-400',
    label: 'Ages 12–14 · JSS 1–3',
    title: 'Junior Secondary',
    intro: 'Our Junior Secondary section prepares students for the Basic Education Certificate Examination (BECE) while building critical thinking, research, and communication skills essential for senior secondary.',
    curriculum: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Business Studies', 'Agricultural Science', 'Computer Studies', 'French & Cultural & Creative Arts'],
    image: '/images/level-jss-lg.jpg',
  },
  {
    id: 'sss',
    color: 'bg-primary-800',
    textColor: 'text-white',
    borderColor: 'border-primary-400',
    label: 'Ages 15–18 · SSS 1–3',
    title: 'Senior Secondary',
    intro: 'Our Senior Secondary section prepares students for WAEC, NECO, and NABTEB examinations, with an enriched programme including IGCSE and A-Level tracks for students targeting global universities.',
    curriculum: ['WAEC & NECO Core Subjects', 'IGCSE & A-Level (elective)', 'Sciences: Biology, Chemistry, Physics', 'Commerce: Economics, Accounting', 'Arts: Literature, Government, History', 'Technical & Vocational pathways', 'University entrance preparation'],
    image: '/images/level-sss-lg.jpg',
  },
]

function LevelSection({ level, idx }: { level: typeof levels[0]; idx: number }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const isEven = idx % 2 === 0

  return (
    <section id={level.id} ref={ref} className="py-20 border-b border-gray-100 last:border-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-xl aspect-video bg-gray-100"
          >
            <img src={level.image} alt={level.title} className="w-full h-full object-cover" loading="lazy" />
            <div className={`absolute top-4 left-4 ${level.color} ${level.textColor} text-xs font-bold px-3 py-1.5 rounded-full`}>
              {level.label}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="section-label">{level.label}</span>
            <h2 className="section-title mt-1 mb-4">{level.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{level.intro}</p>

            <h4 className="font-semibold text-gray-900 mb-3">Curriculum Highlights:</h4>
            <ul className="space-y-2 mb-7">
              {level.curriculum.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${level.color} ${level.textColor}`}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link to="/admissions" className="btn-primary">Apply Now</Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function AcademicsPage() {
  return (
    <>
      <Helmet>
        <title>Academics | Paradise International Academy (Creche and Schools)</title>
        <meta name="description" content="Explore our world-class academic programmes from Crèche to Senior Secondary School." />
      </Helmet>
      <PageHero />
      {/* Tab nav */}
      <div className="sticky top-[81px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-hide py-2">
          {levels.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
              {l.title}
            </a>
          ))}
        </div>
      </div>
      <div className="bg-white">
        {levels.map((level, i) => (
          <LevelSection key={level.id} level={level} idx={i} />
        ))}
      </div>
      <AdmissionsCTA />
    </>
  )
}
