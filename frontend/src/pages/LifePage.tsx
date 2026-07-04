import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import GalleryPreview from '@/components/home/GalleryPreview'
import AdmissionsCTA from '@/components/home/AdmissionsCTA'
import { Trophy, Dumbbell, Music, Globe, Flame, Star } from 'lucide-react'

function PageHero() {
  return (
    <div className="relative bg-green-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-primary-600" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Life at Paradise</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-gray-200 text-xl max-w-2xl mx-auto">
          Beyond the classroom — sports, arts, clubs, excursions, and the daily joy of learning together.
        </motion.p>
      </div>
    </div>
  )
}

const extracurriculars = [
  { icon: Dumbbell, title: 'Sports & Athletics', color: 'bg-primary-600', desc: 'Football, basketball, swimming, athletics, table tennis, and more — competitive teams at every level.', items: ['Inter-House Sports Competition', 'State & National Championships', 'Swimming Pool — Weekly Classes', 'IESA Athletics Meets'] },
  { icon: Music,    title: 'Arts & Culture',     color: 'bg-green-600',  desc: 'Choir, orchestra, drama, dance, fine arts, and cultural groups that celebrate Nigerian heritage.', items: ['Annual School Musical', 'Cultural Day Celebrations', 'Art Exhibition', 'Drama & Theatre Club'] },
  { icon: Flame,    title: 'STEM Clubs',          color: 'bg-yellow-500', textDark: true, desc: 'Robotics, coding, science fairs, and technology innovation programmes for future problem-solvers.', items: ['Robotics Club (National Champions)', 'Coding & App Development', 'Science Olympiad', 'Mathematics Challenge'] },
  { icon: Globe,    title: 'Excursions & Trips',  color: 'bg-primary-700', desc: 'Educational field trips, cultural excursions, and international exchange programmes.', items: ['Museum & Historical Site Visits', 'Nature & Ecology Trips', 'Industry Visits', 'Leadership Retreats'] },
]

function ExtracurricularSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  return (
    <section id="clubs" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="section-label">Beyond the Classroom</span>
          <h2 className="section-title mt-2">Extracurricular Activities</h2>
          <p className="section-subtitle mx-auto mt-3">We develop well-rounded citizens through sport, culture, creativity, and service.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {extracurriculars.map((e, i) => {
            const Icon = e.icon
            return (
              <motion.div key={e.title} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }} className="bg-white rounded-3xl shadow-card overflow-hidden">
                <div className={`${e.color} p-6 flex items-center gap-4`}>
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Icon size={28} className={e.textDark ? 'text-gray-900' : 'text-white'} />
                  </div>
                  <h3 className={`font-serif font-bold text-2xl ${e.textDark ? 'text-gray-900' : 'text-white'}`}>{e.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">{e.desc}</p>
                  <ul className="space-y-2">
                    {e.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <Star size={14} className="text-yellow-500 flex-shrink-0 fill-yellow-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const awards = [
  { year: '2025', title: 'National Robotics Championship — 1st Place', body: 'National Education Technology Council' },
  { year: '2024', title: 'Best Primary School — Lagos State Education Awards', body: 'Lagos State Ministry of Education' },
  { year: '2024', title: 'Outstanding WAEC Results — School of Excellence', body: 'West African Examinations Council' },
  { year: '2023', title: 'Safest School Environment Award', body: 'Nigeria Schools Safety Alliance' },
  { year: '2022', title: 'ICT School of the Year', body: 'Federal Ministry of Education' },
]

function AwardsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="awards" ref={ref} className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="section-label">Recognition</span>
          <h2 className="section-title mt-2">Our Awards & Honours</h2>
        </motion.div>
        <div className="space-y-4">
          {awards.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.45 }} className="flex items-start gap-5 p-5 border border-gray-100 rounded-2xl hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${i % 3 === 0 ? 'bg-yellow-100 text-yellow-700' : i % 3 === 1 ? 'bg-primary-100 text-primary-700' : 'bg-green-100 text-green-700'}`}>
                <Trophy size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{a.year}</p>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-0.5">{a.title}</h3>
                <p className="text-gray-500 text-sm">{a.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LifePage() {
  return (
    <>
      <Helmet>
        <title>Life at Paradise | Paradise International Academy</title>
        <meta name="description" content="Discover sports, arts, clubs, excursions, awards and the vibrant everyday life at Paradise International Academy." />
      </Helmet>
      <PageHero />
      <ExtracurricularSection />
      <GalleryPreview />
      <AwardsSection />
      <AdmissionsCTA />
    </>
  )
}
