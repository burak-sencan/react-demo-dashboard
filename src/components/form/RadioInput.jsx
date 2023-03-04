import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import ServiceContext from '../../context/serviceContext'
import { useContext, useState } from 'react'

const RadioInput = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [value, setValue] = useState(formData[activeStep]?.answer)

  const handleChange = (e) => {
    console.log(e.target.value)
    setValue(e.target.value)
    console.log(formData)
    console.log(formData[activeStep])
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep
          ? { ...item, answer: e.target.value }
          : item
      )
    )
  }
  return (
    <FormControl className="overflow-auto">
      <FormLabel id="demo-radio-buttons-group-label">{data.question}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={formData[activeStep]?.answer}
        name="radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        {data.answers.map((opt) => (
          <FormControlLabel
            key={opt.id}
            value={opt.id}
            control={<Radio />}
            label={opt.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default RadioInput
