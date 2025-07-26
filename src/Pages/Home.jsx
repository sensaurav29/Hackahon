import Footer from '@/components/SectionComponents/Footer'
import HeroSection from '@/components/SectionComponents/HeroSection'
import NewsletterSection from '@/components/SectionComponents/NewsLetterSection'
import ProductsSection from '@/components/SectionComponents/ProductsSection'
import TransitionTextSection from '@/components/SectionComponents/TransitionTextSection'
import React from 'react'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TransitionTextSection />
      <ProductsSection />
      <Footer />
      <NewsletterSection />
    </div>
  )
}

export default Home
