import { useContext } from 'react'
import ServiceContext from '../context/serviceContext'
import Duration from './form/Duration'
import {
  AdressInput,
  BudgeInput,
  CheckboxInput,
  RadioInput,
  SelectInput,
  TextInput,
  WorkDetail,
} from './form'
import CanSeeNumber from './form/CanSeeNumber'

const QuestionType = ({ activeStep }) => {
  const { formData } = useContext(ServiceContext)

  console.log('activeStep: ', activeStep)
  console.log('formData: ', formData[activeStep])

  // Loading
  if (formData.lenght === 0) return <p>Loading</p>

  // Dynamic QuestionType
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

    //Statics
    if (type === 'adress')
      return <AdressInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'duration')
      return <Duration data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'budge')
      return <BudgeInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'workDetail')
      return <WorkDetail data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'canSeeNumber')
      return <CanSeeNumber data={formData[activeStep]} activeStep={activeStep} />
  }
}

export default QuestionType
