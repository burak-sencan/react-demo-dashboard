import { useContext, useState } from 'react'
import Question from './Question'
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import ServiceContext from '../../context/serviceContext'

const Budge = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)

  const handleText = (e) => {
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
        item.activeStep === activeStep ? { ...item, answer: 0 } : item
      )
    )
  }

  return (
    <>
      <Question data={data} />
      <TextField
        id="outlined-multiline-static"
        label="Proje bütçe miktarı?"
        value={
          formData[activeStep].answer === null
            ? ''
            : formData[activeStep].answer
        }
        placeholder="1000"
        onChange={handleText}
      />
      <FormGroup className="flex items-center">
        <FormControlLabel
          checked={formData[activeStep].answer === 0 ? true : false}
          onChange={disableBudgeInput}
          control={<Checkbox />}
          label="Belirtmek istemiyorum"
        />
      </FormGroup>
    </>
  )
}

export default Budge
