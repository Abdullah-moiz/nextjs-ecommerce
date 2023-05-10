import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeaturedProduct from '@/components/FeaturedProduct'
import TopCategories from '@/components/TopCategories'


export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <TopCategories />
    <FeaturedProduct />
    <Footer />

    </>
  )
}
