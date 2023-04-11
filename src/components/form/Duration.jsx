import { useContext, useState } from 'react'
import Question from './Question'
import ServiceContext from '../../context/serviceContext'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Duration = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)
  const [startDate, setStartDate] = useState(
    formData[activeStep].answer === null
      ? new Date()
      : new Date(formData[activeStep].answer)
  )

  const handleDate = (date) => {
//     const today = new Date()

// //     const dateStr = date.toLocaleDateString('tr-TR')
// //     const todayStr = today.toLocaleDateString('tr-TR')
// //     console.log(todayStr)
// //     if (dateStr === todayStr) {
// //       console.log('İki tarih aynı günde.')
// //     } else if (today > date) {
// //       console.log('today büyük')
// //     } else {
// //       console.log('date küçük')
// //     }

    setStartDate(date)
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep ? { ...item, answer: date } : item
      )
    )
  }

  return (
    <div className="flex flex-col  overflow-auto">
      <Question data={data} />

      <DatePicker
        className="w-full rounded-md border border-gray-300/40 bg-zinc-50  p-4 text-center  hover:cursor-context-menu hover:border-gray-600 focus:border-gray-600 focus:outline-none"
        dateFormat="dd/MM/yyyy"
        placeholderText="Proje Bitiş Tarihi"
        selected={startDate}
        onChange={handleDate}
      />
    </div>
  )
}

export default Duration
