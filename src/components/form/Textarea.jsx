import { TextField } from '@mui/material'
import { useState } from 'react'
import Question from './Question'

const Textarea = ({ data }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <Question data={data} />
      <TextField
        label={data.question}
        val={value}
        onChange={handleChange}
        multiline
        maxRows={4}
        variant="filled"
      />
    </>
  )
}

export default Textarea
