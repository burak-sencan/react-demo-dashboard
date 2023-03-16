import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'

const Question = ({ data }) => {
  return (
    <div className="relative flex justify-center">
      <p className="pt-6 text-2xl text-green-600 lg:p-4">{data.question}</p>
      <div className="absolute top-0 right-0 ">
        <Link to="/">
          <IconButton aria-label="home">
            <CloseIcon />
          </IconButton>
        </Link>
      </div>
    </div>
  )
}

export default Question
