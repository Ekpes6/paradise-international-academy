import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail, MessageCircle, Clock, CheckCircle2 } from 'lucide-react'
import api from '@/lib/api'

const schema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Enter a valid email'),
  phone:   z.string().min(10, 'Enter a valid phone'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(20, 'Please write at least 20 characters'),
})

type FormData = z.infer<typeof schema>

function PageHero() {
  return (
    <div className="relative bg-primary-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
          Contact Us
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-gray-200 text-xl max-w-2xl mx-auto">
          We'd love to hear from you. Reach out via any channel that works best for you.
        </motion.p>
      </div>
    </div>
  )
}

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    color: 'bg-primary-600',
    lines: ['44 Ekpo Abasi Street,', 'Calabar, Cross River State'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    color: 'bg-green-600',
    lines: ['+234 800 000 0000', '+234 800 000 0001'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    color: 'bg-yellow-500',
    lines: ['info@paradiseinternationalacademy.com.ng', 'admissions@paradiseinternationalacademy.com.ng'],
    textDark: true,
  },
  {
    icon: Clock,
    title: 'Office Hours',
    color: 'bg-primary-700',
    lines: ['Mon–Fri: 7:30 am – 4:30 pm', 'Sat: 9:00 am – 12:00 pm'],
  },
]

export default function ContactPage() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      await api.post('/notifications/contact', data)
      setSent(true)
      toast.success('Message sent! We\'ll respond within 24 hours.')
    } catch {
      toast.error('Failed to send. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Paradise International Academy (Creche and Schools)</title>
        <meta name="description" content="Get in touch with Paradise International Academy (Creche and Schools). We're here to answer your questions." />
      </Helmet>

      <PageHero />

      {/* Contact cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={24} className={c.textDark ? 'text-gray-900' : 'text-white'} />
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 text-xl mb-2">{c.title}</h3>
                  {c.lines.map((line) => (
                    <p key={line} className="text-gray-600 text-sm">{line}</p>
                  ))}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section ref={ref} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-6">Find Us on the Map</h2>
              <div className="rounded-3xl overflow-hidden shadow-card h-80 bg-gray-200">
                <iframe
                  title="Paradise International Academy (Creche and Schools) Location"
                  src="https://maps.google.com/maps?q=44+Ekpo+Abasi+Street,+Calabar,+Cross+River,+Nigeria&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2348000000000?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20Paradise%20International%20Academy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-2xl transition-colors w-full justify-center shadow-md"
              >
                <MessageCircle size={22} />
                Chat with Us on WhatsApp
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="section-title mb-6">Send Us a Message</h2>

              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center">
                  <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-card p-8 space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input {...register('name')} className="input-field" placeholder="Your full name" />
                      {errors.name && <p className="error-text">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input {...register('phone')} type="tel" className="input-field" placeholder="+234 800 000 0000" />
                      {errors.phone && <p className="error-text">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input {...register('email')} type="email" className="input-field" placeholder="your@email.com" />
                    {errors.email && <p className="error-text">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                    <input {...register('subject')} className="input-field" placeholder="What is your enquiry about?" />
                    {errors.subject && <p className="error-text">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea {...register('message')} rows={5} className="input-field resize-none" placeholder="Type your message here…" />
                    {errors.message && <p className="error-text">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full btn-primary justify-center py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
