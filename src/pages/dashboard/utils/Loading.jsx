import { loading } from '../../../assets/'

const Loading = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex h-36 w-36 flex-col items-center justify-center gap-4 lg:h-48 lg:w-48">
        <img className="object-cover" src={loading} alt="loading" />
        <p className="text-dark-800 dark:text-light-50">Veriler Çekiliyor</p>
      </div>
    </div>
  )
}

export default Loading
