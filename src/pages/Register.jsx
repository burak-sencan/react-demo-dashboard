import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/authContext'

const Register = () => {
  const { register } = useContext(AuthContext)
  const [formData, setformData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
    account_type: 1,
    phone: '',
  })

  const {
    first_name,
    last_name,
    email,
    password,
    password2,
    account_type,
    phone,
  } = formData

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      console.log('password !== password2')
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        password,
        account_type,
        phone,
      }
      register(userData)
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
                  htmlFor="first_name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ad
                </label>
                <input
                  type="text"
                  value={first_name}
                  onChange={onChange}
                  name="first_name"
                  id="first_name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Soyad
                </label>
                <input
                  type="text"
                  value={last_name}
                  onChange={onChange}
                  name="last_name"
                  id="last_name"
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
                  htmlFor="password2"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  value={password2}
                  onChange={onChange}
                  name="password2"
                  id="password2"
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
    </section>
  )
}
export default Register
