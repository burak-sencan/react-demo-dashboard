import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import { Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const RecipentShowAdvert = () => {
  const { id } = useParams()

  return (
    <DashboardContent>
      <div>
        <Link to="/recipentDashboard/advert/">
          <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
        </Link>
        <div className="m-2">
          <Divider />
        </div>
        RecipentShowAdvert {id}
      </div>
    </DashboardContent>
  )
}

export default RecipentShowAdvert
