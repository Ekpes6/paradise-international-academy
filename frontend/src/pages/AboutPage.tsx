import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2, Users, Star, Heart, Globe, Award } from 'lucide-react'
import AdmissionsCTA from '@/components/home/AdmissionsCTA'

// ── Page hero ─────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <div className="relative bg-primary-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-yellow-500 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
        >
          Est. 2005
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl font-bold text-white mb-4"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-200 text-xl max-w-2xl mx-auto"
        >
          Twenty years of nurturing excellence, shaping character, and raising leaders who make a difference.
        </motion.p>
      </div>
    </div>
  )
}

// ── History ───────────────────────────────────────────────────────────────────
function HistorySection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="history" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="section-label">Our History</span>
            <h2 className="section-title mt-2 mb-5">A Journey of Two Decades</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Paradise International Academy (Creche and Schools) was founded in 2005 by a group of passionate educators and community leaders
              who believed that Nigerian children deserved access to world-class education without leaving home.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Starting with just 50 students in a modest facility, the school grew rapidly through its commitment to
              academic rigour, character development, and holistic growth. Today, we serve over 500 students across
              Crèche, Nursery, Primary, and Secondary sections.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our graduates have gone on to attend leading universities in Nigeria, the United Kingdom, the United
              States, and Canada — a testament to the quality of education we provide.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-xl aspect-square bg-gray-100"
          >
            <img src="/images/about-history.jpg" alt="School history" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute bottom-6 left-6 bg-primary-600 text-white rounded-2xl px-5 py-4">
              <p className="font-serif font-bold text-3xl leading-none">2005</p>
              <p className="text-sm text-primary-100 mt-0.5">Year Founded</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Vision & Mission ──────────────────────────────────────────────────────────
function VisionMission() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="vision" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="section-label">Purpose</span>
          <h2 className="section-title mt-2">Vision & Mission</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Globe,
              title: 'Our Vision',
              color: 'bg-primary-600',
              body: 'To be Nigeria\'s most respected school — producing graduates of outstanding academic ability, strong moral character, and global competence who positively impact their communities and the world.',
            },
            {
              icon: Heart,
              title: 'Our Mission',
              color: 'bg-green-600',
              body: 'To provide exceptional, holistic education that nurtures intellectual curiosity, builds character, celebrates diversity, and equips every student with the knowledge, skills, and values to thrive in a rapidly changing world.',
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-5`}>
                  <Icon className="text-white" size={26} />
                </div>
                <h3 className="font-serif font-bold text-2xl text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Core Values ───────────────────────────────────────────────────────────────
const values = [
  { icon: Star,    title: 'Excellence',   desc: 'We pursue the highest standards in everything we do — academic, sporting, and personal.', color: 'text-yellow-500' },
  { icon: Heart,   title: 'Integrity',    desc: 'We act with honesty, transparency, and respect in all our relationships.', color: 'text-primary-600' },
  { icon: Users,   title: 'Community',    desc: 'We celebrate diversity and build a warm, inclusive school family.', color: 'text-green-600' },
  { icon: Award,   title: 'Leadership',   desc: 'We empower every student to discover and exercise their unique leadership gifts.', color: 'text-yellow-500' },
  { icon: Globe,   title: 'Innovation',   desc: 'We embrace creativity, technology, and forward-thinking to prepare students for tomorrow.', color: 'text-primary-600' },
  { icon: CheckCircle2, title: 'Discipline', desc: 'We cultivate self-discipline, responsibility, and respect for rules and authority.', color: 'text-green-600' },
]

function CoreValues() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  return (
    <section id="values" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="section-label">What We Stand For</span>
          <h2 className="section-title mt-2">Our Core Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={28} className={`${v.color} mb-4`} />
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Leadership ────────────────────────────────────────────────────────────────
const leadership = [
  { name: 'Prof. Emmanuel Okafor', role: 'Founder & Chairman', img: '/images/leader-1.jpg' },
  { name: 'Mrs. Ngozi Okafor',    role: 'Proprietress',         img: '/images/leader-2.jpg' },
  { name: 'Mr. Seun Adeyemi',     role: 'Principal',            img: '/images/leader-3.jpg' },
  { name: 'Mrs. Amaka Eze',       role: 'Vice Principal, Academics', img: '/images/leader-4.jpg' },
]

function LeadershipSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  return (
    <section id="leadership" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="section-label">Our Team</span>
          <h2 className="section-title mt-2">Leadership</h2>
          <p className="section-subtitle mx-auto mt-3">Meet the passionate educators who guide Paradise International Academy (Creche and Schools).</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {leadership.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="text-center group"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg group-hover:border-primary-300 transition-colors bg-gray-200">
                <img src={l.img} alt={l.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <h3 className="font-serif font-bold text-gray-900 text-lg">{l.name}</h3>
              <p className="text-green-600 text-sm font-medium mt-0.5">{l.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Paradise International Academy (Creche and Schools)</title>
        <meta name="description" content="Learn about Paradise International Academy (Creche and Schools)&#39;s history, vision, mission, core values, and leadership team." />
      </Helmet>
      <PageHero />
      <HistorySection />
      <VisionMission />
      <CoreValues />
      <LeadershipSection />
      <AdmissionsCTA />
    </>
  )
}
