import TextField from '@mui/material/TextField'
import { useState } from 'react'

const Text = ({ data }) => {
  const [text, setText] = useState('')

  const handleText = (e) => {
    setText(e.target.value)
    console.log(e.target.value)
  }
  return (
    <TextField
      id="outlined-multiline-static"
      label="Multiline"
      value={text}
      onChange={handleText}
    />
  )
}

export default Text
