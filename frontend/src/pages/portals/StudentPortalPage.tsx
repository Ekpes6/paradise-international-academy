import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, BookOpen, CalendarDays, Bell, LogOut, BarChart3, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const subjects = [
  { name: 'Mathematics',   score: 87, grade: 'A', teacher: 'Mr. Adeyemi' },
  { name: 'English',       score: 92, grade: 'A', teacher: 'Mrs. Eze' },
  { name: 'Basic Science', score: 78, grade: 'B+', teacher: 'Mr. Bello' },
  { name: 'Social Studies',score: 81, grade: 'A-', teacher: 'Mrs. Okonkwo' },
  { name: 'French',        score: 74, grade: 'B', teacher: 'Mr. Chukwu' },
  { name: 'ICT',           score: 95, grade: 'A+', teacher: 'Ms. Fatima' },
]

const timetable = [
  { day: 'Mon', periods: ['Maths', 'English', 'Science', 'French', 'ICT', 'PE'] },
  { day: 'Tue', periods: ['English', 'Maths', 'Social Studies', 'Arts', 'Music', 'Library'] },
  { day: 'Wed', periods: ['Science', 'Maths', 'English', 'ICT', 'French', 'Sports'] },
]

function gradeColor(grade: string) {
  if (grade.startsWith('A')) return 'text-green-600'
  if (grade.startsWith('B')) return 'text-primary-600'
  return 'text-yellow-600'
}

export default function StudentPortalPage() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('pia_token')
    localStorage.removeItem('pia_user')
    toast.success('Signed out')
    navigate('/login?role=student')
  }

  return (
    <>
      <Helmet><title>Student Portal | Paradise International Academy</title></Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center">
                <GraduationCap size={18} className="text-gray-900" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm leading-tight">Paradise International Academy</p>
                <p className="text-green-200 text-xs">Student Portal</p>
              </div>
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-hide py-1.5">
              {[
                { icon: LayoutDashboard, label: 'Dashboard' },
                { icon: BookOpen, label: 'Results' },
                { icon: CalendarDays, label: 'Timetable' },
                { icon: Clock, label: 'Attendance' },
                { icon: BarChart3, label: 'Progress' },
                { icon: Bell, label: 'Notices' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/15 hover:text-white transition-colors">
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-1">Hello, Emeka! 🎓</h1>
            <p className="text-gray-500 text-sm mb-8">Class: Primary 4A · ID: PIA2021/0045 · Term 3, 2025</p>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
            {[
              { label: 'Attendance',     value: '94%',  bg: 'bg-green-600' },
              { label: 'Class Position', value: '3rd',  bg: 'bg-primary-600' },
              { label: 'Average Score',  value: '84%',  bg: 'bg-yellow-500 text-gray-900', textDark: true },
              { label: 'Subjects',       value: '6',    bg: 'bg-primary-800' },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-5 text-center`}>
                <p className={`font-serif font-bold text-3xl ${s.textDark ? 'text-gray-900' : 'text-white'}`}>{s.value}</p>
                <p className={`text-xs mt-1 ${s.textDark ? 'text-gray-700' : 'text-white/80'}`}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Results table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-serif font-bold text-xl text-gray-900 mb-5">Term 3 Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-100">
                      <th className="pb-3 font-semibold text-gray-500">Subject</th>
                      <th className="pb-3 font-semibold text-gray-500">Teacher</th>
                      <th className="pb-3 text-right font-semibold text-gray-500">Score</th>
                      <th className="pb-3 text-right font-semibold text-gray-500">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {subjects.map((s) => (
                      <tr key={s.name} className="hover:bg-gray-50">
                        <td className="py-3 font-medium text-gray-900">{s.name}</td>
                        <td className="py-3 text-gray-500">{s.teacher}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-20 bg-gray-100 rounded-full h-2">
                              <div className="h-2 rounded-full bg-primary-500" style={{ width: `${s.score}%` }} />
                            </div>
                            <span className="text-gray-700 font-medium w-8">{s.score}</span>
                          </div>
                        </td>
                        <td className={`py-3 text-right font-bold text-lg ${gradeColor(s.grade)}`}>{s.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timetable */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-serif font-bold text-xl text-gray-900 mb-5">This Week's Classes</h2>
              <div className="space-y-4">
                {timetable.map((day) => (
                  <div key={day.day}>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{day.day}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {day.periods.map((p, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 font-medium">{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
