import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import api from '../context/api'
import Footer from '../components/Footer'
const Login = () => {
  const navigate = useNavigate()
  const [formData, setformData] = useState({
    email: '',
  })

  const { email } = formData

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
    }
    login(userData)
  }

  const login = async (userData) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/clients/login',
        userData
      )

    } catch (error) {
      toast(error.response.data.message)
    }
  }

  return (
    <section className=" w-full">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center px-6 py-8 ">
        <div className="w-full rounded-lg bg-white  shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Şifremi Unuttum
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  E-posta adresi
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                  value={email}
                  onChange={onChange}
                  required="required"
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/login"
                  className="text-primary-600 text-sm font-medium hover:underline dark:text-white"
                >
                  Giriş Yap
                </Link>
              </div>
              <button
                type="submit"
                className="h-10 w-full rounded-md bg-lime-600 text-lime-300 transition hover:text-white"
              >
                Gönder
              </button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <span className="mr-1"> Bir hesabın yok mu?</span>
                <Link
                  to="/register"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Hesap oluştur
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
    </section>
  )
}
export default Login
