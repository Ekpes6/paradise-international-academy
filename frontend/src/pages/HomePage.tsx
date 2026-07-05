import { Helmet } from 'react-helmet-async'
import HeroSlider from '@/components/home/HeroSlider'
import QuickPortals from '@/components/home/QuickPortals'
import AboutPreview from '@/components/home/AboutPreview'
import FacilitiesSection from '@/components/home/FacilitiesSection'
import AcademicLevels from '@/components/home/AcademicLevels'
import StatsSection from '@/components/home/StatsSection'
import NewsSection from '@/components/home/NewsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import GalleryPreview from '@/components/home/GalleryPreview'
import AdmissionsCTA from '@/components/home/AdmissionsCTA'
import Timeline from '@/components/home/Timeline'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Paradise International Academy (Creche and Schools) | Excellence in Education — Nigeria</title>
        <meta name="description" content="Paradise International Academy (Creche and Schools) is a premier Nigerian school offering world-class education from Crèche to Secondary. Apply for admission today." />
        <link rel="canonical" href="https://paradiseinternationalacademy.com.ng/" />
      </Helmet>

      <HeroSlider />
      <QuickPortals />
      <AboutPreview />
      <Timeline />
      <FacilitiesSection />
      <AcademicLevels />
      <StatsSection />
      <NewsSection />
      <TestimonialsSection />
      <GalleryPreview />
      <AdmissionsCTA />
    </>
  )
}
