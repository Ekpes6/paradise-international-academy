import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { CalendarDays, FileDown, HelpCircle, Shirt } from 'lucide-react'
import { useState } from 'react'

function PageHero() {
  return (
    <div className="relative bg-primary-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">For Parents</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-gray-200 text-xl max-w-2xl mx-auto">Everything you need to support your child's journey at Paradise International Academy (Creche and Schools).</motion.p>
      </div>
    </div>
  )
}

// Calendar events
const calendarEvents = [
  { date: '14 Jul', title: 'Term 3 Begins',            category: 'Term', color: 'bg-primary-600' },
  { date: '25 Jul', title: 'Mid-Term Assessment',      category: 'Exam', color: 'bg-yellow-500 text-gray-900' },
  { date: '4 Aug',  title: 'Cultural Day Celebration', category: 'Event', color: 'bg-green-600' },
  { date: '20 Aug', title: 'End-of-Term Examinations', category: 'Exam', color: 'bg-yellow-500 text-gray-900' },
  { date: '29 Aug', title: 'PTA Meeting',              category: 'Meeting', color: 'bg-primary-800' },
  { date: '5 Sep',  title: 'Sports Day',               category: 'Sports', color: 'bg-green-600' },
  { date: '12 Sep', title: 'Graduation Ceremony',      category: 'Event', color: 'bg-primary-600' },
  { date: '19 Sep', title: 'Term 3 Ends',              category: 'Term', color: 'bg-primary-600' },
]

function CalendarSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="calendar" ref={ref} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label">School Calendar</span>
          <h2 className="section-title mt-2">Term 3 — 2025 Key Dates</h2>
          <p className="section-subtitle mx-auto mt-3">Stay informed and never miss an important school event.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calendarEvents.map((e, i) => (
            <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.4 }} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${e.color}`}>
                <CalendarDays size={14} className={e.color.includes('text-gray') ? 'text-gray-800 mb-0.5' : 'text-white mb-0.5'} />
                <p className={`text-xs font-bold leading-tight text-center ${e.color.includes('text-gray') ? 'text-gray-900' : 'text-white'}`}>{e.date}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{e.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{e.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <CalendarDays size={16} />
            Add to Google Calendar
          </a>
        </div>
      </div>
    </section>
  )
}

// Uniform guide
function UniformSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="uniform" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label">Dress Code</span>
          <h2 className="section-title mt-2">School Uniform Guide</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              section: 'Boys (Crèche — Primary)',
              items: ['White short-sleeved shirt with school crest', 'Khaki shorts', 'White socks and black school shoes', 'Red school tie (Tuesdays only)', 'School PE kit for sports days'],
            },
            {
              section: 'Girls (Crèche — Primary)',
              items: ['White blouse with school crest', 'Green and white checked pinafore', 'White socks and black school shoes', 'Green hair ribbons', 'School PE kit for sports days'],
            },
            {
              section: 'Boys (Secondary)',
              items: ['White long-sleeved shirt', 'Grey trousers', 'Green and gold striped school tie', 'Black leather shoes and dark socks', 'Navy blue school blazer'],
            },
            {
              section: 'Girls (Secondary)',
              items: ['White long-sleeved blouse', 'Grey skirt (below the knee)', 'Green and gold striped school tie', 'Black flat shoes and white socks', 'Navy blue school blazer'],
            },
          ].map((u, i) => (
            <motion.div key={u.section} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.4 }} className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Shirt size={18} className="text-primary-600" />
                </div>
                <h3 className="font-serif font-bold text-gray-900">{u.section}</h3>
              </div>
              <ul className="space-y-2">
                {u.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQs
const faqs = [
  { q: 'What are the school hours?', a: 'School opens at 7:30 am for morning assembly. Classes run from 8:00 am to 2:30 pm for primary, and 8:00 am to 3:00 pm for secondary. After-school clubs run until 4:30 pm.' },
  { q: 'Is there a school bus service?', a: 'Yes. We operate a school bus service covering major routes across Calabar. Contact the school office for routes and fees.' },
  { q: 'How often are parent-teacher meetings?', a: 'PTA meetings are held once per term. Individual parent-teacher conferences can be scheduled anytime through the Parent Portal.' },
  { q: 'How are fees paid?', a: 'Fees can be paid online via the Parent Portal using Paystack (card, transfer, USSD), or via bank transfer to our designated account. Receipts are issued automatically.' },
  { q: 'What is the school\'s policy on mobile phones?', a: 'Mobile phones are not permitted in classrooms. Students in SSS 2–3 may possess phones, which must be switched off and stored during school hours.' },
  { q: 'Does the school offer scholarships?', a: 'Yes. We offer merit-based and need-based scholarships. Applications open at the start of each academic year. Contact the admissions office for details.' },
]

function FAQSection() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faqs" ref={ref} className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label">FAQs</span>
          <h2 className="section-title mt-2">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06, duration: 0.4 }} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                <span className="font-semibold text-gray-900 flex items-center gap-3">
                  <HelpCircle size={18} className="text-primary-500 flex-shrink-0" />
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 font-bold text-sm transition-transform ${open === i ? 'rotate-45 border-primary-500 text-primary-600' : ''}`}>+</span>
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-5 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-3">Still have questions?</p>
          <Link to="/contact" className="btn-primary">Contact the School Office</Link>
        </div>
      </div>
    </section>
  )
}

// Downloads
function DownloadsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const docs = [
    { name: 'School Prospectus',         file: '/downloads/prospectus.pdf' },
    { name: 'Parent Handbook',           file: '/downloads/parent-handbook.pdf' },
    { name: 'Code of Conduct',           file: '/downloads/code-of-conduct.pdf' },
    { name: 'Fee Schedule 2025/2026',    file: '/downloads/fee-schedule.pdf' },
    { name: 'Term Dates Calendar',       file: '/downloads/term-dates.pdf' },
    { name: 'Uniform Buying Guide',      file: '/downloads/uniform-guide.pdf' },
  ]
  return (
    <section id="downloads" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label">Resources</span>
          <h2 className="section-title mt-2">Parent Downloads</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {docs.map((d, i) => (
            <motion.a key={d.name} href={d.file} download initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.35 }} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary-300 hover:shadow-card group transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <FileDown size={18} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900 group-hover:text-primary-700 transition-colors">{d.name}</p>
                <p className="text-xs text-gray-400">PDF</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ParentsPage() {
  return (
    <>
      <Helmet>
        <title>For Parents | Paradise International Academy (Creche and Schools)</title>
        <meta name="description" content="School calendar, uniform guide, FAQs, downloads, and parent portal access for Paradise International Academy (Creche and Schools) families." />
      </Helmet>
      <PageHero />
      <CalendarSection />
      <UniformSection />
      <DownloadsSection />
      <FAQSection />
    </>
  )
}
