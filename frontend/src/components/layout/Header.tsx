import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Mail, GraduationCap } from 'lucide-react'

const navItems = [
  { label: 'Home',       path: '/' },
  {
    label: 'About',      path: '/about',
    children: [
      { label: 'Our History',  path: '/about#history' },
      { label: 'Vision & Mission', path: '/about#vision' },
      { label: 'Core Values',  path: '/about#values' },
      { label: 'Leadership',   path: '/about#leadership' },
      { label: 'Our Staff',    path: '/about#staff' },
    ],
  },
  {
    label: 'Academics',  path: '/academics',
    children: [
      { label: 'Crèche',          path: '/academics#creche' },
      { label: 'Nursery',         path: '/academics#nursery' },
      { label: 'Primary',         path: '/academics#primary' },
      { label: 'Junior Secondary', path: '/academics#jss' },
      { label: 'Senior Secondary', path: '/academics#sss' },
      { label: 'Curriculum',      path: '/academics#curriculum' },
      { label: 'Extracurricular', path: '/academics#extracurricular' },
    ],
  },
  {
    label: 'Admissions', path: '/admissions',
    children: [
      { label: 'Admission Process', path: '/admissions#process' },
      { label: 'Requirements',      path: '/admissions#requirements' },
      { label: 'School Fees',       path: '/admissions#fees' },
      { label: 'Download Forms',    path: '/admissions#forms' },
      { label: 'Apply Online',      path: '/admissions#apply' },
    ],
  },
  {
    label: 'Life at Paradise', path: '/life',
    children: [
      { label: 'Gallery',    path: '/life#gallery' },
      { label: 'Events',     path: '/life#events' },
      { label: 'Sports',     path: '/life#sports' },
      { label: 'Clubs',      path: '/life#clubs' },
      { label: 'Excursions', path: '/life#excursions' },
      { label: 'Awards',     path: '/life#awards' },
    ],
  },
  {
    label: 'Parents',    path: '/parents',
    children: [
      { label: 'School Calendar', path: '/parents#calendar' },
      { label: 'Uniform Guide',   path: '/parents#uniform' },
      { label: 'Downloads',       path: '/parents#downloads' },
      { label: 'Parent Portal',   path: '/portal/parent' },
      { label: 'FAQs',            path: '/parents#faqs' },
    ],
  },
  { label: 'News & Blog', path: '/news' },
  { label: 'Contact',    path: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setOpenDropdown(null) }, [location.pathname])

  return (
    <header className="relative z-50">
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div className="bg-primary-700 text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+2348000000000" className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
              <Phone size={14} />
              <span>+234 800 000 0000</span>
            </a>
            <a href="mailto:info@paradiseinternationalacademy.com.ng" className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
              <Mail size={14} />
              <span>info@paradiseinternationalacademy.com.ng</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login?role=student" className="hover:text-yellow-400 transition-colors">Student Portal</Link>
            <span className="text-red-300">|</span>
            <Link to="/login?role=parent" className="hover:text-yellow-400 transition-colors">Parent Portal</Link>
            <span className="text-red-300">|</span>
            <Link to="/login?role=admin" className="hover:text-yellow-400 transition-colors">Staff Login</Link>
          </div>
        </div>
      </div>

      {/* ── Main nav ────────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-nav border-b-2 border-primary-600'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        {/* Coloured accent strip */}
        <div className="h-1 bg-gradient-to-r from-primary-600 via-yellow-500 to-green-600" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-md group-hover:bg-primary-700 transition-colors">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <p className="font-serif font-bold text-primary-700 leading-tight text-lg">
                  Paradise International
                </p>
                <p className="text-green-600 text-xs font-semibold uppercase tracking-widest">Academy (Creche &amp; Schools)</p>
              </div>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-0.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </NavLink>

                  {/* Dropdown */}
                  {item.children && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.ul
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                        >
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                to={child.path}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>

            {/* Apply CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                to="/admissions#apply"
                className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5"
              >
                Apply Now
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile menu ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Link to={item.path} className="flex-1 text-left">{item.label}</Link>
                      {item.children && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                    {item.children && openDropdown === item.label && (
                      <div className="ml-4 border-l-2 border-primary-100 pl-3 space-y-1 pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.path}
                            className="block py-2 px-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-3 pb-2 border-t border-gray-100 flex flex-col gap-2">
                  <Link to="/admissions#apply" className="btn-primary text-center justify-center">Apply Now</Link>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <Link to="/login?role=student" className="text-primary-600 font-medium">Student Portal</Link>
                    <span>·</span>
                    <Link to="/login?role=parent" className="text-primary-600 font-medium">Parent Portal</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
