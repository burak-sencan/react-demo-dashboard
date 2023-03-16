import DashboardContent from '../../utils/DashboardContent'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider } from '@mui/material'

const EmployeeShowMyBids = () => {
  const { id } = useParams()

  return (
    <DashboardContent>
      <div>
        <Link to="/employeeDashboard/myBids/">
          <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
        </Link>
        <div className="m-2">
          <Divider />
        </div>
        <div>EmployeeShowMyBids {id}</div>
      </div>
    </DashboardContent>
  )
}

export default EmployeeShowMyBids
