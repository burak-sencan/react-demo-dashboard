import { useContext, useState } from 'react'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DateTimePicker from 'react-datetime-picker'
import CloseIcon from '@mui/icons-material/Close'
import { Divider } from '@mui/material'
import '../../utils/reactDatetime.css'
import { ToastContainer, toast } from 'react-toastify'

const EmployeeShowBudgetTransfer = ({ handleClose, bankAcccountId }) => {
  const { token } = useContext(AuthContext)
  const [date, setDate] = useState(new Date())

  const handleChange = (newDate) => {
    setDate(newDate)
  }

  const [formData, setformData] = useState({
    full_name: '',

    amount: '',
  })
  const { full_name, amount } = formData

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const formattedDate = date.toISOString().slice(0, 10)
      const formattedTime = date.toTimeString().slice(0, 8)
      const sending_datetime = `${formattedDate} ${formattedTime}`

      const data = {
        full_name,
        bank_account_id: bankAcccountId,
        sending_datetime,
        amount,
      }

      const response = await api.bankTransferNotify(token, data)
      toast(response?.data?.message)
    } catch (error) {
      console.error('Hata: ', error)
    }
  }

  return (
    <div className="flex  w-full flex-col gap-4 dark:bg-dark-800">
      <div>
        <div className="flex justify-end gap-2">
          <button
            className="m-0 flex items-center rounded-full p-1 transition hover:bg-gray-400 hover:text-white dark:text-white"
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </button>
        </div>
        <Divider sx={{ margin: 2 }} />
      </div>
      <form className="space-y-4 p-2 md:space-y-6" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="full_name"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Ad Soyad
            <input
              type="text"
              value={full_name}
              onChange={onChange}
              name="full_name"
              id="full_name"
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
              required="required"
            />
          </label>
        </div>

        <div>
          <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Tarih
          </p>
          <DateTimePicker
            onChange={handleChange}
            value={date}
            format="yyyy-MM-dd HH:mm:ss"
            className="w-full rounded-md border border-gray-300 bg-gray-50 text-gray-900 transition focus:bg-slate-200 focus:outline-none sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Miktar
            <input
              type="number"
              min="0"
              value={amount}
              onChange={onChange}
              name="amount"
              id="amount"
              className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
              required="required"
            />
          </label>
        </div>

        <button
          type="submit"
          className="h-10 w-full rounded-md bg-lime-600 text-lime-300 transition hover:text-white"
        >
          Gönder
        </button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default EmployeeShowBudgetTransfer
