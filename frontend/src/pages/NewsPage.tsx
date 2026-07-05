import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'

function PageHero() {
  return (
    <div className="relative bg-primary-700 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero-stripe opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-white to-green-500" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">News & Blog</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-gray-200 text-xl max-w-2xl mx-auto">
          Stories, achievements, and updates from the Paradise International Academy (Creche and Schools) community.
        </motion.p>
      </div>
    </div>
  )
}

const categories = ['All', 'Academics', 'Sports', 'STEM', 'Events', 'Alumni', 'Community']

const articles = [
  { id: 1, slug: 'waec-results-2025', category: 'Academics', title: 'Outstanding WAEC Results: 98% Pass Rate', excerpt: 'Our Class of 2025 achieved a 98% WAEC pass rate with 72 students earning distinctions across all subjects — our best result in 20 years.', date: 'July 1, 2025', image: '/images/news-1.jpg', author: 'Academic Affairs', readTime: '3 min' },
  { id: 2, slug: 'sports-day-2025', category: 'Sports', title: 'Inter-House Sports Day 2025: A Day of Champions', excerpt: 'Students from all four houses competed fiercely in track, field, and swimming events in a thrilling celebration of athletic excellence.', date: 'June 20, 2025', image: '/images/news-2.jpg', author: 'Sports Department', readTime: '4 min' },
  { id: 3, slug: 'robotics-award', category: 'STEM', title: 'Robotics Team Wins National Innovation Award', excerpt: 'Our Year 9 robotics team took first place at the National Schools Robotics Championship, beating 240 schools from across Nigeria.', date: 'May 15, 2025', image: '/images/news-3.jpg', author: 'ICT Department', readTime: '5 min' },
  { id: 4, slug: 'alumni-spotlight', category: 'Alumni', title: 'Alumni Spotlight: From Paradise to Oxford University', excerpt: 'We celebrate our 2019 alumnus, David Okafor, who was recently admitted to study Computer Science at Oxford University.', date: 'April 28, 2025', image: '/images/news-4.jpg', author: 'Communications', readTime: '6 min' },
  { id: 5, slug: 'community-service', category: 'Community', title: 'Students Lead Community Clean-Up Drive', excerpt: 'Over 300 students and staff participated in a major neighbourhood clean-up initiative, planting trees and clearing drainage channels.', date: 'April 10, 2025', image: '/images/news-5.jpg', author: 'Social Committee', readTime: '3 min' },
  { id: 6, slug: 'pta-awards-night', category: 'Events', title: 'Annual PTA Awards Night Celebrates Excellence', excerpt: 'Parents and students came together to honour outstanding academic and character achievements at our most memorable awards night yet.', date: 'March 25, 2025', image: '/images/news-6.jpg', author: 'PTA', readTime: '4 min' },
]

const categoryColors: Record<string, string> = {
  Academics: 'bg-primary-100 text-primary-700',
  Sports:    'bg-green-100 text-green-700',
  STEM:      'bg-yellow-100 text-yellow-800',
  Events:    'bg-red-100 text-red-700',
  Alumni:    'bg-purple-100 text-purple-700',
  Community: 'bg-teal-100 text-teal-700',
}

export default function NewsPage() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <>
      <Helmet>
        <title>News &amp; Blog | Paradise International Academy (Creche and Schools)</title>
        <meta name="description" content="Latest news, events, and stories from Paradise International Academy (Creche and Schools)." />
      </Helmet>
      <PageHero />
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c, i) => (
              <button key={c} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Featured article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8 mb-14 bg-gray-50 rounded-3xl overflow-hidden shadow-card"
          >
            <div className="aspect-video md:aspect-auto bg-gray-200 overflow-hidden">
              <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className={`badge mb-3 self-start ${categoryColors[articles[0].category] ?? ''}`}>{articles[0].category}</span>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 mb-3 leading-snug">{articles[0].title}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{articles[0].excerpt}</p>
              <div className="flex items-center gap-3 text-gray-400 text-xs mb-5">
                <Calendar size={13} /><span>{articles[0].date}</span>
                <span>·</span><span>{articles[0].readTime} read</span>
              </div>
              <Link to={`/news/${articles[0].slug}`} className="btn-primary self-start">
                Read Article <ArrowRight size={15} />
              </Link>
            </div>
          </motion.article>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.slice(1).map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="card overflow-hidden group"
              >
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge text-xs ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-600'}`}>{article.category}</span>
                    <span className="text-gray-400 text-xs">{article.readTime} read</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-gray-900 mb-2 leading-snug group-hover:text-primary-600 transition-colors">{article.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{article.date}</span>
                    <Link to={`/news/${article.slug}`} className="text-sm font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1">
                      Read <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
