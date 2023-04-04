import { Divider, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'

const Question = ({ data }) => {
  return (
    <div className="relative">
      <div className="flex w-full flex-col items-center rounded bg-white/60 p-4 shadow-md">
        <p className="text-base text-gray-700">{data.service_name}</p>
        <div className="flex w-full justify-between text-sm text-gray-400">
          {/* <p>Ortalama Fiyat Aralığı</p>
          <p>5000₺ - 7750₺</p> */}
        </div>
      </div>
      <div className="px-2 pt-4">
        <p className="text-2xl text-green-600">{data.question}</p>
      </div>
      <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
      <div className="absolute top-0 right-0 ">
        <Link to="/">
          <Tooltip title="İptal et">
            <IconButton aria-label="home">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
    </div>
  )
}

export default Question
