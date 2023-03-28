import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import AuthContext from '../../../../context/authContext'
import api from '../../../../context/api'
import { useNavigate } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const RecipentSettings = () => {
  const { token, setToken, selfData, setSelfData } = useContext(AuthContext)
  const navigate = useNavigate()

  //formStates
  const [fullName, setfullName] = useState('')
  const [accountType, setAccountType] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [showPass, setShowPass] = useState(false) //hide show password
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (newPassword !== newPasswordRepeat) {
      toast('Şifreler birbiri ile aynı değil.')
    } else {
      const userData = {
        account_type: accountType,
        email: email,
        current_password: password,
        // phone: phone,
        new_password: newPassword,
        new_password_repeat: newPasswordRepeat,
      }
      updateUser(userData)
    }
  }

  //update user
  const updateUser = async (userData) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/updateSelfClient',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        if (response.data.status === 201) {
          localStorage.setItem('token', response.data.result.token)
          setToken(response.data.result.token)
          getSelfData(response.data.result.token)
          toast('Güncelleme Başarılı.')
        }
        if (response.data.status === 401) {
          toast('Hata Oluştu.')
        }
      }
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const getSelfData = async (token) => {
    api.getSelfClient(token).then((response) => {
      setSelfData(response)
      if (response.data.result.account_type === '2') {
        navigate('/employeeDashboard/settings')
      }
    })
  }

  useEffect(() => {
    setfullName(selfData.data.result.full_name)
    setAccountType(selfData.data.result.account_type)
    setEmail(selfData.data.result.email)
    setPhone(selfData.data.result.phone)
  }, [])

  // const handleChangeRadio = (e) => {
  //   setAccountType(e.target.value)
  // }

  return (
    <DashboardContent>
      <form
        onSubmit={onSubmit}
        className="flex min-h-[100%] flex-col justify-around gap-8  rounded-md bg-white dark:bg-dark-900 lg:flex-row lg:p-2"
      >
        <div className="flex flex-col gap-8 rounded-md bg-white p-2 text-dark-800 dark:bg-dark-900 dark:text-light-50 lg:w-[500px] lg:gap-4 lg:p-4">
          <label className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <span>Adı</span>
            <input
              className="rounded-md bg-light-50 p-4 dark:text-dark-800"
              disabled
              defaultValue=""
              value={fullName}
              onChange={(e) => {
                setfullName(e.target.value)
              }}
              name="fullName"
            />
          </label>
          <label className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <span>Hizmet Tipiniz</span>

            {selfData.data.result.account_type === '1' ? (
              <input
                disabled
                value="Hizmet Alan"
                className="rounded-md bg-slate-100 p-4 dark:text-dark-800"
              />
            ) : selfData.data.result.account_type === '2' ? (
              <input
                disabled
                value="Hizmet Veren"
                className="rounded-md bg-slate-100 p-4 dark:text-dark-800"
              />
            ) : (
              <input
                disabled
                value="Hizmet Tipi Belirsiz"
                className="rounded-md bg-slate-100 p-4 dark:text-dark-800"
              />
            )}
          </label>

          <div className="flex flex-col items-center justify-between gap-4">
            <label className="flex  w-full flex-col items-center justify-between gap-4 lg:flex-row">
              E-posta
              <input
                className=" rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
                value={email}
                disabled
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                name="email"
              />
            </label>
            <label className="flex  w-full flex-col items-center justify-between gap-4 lg:flex-row">
              Telefon
              <input
                disabled
                className=" rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                }}
                name="phone"
              />
            </label>
          </div>
        </div>

        {/* Custom dividerF */}
        <div className="h-[1px] w-full rounded-md bg-gray-400 opacity-40 lg:block lg:h-auto lg:w-[1px]"></div>

        <div className="flex flex-col justify-between gap-4 rounded-md bg-white p-2 text-dark-800 dark:bg-dark-900  dark:text-light-50 lg:p-4">
          <div className="flex flex-col gap-4 lg:w-96">
            <label className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              Şifre
              <div className="flex items-center gap-2">
                <input
                  type={showPass ? 'text' : 'password'}
                  className=" rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
                <div
                  className="dark:text-white"
                  onClick={() => {
                    setShowPass(!showPass)
                  }}
                >
                  {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
            </label>
            <label className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              Yeni Şifre
              <input
                type={showPass ? 'text' : 'password'}
                className=" rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
                name="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                }}
              />
            </label>
            <label className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              Yeni Şifre Tekrar
              <input
                type={showPass ? 'text' : 'password'}
                className=" rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
                name="newPasswordRepeat"
                value={newPasswordRepeat}
                onChange={(e) => {
                  setNewPasswordRepeat(e.target.value)
                }}
              />
            </label>
          </div>
          <button
            className="w-full rounded-md bg-lime-600 py-4 px-8 text-slate-200 shadow-md transition hover:text-white lg:w-96"
            type="submit"
          >
            Gönder
          </button>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </DashboardContent>
  )
}

export default RecipentSettings
