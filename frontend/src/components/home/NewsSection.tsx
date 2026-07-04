import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar } from 'lucide-react'

// Placeholder articles — replaced by API data in production
const articles = [
  {
    id: 1,
    slug: 'inter-house-sports-2025',
    category: 'Sports',
    title: 'Inter-House Sports Day 2025: A Day of Champions',
    excerpt:
      'Students from all four houses competed in track, field, and swimming events in a thrilling day that celebrated athletic excellence and school spirit.',
    date: 'June 20, 2025',
    image: '/images/news-1.jpg',
    author: 'Communications Office',
  },
  {
    id: 2,
    slug: 'waec-results-2025',
    category: 'Academics',
    title: 'Outstanding WAEC Results: 98% Pass Rate',
    excerpt:
      'We are proud to announce our Class of 2025 achieved a 98% WAEC pass rate with 72 students earning distinctions across all subjects.',
    date: 'July 1, 2025',
    image: '/images/news-2.jpg',
    author: 'Academic Affairs',
  },
  {
    id: 3,
    slug: 'robotics-national-award',
    category: 'STEM',
    title: 'Robotics Team Wins National Innovation Award',
    excerpt:
      'Our Year 9 robotics team took first place at the National Schools Robotics Championship, beating 240 other schools from across Nigeria.',
    date: 'May 15, 2025',
    image: '/images/news-3.jpg',
    author: 'ICT Department',
  },
]

const categoryColors: Record<string, string> = {
  Sports:   'bg-green-100 text-green-700',
  Academics: 'bg-primary-100 text-primary-700',
  STEM:     'bg-yellow-100 text-yellow-800',
  Events:   'bg-red-100 text-red-700',
}

export default function NewsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="section-label">From the Journal</span>
            <h2 className="section-title mt-2">Latest News & Events</h2>
            <p className="section-subtitle mt-2">
              A living record of campus life — achievements, announcements, and stories.
            </p>
          </div>
          <Link to="/news" className="btn-outline self-start md:self-auto whitespace-nowrap">
            All Articles <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-52 bg-gray-200 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {article.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Calendar size={13} />
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.author}</span>
                </div>
                <h3 className="font-serif font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                <Link
                  to={`/news/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
