import Question from './Question'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useContext, useEffect, useState } from 'react'
import ServiceContext from '../../context/serviceContext'

const CanSeeNumber = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [value, setValue] = useState(formData[activeStep].answer)

  const handleChange = (event) => {
    setValue(event.target.value)
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep
          ? { ...item, answer: `${event.target.value}` }
          : item
      )
    )
  }

  useEffect(() => {
    setValue(
      formData[activeStep].answer === null ? '1' : formData[activeStep].answer
    )
    // setValue(formData[activeStep].answer)
  }, [activeStep])

  return (
    <div className="flex flex-col overflow-auto">
      <Question data={data} />
      <FormControl>
        {/* <FormLabel id="demo-controlled-radio-buttons-group">Cevabınız?</FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          defaultValue={formData[activeStep].answer}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="1" control={<Radio />} label="Gösterilsin" />
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Gösterilmesin"
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default CanSeeNumber
