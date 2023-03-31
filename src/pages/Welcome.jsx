import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { Helmet } from 'react-helmet'
import { useContext, useEffect } from 'react'
import TrendServices from '../components/TrendServices'
import ServiceContext from '../context/serviceContext'

const Welcome = () => {
  const { services } = useContext(ServiceContext)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="flex w-full flex-col bg-dark-800 dark:bg-dark-900">
      <div className="welcome-content">
        <Helmet>
          <title>Anasayfa | Ev Tadilat, Tesisat ve Mobilya Hizmetleri</title>
          <meta
            name="description"
            content="Ev tadilatı, tesisat işleri, mobilya tamiratı ve montajı gibi hizmetler için aradığınız tüm ustalar burada! Hizmetlerimiz hakkında daha fazla bilgi alın."
          />
        </Helmet>
        <Hero />
      </div>
      <div>{services !== [] && <TrendServices />}</div>

      <Footer />
    </div>
  )
}

export default Welcome
