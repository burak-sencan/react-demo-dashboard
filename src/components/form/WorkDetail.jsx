import { TextField } from '@mui/material'
import { useContext, useState } from 'react'
import ServiceContext from '../../context/serviceContext'
import Question from './Question'

const WorkDetails = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)

  const handleChange = (e) => {
    console.log(formData[activeStep].answer)
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep
          ? { ...item, answer: e.target.value }
          : item
      )
    )
  }

  return (
    <>
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
    </>
  )
}

export default WorkDetails
