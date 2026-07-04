import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const highlights = [
  'Award-winning teaching faculty',
  'Modern ICT labs & digital classrooms',
  'Safe, gated & CCTV-monitored campus',
  'British & Nigerian dual curriculum',
  'Excellent WAEC & NECO results',
  'Vibrant extracurricular programmes',
]

export default function AboutPreview() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section ref={ref} className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-primary-100">
              <img
                src="/images/about-main.jpg"
                alt="Paradise International Academy campus"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Yellow accent card */}
              <div className="absolute bottom-6 right-6 bg-yellow-500 text-gray-900 rounded-2xl px-5 py-4 shadow-lg">
                <p className="font-serif font-bold text-3xl leading-none">20+</p>
                <p className="text-sm font-medium mt-0.5">Years of Excellence</p>
              </div>
            </div>

            {/* Floating inset image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -top-6 -left-6 w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl hidden md:block bg-green-100"
            >
              <img
                src="/images/about-inset.jpg"
                alt="Students in class"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Decorative dots */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 hidden md:grid grid-cols-4 gap-1.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary-200" />
              ))}
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="section-label">Our School — Est. 2005</span>
            <h2 className="section-title mt-2 mb-5">
              A Garden Where<br />
              <span className="text-gradient">Minds Grow & Flourish</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded on the conviction that excellent education and strong character belong together,
              Paradise International Academy has spent over two decades shaping confident, compassionate
              Nigerian leaders ready to excel on the global stage.
            </p>
            <p className="text-gray-600 leading-relaxed mb-7">
              Our classrooms blend the structure of the British curriculum with the cultural rootedness
              of the Nigerian system — producing graduates who are at home in Lagos, London, or anywhere
              their calling leads.
            </p>

            {/* Highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 size={17} className="text-green-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">
                Read Our Full Story <ArrowRight size={16} />
              </Link>
              <Link to="/about#leadership" className="btn-outline">
                Meet Our Leadership
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
