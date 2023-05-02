import { Link } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'

const CreditCardFail = () => {
  return (
    <DashboardContent>
      <div className="flex  flex-col items-center justify-center gap-4 rounded-md bg-white p-8 text-slate-900 shadow dark:bg-slate-900 dark:text-light-50">
        <h1 className="text-2xl">Kredi Kartı ile Ödemede Hata Oluştu!</h1>
        <Link className="text-xl" to="/employeeDashboard/wallet">
          Cüzdanım Git
        </Link>
      </div>
    </DashboardContent>
  )
}
export default CreditCardFail
