import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  return (
    <section class=" w-full p-8 dark:bg-gray-900">
      <div class="mx-auto flex flex-col items-center justify-center px-6 py-8  lg:py-0">
        <div class="w-full rounded-lg bg-white  shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Giriş Yap
            </h1>
            <form class="space-y-4 md:space-y-6 ">
              <div>
                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  E-posta adresi
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <Link
                  to="/reset-password"
                  class="text-primary-600 text-sm font-medium hover:underline dark:text-white"
                >
                  Şifremi unuttum?
                </Link>
              </div>
              <button
                type="submit"
                class="h-10 w-full rounded-md bg-lime-600 text-lime-300"
              >
                Giriş Yap
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Bir hesabın yok mu?{' '}
                <Link
                  to="/register"
                  class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Hesap oluştur
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login
