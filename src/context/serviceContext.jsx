/* eslint-disable array-callback-return */
import axios from 'axios'
import { createContext, useState } from 'react'

const ServiceContext = createContext()

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState(null)
  const [formData, setFormData] = useState([])

  //register user
  const getServices = async () => {
    try {
      const response = await axios
        .get(process.env.REACT_APP_API_URL + '/get_services')
        .then((response) => {
          setServices(response)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const prepareFormData = (data) => {
    console.log(data)
    let idx = 0
    const tempFormData = []
    data.questions.map((question) => {
      if (question.type_name === 'radio') {
        let tempJson = {
          activeStep: idx,
          service_id: data.service_id,
          questionId: question.id,
          type_name: question.type_name,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'checkbox') {
        let tempJson = {
          activeStep: idx,
          service_id: data.service_id,
          question_id: question.id,
          type_name: question.type_name,
          question: question.label,
          answers: question.answers,
          answer: [],
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'select') {
        let tempJson = {
          activeStep: idx,
          service_id: data.service_id,
          question_id: question.id,
          type_name: question.type_name,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'text') {
        let tempJson = {
          activeStep: idx,
          service_id: data.service_id,
          type_name: question.type_name,
          question: question.label,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'textarea') {
        let tempJson = {
          activeStep: idx,
          service_id: data.service_id,
          type_name: question.type_name,
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
      type_name: 'adress',
      question: 'Adres',
      answer: null,
    })

    idx++
    tempFormData.push({
      activeStep: idx,
      type_name: 'duration',
      question: 'Ne kadar Zaman Alacak',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      type_name: 'showBudget',
      question: 'Bütçe',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      type_name: 'workDetail',
      question: 'İş Detayi',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      type_name: 'canSeeNumber',
      question: 'Numaran Gösterilsin mi',
      answer: '1',
    })

    setFormData(tempFormData)
    console.log('tempFormData : ', tempFormData)
  }

  return (
    <ServiceContext.Provider
      value={{ services, formData, getServices, prepareFormData, setFormData }}
    >
      {children}
    </ServiceContext.Provider>
  )
}
export default ServiceContext
