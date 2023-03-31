import { useContext, useEffect, useState } from 'react'
import Question from './Question'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IconButton } from '@mui/material'
import ServiceContext from '../../context/serviceContext'

const Plus = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [idx, setIdx] = useState(0)

  const handleIncrement = () => {
    if (idx < data.answers.length - 1) {
      setIdx(idx + 1)
      setFormData(
        formData.map((item) =>
          item.activeStep === activeStep
            ? { ...item, answer: data.answers[idx + 1].value }
            : item
        )
      )
    }
  }

  const handleDecrement = () => {
    if (idx > 0) {
      setIdx(idx - 1)
      setFormData(
        formData.map((item) =>
          item.activeStep === activeStep
            ? { ...item, answer: data.answers[idx - 1].value }
            : item
        )
      )
    }
  }

  useEffect(() => {
    formData.map((item) => {
      if (item.activeStep === activeStep && item.answer === null)
        setFormData(
          formData.map((item) =>
            item.activeStep === activeStep
              ? { ...item, answer: data.answers[idx].value }
              : item
          )
        )
    })
  }, [])

  return (
    <div className="flex flex-col  overflow-auto">
      <Question data={data} />
      <div className="flex items-center justify-center gap-8 text-3xl text-gray-500">
        <IconButton onClick={handleDecrement} sx={{ height: 48, width: 48 }}>
          <RemoveCircleOutlineIcon sx={{ height: 32, width: 32 }} />
        </IconButton>
        {formData.map((item) => item.activeStep === activeStep && item.answer)}
        {formData.map((item) => {
          if (item.activeStep === activeStep && item.answer === null)
            return data.answers[idx].value
        })}

        <IconButton onClick={handleIncrement} sx={{ height: 48, width: 48 }}>
          <AddCircleOutlineIcon sx={{ height: 32, width: 32 }} />
        </IconButton>
      </div>
    </div>
  )
}

export default Plus
