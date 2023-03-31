import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider } from '@mui/material'

const TopNav = ({ url, text }) => {
  return (
    <>
      {/* Top nav */}
      <Link to={url} className="inline-flex gap-2 p-2">
        <ArrowBackIcon className="text-dark-800 dark:text-light-50" />
        <p className="text-dark-800 dark:text-light-50">{text}</p>
      </Link>

      <Divider sx={{ marginBottom: 2 }} className="dark:border-white/40" />
    </>
  )
}
export default TopNav
