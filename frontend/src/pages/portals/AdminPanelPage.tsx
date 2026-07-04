import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, Users, FileText, CalendarDays, ImageIcon, Newspaper, Bell, CreditCard, Settings, LogOut, Menu, X, ChevronDown } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard',      path: '#dashboard' },
  { icon: FileText,        label: 'Admissions',     path: '#admissions',   badge: '12' },
  { icon: Users,           label: 'Students',       path: '#students' },
  { icon: CreditCard,      label: 'Fee Payments',   path: '#payments' },
  { icon: Newspaper,       label: 'News & Blog',    path: '#news' },
  { icon: ImageIcon,       label: 'Gallery',        path: '#gallery' },
  { icon: CalendarDays,    label: 'Events',         path: '#events' },
  { icon: Bell,            label: 'Announcements',  path: '#announcements' },
  { icon: Settings,        label: 'Settings',       path: '#settings' },
]

const stats = [
  { label: 'Total Students',    value: '512',  color: 'bg-primary-600', icon: Users },
  { label: 'Pending Admissions', value: '12',  color: 'bg-yellow-500',  icon: FileText, textDark: true },
  { label: 'Fees Collected',    value: '₦42M', color: 'bg-green-600',   icon: CreditCard },
  { label: 'News Articles',     value: '38',   color: 'bg-primary-800', icon: Newspaper },
]

const recentAdmissions = [
  { id: 1, name: 'Emeka Okonkwo',  level: 'Primary 4',   date: '2025-07-01', status: 'PENDING' },
  { id: 2, name: 'Fatima Musa',    level: 'JSS 1',        date: '2025-07-02', status: 'APPROVED' },
  { id: 3, name: 'Tolu Adeyemi',   level: 'Nursery 2',    date: '2025-07-03', status: 'PENDING' },
  { id: 4, name: 'Chisom Eze',     level: 'SSS 2',        date: '2025-07-03', status: 'REVIEWED' },
]

const statusColors: Record<string, string> = {
  PENDING:  'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REVIEWED: 'bg-primary-100 text-primary-800',
  REJECTED: 'bg-red-100 text-red-800',
}

export default function AdminPanelPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [active, setActive]           = useState('#dashboard')
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('pia_token')
    localStorage.removeItem('pia_user')
    toast.success('Logged out successfully')
    navigate('/login?role=admin')
  }

  return (
    <>
      <Helmet><title>Admin Panel | Paradise International Academy</title></Helmet>

      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-primary-900 flex flex-col flex-shrink-0 overflow-hidden"
            >
              {/* Logo */}
              <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
                <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-primary-900" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif font-bold text-white text-sm leading-tight truncate">Paradise Academy</p>
                  <p className="text-yellow-400 text-xs font-medium">Admin Panel</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  const isActive = active === item.path
                  return (
                    <button
                      key={item.path}
                      onClick={() => setActive(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive ? 'bg-white/15 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon size={17} className={isActive ? 'text-yellow-400' : ''} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-primary-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>

              {/* Logout */}
              <div className="p-3 border-t border-white/10">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-colors">
                  <LogOut size={17} />
                  Sign Out
                </button>
                <Link to="/" className="mt-1 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                  ← Back to Website
                </Link>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Main ─────────────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="font-serif font-bold text-gray-900 text-xl">
                {sidebarItems.find((i) => i.path === active)?.label ?? 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-600" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold">A</div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className={`${s.color} rounded-2xl p-5 shadow-sm`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className={`text-sm font-medium ${s.textDark ? 'text-gray-800' : 'text-white/80'}`}>{s.label}</p>
                      <Icon size={18} className={s.textDark ? 'text-gray-700' : 'text-white/70'} />
                    </div>
                    <p className={`font-serif font-bold text-3xl ${s.textDark ? 'text-gray-900' : 'text-white'}`}>{s.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent admissions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif font-bold text-xl text-gray-900">Recent Admissions</h2>
                <button className="text-sm text-primary-600 font-medium hover:underline">View All →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-100">
                      <th className="pb-3 font-semibold text-gray-500">Applicant</th>
                      <th className="pb-3 font-semibold text-gray-500">Level</th>
                      <th className="pb-3 font-semibold text-gray-500">Date</th>
                      <th className="pb-3 font-semibold text-gray-500">Status</th>
                      <th className="pb-3 font-semibold text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentAdmissions.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 font-medium text-gray-900">{a.name}</td>
                        <td className="py-3 text-gray-600">{a.level}</td>
                        <td className="py-3 text-gray-500">{a.date}</td>
                        <td className="py-3">
                          <span className={`badge ${statusColors[a.status]}`}>{a.status}</span>
                        </td>
                        <td className="py-3">
                          <button className="text-primary-600 hover:text-primary-800 font-medium">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CMS Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-serif font-bold text-xl text-gray-900 mb-5">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'New Article',     icon: Newspaper,  color: 'bg-primary-50 text-primary-700 hover:bg-primary-100' },
                  { label: 'Upload Photos',   icon: ImageIcon,  color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                  { label: 'Add Event',       icon: CalendarDays, color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
                  { label: 'Send Notice',     icon: Bell,       color: 'bg-primary-50 text-primary-700 hover:bg-primary-100' },
                  { label: 'Add Student',     icon: Users,      color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                  { label: 'Record Payment',  icon: CreditCard, color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
                ].map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.label}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl text-xs font-medium transition-colors ${action.color}`}
                    >
                      <Icon size={20} />
                      {action.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
