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
          answer: null, // answered id for question
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'checkbox') {
        idx++
        let tempJson = {
          activeStep: idx,
          questionId: question.id,
          type_name: question.type_name,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'select') {
        idx++
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
        idx++
        let tempJson = {
          activeStep: idx,
          type_name: question.type_name,
          question: question.label,
          answer: null,
        }
        tempFormData.push(tempJson)
      } else if (question.type_name === 'textarea') {
        idx++
        let tempJson = {
          activeStep: idx,
          type_name: question.type_name,
          question: question.label,
          answers: question.answers,
          answer: null,
        }
        tempFormData.push(tempJson)
      }
    })
    //Static
    idx++
    tempFormData.push({
      activeStep:idx,
      type_name: 'adress',
      question: 'adress',
      answers: 'adress answers',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep:idx,
      type_name: 'budge',
      question: 'adress',
      answers: 'adress answers',
      answer: null,
    })

    setFormData(tempFormData)
    console.log(data)
    console.log(tempFormData)
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
