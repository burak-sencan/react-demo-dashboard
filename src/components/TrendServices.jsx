import { useContext, useEffect, useState } from 'react'
import ServiceContext from '../context/serviceContext'
import { worker } from '../assets'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import './TrendSwiper.css'

import { Navigation } from 'swiper'
import { Divider } from '@mui/material'
import Loading from '../pages/dashboard/utils/Loading'

const TrendServices = ({ title, url }) => {
  const { services } = useContext(ServiceContext)
  const [data, setData] = useState([])

  useEffect(() => {
    setData(services.slice(0, 8))
  }, [services])

  if (services.length === 0) return <Loading />

  return (
    <div className=" h-[32rem] bg-light-50 p-8 dark:bg-dark-800 ">
      <div className="p-4">
        <p className="text-2xl  dark:text-light-50">Trend Hizmetler</p>
        <Divider />
      </div>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 30 },
          480: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1368: { slidesPerView: 5, spaceBetween: 30 },
        }}
        // centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Navigation]}
      >
        {data.map((item) => (
          <SwiperSlide
            key={item.id}
            onClick={() => {
              console.log(item.id)
            }}
          >
            <div
              className="flex h-full w-full flex-col justify-between bg-cover bg-no-repeat"
              style={{ backgroundImage: 'url(' + worker + ')' }}
            >
              <div className="bg-white/20 p-4 text-lg backdrop-blur">
                <p>{item.name}</p>
              </div>
              <div className=" flex w-full items-center">
                <Link
                  to="#"
                  className=" bl w-full bg-lime-600/80 p-4 px-4 text-center text-white backdrop-blur  transition hover:bg-lime-600 hover:text-white hover:backdrop-blur-none"
                >
                  Teklif Al
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TrendServices
