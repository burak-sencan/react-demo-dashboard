import { useContext, useEffect, useState } from 'react'
import ServiceContext from '../../context/serviceContext'
import Question from './Question'
import Radio from '@mui/material/Radio'
import { RadioGroup, FormControlLabel, FormControl } from '@mui/material'

const RadioInput = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [value, setValue] = useState(formData[activeStep].answer)

  const handleChange = (e) => {
    setValue(e.target.value)
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
    <div className="flex flex-col gap-2 overflow-auto">
      <Question data={data} />
      <FormControl className=" overflow-auto">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={formData[activeStep].answer}
          name="radio-buttons-group"
          onChange={handleChange}
          value={value}
        >
          {data.answers.map((opt) => (
            <FormControlLabel
              className=" !m-0 gap-2 rounded-md py-1 hover:bg-slate-100"
              labelPlacement="end"
              key={opt.id}
              value={opt.value}
              control={<Radio color="success" />}
              label={opt.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
}
export default RadioInput
