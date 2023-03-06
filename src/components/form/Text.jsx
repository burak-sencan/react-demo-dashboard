import TextField from '@mui/material/TextField'
import { useContext, useEffect, useState } from 'react'
import ServiceContext from '../../context/serviceContext'
import Question from './Question'

const Text = ({ data, activeStep }) => {
  const [value, setValue] = useState(undefined)
  const { formData, setFormData } = useContext(ServiceContext)

  const handleText = (e) => {
    setValue(e.target.value)
    console.log(e.target.value)
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep
          ? { ...item, answer: e.target.value }
          : item
      )
    )
  }

  useEffect(() => {
    setValue(formData[activeStep].answer)
  }, [activeStep])

  return (
    <>
      <Question data={data} />
      <TextField
        id="outlined-multiline-static"
        label="Cevabınızı yazın."
        defaultValue={formData[activeStep].answer}
        value={value}
        onChange={handleText}
      />
    </>
  )
}

export default Text
