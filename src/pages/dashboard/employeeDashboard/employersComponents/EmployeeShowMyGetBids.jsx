import DashboardContent from '../../utils/DashboardContent'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider } from '@mui/material'

const EmployeeShowMyGetBids = () => {
  const { id } = useParams()

  return (
    <DashboardContent>
      <div>
        <div className="flex gap-2">
          <Link to="/employeeDashboard/getBids/">
            <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
          </Link>
          <p className="text-dark-900 dark:text-light-50">
            Kazandığım Teklifler
          </p>
        </div>

        <div className="m-2">
          <Divider />
        </div>
        <div>EmployeeShowMyGetBids {id}</div>
      </div>
    </DashboardContent>
  )
}

export default EmployeeShowMyGetBids
