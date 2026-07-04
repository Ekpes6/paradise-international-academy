import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FileDown, CheckCircle2 } from 'lucide-react'
import type { AdmissionApplication } from '@/types'
import api from '@/lib/api'

const schema = z.object({
  applicantFirstName:  z.string().min(2, 'Required'),
  applicantLastName:   z.string().min(2, 'Required'),
  dateOfBirth:         z.string().min(1, 'Required'),
  gender:              z.enum(['MALE', 'FEMALE']),
  academicLevel:       z.enum(['CRECHE', 'NURSERY', 'PRIMARY', 'JSS', 'SSS']),
  parentFirstName:     z.string().min(2, 'Required'),
  parentLastName:      z.string().min(2, 'Required'),
  parentPhone:         z.string().min(10, 'Enter a valid phone number'),
  parentEmail:         z.string().email('Enter a valid email'),
  parentRelationship:  z.string().min(2, 'Required'),
  address:             z.string().min(10, 'Enter your full address'),
  previousSchool:      z.string().optional(),
  howDidYouHear:       z.string().optional(),
  termsAccepted:       z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
})

type FormData = z.infer<typeof schema>

function PageHero() {
  return (
    <div className="relative bg-primary-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
          Admissions
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-gray-200 text-xl max-w-2xl mx-auto">
          Begin your child's journey to excellence at Paradise International Academy.
        </motion.p>
      </div>
    </div>
  )
}

const steps = [
  { step: '01', title: 'Submit Application',  desc: 'Complete the online application form with your child\'s and parent\'s details.' },
  { step: '02', title: 'Schedule Assessment', desc: 'Our team will contact you to schedule an entrance assessment and campus visit.' },
  { step: '03', title: 'Receive Decision',    desc: 'You\'ll receive an admission decision within 5 working days of the assessment.' },
  { step: '04', title: 'Pay & Enrol',         desc: 'Pay the acceptance fee and complete enrolment documentation online or in person.' },
]

function ProcessSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="process" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="section-label">How It Works</span>
          <h2 className="section-title mt-2">Admission Process</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.45 }} className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg ${
                i % 3 === 0 ? 'bg-primary-600 text-white' : i % 3 === 1 ? 'bg-green-600 text-white' : i % 3 === 2 ? 'bg-yellow-500 text-gray-900' : 'bg-primary-600 text-white'
              }`}>
                {s.step}
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Fees table
const fees = [
  { level: 'Crèche',           tuition: '₦450,000', dev: '₦50,000',  total: '₦500,000' },
  { level: 'Nursery',          tuition: '₦420,000', dev: '₦50,000',  total: '₦470,000' },
  { level: 'Primary (1–3)',    tuition: '₦480,000', dev: '₦60,000',  total: '₦540,000' },
  { level: 'Primary (4–6)',    tuition: '₦500,000', dev: '₦60,000',  total: '₦560,000' },
  { level: 'JSS (1–3)',        tuition: '₦550,000', dev: '₦75,000',  total: '₦625,000' },
  { level: 'SSS (1–3)',        tuition: '₦600,000', dev: '₦100,000', total: '₦700,000' },
]

function FeesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section id="fees" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label">School Fees</span>
          <h2 className="section-title mt-2">2025/2026 Fee Schedule</h2>
          <p className="text-gray-600 mt-3 text-sm">Fees are per term. All amounts in Nigerian Naira (₦).</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.5 }} className="overflow-hidden rounded-2xl shadow-card bg-white">
          <table className="w-full text-sm">
            <thead className="bg-primary-600 text-white">
              <tr>
                <th className="text-left px-5 py-4 font-semibold">Academic Level</th>
                <th className="text-right px-5 py-4 font-semibold">Tuition</th>
                <th className="text-right px-5 py-4 font-semibold">Development Levy</th>
                <th className="text-right px-5 py-4 font-bold">Total / Term</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f, i) => (
                <tr key={f.level} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-5 py-4 font-medium text-gray-900">{f.level}</td>
                  <td className="px-5 py-4 text-right text-gray-700">{f.tuition}</td>
                  <td className="px-5 py-4 text-right text-gray-700">{f.dev}</td>
                  <td className="px-5 py-4 text-right font-bold text-primary-700">{f.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        <p className="text-gray-500 text-xs mt-4 text-center">* Fees are subject to annual review. Contact us for scholarship information.</p>
      </div>
    </section>
  )
}

// Downloads
function DownloadsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const docs = [
    { name: 'School Prospectus',      file: '/downloads/prospectus.pdf' },
    { name: 'Admission Form',         file: '/downloads/admission-form.pdf' },
    { name: 'Medical Form',           file: '/downloads/medical-form.pdf' },
    { name: 'Fee Schedule 2025/2026', file: '/downloads/fee-schedule.pdf' },
  ]
  return (
    <section id="forms" ref={ref} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label">Resources</span>
          <h2 className="section-title mt-2">Download Forms</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {docs.map((d, i) => (
            <motion.a
              key={d.name}
              href={d.file}
              download
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-4 p-5 border-2 border-dashed border-gray-200 hover:border-primary-400 rounded-2xl group hover:bg-primary-50 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center flex-shrink-0 transition-colors">
                <FileDown size={22} className="text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">{d.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">PDF Document</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Online application form
function ApplicationForm() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      await api.post('/admissions/apply', data)
      setSubmitted(true)
      toast.success('Application submitted successfully!')
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="apply" ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label">Online Application</span>
          <h2 className="section-title mt-2">Apply for Admission</h2>
          <p className="section-subtitle mx-auto mt-3">Complete the form below. We'll be in touch within 48 hours.</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center">
            <CheckCircle2 size={56} className="text-green-500 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-2">Application Received!</h3>
            <p className="text-gray-600">Thank you for applying to Paradise International Academy. Our admissions team will contact you within 48 hours to arrange the next steps.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl shadow-card p-8 space-y-6"
            noValidate
          >
            {/* Child details */}
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-4 pb-2 border-b border-gray-100">Child's Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                  <input {...register('applicantFirstName')} className="input-field" placeholder="First name" />
                  {errors.applicantFirstName && <p className="error-text">{errors.applicantFirstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                  <input {...register('applicantLastName')} className="input-field" placeholder="Last name" />
                  {errors.applicantLastName && <p className="error-text">{errors.applicantLastName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth *</label>
                  <input {...register('dateOfBirth')} type="date" className="input-field" />
                  {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender *</label>
                  <select {...register('gender')} className="input-field">
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                  {errors.gender && <p className="error-text">{errors.gender.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Applying for *</label>
                  <select {...register('academicLevel')} className="input-field">
                    <option value="">Select level</option>
                    <option value="CRECHE">Crèche (Ages 0–2)</option>
                    <option value="NURSERY">Nursery (Ages 3–5)</option>
                    <option value="PRIMARY">Primary (Ages 6–11)</option>
                    <option value="JSS">Junior Secondary (JSS 1–3)</option>
                    <option value="SSS">Senior Secondary (SSS 1–3)</option>
                  </select>
                  {errors.academicLevel && <p className="error-text">{errors.academicLevel.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous School</label>
                  <input {...register('previousSchool')} className="input-field" placeholder="Previous school (optional)" />
                </div>
              </div>
            </div>

            {/* Parent details */}
            <div>
              <h3 className="font-serif font-bold text-xl text-gray-900 mb-4 pb-2 border-b border-gray-100">Parent / Guardian Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
                  <input {...register('parentFirstName')} className="input-field" placeholder="First name" />
                  {errors.parentFirstName && <p className="error-text">{errors.parentFirstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
                  <input {...register('parentLastName')} className="input-field" placeholder="Last name" />
                  {errors.parentLastName && <p className="error-text">{errors.parentLastName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                  <input {...register('parentPhone')} type="tel" className="input-field" placeholder="+234 800 000 0000" />
                  {errors.parentPhone && <p className="error-text">{errors.parentPhone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input {...register('parentEmail')} type="email" className="input-field" placeholder="your@email.com" />
                  {errors.parentEmail && <p className="error-text">{errors.parentEmail.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Relationship to Child *</label>
                  <select {...register('parentRelationship')} className="input-field">
                    <option value="">Select relationship</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.parentRelationship && <p className="error-text">{errors.parentRelationship.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">How did you hear about us?</label>
                  <select {...register('howDidYouHear')} className="input-field">
                    <option value="">Select (optional)</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend/Family">Friend or Family</option>
                    <option value="Google">Google Search</option>
                    <option value="Newspaper">Newspaper</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Home Address *</label>
                <textarea {...register('address')} rows={3} className="input-field resize-none" placeholder="Full home address" />
                {errors.address && <p className="error-text">{errors.address.message}</p>}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input {...register('termsAccepted')} type="checkbox" id="terms" className="mt-1 w-4 h-4 accent-primary-600" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I confirm that the information provided is accurate and I agree to the{' '}
                <a href="/terms" className="text-primary-600 underline">Terms & Conditions</a> and{' '}
                <a href="/privacy" className="text-primary-600 underline">Privacy Policy</a>. *
              </label>
            </div>
            {errors.termsAccepted && <p className="error-text">{errors.termsAccepted.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary justify-center text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting Application…' : 'Submit Application'}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  )
}

export default function AdmissionsPage() {
  return (
    <>
      <Helmet>
        <title>Admissions | Paradise International Academy</title>
        <meta name="description" content="Apply for admission to Paradise International Academy. Learn about our process, requirements, fees, and download forms." />
      </Helmet>
      <PageHero />
      <ProcessSection />
      <FeesSection />
      <DownloadsSection />
      <ApplicationForm />
    </>
  )
}
