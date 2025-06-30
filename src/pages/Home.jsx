import React from 'react'
import Hero from '../components/Hero'
import FeaturedCars from '../components/FeaturedCars'
import OwnerPromotion from '../components/OwnerPromotion'
import TestimonialsPage from '../components/TestimonialsPage'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Hero/>
    <FeaturedCars/>
    <OwnerPromotion/>
    <TestimonialsPage/>
    <Footer/>
    </>
  )
}

export default Home