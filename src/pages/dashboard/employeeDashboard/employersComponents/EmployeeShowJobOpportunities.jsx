import { useNavigate, useParams } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import { Divider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import Loading from '../../../../components/Loading'
import { toast, ToastContainer } from 'react-toastify'
import CircleIcon from '@mui/icons-material/Circle'
import TopNav from '../../utils/TopNav'

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
        <TopNav
          url="/employeeDashboard/jobOpportunities"
          text="İş Fırsatları"
        />

        <div className=" flex flex-col gap-8 overflow-auto pb-8 dark:bg-dark-800">
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
              <p className="w-1/2 bg-white p-4 dark:bg-dark-900 dark:text-light-50 lg:px-8 lg:py-4">
                {question.question}
              </p>
              <Divider orientation="vertical" flexItem sx={{ marginY: 1 }} />
              <p className="w-1/2 bg-white  p-4 text-dark-800  lg:p-4 ">
                {typeof question.answer === 'string' ? (
                  <p>
                    <CircleIcon className="mr-2 !text-[0.5rem] text-dark-800" />
                    <span>{question.answer}</span>
                  </p>
                ) : (
                  question.answer.map((item) => (
                    <div className="flex flex-col gap-2">
                      <p>
                        <CircleIcon className="mr-2 !text-[0.5rem] text-dark-800" />
                        <span key={item}>{item}</span>
                      </p>
                    </div>
                  ))
                )}
              </p>
            </div>
          ))}

          {/* Details */}
          <div className="relative flex w-full justify-between self-center  rounded-md  lg:w-2/3">
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

          {/* Form */}
          <p className="h-30 flex w-full items-center justify-center rounded-md  bg-white py-8  text-lg text-zinc-400 shadow-sm dark:bg-dark-900 dark:text-light-50 lg:h-24  2xl:h-96">
            Teklif Ver
          </p>
          <form
            action=""
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-8 self-center lg:w-2/3"
          >
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Mesajınız Yaz
              </label>
              <textarea
                id="message"
                type="text"
                name="quoteMessage"
                value={quoteMessage}
                onChange={onChange}
                required="required"
                className="h-32 w-full  rounded-md  bg-white p-4 text-gray-900 shadow-md transition focus:bg-slate-200 focus:outline-none  dark:bg-dark-900  dark:text-white dark:placeholder-gray-400  dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm "
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="liras"
                className="mb-2  block text-sm font-medium text-gray-900 dark:text-white"
              >
                Bütçe Gir
              </label>
              <input
                id="liras"
                type="number"
                name="quotePrice"
                value={quotePrice}
                onChange={onChange}
                className="h-16 w-full rounded-md bg-white p-4 text-gray-900 shadow-md transition focus:bg-slate-200 focus:outline-none  dark:bg-dark-900  dark:text-white dark:placeholder-gray-400  dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm "
                required="required"
              />
            </div>

            <button
              disabled={isSubmit}
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-md   bg-lime-600 p-4 text-lime-300 transition hover:cursor-pointer  hover:text-white lg:w-32 lg:self-center"
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
