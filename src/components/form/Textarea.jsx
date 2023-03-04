import { TextField } from '@mui/material'
import { useState } from 'react'

const Textarea = ({ data }) => {
  const handleChange = (e) => {
    setVal(e.target.value)
  }
  const [val, setVal] = useState('')
  return (
    <TextField
      label={data.question}
      val={val}
      onChange={handleChange}
      multiline
      maxRows={4}
      variant="filled"
    />
  )
}

export default Textarea
