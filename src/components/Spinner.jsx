import { spinner } from '../assets'

const Spinner = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <img className="object-cover" src={spinner} alt="loading" />
    </div>
  )
}

export default Spinner
