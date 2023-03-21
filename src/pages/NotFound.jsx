import { Link } from 'react-router-dom'
import { not_found } from '../assets'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
      <div className="flex flex-col gap-8">
        <p className="text-2xl dark:text-white lg:text-4xl">Sayfa Bulunamadı</p>
        <Link
          to="/"
          className="mx-auto  w-32 rounded-md bg-slate-900 p-2 text-center text-xl text-white transition hover:bg-slate-800 lg:text-2xl"
        >
          Anasayfa
        </Link>
      </div>
      <img src={not_found} className="lg:w-1/2 w-2/3 md:w-3/5 rounded-lg" alt="not_found" />
    </div>
  )
}

export default NotFound
