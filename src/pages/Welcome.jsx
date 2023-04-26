/*
Path: "/"
Component: <Welcome/>
Hero, tend hizmetler nasıl çalışır componentlerinin render edildiği  ana giriş ekranı. 
*/

import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'

import TrendServices from '../components/trendServices/TrendServices'
import {
  cleaning,
  decoration,
  renovation,
  sheathing,
  transportation,
  interiorArchitect,
  specialLesson,
} from '../components/trendServices/trendServicesData'
import HowWorks from './infoPages/HowWorks'

const Welcome = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="flex w-full flex-col bg-dark-800 dark:bg-dark-900">
      <div className="welcome-content">
        {/* html meta control with helmet library */}
        <Helmet>
          <title>Anasayfa | Ev Tadilat, Tesisat ve Mobilya Hizmetleri</title>
          <meta
            name="description"
            content="Ev tadilatı, tesisat işleri, mobilya tamiratı ve montajı gibi hizmetler için aradığınız tüm ustalar burada! Hizmetlerimiz hakkında daha fazla bilgi alın."
          />
        </Helmet>
        <Hero />
      </div>
      {/* <div>{services !== [] && <TrendServices />}</div> */}
      <TrendServices services={renovation} title="Trend Tadilat Hizmetleri" />
      <TrendServices
        services={transportation}
        title="Trend Nakliyat Hizmetleri"
      />
      <TrendServices services={cleaning} title="Trend Temizlik Hizmetleri" />
      <TrendServices services={sheathing} title="Trend Mantolama Hizmetleri" />
      <TrendServices
        services={decoration}
        title="Trend Dekorasyon Hizmetleri"
      />
      <TrendServices
        services={interiorArchitect}
        title="Trend İç Mimarlık Hizmetleri"
      />
      <TrendServices
        services={specialLesson}
        title="Trend Özel Ders Hizmetleri"
      />
      <HowWorks />
      <Footer />
    </div>
  )
}

export default Welcome
