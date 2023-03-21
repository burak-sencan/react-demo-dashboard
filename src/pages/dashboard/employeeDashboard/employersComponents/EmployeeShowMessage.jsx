import { useContext, useEffect, useState } from 'react'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DashboardContent from '../../utils/DashboardContent'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider, Tooltip } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Loading from '../../utils/Loading'
import { toast, ToastContainer } from 'react-toastify'

const EmployeeShowMessage = () => {
  const { reqid, recid } = useParams()
  const { token, selfData } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    api.getSelfRequestMessages(token, reqid, recid).then((response) => {
      console.log(response.data.result)
      console.log(selfData)
      setData(response.data.result)
      setIsLoading(false)
    })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    api
      .sendRequestMessage(token, {
        message: messageText,
        employer_id: selfData.data.result.id,
        recipient_id: recid,
        request_id: reqid,
      })
      .then((response) => {
        api.getSelfRequestMessages(token, reqid, recid).then((response) => {
          setData(response.data.result)
          setMessageText('')
          toast('Mesaj Gönderildi.')
        })
      })
  }

  if (isLoading) return <Loading />

  return (
    <>
      <DashboardContent>
        <div className="">
          <Link to="/employeeDashboard/message/">
            <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
          </Link>
          <div className="m-2">
            <Divider />
          </div>
          <div className=" flex max-h-[60vh] flex-col overflow-auto bg-white p-2 shadow-md dark:bg-dark-900 dark:text-dark-900">
            {data.map((message) => (
              <div
                key={message.id}
                className={`${
                  selfData.data.result.id === message.sender_id
                    ? 'self-end bg-light-50 dark:bg-green-500/100'
                    : 'self-start dark:bg-gray-100'
                } hide-scrollbar-f hide-scrollbar-c mb-2 min-h-[8rem] 2xl:w-[32rem] w-full shrink-0 overflow-auto rounded-md p-4  shadow-md  lg:h-48 lg:w-96`}
              >
                <div className="flex h-full flex-col justify-between ">
                  <p>{message.message}</p>

                  <p className="self-end text-xs text-gray-400">
                    {message.created_at}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          action=""
          onSubmit={onSubmit}
          className="flex gap-4 rounded-md bg-white p-2  dark:bg-dark-900 dark:text-dark-900"
        >
          <textarea
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value)
            }}
            placeholder="Mesaj Gönder."
            type="text"
            className="h-16 w-full rounded-md p-1 focus:outline-none dark:bg-gray-100"
          />
          <button type="submit" className="w-16  dark:text-light-50">
            <Tooltip title="Gönder">
              <SendIcon />
            </Tooltip>
          </button>
        </form>
      </DashboardContent>
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
    </>
  )
}

export default EmployeeShowMessage
