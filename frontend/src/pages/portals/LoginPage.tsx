import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GraduationCap, Eye, EyeOff, Shield } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import api from '@/lib/api'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

const roleLabels: Record<string, { title: string; color: string; bg: string }> = {
  student: { title: 'Student Portal',    color: 'text-green-700', bg: 'bg-green-600' },
  parent:  { title: 'Parent Portal',     color: 'text-primary-700', bg: 'bg-primary-600' },
  admin:   { title: 'Staff / Admin Login', color: 'text-yellow-700', bg: 'bg-yellow-500' },
}

export default function LoginPage() {
  const [params]       = useSearchParams()
  const role           = params.get('role') ?? 'student'
  const roleInfo       = roleLabels[role] ?? roleLabels.student
  const navigate       = useNavigate()
  const [showPw, setShowPw] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      const { data: { token, firstName, lastName, role: userRole } } = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      })
      localStorage.setItem('pia_token', token)
      localStorage.setItem('pia_user', JSON.stringify({ firstName, lastName, role: userRole }))
      toast.success(`Welcome back, ${firstName}!`)
      const r = (userRole ?? role).toLowerCase()
      if (r === 'admin') navigate('/admin')
      else if (r === 'parent') navigate('/portal/parent')
      else navigate('/portal/student')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Login failed. Please try again.')
    }
  }

  return (
    <>
      <Helmet><title>Login | Paradise International Academy (Creche and Schools)</title></Helmet>

      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left panel */}
        <div className="relative hidden lg:flex flex-col items-center justify-center p-12 bg-primary-700 overflow-hidden">
          <div className="absolute inset-0 bg-hero-stripe opacity-40" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
          <div className="relative z-10 text-center">
            <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
              <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="text-primary-900" size={28} />
              </div>
              <div className="text-left">
                <p className="font-serif font-bold text-white text-xl">Paradise International</p>
                <p className="text-yellow-300 text-xs font-semibold uppercase tracking-widest">Academy</p>
              </div>
            </Link>
            <h2 className="font-serif text-4xl font-bold text-white mb-4">
              Welcome Back!
            </h2>
            <p className="text-gray-200 text-lg max-w-sm mx-auto">
              Access your personalised portal to manage your school journey in one place.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Students',  count: '500+',  color: 'bg-yellow-500 text-gray-900' },
                { label: 'Parents',   count: '1,000+', color: 'bg-green-500 text-white' },
                { label: 'Staff',     count: '80+',   color: 'bg-white text-primary-800' },
              ].map((s) => (
                <div key={s.label} className={`${s.color} rounded-2xl p-4`}>
                  <p className="font-bold text-2xl">{s.count}</p>
                  <p className="text-xs font-medium mt-0.5 opacity-80">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <Link to="/" className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <p className="font-serif font-bold text-primary-700">Paradise International Academy</p>
            </Link>

            <div className={`inline-flex items-center gap-2 ${roleInfo.bg} text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6`}>
              <Shield size={13} />
              {roleInfo.title}
            </div>

            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-1">Sign In</h1>
            <p className="text-gray-500 text-sm mb-8">
              Enter your credentials to access your account.
            </p>

            {/* Role tabs */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-7 text-sm font-medium">
              {Object.entries(roleLabels).map(([key, val]) => (
                <Link
                  key={key}
                  to={`/login?role=${key}`}
                  className={`flex-1 text-center py-2.5 transition-colors ${
                    role === key
                      ? `${val.bg} text-white`
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {key === 'admin' ? 'Staff' : key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input {...register('email')} type="email" className="input-field" placeholder="your@email.com" autoComplete="email" />
                {errors.email && <p className="error-text">{errors.email.message}</p>}
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary-600 hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input
                    {...register('password')}
                    type={showPw ? 'text' : 'password'}
                    className="input-field pr-11"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing In…' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Need help?{' '}
              <Link to="/contact" className="text-primary-600 font-medium hover:underline">Contact the school office</Link>
            </p>
            <p className="mt-3 text-center text-sm text-gray-500">
              <Link to="/" className="text-gray-400 hover:text-gray-600">← Back to Website</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
