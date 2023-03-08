import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setformData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_repeat: '',
    account_type: 1,
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
    const headers = { 'Content-Type': 'text/plain' }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/register',
        userData,
        { headers }
      )
      if (response.data) {
        if (response.data.status === 201) {
          navigate('/login')
        }
        if (response.data.status === 401) {
        }
      }
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  return (
    <section className="w-full p-8 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8  lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Hesap Oluştur
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                <input
                  type="password"
                  value={password}
                  onChange={onChange}
                  name="password"
                  id="password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password_repeat"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  value={password_repeat}
                  onChange={onChange}
                  name="password_repeat"
                  id="password_repeat"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="h-10 w-full rounded-md bg-lime-600 text-lime-300"
              >
                Hesap Oluştur
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Bir hesabınız var ise,
                <Link
                  to="/login"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Giriş yap
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
export default Register
