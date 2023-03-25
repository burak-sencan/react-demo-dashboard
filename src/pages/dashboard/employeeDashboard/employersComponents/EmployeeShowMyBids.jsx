import { Link, useParams } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import Loading from '../../utils/Loading'

const EmployeeShowMyBids = () => {
  const { id } = useParams()
  const { token } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    api.getMyBid(token, id).then((response) => {
      setData(response.data.result)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div>
        <div className="flex gap-2">
          <Link to="/employeeDashboard/myBids/">
            <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
          </Link>
          <p className="text-dark-900 dark:text-light-50">Teklif Verdiklerim</p>
        </div>

        <Divider sx={{ margin: 2 }} />

        <div className=" flex flex-col  gap-4 overflow-auto  bg-white p-2 shadow-md dark:bg-dark-900 dark:text-dark-900 lg:p-4">
          {/* User Info -- Service Name */}
          <div className="flex w-full flex-col  gap-4 lg:flex-row">
            <div className="flex w-full flex-col rounded-md shadow-md  transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className=" rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Mesaj
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.quote_message}
              </p>
            </div>

            <div className="flex w-full  flex-col rounded-md  shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className=" rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Teklif
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.quote_price}
              </p>
            </div>
          </div>

          {/* Budget Duration Location  */}
          <div className="mt-4  flex w-full flex-col gap-4  lg:flex-row">
            <div className="flex  w-full flex-col  rounded-md shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Bütçe
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.request_details.budget}
              </p>
            </div>

            <div className="flex  w-full flex-col  rounded-md shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Süre
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.request_details.duration}
              </p>
            </div>

            <div className="flex w-full  flex-col rounded-md  shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Lokasyon Bilgisi
              </p>

              <div className="flex flex-col gap-2 rounded-md  p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                <p className="flex justify-between gap-4 rounded-md">
                  <span>İl</span>
                  <span>{data.request_details.location_details.city.name}</span>
                </p>
                <p className="flex justify-between gap-4 rounded-md">
                  <span>İlçe</span>
                  <span>
                    {data.request_details.location_details.countie.name}
                  </span>
                </p>
                <p className="flex justify-between gap-4 rounded-md">
                  <span>Mahalle</span>
                  <span>
                    {data.request_details.location_details.district.name}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Answers */}
          <p className=" mt-4 rounded-md bg-light-50 p-4 text-center text-lg dark:text-dark-800">
            İlana Verilen Cevaplar
          </p>
          {data.request_details.questions_and_values.map((question, idx) => (
            <div className="flex flex-col gap-4 rounded-md" key={idx}>
              <div className="my-2 flex  flex-col rounded-md  shadow-md transition  hover:shadow-slate-400  dark:hover:shadow-slate-500">
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
          <div className="flex  flex-col rounded-md  shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
            <p className="rounded-t-md bg-light-50 p-4 dark:text-dark-800">
              Detaylar
            </p>
            <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
              {data.request_details.details}
            </p>
          </div>
        </div>
      </div>
    </DashboardContent>
  )
}

export default EmployeeShowMyBids
