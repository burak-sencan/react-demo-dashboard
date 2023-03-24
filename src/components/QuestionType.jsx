import { useContext } from 'react'
import ServiceContext from '../context/serviceContext'
import Duration from './form/Duration'
import {
  AddressInput,
  BudgetInput,
  CheckboxInput,
  RadioInput,
  SelectInput,
  TextInput,
  WorkDetail,
} from './form'
import CanSeeNumber from './form/CanSeeNumber'
const QuestionType = ({ activeStep }) => {
  const { formData } = useContext(ServiceContext)
  
  // Loading
  if (formData.lenght === 0) return <p>Loading</p>

  // Dynamic QuestionType
  if (formData[activeStep].question) {
    let type = formData[activeStep].type_id

    if (type === 6)
      return <RadioInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 5)
      return (
        <CheckboxInput data={formData[activeStep]} activeStep={activeStep} />
      )
    if (type === 1)
      return <SelectInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 2)
      return <TextInput data={formData[activeStep]} activeStep={activeStep} />

    //Statics
    if (type === 'adress')
      return (
        <AddressInput data={formData[activeStep]} activeStep={activeStep} />
      )
    if (type === 'duration')
      return <Duration data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'showBudget')
      return <BudgetInput data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'workDetail')
      return <WorkDetail data={formData[activeStep]} activeStep={activeStep} />
    if (type === 'canSeeNumber')
      return (
        <CanSeeNumber data={formData[activeStep]} activeStep={activeStep} />
      )
  }
}

export default QuestionType
