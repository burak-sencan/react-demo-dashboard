import {
  batchroomCabinet,
  carpetClean,
  houseClean,
  kitchenCabinet,
  movingCompany,
  paintHouse,
  plumber,
} from '../assets'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import './TrendSwiper.css'

import { Navigation } from 'swiper'
import { Divider } from '@mui/material'
// import Loading from '../components/Loading'

const trendServicesData = [
  {
    id: 191,
    name: 'Ev Temizliği',
    image: houseClean,
  },
  {
    id: 2,
    name: 'Ev Taşıma',
    image: movingCompany,
  },
  {
    id: 32,
    name: 'Boya Badana',
    image: paintHouse,
  },
  {
    id: 87,
    name: 'Halı Yıkama',
    image: carpetClean,
  },
  {
    id: 111,
    name: 'Mutfak Dolabı Yapımı',
    image: kitchenCabinet,
  },
  {
    id: 193,
    name: 'Su Tesisatçısı',
    image: plumber,
  },
  {
    id: 124,
    name: 'Banyo Dolabı Yapımı',
    image: batchroomCabinet,
  },
]

const TrendServices = ({ title, url }) => {
  // const { services } = useContext(ServiceContext)
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   setData(services.slice(0, 8))
  // }, [services])

  // if (services.length === 0) return <Loading />

  return (
    <div className=" h-[32rem] bg-light-50 p-8 dark:bg-dark-800 ">
      <div className="p-4">
        <p className="text-2xl  dark:text-light-50">Trend Hizmetler</p>
        <Divider className="!my-1 dark:border-white/40" />
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
        {trendServicesData.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="flex h-full w-full flex-col justify-between bg-cover bg-no-repeat"
              style={{ backgroundImage: 'url(' + item.image + ')' }}
            >
              <div className="bg-white/80 p-4 text-lg backdrop-blur">
                <p className="text-lg text-dark-900">{item.name}</p>
              </div>
              <div className=" flex w-full items-center">
                <Link
                  to={`/service/${item.id}`}
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
