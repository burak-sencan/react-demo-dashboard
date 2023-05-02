import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import AuthContext from '../../../context/authContext'
import axios from 'axios'

const ErrorHelpForm = () => {
  const location = useLocation()
  const { selfData } = useContext(AuthContext)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [formData, setFormData] = useState({
    IPv4: '',
    fullname: selfData.data.result.full_name,
    page: location.pathname.split('/').pop(),
    email: selfData.data.result.email,
    telno: selfData.data.result.phone,
    title: '',
    message: '',
  })
  const { fullname, email, telno, title, message } = formData

  const onChangeForm = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      await axios.get('https://geolocation-db.com/json/').then((res) => {
        console.log(res.data)
        setFormData((prevState) => ({
          ...prevState,
          IPv4: res.data.IPv4,
        }))
        console.log(formData)
      })
    } catch (error) {
      console.log(error)
      console.log(formData)
    }
  }

  return (
    <div>
      <button
        onClick={handleOpen}
        className="  hover: flex  h-12 w-12 flex-col items-center  justify-center gap-2 rounded-full bg-lime-400 text-xs  text-white shadow-md transition hover:bg-lime-500 "
      >
        <p>Hata Bildir</p>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 max-h-[100vh] w-2/3 -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-md bg-white p-8 shadow-md dark:bg-slate-800 lg:w-1/2">
          <form className="flex flex-col" onSubmit={onSubmitForm}>
            <label
              htmlFor="fullname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Adı Soyad
              <input
                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                type="text"
                name="fullname"
                id="fullname"
                value={fullname}
                required="required"
                onChange={onChangeForm}
              />
            </label>
            <label
              htmlFor="fullname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
              <input
                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                type="text"
                name="email"
                id="email"
                value={email}
                required="required"
                onChange={onChangeForm}
              />
            </label>
            <label
              htmlFor="fullname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Telefon
              <input
                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                type="text"
                name="telno"
                id="telno"
                value={telno}
                required="required"
                onChange={onChangeForm}
              />
            </label>
            <label
              htmlFor="fullname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Konu Başlığı
              <input
                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                type="text"
                name="title"
                id="title"
                value={title}
                required="required"
                onChange={onChangeForm}
              />
            </label>
            <label
              htmlFor="fullname"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Mesaj
              <textarea
                className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 transition focus:bg-slate-200 focus:outline-none dark:border-gray-600  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:bg-slate-100 dark:focus:text-slate-900 dark:focus:ring-blue-500 sm:text-sm"
                name="message"
                id="message"
                value={message}
                required="required"
                onChange={onChangeForm}
                cols="20"
                rows="5"
              ></textarea>
            </label>
            <button
              type="submit"
              className="h-10 w-full rounded-md bg-lime-600 text-lime-300 transition hover:text-white"
            >
              Gönder
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
export default ErrorHelpForm
