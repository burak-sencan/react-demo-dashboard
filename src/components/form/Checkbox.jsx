import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useContext, useEffect, useState } from 'react'
import ServiceContext from '../../context/serviceContext'
import Question from './Question'

const CheckboxInput = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [value, setValue] = useState(formData[activeStep]?.answer)

  const handleChange = (e) => {
    let val = e.target.value

    if (!value.includes(val)) {
      setValue([...value, val])
      handleInput(val)
    } else {
      // map filter //
      // const updatedFormData = formData.map((obj) =>
      //   obj.activeStep === activeStep
      //     ? { ...obj, answer: obj.answer.filter((item) => item !== val) }
      //     : obj
      // )

      // const updatedValues = formData
      //   .filter((obj) => obj.activeStep === activeStep)
      //   .map((obj) => obj.answer.filter((item) => item !== val))
      //   .flat()

      // setFormData(updatedFormData)
      // setValue(...updatedValues)
      // map filter //

      formData.forEach((obj) => {
        if (obj.activeStep === activeStep) {
          let temp = []
          obj.answer.forEach((item) => {
            if (item !== val) {
              temp.push(item)
            }
          })

          const x = formData.map((item) =>
            item.activeStep === activeStep ? { ...item, answer: temp } : item
          )
          // setValue(...value, ...temp)
          setValue(...temp)
          setFormData(x)
        }
      })
    }
  }

  const handleInput = (val) => {
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep
          ? { ...item, answer: [...item.answer, val] }
          : item
      )
    )
  }

  useEffect(() => {
    setValue(formData[activeStep]?.answer)
  }, [value])

  return (
    <>
      <Question data={data} />
      <FormGroup className=" overflow-auto">
        {data.answers.map((opt) => (
          <FormControlLabel
            className="hover:bg-slate-100"
            key={opt.id}
            value={opt.value}
            onChange={handleChange}
            control={
              <Checkbox
                color="success"
                checked={value?.includes(opt.value) ? true : false}
              />
            }
            label={opt.value}
          />
        ))}
      </FormGroup>
    </>
  )
}
export default CheckboxInput
