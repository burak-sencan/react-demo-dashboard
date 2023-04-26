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
    console.log('prepareFormData: ', data)
    // bazı servislerin soruları bulunmamakta.
    // eger sorular varsa soru tipine göre gelen sorular için tempFormData dizisini oluşturuyorum.
    // dizi hazırlandıktan statik sorularıda ekleyip setFormData'ya set ediyorum.
    // formData verisi ilgili servisin tüm sorularını tutuyor. alanların ne işe yaradıklarını ilk json dizisinde yorum olarak ekledim.
    if (data.questions !== null) {
      data.questions.map((question) => {
        if (question.type_id === 6) {
          let tempJson = {
            activeStep: idx, // formda ileri geri gitmek için kullanılıyor. activeStep render edilen component olacak.
            service_id: data.id, // cevapları gönderirken backend için lazımdı.
            service_name: data.name, // formun içinde header kısmında gösteriliyor.
            question_id: question.id, // cevapları gönderirken backend için lazımdı.
            type_id: question.type_id, // sorular raido button, select box, plus gibi tiplerde bakendnden geliyor. bu tipe bakarak raio ise soruyu radio butonda render ediyorum. bu kontrolu <QuestionTypes> komponenti yapıyor. 
            question: question.label, // ilgili servisin soruları 
            answers: question.answers, // ilgili servisin sorularının cevapları
            answer: null, // kullanıcının answers'tan gelen cevaplardan birini seçince hangi cevabın seçildiğini tutan değişken.
          }
          tempFormData.push(tempJson)
        } else if (question.type_id === 5) {
          let tempJson = {
            activeStep: idx,
            service_id: data.id,
            service_name: data.name,
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
            service_name: data.name,
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
            service_name: data.name,
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
            service_name: data.name,
            type_id: question.type_id,
            question: question.label,
            answer: null,
          }
          tempFormData.push(tempJson)
        } else if (question.type_id === 'textarea') {
          let tempJson = {
            activeStep: idx,
            service_id: data.id,
            service_name: data.name,
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

    // Her servisin sonuna eklenen bazı sorular var bunlar adres, ne kadar zaman alacak, bütçe gibi sorular. Bu sorularıda her servisin sorularının sonuna ekliyorum.
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      service_name: data.name,
      type_id: 'adress',
      question: 'Adres',
      answer: null,
    })

    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      service_name: data.name,
      type_id: 'duration',
      question: 'Ne kadar Zaman Alacak',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      service_name: data.name,
      type_id: 'showBudget',
      question: 'Bütçe',
      answers: [
        { id: 1, text: '1.000 - 5.000 ₺', value: '1000' },
        { id: 2, text: '5.000 - 10.000 ₺', value: '5000' },
        { id: 3, text: '10.000 - 15.000 ₺', value: '10000' },
        { id: 4, text: '15.000 - 30.000 ₺', value: '15000' },
        { id: 5, text: '30.000 - 50.000 ₺', value: '30000' },
        { id: 6, text: '50.000 - 100.000 ₺', value: '50000' },
        { id: 7, text: '100.000+ ₺', value: '100000' },
      ],
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      service_name: data.name,
      type_id: 'workDetail',
      question: 'İş Detayi',
      answer: null,
    })
    idx++
    tempFormData.push({
      activeStep: idx,
      service_id: data.id,
      service_name: data.name,
      type_id: 'canSeeNumber',
      question: 'Numaran Gösterilsin mi',
      answer: '1',
    })

    setFormData(tempFormData)
    console.log('tempFormData: ', tempFormData)

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
