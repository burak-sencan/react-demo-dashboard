import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'

const Welcome = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  
  return (
    <div className="flex w-full flex-col">
      <Helmet>
        <title>Anasayfa | Ev Tadilat, Tesisat ve Mobilya Hizmetleri</title>
        <meta
          name="description"
          content="Ev tadilatı, tesisat işleri, mobilya tamiratı ve montajı gibi hizmetler için aradığınız tüm ustalar burada! Hizmetlerimiz hakkında daha fazla bilgi alın."
        />
      </Helmet>
      <Hero />
      <Footer />
    </div>
  )
}

export default Welcome
