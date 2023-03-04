import { useContext } from 'react'
import ServiceContext from '../context/serviceContext'
import {
  AdressInput,
  BudgeInput,
  CheckboxInput,
  RadioInput,
  SelectInput,
  TextInput,
  TextareaInput,
} from './form'

const Question = ({ activeStep }) => {
  const { formData } = useContext(ServiceContext)
  console.log(formData[activeStep])

  // Loading
  if (formData.lenght === 0) return <p>Loading</p>

  // Dynamic Questions
  if (formData[activeStep].question) {
    let type = formData[activeStep].type_name

    if (type === 'radio')
      return <RadioInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'checkbox')
      return (
        <CheckboxInput data={formData[activeStep]} activeStep={activeStep} />
      )
    if (type === 'select')
      return <SelectInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'text')
      return <TextInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'textarea')
      return (
        <TextareaInput data={formData[activeStep]} activeStep={activeStep} />
      )
    if (type === 'adress')
      return <AdressInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'budge')
      return <BudgeInput data={formData[activeStep]} activeStep={activeStep} />
  }
}

export default Question
