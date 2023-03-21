/* eslint-disable array-callback-return */
import axios from 'axios'
import { createContext, useState } from 'react'

const ServiceContext = createContext()

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([])
  const [formData, setFormData] = useState([])

  const prepareFormData = (data) => {
    console.log(data)
    let idx = 0
    const tempFormData = []
    data.questions.map((question) => {
      if (question.type_id === 6) {
        let tempJson = {
          activeStep: idx,
          service_id: data.id,
          question_id: question.id,
          type_id: question.type_id,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        console.log(tempJson)
        tempFormData.push(tempJson)
      } else if (question.type_id === 5) {
        let tempJson = {
          activeStep: idx,
          service_id: data.id,
          question_id: question.id,
          type_id: question.type_id,
          question: question.label,
          answers: question.answers,
          answer: [],
        }
        tempFormData.push(tempJson)
      } else if (question.type_id === 1) {
        let tempJson = {
          activeStep: idx,
          service_id: data.id,
          question_id: question.id,
          type_id: question.type_id,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_id === 2) {
        let tempJson = {
          activeStep: idx,
          service_id: data.id,
          type_id: question.type_id,
          question: question.label,
          answer: null,
        }
        tempFormData.push(tempJson)
      }
      //plus minus olacakmış
      else if (question.type_id === 'textarea') {
        let tempJson = {
          activeStep: idx,
          service_id: data.id,
          type_id: question.type_id,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        tempFormData.push(tempJson)
      }
      idx++
    })

    //Static
    tempFormData.push({
      activeStep: idx,
      type_id: 'adress',
      question: 'Adres',
      answer: null,
    })

    idx++
    tempFormData.push({
      activeStep: idx,
      type_id: 'duration',
      question: 'Ne kadar Zaman Alacak',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      type_id: 'showBudget',
      question: 'Bütçe',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      type_id: 'workDetail',
      question: 'İş Detayi',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      type_id: 'canSeeNumber',
      question: 'Numaran Gösterilsin mi',
      answer: '1',
    })

    setFormData(tempFormData)
    console.log('tempFormData : ', tempFormData)
  }

  return (
    <ServiceContext.Provider
      value={{ services, formData, setServices, prepareFormData, setFormData }}
    >
      {children}
    </ServiceContext.Provider>
  )
}
export default ServiceContext
