// Butçe sorusu için ilana butçe verme ve formdataya set edilmesi.
import { useContext, useEffect, useState } from 'react'
import Question from './Question'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import ServiceContext from '../../context/serviceContext'

// select box'ın açılan ekranı
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
const Budget = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(formData[activeStep].answer)
  }, [activeStep])

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

  return (
    <div className="flex flex-col  overflow-auto">
      <Question data={data} />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{data.question}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value || ''}
          label="Seçiminiz Nedir"
          MenuProps={MenuProps}
          onChange={handleChange}
        >
          {data.answers.map((opt) => (
            <MenuItem key={opt.id} value={opt.value}>
              {opt.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Budget
