import { Link, useParams } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import { Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../../context/authContext'
import api from '../../../../context/api'
import Loading from '../../utils/Loading'

const RecipentShowAdvert = () => {
  const { id } = useParams()
  const { token } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.recipientsServiceRequest(token, id).then((response) => {
      console.log(response.data.result)

      setData(response.data.result)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div>
        <Link to="/recipentDashboard/advert">
          <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
        </Link>
        <Divider sx={{ marginY: 2 }} />

        <div className=" flex flex-col  overflow-auto  bg-white p-2 shadow-md dark:bg-dark-900 dark:text-dark-900 lg:p-4">
          {/* User Info -- Service Name */}
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col rounded-md shadow-md">
              <p className=" rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Kullanıcı Bilgisi
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.client_details.name}
              </p>
            </div>

            <div className="flex w-full flex-col rounded-md shadow-md">
              <p className=" rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Hizmet Türü
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.service_details.name}
              </p>
            </div>
          </div>

          {/* Budget Duration Location  */}
          <div className="mt-4 flex w-full flex-col gap-4  lg:flex-row">
            <div className="flex w-full flex-col rounded-md shadow-md">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Bütçe
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.budget}
              </p>
            </div>

            <div className="flex w-full flex-col rounded-md shadow-md">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Süre
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.duration}
              </p>
            </div>

            <div className="flex w-full flex-col rounded-md shadow-md">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Lokasyon Bilgisi
              </p>
              <div className="flex flex-col gap-2 rounded-md  p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                <p>Şehir Adı: {data.location_details.city.name}</p>
                <p>İlçe Adı: {data.location_details.countie.name}</p>
                <p>Mahalle Adı: {data.location_details.district.name}</p>
              </div>
            </div>
          </div>

          {/* Answers */}
          <p className=" mt-4 rounded-md bg-light-50 p-4 text-center text-lg dark:text-dark-800">
            İlana Verilen Cevaplar
          </p>
          {data.questions_and_values.map((question, idx) => (
            <div className="flex flex-col gap-4 rounded-md" key={idx}>
              <div className="my-2 flex flex-col  rounded-md  shadow-md">
                <p className=" rounded-t-md bg-light-50 p-4 dark:bg-white dark:text-dark-800">
                  {question.question}
                </p>
                <p className="p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                  {typeof question.answer === 'string' ? (
                    <span>{question.answer}</span>
                  ) : (
                    question.answer.map((item) => (
                      <div className="m-2">
                        <span key={item}>{item}</span>
                      </div>
                    ))
                  )}
                </p>
              </div>
            </div>
          ))}

          {/* Details */}
          <Divider sx={{ marginY: 2 }} />
          <div className="flex flex-col rounded-md shadow-md">
            <p className="rounded-t-md bg-light-50 p-4 dark:text-dark-800">
              Detaylar
            </p>
            <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
              {data.details}
            </p>
          </div>
        </div>
      </div>
    </DashboardContent>
  )
}

export default RecipentShowAdvert
