import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import Loading from '../../../../components/Loading'
import { toast, ToastContainer } from 'react-toastify'

const EmployeeShowJobOpportunities = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  const [formData, setformData] = useState({
    quotePrice: '',
    quoteMessage: '',
  })

  const { quotePrice, quoteMessage } = formData

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const tempFormData = {
      request_id: data.id,
      service_id: data.service_details.id,
      receiver_client_id: data.client_details.id,
      // winner_client_id: winner_client_id,
      quote_price: quotePrice,
      quote_message: quoteMessage,
    }
    api.sendBid(token, tempFormData, data.id).then((response) => {
      // Eğer başarılı ise
      if (response.status) {
        toast(response.data.message)
        setIsSubmit(true)
        setTimeout(() => {
          navigate('/employeeDashboard/jobOpportunities/')
        }, 3000)
      }
      toast(response.data.message)
    })
  }

  useEffect(() => {
    api.getOpportunitie(token, id).then((response) => {
      setData(response.data.result)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div>
        <div className="flex gap-2">
          <Link to="/employeeDashboard/jobOpportunities/">
            <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
          </Link>
          <p className="text-dark-900 dark:text-light-50">İş Fırsatları</p>
        </div>

        <Divider sx={{ margin: 2 }} />
        <div className=" flex flex-col  gap-4 overflow-auto  bg-white p-2 shadow-md dark:bg-dark-900 dark:text-dark-900 lg:p-4">
          {/* User Info -- Service Name */}
          <div className="flex w-full flex-col  gap-4 lg:flex-row">
            <div className="flex w-full flex-col rounded-md shadow-md  transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className=" rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Kullanıcı Bilgisi
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.client_details.name}
              </p>
            </div>

            <div className="flex w-full  flex-col rounded-md  shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className=" rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Hizmet Türü
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.service_details.name}
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
                {data.budget === 0 ? 'Bütçe Belirtilmedi' : data.budget}
              </p>
            </div>

            <div className="flex  w-full flex-col  rounded-md shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Süre
              </p>
              <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                {data.duration}
              </p>
            </div>

            <div className="flex w-full  flex-col rounded-md  shadow-md transition hover:shadow-slate-400 dark:hover:shadow-slate-500">
              <p className="rounded-t-md bg-light-50 p-4  dark:text-dark-800">
                Lokasyon Bilgisi
              </p>

              <div className="flex flex-col gap-2 rounded-md  p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                <p className="flex justify-between gap-4 rounded-md">
                  <span>İl</span>
                  <span>{data.location_details.city.name}</span>
                </p>
                <p className="flex justify-between gap-4 rounded-md">
                  <span>İlçe</span>
                  <span>{data.location_details.countie.name}</span>
                </p>
                <p className="flex justify-between gap-4 rounded-md">
                  <span>Mahalle</span>
                  <span>{data.location_details.district.name}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Answers */}
          <p className=" mt-4 rounded-md bg-light-50 p-4 text-center text-lg dark:text-dark-800">
            İlana Verilen Cevaplar
          </p>
          {data.questions_and_values.map((question, idx) => (
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
              {data.details}
            </p>
          </div>

          {/* Form */}
          {/* <Divider sx={{ marginTop: 4 }} /> */}
          <p className=" my-4 rounded-md bg-light-50 p-4 text-center text-lg dark:text-dark-800">
            Teklif Ver
          </p>
          <form action="" onSubmit={onSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mesaj
                </label>
                <textarea
                  id="message"
                  type="text"
                  name="quoteMessage"
                  value={quoteMessage}
                  onChange={onChange}
                  required="required"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm lg:w-2/3"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="liras"
                  className="mb-2  block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lira
                </label>
                <input
                  id="liras"
                  type="number"
                  name="quotePrice"
                  value={quotePrice}
                  onChange={onChange}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm lg:w-2/3"
                  required="required"
                />
              </div>
            </div>
            <button
              disabled={isSubmit}
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-md   bg-lime-600 p-4 text-lime-300 transition hover:cursor-pointer  hover:text-white lg:w-32 lg:self-end"
            >
              Gönder
            </button>
          </form>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </DashboardContent>
  )
}

export default EmployeeShowJobOpportunities
