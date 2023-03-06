import { useContext, useState } from 'react'
import Question from './Question'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import ServiceContext from '../../context/serviceContext'

const Budge = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)

  const [value, setValue] = useState('')

  const handleText = (e) => {
    setValue(e.target.value)
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep
          ? { ...item, answer: e.target.value }
          : item
      )
    )
  }
  const disableBudgeInput = (e) => {
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep ? { ...item, answer: 1 } : item
      )
    )
  }

  return (
    <>
      <Question data={data} />
      <TextField
        id="outlined-multiline-static"
        label="Proje bütçe miktarı?"
        // defaultValue={formData[activeStep].answer}
        value={
          formData[activeStep].answer === null
            ? ''
            : formData[activeStep].answer
        }
        // disabled={formData[activeStep].answer === null ? false : true}

        placeholder="1000"
        onChange={handleText}
      />
      <FormGroup className="flex items-center">
        <FormControlLabel
          onChange={disableBudgeInput}
          control={<Checkbox />}
          label="Belirtmek istemiyorum"
        />
      </FormGroup>
    </>
  )
}

export default Budge
