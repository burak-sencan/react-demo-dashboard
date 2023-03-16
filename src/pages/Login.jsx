import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/authContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import api from '../context/api'

const Login = () => {
  const { token, setToken, setSelfData } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

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
      password,
    }
    login(userData)
  }

  useEffect(() => {
    if (token !== '') {
      navigate('/')
    }
  }, [])

  const login = async (userData) => {
    try {
      axios.defaults.headers.common['Access-Control-Request-Headers'] = null
      axios.defaults.headers.common['Access-Control-Request-Method'] = null
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/login',
        userData
      )
      if (response.data) {
        if (response.data.status === 201) {
          localStorage.setItem('token', response.data.result)
          setToken(response.data.result)
          getSelfData(response.data.result)
          navigate('/')
        }
        if (response.data.status === 401) {
          toast(response.data.message)
        }
      }
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const getSelfData = async (token) => {
    api.getSelfClient(token).then((response) => {
      setSelfData(response)
    })
  }

  return (
    <section className=" w-full p-8">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8  lg:py-0">
        <div className="w-full rounded-lg bg-white  shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Giriş Yap
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
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={onChange}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                  required="required"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="/reset-password"
                  className="text-primary-600 text-sm font-medium hover:underline dark:text-white"
                >
                  Şifremi unuttum?
                </Link>
              </div>
              <button
                type="submit"
                className="h-10 w-full rounded-md bg-lime-600 text-lime-300 transition hover:text-white"
              >
                Giriş Yap
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Bir hesabın yok mu?
                <Link
                  to="/register"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Hesap oluştur
                </Link>
              </p>
            </form>
          </div>
        </div>
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
    </section>
  )
}
export default Login
