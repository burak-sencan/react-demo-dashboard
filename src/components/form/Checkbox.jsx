import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'

const CheckboxInput = ({ data }) => {
  const [input, setInput] = useState([])

  const handleChange = (e) => {
    let val = e.target.value
    if (!input.includes(val)) {
      setInput([...input, val])
    } else {
      setInput(input.filter((id) => id !== val))
    }
    console.log(input)
  }

  return (
    <FormGroup className="overflow-auto">
      {data.answers.map((opt) => (
        <FormControlLabel
          key={opt.id}
          value={opt.id}
          onChange={handleChange}
          control={<Checkbox />}
          label={opt.value}
        />
      ))}
    </FormGroup>
  )
}
export default CheckboxInput
