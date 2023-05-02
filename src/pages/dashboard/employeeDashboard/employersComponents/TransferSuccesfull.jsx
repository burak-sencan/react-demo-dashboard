import { Link } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'

const TransferSuccesfull = () => {
  return (
    <DashboardContent>
      <div className="flex  flex-col items-center justify-center gap-4 rounded-md bg-white p-8 text-slate-900 shadow dark:bg-slate-900 dark:text-light-50">
        <h1 className="text-2xl">Havale/EFT İşleminiz Başarı İle Tamamlandı</h1>
        <Link
          className="px-4 py-2 text-xl shadow-md"
          to="/employeeDashboard/wallet"
        >
          Cüzdanım Git
        </Link>
      </div>
    </DashboardContent>
  )
}
export default TransferSuccesfull
