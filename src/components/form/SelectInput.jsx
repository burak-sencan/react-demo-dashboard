import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useContext, useEffect, useState } from 'react'
import Question from './Question'
import ServiceContext from '../../context/serviceContext'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const SelectInput = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [value, setValue] = useState(undefined)

  const handleChange = (e) => {
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{data.question}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={formData[activeStep].answer}
          value={value}
          label="Seçiminiz Nedir"
          MenuProps={MenuProps}
          onChange={handleChange}
        >
          {data.answers.map((opt) => (
            <MenuItem key={opt.id} value={opt.id}>
              {opt.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectInput
