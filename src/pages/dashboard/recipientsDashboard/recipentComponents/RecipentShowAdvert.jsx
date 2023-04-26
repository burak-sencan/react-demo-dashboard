/*
Path: "/advert/:id"
Component: <RecipentShowAdvert/>
Tıklanılan ilanın detay bilgilerinin gösterildiği ekran. ilanın detay bilgileri urldeki id parametresinin useParams hooku ile çekilip /recipients/opportunitie/${id} adresinden fetch edilmesi ile alınıyor. 
 */

import { useParams } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../../context/authContext'
import api from '../../../../context/api'
import Loading from '../../../../components/Loading'
import CircleIcon from '@mui/icons-material/Circle'
import { Divider } from '@mui/material'
import TopNav from '../../utils/TopNav'

const RecipentShowAdvert = () => {
  const { id } = useParams()
  const { token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.recipientsServiceRequest(token, id)
        setData(response.data.result)
        setIsLoading(false)
      } catch (error) {
        console.error('Hata: ', error)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div>
        <TopNav url="/recipentDashboard/advert" text="Verilen İlanlar" />

        <div className=" flex flex-col gap-8  overflow-auto pb-8  dark:text-dark-900 ">
          <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
            <div className="relative flex h-40 w-full flex-col items-center justify-start gap-1 rounded-md bg-white  py-8 text-zinc-400 shadow-md transition hover:shadow-lg dark:bg-dark-900 dark:text-light-50 lg:h-44 lg:w-1/4  2xl:h-96">
              <div className="absolute left-0 top-0 h-full w-2 rounded-l-md  bg-orange-300"></div>
              <p className="text-base "> Kullanıcı Bilgisi</p>
              <h1 className="text-xl text-orange-300">
                {data.client_details.name}
              </h1>
            </div>
            <div className="relative flex h-40 w-full flex-col items-center justify-start gap-1 rounded-md bg-white  py-8 text-zinc-400 shadow-md transition hover:shadow-lg dark:bg-dark-900 dark:text-light-50 lg:h-44 lg:w-1/4  2xl:h-96">
              <div className="absolute left-0 top-0 h-full w-2 rounded-l-md  bg-red-400"></div>
              <p className="text-base">Hizmet Türü</p>
              <h1 className="text-xl text-red-400 ">
                {data.service_details.name}
              </h1>
            </div>
            <div className="relative flex h-40 w-full flex-col items-center justify-start gap-1 rounded-md bg-white  py-8 text-zinc-400 shadow-md transition hover:shadow-lg dark:bg-dark-900 dark:text-light-50 lg:h-44 lg:w-1/4  2xl:h-96">
              <div className="absolute left-0 top-0 h-full w-2 rounded-l-md  bg-blue-400"></div>
              <p className="text-base"> Bütçe</p>
              <h1 className="text-xl text-blue-400 ">
                {data.budget === 0
                  ? 'Bütçe Belirtilmedi'
                  : `${data.budget} Lira`}
              </h1>
            </div>
            <div className="relative flex h-40 w-full flex-col items-center justify-start gap-1 rounded-md bg-white  py-8 text-zinc-400 shadow-md transition hover:shadow-lg dark:bg-dark-900 dark:text-light-50 lg:h-44 lg:w-1/4 2xl:h-96">
              <div className="absolute left-0 top-0 h-full w-2 rounded-l-md  bg-purple-400"></div>
              <p className="text-base">Süre</p>
              <h1 className="text-xl text-purple-400">
                {data.duration.slice(8, 10)}/{data.duration.slice(5, 7)}/
                {data.duration.slice(0, 4)}
              </h1>
            </div>
            <div className="relative flex h-40 w-full flex-col items-center justify-start gap-1 rounded-md bg-white  py-8 text-zinc-400 shadow-md transition hover:shadow-lg dark:bg-dark-900 dark:text-light-50 lg:h-44 lg:w-1/4 2xl:h-96">
              <div className="absolute left-0 top-0 h-full w-2 rounded-l-md  bg-lime-300"></div>
              <p className="text-base">Lokasyon Bilgisi</p>
              <h1 className="text-xl text-lime-300">
                <p className="flex justify-between gap-8 rounded-md lg:gap-4">
                  <span>İl</span> <span>{data.location_details.city.name}</span>
                </p>
                <p className="flex justify-between gap-8 rounded-md lg:gap-4">
                  <span>İlçe</span>
                  <span> {data.location_details.countie.name}</span>
                </p>
                <p className="flex justify-between gap-8 rounded-md lg:gap-4">
                  <span>Mahalle</span>
                  <span>{data.location_details.district.name}</span>
                </p>
              </h1>
            </div>
          </div>

          {/* Answers */}
          <p className="h-30 flex w-full items-center justify-center rounded-md  bg-white py-8  text-lg text-zinc-400 shadow-sm dark:bg-dark-900 dark:text-light-50 lg:h-24  2xl:h-96">
            İlana Verilen Cevaplar
          </p>
          {data.questions_and_values.map((question, idx) => (
            <div
              className="relative flex w-full justify-between self-center rounded-md lg:w-2/3"
              key={idx}
            >
              <div className="absolute left-0 top-0 h-full w-2 rounded-l-md  bg-neutral-200 dark:bg-black/30"></div>
              <p className="w-1/2 bg-white p-4 dark:bg-dark-900 dark:text-light-50  lg:px-8 lg:py-4">
                {question.question}
              </p>
              <Divider orientation="vertical" flexItem sx={{ marginY: 1 }} />
              <div className="w-1/2 bg-white  p-4 text-dark-800 lg:p-4 ">
                {typeof question.answer === 'string' ? (
                  <p>
                    <CircleIcon className="mr-2 !text-[0.5rem] text-dark-800" />
                    <span>{question.answer}</span>
                  </p>
                ) : (
                  question.answer.map((item) => (
                    <div className="flex flex-col gap-2" key={item}>
                      <p>
                        <CircleIcon className="mr-2 !text-[0.5rem] text-dark-800" />
                        <span>{item}</span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {/* Details */}
          <div className="relative flex w-full justify-between self-center  rounded-md lg:w-2/3">
            <div className="absolute left-0 top-0 h-full w-2 rounded-l-md  bg-neutral-200 dark:bg-black/30"></div>
            <p className="w-1/2 bg-white p-4 dark:bg-dark-900 dark:text-light-50 lg:px-8 lg:py-4">
              Detaylar
            </p>
            <Divider orientation="vertical" flexItem sx={{ marginY: 1 }} />
            <p className="w-1/2  bg-white p-4 text-dark-800 lg:p-4">
              <CircleIcon className="mr-2 !text-[0.5rem] text-dark-800" />
              <span> {data.details}</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardContent>
  )
}

export default RecipentShowAdvert
