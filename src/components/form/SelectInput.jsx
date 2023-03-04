import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'

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
const SelectInput = ({ data }) => {
  const [input, setInput] = useState('')

  const handleChange = (event) => {
    setInput(event.target.value)
    console.log(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{data.question}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={input}
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
  )
}

export default SelectInput
