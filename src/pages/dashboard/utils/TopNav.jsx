import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider } from '@mui/material'

const TopNav = ({ url, text }) => {
  return (
    <>
      {/* Top nav */}
      <Link to={url} className="flex gap-2">
        <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
        <p className="text-dark-900 dark:text-light-50">{text}</p>
      </Link>
      <Divider sx={{ marginY: 2 }} className='dark:border-white/40' />
    </>
  )
}
export default TopNav
