import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import DashboardContent from '../../utils/DashboardContent'
import Loading from '../../utils/Loading'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const EmployeeSettings = () => {
  const { token, setToken, selfData, setSelfData } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState('')
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])
  const [employeerSkills, setEmployeerSkills] = useState([])

  //formStates
  const [fullName, setFullName] = useState('')
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

  // update user
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
      if (response.data.result.account_type === '1') {
        navigate('/recipentDashboard/settings')
      }
    })
  }
  const handleResult = (e) => {
    const textInput = e.target.value
    let tempData = []
    setValue(textInput)
    services.map((obj) => {
      if (obj.name.toLowerCase().includes(textInput.toLowerCase())) {
        tempData.push(obj)
      }
    })
    setResults(tempData.slice(0, 20)) //limit
  }
  const handleChangeRadio = (e) => {
    setAccountType(e.target.value)
  }

  // Handle add user interesting
  const handleEmployeeSkill = (res) => {
    if (
      !employeerSkills.find(
        (employeerSkill) => employeerSkill.service_id === res.id
      )
    ) {
      if (employeerSkills.length > 9) {
        toast('En fazla 10 adet ilgi alanı eklenebilir.')
        setValue('')
      } else {
        setEmployeerSkills([
          ...employeerSkills,
          {
            service_id: res.id,
            name: res.name,
            client_id: selfData.data.result.id,
          },
        ])
        handleSaveInterested(res)
      }
    } else {
      setValue('')
      toast(`${res.name} Önceden Eklenmiş.`)
    }
  }

  const handleSaveInterested = (data) => {
    api
      .updateClientInterestedServices(token, { service_id: data.id })
      .then((response) => {
        toast(response.data.message)
        setValue('')
      })
      .then(
        api.getClientInterestedServices(token).then((response) => {
          if (response.data.result) {
            setEmployeerSkills(response.data.result)
          } else {
            setEmployeerSkills([])
          }
          setIsLoading(false)
        })
      )
  }

  const handleDelete = (event, id) => {
    const deletedItemId = event.target.value
    const newEmployeerSkills = employeerSkills.filter(
      (employeerSkill) => employeerSkill.service_id !== +deletedItemId
    )

    api
      .deletelientInterestedServices(token, id)
      .then((response) => {
        toast(response.data.message)
        setEmployeerSkills(newEmployeerSkills)
      })
      .then(
        api.getClientInterestedServices(token).then((response) => {
          if (response.data.result) {
            setEmployeerSkills(response.data.result)
          } else {
            setEmployeerSkills([])
          }
          setIsLoading(false)
        })
      )
  }

  useEffect(() => {
    setFullName(selfData.data.result.full_name)
    setAccountType(selfData.data.result.account_type)
    setEmail(selfData.data.result.email)
    setPhone(selfData.data.result.phone)

    api
      .getServices()
      .then((response) => {
        setServices(response.data.result)
      })
      .then(
        api.getClientInterestedServices(token).then((response) => {
          if (response.data.result) {
            setEmployeerSkills(response.data.result)
          } else {
            setEmployeerSkills([])
          }
          setIsLoading(false)
        })
      )
  }, [])

  if (typeof selfData === 'string' || isLoading) {
    return <Loading />
  }

  return (
    <DashboardContent>
      <div className="flex flex-col gap-4">
        {/* İnterested */}
        <div className="flex min-h-[50vh] flex-col justify-between gap-8 rounded-md  bg-white p-2 dark:bg-dark-900 lg:flex-row ">
          <div className="flex flex-col justify-between gap-4">
            <div>
              <p className="p-4 dark:text-light-50 ">İlgi Alanı Ekle</p>
              <div className="flex w-full rounded-md bg-white shadow-md lg:w-[500px]">
                <input
                  className="h-12 w-full rounded-md p-4 focus:outline-none"
                  placeholder="Hizmet Ara"
                  value={value}
                  onChange={handleResult}
                />
                <div className="flex items-center p-2 text-gray-500">
                  {value === '' ? (
                    <SearchIcon />
                  ) : (
                    <Tooltip title="Temizle">
                      <button
                        onClick={(e) => {
                          setValue('')
                        }}
                      >
                        <ClearIcon />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>

              {results.length > 0 && value.length > 0 && (
                <Paper className="relative mt-1 ">
                  <List className="max-h-80 overflow-auto">
                    {results.map((result) => (
                      <Tooltip title="Ekle">
                        <ListItem key={result.id} disablePadding>
                          <ListItemButton
                            onClick={(e) => {
                              handleEmployeeSkill(result)
                            }}
                          >
                            <ListItemText primary={result.name} />
                          </ListItemButton>
                        </ListItem>
                      </Tooltip>
                    ))}
                  </List>
                </Paper>
              )}
            </div>
          </div>
          <div className="w-full">
            <p className="p-4 dark:text-light-50">İlgi Alanlarım</p>
            {employeerSkills.length === 0 ? 'İlgi Alanı Yok' : ''}
            {employeerSkills.map((employeerSkill) => (
              <Tooltip title="Çıkar">
                <button
                  className="m-1 rounded-md border p-4 transition hover:bg-red-400 dark:text-light-50"
                  onClick={(event) => {
                    handleDelete(event, employeerSkill.id)
                  }}
                  value={employeerSkill.service_id}
                  key={employeerSkill.service_id}
                >
                  {employeerSkill.name}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* User Settings */}
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
                  setFullName(e.target.value)
                }}
                name="fullName"
              />
            </label>

            <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
              <label
                htmlFor="account_type"
                className="flex flex-col items-center gap-4 lg:flex-row"
              >
                <span>Hizmet Tipiniz</span>
                {selfData.data.result.account_type === '1' ? (
                  <span className="rounded-md bg-slate-100 p-4 dark:text-dark-800">
                    Hizmet Alan
                  </span>
                ) : selfData.data.result.account_type === '2' ? (
                  <span className="rounded-md bg-slate-100 p-4 dark:text-dark-800">
                    Hizmet Veren
                  </span>
                ) : (
                  <span>Hesap Tipi Yok</span>
                )}
              </label>
              <div className="flex flex-col gap-4">
                <label
                  className={`m-1 rounded-md border p-4 transition hover:cursor-pointer hover:bg-lime-600/50  dark:text-light-50 ${
                    accountType === '1' ? 'bg-lime-600' : ''
                  }`}
                >
                  <input
                    className="hidden"
                    checked={accountType === '1'}
                    type="radio"
                    name="account_type"
                    value="1"
                    onChange={handleChangeRadio}
                  />
                  Hizmet Alan
                </label>
                <label
                  className={`m-1 rounded-md border p-4 transition hover:cursor-pointer hover:bg-lime-600/50 dark:text-light-50 ${
                    accountType === '2' ? 'bg-lime-600' : ''
                  }`}
                >
                  <input
                    className="hidden"
                    checked={accountType === '2'}
                    type="radio"
                    name="account_type"
                    value="2"
                    onChange={handleChangeRadio}
                  />
                  Hizmet Veren
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4">
              <label className="flex  w-full flex-col items-center justify-between gap-4 lg:flex-row">
                E-posta
                <input
                  className="rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
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
                  className="rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
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
                    className="rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none"
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
                  className="rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
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
                  className="rounded-md bg-slate-100 p-4 focus:bg-slate-200 focus:outline-none dark:text-dark-800"
                  name="newPasswordRepeat"
                  value={newPasswordRepeat}
                  onChange={(e) => {
                    setNewPasswordRepeat(e.target.value)
                  }}
                />
              </label>
            </div>

            <button
              className="w-full rounded-md bg-lime-600 py-4 px-8 text-slate-200 shadow-md transition hover:text-white "
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
      </div>
    </DashboardContent>
  )
}

export default EmployeeSettings
