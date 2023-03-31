import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/Footer'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const Register = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false) //hide show password

  const [formData, setformData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_repeat: '',
    account_type: '',
    phone: '',
  })

  const { full_name, email, password, password_repeat, account_type, phone } =
    formData

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password_repeat) {
      toast('Şifreler birbiri ile aynı değil.')
    } else {
      const userData = {
        full_name,
        email,
        password,
        password_repeat,
        account_type,
        phone,
      }

      register(userData)
    }
  }
  //register user
  const register = async (userData) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/clients/register',
        userData
      )
      if (response.data.status === true) {
        navigate('/login')
      } else {
        toast(response.data.message)
      }
    } catch (error) {
      toast(error)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <section className="w-full">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center px-6 py-8 ">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Hesap Oluştur
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Kullanıcı Tipi
                </label>
                <div className="flex justify-between gap-8">
                  <label
                    htmlFor="employers"
                    // className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
                    className={`${
                      account_type === '2'
                        ? 'bg-lime-500 dark:bg-gray-50'
                        : 'bg-white dark:bg-gray-800'
                    } inline-flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-200 p-3 text-gray-500  shadow-md transition hover:bg-lime-500/80 peer-checked:border-blue-600 peer-checked:text-blue-600  dark:text-gray-400  dark:peer-checked:text-blue-500`}
                  >
                    Hizmet Veren
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    id="employers"
                    name="account_type"
                    value="2"
                    onChange={onChange}
                  />

                  <label
                    htmlFor="recipients"
                    className={`${
                      account_type === '1'
                        ? 'bg-lime-500 dark:bg-gray-50'
                        : 'bg-white dark:bg-gray-800'
                    } inline-flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-200 p-3 text-gray-500  shadow-md transition hover:bg-lime-400/80 peer-checked:border-blue-600 peer-checked:text-blue-600  dark:text-gray-400  dark:peer-checked:text-blue-500`}
                  >
                    Hizmet Alan
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    id="recipients"
                    name="account_type"
                    value="1"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="full_name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={full_name}
                  onChange={onChange}
                  name="full_name"
                  id="full_name"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                  required="required"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  E-posta adresi
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={onChange}
                  name="email"
                  id="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Şifre
                </label>
                <div className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-50  text-gray-900 transition   dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 sm:text-sm ">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={onChange}
                    name="password"
                    id="password"
                    className=" w-full rounded-l-md   bg-gray-50 p-2.5  text-gray-900 transition focus:bg-slate-200  focus:outline-none  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                    required=""
                  />
                  <div
                    className="mx-auto p-2 dark:text-white"
                    onClick={() => {
                      setShowPass(!showPass)
                    }}
                  >
                    {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password_repeat"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Şifre Tekrar
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password_repeat}
                  onChange={onChange}
                  name="password_repeat"
                  id="password_repeat"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={onChange}
                  placeholder="5554443322"
                  name="phone"
                  id="phone"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="h-10 w-full rounded-md bg-lime-600 text-lime-300 transition hover:text-white"
              >
                Hesap Oluştur
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <span className="mr-1">Bir hesabınız var ise,</span>
                <Link
                  to="/login"
                  className="text-primary-600   dark:text-primary-500 font-medium hover:underline"
                >
                  Giriş yap
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />

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
export default Register
