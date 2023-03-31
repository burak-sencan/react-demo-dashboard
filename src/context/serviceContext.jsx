/* eslint-disable array-callback-return */
import { createContext, useState } from 'react'

const ServiceContext = createContext()

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([])
  const [formData, setFormData] = useState([])
  const [provinceName, setProvinceName] = useState('')
  const [countieName, setCountieName] = useState('')
  const [districtName, setDistrictName] = useState('')

  const prepareFormData = (data) => {
    let idx = 0
    const tempFormData = []

    //if questions not empty
    console.log(data)
    if (data.questions !== null) {
      data.questions.map((question) => {
        /*------------- */
        //question.type_id : "text,radio,select...."
        // 4 : plus
        /*------------- */
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
        } else if (question.type_id === 4) {
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
    }

    //Static
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      type_id: 'adress',
      question: 'Adres',
      answer: null,
    })

    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      type_id: 'duration',
      question: 'Ne kadar Zaman Alacak',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      type_id: 'showBudget',
      question: 'Bütçe',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      type_id: 'workDetail',
      question: 'İş Detayi',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      type_id: 'canSeeNumber',
      question: 'Numaran Gösterilsin mi',
      answer: '1',
    })

    setFormData(tempFormData)
  }

  return (
    <ServiceContext.Provider
      value={{
        services,
        formData,
        provinceName,
        countieName,
        districtName,
        prepareFormData,
        setServices,
        setFormData,
        setProvinceName,
        setCountieName,
        setDistrictName,
      }}
    >
      {children}
    </ServiceContext.Provider>
  )
}
export default ServiceContext
