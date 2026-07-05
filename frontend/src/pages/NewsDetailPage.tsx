import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

// In production, this data comes from the CMS API based on the slug
const article = {
  slug:     'waec-results-2025',
  category: 'Academics',
  title:    'Outstanding WAEC Results: 98% Pass Rate',
  date:     'July 1, 2025',
  author:   'Academic Affairs Department',
  readTime: '3 min',
  image:    '/images/news-1.jpg',
  content: `
    <p>We are incredibly proud to announce that our Class of 2025 has achieved a remarkable 98% pass rate in the West African Senior School Certificate Examination (WAEC) — our best result in 20 years of academic excellence.</p>

    <h2>Standout Achievements</h2>
    <p>Of our 72 graduating students, 68 passed in all subjects, and 45 students earned straight distinctions (A1 grades). Three students earned perfect scores across all eight subjects, a first in the history of Paradise International Academy (Creche and Schools).</p>

    <blockquote>"This result is a testament to the hard work of our students, the dedication of our teachers, and the unwavering support of parents who partner with us every day." — Mr. Seun Adeyemi, Principal</blockquote>

    <h2>Department Highlights</h2>
    <ul>
      <li>Mathematics: 100% A1 rate across all candidates</li>
      <li>English Language: 96% distinction rate</li>
      <li>Biology, Chemistry & Physics: Combined 94% excellence rate</li>
      <li>Economics: 3 students scored 100% — a national record</li>
    </ul>

    <p>Our examination preparation programme, which includes mock examinations, CBT practice sessions, and individual mentoring, continues to prove its effectiveness in delivering outstanding outcomes.</p>

    <h2>University Admissions</h2>
    <p>All 72 graduating students have received offers from Nigerian universities. Additionally, 8 students have secured admission to universities in the United Kingdom and Canada, including two students who will attend on full scholarships.</p>

    <p>We congratulate the Class of 2025 and look forward to celebrating their achievements at our annual Graduation Ceremony on 15 August 2025.</p>
  `,
}

export default function NewsDetailPage() {
  return (
    <>
      <Helmet>
        <title>{article.title} | Paradise International Academy (Creche and Schools)</title>
        <meta name="description" content={article.title} />
      </Helmet>

      <div className="bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 bg-gray-200 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-4xl mx-auto">
            <span className="badge bg-primary-600 text-white mb-3 inline-block">{article.category}</span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight">{article.title}</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Meta */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Calendar size={15} />
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.readTime} read</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100">
                <Share2 size={15} />
                Share
              </button>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-li:text-gray-600
              prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-primary-50 prose-blockquote:py-3 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to="/news" className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-800 transition-colors">
              <ArrowLeft size={18} />
              Back to News & Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
