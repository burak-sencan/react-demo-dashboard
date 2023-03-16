import { Link, useParams } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import Loading from '../../utils/Loading'

const EmployeeShowJobOpportunities = () => {
  const { id } = useParams()
  const { token } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

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
    console.log({
      quote_price: quotePrice,
      quote_message: quoteMessage,
    })
  }

  useEffect(() => {
    api.getOpportunitie(token, id).then((response) => {
      console.log(response)
      setData(response.data.result)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div>
        <Link to="/employeeDashboard/jobOpportunities/">
          <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
        </Link>
        <div className="m-2">
          <Divider />
        </div>
        <div className=" flex flex-col overflow-auto  bg-white p-2 shadow-md dark:bg-dark-900 dark:text-dark-900 lg:p-4">
          <div className="flex flex-col gap-4 rounded-md shadow-md">
            <p className=" rounded-t-md bg-light-50 p-4  dark:text-dark-800">
              Kullanıcı Bilgisi
            </p>
            <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
              {data.client_full_name}
            </p>
          </div>
          <div className="my-4">
            <Divider />
          </div>
          {data.question_and_values.map((question) => (
            <div
              className="flex flex-col gap-4 rounded-md "
              key={question.question_id}
            >
              <div className="flex  flex-col gap-4  rounded-md  shadow-md">
                <p className=" rounded-t-md bg-lime-100 p-4 dark:text-dark-800">
                  {question.question_name}
                </p>
                <p className="p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
                  {question.values.map((value) => `${value} `)}
                </p>
              </div>
            </div>
          ))}

          <div className="my-4">
            <Divider />
          </div>
          <div className="flex flex-col gap-4 shadow-md">
            <p className="rounded-md bg-light-50 p-4 dark:text-dark-800">
              Detaylar
            </p>
            <p className="rounded-md p-4 text-dark-800 dark:bg-dark-900 dark:text-light-50">
              {data.details}
            </p>
          </div>
          <div className="my-4">
            <Divider />
          </div>
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
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm lg:w-2/3"
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
                  type="text"
                  name="quotePrice"
                  value={quotePrice}
                  onChange={onChange}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm lg:w-2/3"
                  required="required"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center rounded-md   bg-lime-600 p-4 text-lime-300 transition hover:cursor-pointer  hover:text-white lg:w-32 lg:self-end"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </DashboardContent>
  )
}

export default EmployeeShowJobOpportunities
