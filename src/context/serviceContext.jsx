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
          // console.log(response)
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
          questionId: question.id,
          type_name: question.type_name,
          question: question.label,
          answers: question.answers,
          answer: [],
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'select') {
        let tempJson = {
          activeStep: idx,
          questionId: question.id,
          type_name: question.type_name,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'text') {
        let tempJson = {
          activeStep: idx,
          type_name: question.type_name,
          question: question.label,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'textarea') {
        let tempJson = {
          activeStep: idx,
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
    if (idx !== 0) idx++
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
      type_name: 'budge',
      question: 'Bütçe',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      type_name: 'workDetails',
      question: 'İş Detayi',
      answer: null,
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
