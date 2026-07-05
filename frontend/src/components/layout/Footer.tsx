import { Link } from 'react-router-dom'
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const footerLinks = {
  'Our School': [
    { label: 'About Us',      path: '/about' },
    { label: 'History',       path: '/about#history' },
    { label: 'Vision & Mission', path: '/about#vision' },
    { label: 'Leadership',    path: '/about#leadership' },
    { label: 'Our Staff',     path: '/about#staff' },
    { label: 'News & Blog',   path: '/news' },
  ],
  Academics: [
    { label: 'Crèche',           path: '/academics#creche' },
    { label: 'Nursery',          path: '/academics#nursery' },
    { label: 'Primary',          path: '/academics#primary' },
    { label: 'Junior Secondary', path: '/academics#jss' },
    { label: 'Senior Secondary', path: '/academics#sss' },
    { label: 'Curriculum',       path: '/academics#curriculum' },
  ],
  'For Families': [
    { label: 'Admissions',     path: '/admissions' },
    { label: 'School Fees',    path: '/admissions#fees' },
    { label: 'Download Forms', path: '/admissions#forms' },
    { label: 'School Calendar', path: '/parents#calendar' },
    { label: 'Parent Portal',  path: '/portal/parent' },
    { label: 'Student Portal', path: '/portal/student' },
  ],
  'Life at Paradise': [
    { label: 'Gallery',    path: '/gallery' },
    { label: 'Events',     path: '/life#events' },
    { label: 'Sports',     path: '/life#sports' },
    { label: 'Clubs',      path: '/life#clubs' },
    { label: 'Awards',     path: '/life#awards' },
    { label: 'Contact Us', path: '/contact' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800)) // replace with real API call
      toast.success('Subscribed! You\'ll receive school updates.')
      setEmail('')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer>
      {/* ── Newsletter banner ─────────────────────────────────────────────── */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-serif text-2xl font-bold">Stay in the loop</h3>
            <p className="text-green-100 text-sm mt-1">Get term updates, events and school news delivered to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 md:w-72 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-5 py-3 rounded-lg transition-colors disabled:opacity-60"
            >
              <Send size={16} />
              {loading ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* ── Main footer ───────────────────────────────────────────────────── */}
      <div className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <GraduationCap className="text-primary-900" size={24} />
                </div>
                <div>
                  <p className="font-serif font-bold text-white text-lg leading-tight">Paradise International</p>
                  <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Academy (Creche &amp; Schools)</p>
                </div>
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Nurturing excellence, character, and leadership in every child —
                from Crèche to Secondary School — in a safe and stimulating environment.
              </p>

              {/* Contact details */}
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-gray-300">
                  <MapPin size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>44 Ekpo Abasi Street,<br />Calabar, Cross River State</span>
                </li>
                <li>
                  <a href="tel:+2348000000000" className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors">
                    <Phone size={16} className="text-yellow-400 flex-shrink-0" />
                    +234 800 000 0000
                  </a>
                </li>
                <li>
                  <a href="mailto:info@paradiseinternationalacademy.com.ng" className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors">
                    <Mail size={16} className="text-yellow-400 flex-shrink-0" />
                    info@paradiseinternationalacademy.com.ng
                  </a>
                </li>
              </ul>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {[
                  { Icon: Facebook,  href: '#', label: 'Facebook' },
                  { Icon: Twitter,   href: '#', label: 'Twitter' },
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Youtube,   href: '#', label: 'YouTube' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-500 flex items-center justify-center transition-colors group"
                  >
                    <Icon size={16} className="text-gray-300 group-hover:text-primary-900" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest mb-4">{section}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Paradise International Academy (Creche and Schools). All rights reserved.</p>
            <div className="flex gap-5">
              <Link to="/privacy"       className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms"         className="hover:text-yellow-400 transition-colors">Terms of Use</Link>
              <Link to="/safeguarding"  className="hover:text-yellow-400 transition-colors">Safeguarding</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
