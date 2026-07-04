import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, BookOpen, CreditCard, CalendarDays, Bell, LogOut, FileText, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users,           label: 'My Children' },
  { icon: BookOpen,        label: 'Results' },
  { icon: CreditCard,      label: 'Fee Payment' },
  { icon: CalendarDays,    label: 'Calendar' },
  { icon: Bell,            label: 'Notices' },
  { icon: FileText,        label: 'Downloads' },
]

const children = [
  { name: 'Emeka Okonkwo',  class: 'Primary 4A', id: 'PIA2021/0045' },
  { name: 'Ada Okonkwo',    class: 'Nursery 2B', id: 'PIA2023/0112' },
]

const notices = [
  { title: 'Mid-Term Examination — 10 October 2025',   date: 'Sep 25, 2025', priority: 'HIGH' },
  { title: 'School Sports Day — 24 October 2025',       date: 'Oct 1, 2025',  priority: 'MEDIUM' },
  { title: 'PTA Meeting — Saturday 12 October 9:00 am', date: 'Oct 3, 2025',  priority: 'HIGH' },
]

export default function ParentPortalPage() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('pia_token')
    localStorage.removeItem('pia_user')
    toast.success('Signed out')
    navigate('/login?role=parent')
  }

  return (
    <>
      <Helmet><title>Parent Portal | Paradise International Academy</title></Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Top nav */}
        <header className="bg-primary-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center">
                <GraduationCap size={18} className="text-primary-900" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm leading-tight">Paradise International Academy</p>
                <p className="text-yellow-300 text-xs">Parent Portal</p>
              </div>
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
          {/* Sub nav */}
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-hide py-1.5">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.label} className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/15 hover:text-white transition-colors">
                    <Icon size={14} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-1">Good morning, Mrs. Okonkwo 👋</h1>
            <p className="text-gray-500 text-sm mb-8">Here's a summary of your children's progress at Paradise International Academy.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* My Children */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="font-serif font-bold text-xl text-gray-900">My Children</h2>
              {children.map((child, i) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-card p-6"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${i === 0 ? 'bg-primary-600' : 'bg-green-600'}`}>
                      {child.name[0]}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-gray-900 text-lg">{child.name}</h3>
                      <p className="text-gray-500 text-sm">{child.class} · ID: {child.id}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { label: 'Attendance', value: '94%',  color: 'text-green-600' },
                      { label: 'Average Grade', value: 'B+', color: 'text-primary-600' },
                      { label: 'Fees Balance', value: '₦0',  color: 'text-gray-900' },
                    ].map((s) => (
                      <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                        <p className={`font-bold text-2xl ${s.color}`}>{s.value}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 btn-primary text-sm py-2 justify-center">View Results</button>
                    <button className="flex-1 btn-secondary text-sm py-2 justify-center">Pay Fees</button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Upcoming notices */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h2 className="font-serif font-bold text-lg text-gray-900 mb-4">School Notices</h2>
                <ul className="space-y-3">
                  {notices.map((n) => (
                    <li key={n.title} className="border-l-4 border-primary-300 pl-3">
                      <p className="text-sm font-medium text-gray-800 leading-snug">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.date}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick pay */}
              <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-6 text-white">
                <CreditCard size={28} className="text-yellow-400 mb-3" />
                <h3 className="font-serif font-bold text-lg mb-1">Fees Payment</h3>
                <p className="text-gray-200 text-sm mb-4">All fees up to date. Next term fee due 1 Sep 2026.</p>
                <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2.5 rounded-xl transition-colors text-sm">
                  Pay Next Term Fees
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
