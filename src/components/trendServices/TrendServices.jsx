// seçtiğimiz bazı servisleri trend servis olarak ayarladık. burdanda ilgili servis formuna yönleniyor.
import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const TrendServices = ({ services, title }) => {
  return (
    <div className="bg-light-50 px-8 py-4 dark:bg-dark-800">
      <div className="p-4">
        <p className="text-2xl  dark:text-light-50">{title}</p>
        <Divider className="!my-1 dark:border-white/40" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundImage: `url(${service.image})`,
            }}
            className="flex h-48 max-w-sm items-end rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
          >
         
            <div className="flex w-full justify-between gap-4 bg-dark-800/80 p-2">
              <h5 className="mb-2 font-bold tracking-tight text-white truncate lg:text-lg">
                {service.name}
              </h5>

              <Link
                to={`/service/${service.id}`}
                className="items-center shrink-0 rounded-md bg-lime-600 p-1 text-center text-sm font-medium text-white transition hover:bg-lime-600/80 lg:px-3 lg:py-2 "
              >
                Teklif Al
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default TrendServices
