import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  UserCheck, BookOpen, CreditCard, CalendarDays,
  Newspaper, GraduationCap, Laptop, Briefcase,
} from 'lucide-react'

const portals = [
  {
    icon: GraduationCap,
    label: 'Admission Centre',
    desc: 'Begin your child\'s journey.',
    href: '/admissions',
    color: 'bg-primary-600',
    hoverBg: 'hover:bg-primary-700',
  },
  {
    icon: UserCheck,
    label: 'Student Portal',
    desc: 'Results, timetables, attendance.',
    href: '/portal/student',
    color: 'bg-green-600',
    hoverBg: 'hover:bg-green-700',
  },
  {
    icon: Briefcase,
    label: 'Parent Portal',
    desc: 'Stay close to every milestone.',
    href: '/portal/parent',
    color: 'bg-primary-600',
    hoverBg: 'hover:bg-primary-700',
  },
  {
    icon: Laptop,
    label: 'Online Classes',
    desc: 'Live lessons, anywhere.',
    href: '/portal/student',
    color: 'bg-green-600',
    hoverBg: 'hover:bg-green-700',
  },
  {
    icon: CreditCard,
    label: 'Pay Fees',
    desc: 'Secure, instant payment.',
    href: '/portal/parent',
    color: 'bg-yellow-500',
    hoverBg: 'hover:bg-yellow-600',
    textColor: 'text-gray-900',
  },
  {
    icon: BookOpen,
    label: 'CBT Exams',
    desc: 'Computer-based assessments.',
    href: '/portal/student',
    color: 'bg-primary-600',
    hoverBg: 'hover:bg-primary-700',
  },
  {
    icon: Newspaper,
    label: 'News & Events',
    desc: 'Term highlights and updates.',
    href: '/news',
    color: 'bg-green-600',
    hoverBg: 'hover:bg-green-700',
  },
  {
    icon: CalendarDays,
    label: 'School Calendar',
    desc: 'Dates, exams, holidays.',
    href: '/parents#calendar',
    color: 'bg-yellow-500',
    hoverBg: 'hover:bg-yellow-600',
    textColor: 'text-gray-900',
  },
]

export default function QuickPortals() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-label">Quick Access</span>
          <h2 className="section-title mt-2">Everything Within Reach</h2>
          <p className="section-subtitle mx-auto mt-3">
            Eight gateways for parents, students, and staff — designed for the rhythms of school life.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {portals.map((portal, i) => {
            const Icon = portal.icon
            return (
              <motion.div
                key={portal.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <Link
                  to={portal.href}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl ${portal.color} ${portal.hoverBg} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon size={22} className={portal.textColor ?? 'text-white'} />
                  </div>
                  <p className={`font-semibold text-xs leading-tight ${portal.textColor ?? 'text-white'}`}>
                    {portal.label}
                  </p>
                  <p className={`text-xs mt-1 leading-tight ${portal.textColor ? 'text-gray-700' : 'text-white/75'}`}>
                    {portal.desc}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
