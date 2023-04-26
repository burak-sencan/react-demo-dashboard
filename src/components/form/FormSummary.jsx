// formda daha önce cevaplanan soruların gösterildiği özet ekranı

import { useContext, useEffect, useState } from 'react'
import ServiceContext from '../../context/serviceContext'
import Loading from '../Loading'

const FormSummary = () => {
  const { formData, provinceName, countieName, districtName } =
    useContext(ServiceContext)
  const [data, setData] = useState([])

  useEffect(() => {
    let questions_and_values = []
    let service_id
    let city_id
    let countie_id
    let district_id
    let duration
    let workDetail
    let canSeeNumber
    let showBudget
    let budget

    formData.forEach((item) => {
      if (item.question_id != null) {
        service_id = item.service_id
        questions_and_values.push({
          question: item.question,
          answer: item.answer,
        })
      } else {
        if (item.type_id === 'adress') {
          city_id = item.answer[0]
          countie_id = item.answer[1]
          district_id = item.answer[2]
        }
        if (item.type_id === 'duration') {
          //convert to dd/mm/yyyy
          const date = new Date()
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const day = date.getDate().toString().padStart(2, '0')
          const formattedDate = `${year}-${month}-${day}`

          duration = formattedDate
        }
        if (item.type_id === 'workDetail') {
          workDetail = item.answer
        }
        if (item.type_id === 'canSeeNumber') {
          canSeeNumber = item.answer
        }
        if (item.type_id === 'showBudget') {
          if (item.answer === 0) {
            showBudget = 0
            budget = 0
          } else {
            showBudget = 1
            budget = item.answer
          }
        }
      }
    })

    setData({
      questions_and_values: questions_and_values,
      city_id: city_id,
      countie_id: countie_id,
      district_id: district_id,
      duration: duration,
      details: workDetail,
      can_see_number: canSeeNumber,
      show_budget: showBudget,
      budget: budget,
      service_id: service_id,
    })
  }, [])

  if (data.length === 0) {
    return <Loading />
  }

  return (
    <div className="h-full overflow-auto ">
      <div className="flex  min-h-[100%] flex-col justify-between gap-8 rounded-md">
        {/* Buget Info */}
        <p className="mt-4 rounded-md bg-light-50 p-4 text-center text-xl text-lime-600">
              Talep Temel Cevapları
            </p>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full  overflow-hidden rounded-md shadow-sm">
            <p className="w-1/2 shrink-0 bg-light-50 p-4  dark:text-dark-800">
              Adres
            </p>
            <div className="flex w-full flex-col gap-2 p-4">
              <p className="flex  justify-between text-dark-800 ">
                <span>İl</span> <span className="pr-3.5">{provinceName}</span>
              </p>
              <p className="flex  justify-between text-dark-800 ">
                <span>İlçe</span> <span className="pr-3.5">{countieName}</span>
              </p>
              <p className="flex  justify-between text-dark-800 ">
                <span>Mahalle</span>
                <span className="pr-3.5">{districtName}</span>
              </p>
            </div>
          </div>
          <div className="flex w-full  rounded-md shadow-sm">
            <p className="w-1/2 bg-light-50 p-4  dark:text-dark-800">Süre</p>
            <p className="rounded-md p-4 text-dark-800 ">
              {data.duration.slice(8, 10)}/{data.duration.slice(5, 7)}/
              {data.duration.slice(0, 4)}
            </p>
          </div>
          <div className="flex w-full  rounded-md shadow-sm">
            <p className="w-1/2 bg-light-50 p-4  dark:text-dark-800">Bütçe</p>
            <p className="rounded-md p-4  ">
              {data.show_budget === 0 ? 'Belirtmek İstemiyorum' : data.budget}
            </p>
          </div>
          <div className="flex w-full  rounded-md shadow-sm">
            <p className="w-1/2 flex-shrink-0 bg-light-50 p-4  dark:text-dark-800">
              İş Detayı
            </p>
            <p className="rounded-md p-4 text-dark-800">{data.details}</p>
          </div>
          <div className="flex w-full  rounded-md shadow-sm">
            <p className="w-1/2 bg-light-50 p-4  dark:text-dark-800">
              Numaran Gösterilsin Mi
            </p>
            <p className="rounded-md p-4 text-dark-800 ">
              {data.can_see_number === '1' ? 'Gösterilsin' : 'Gösterilmesin'}
            </p>
          </div>
        </div>

        {data?.questions_and_values?.length !== 0 && (
          <>
            <p className="mt-4 rounded-md bg-light-50 p-4 text-center text-xl text-lime-600">
              Talep Detayları
            </p>
            {data?.questions_and_values?.map((question, idx) => (
              <div className="flex flex-col gap-4 rounded-md" key={idx}>
                <div className=" flex  rounded-md  shadow-sm">
                  <p className=" w-1/2 flex-shrink-0  bg-light-50 p-4 dark:text-dark-800">
                    {question.question}
                  </p>
                  <p className="p-4 text-dark-800">
                    {typeof question.answer === 'string' ? (
                      <span>{question.answer}</span>
                    ) : (
                      question.answer.map((item, idx) => (
                        <p key={idx}>{item}</p>
                      ))
                    )}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default FormSummary
