import { TextField } from '@mui/material'
import { useContext } from 'react'
import ServiceContext from '../../context/serviceContext'
import Question from './Question'

const WorkDetails = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)

  const handleChange = (e) => {
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep
          ? { ...item, answer: e.target.value }
          : item
      )
    )
  }

  return (
    <div className="flex flex-col  overflow-auto">
      <Question data={data} />
      <TextField
        label={data.question}
        defaultValue={
          formData[activeStep].answer === null
            ? ''
            : formData[activeStep].answer
        }
        val={
          formData[activeStep].answer === null
            ? ''
            : formData[activeStep].answer
        }
        onChange={handleChange}
        multiline
        rows={8}
      />
    </div>
  )
}

export default WorkDetails
