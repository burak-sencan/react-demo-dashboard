import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DashboardContent from '../../utils/DashboardContent'
import Loading from '../../utils/Loading'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Divider, Tooltip } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const RecipentShowMessage = () => {
  const { id } = useParams()
  const { token, selfData } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    api.getSelfRequestMessages(token, id).then((response) => {
      console.log(response.data.result)
      console.log(selfData)
      setData(response.data.result)
      setIsLoading(false)
    })
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    api
      .sendRequestMessage(
        token,
        {
          message: messageText,
          recipient_id: selfData.data.result.id,
          employer_id: data[0].employer_id,
        },
        id
      )
      .then((response) => {
        console.log(response)
        api.getSelfRequestMessages(token, id).then((response) => {
          console.log(response.data.result)
          console.log(selfData)
          setData(response.data.result)
        })
      })
  }

  if (isLoading) return <Loading />

  return (
    <DashboardContent>
      <div>
        <Link to="/recipentDashboard/message/">
          <ArrowBackIcon className="text-dark-900 dark:text-light-50" />
        </Link>
        <div className="m-2">
          <Divider />
        </div>
        <div className=" flex max-h-[50vh] overflow-auto flex-col rounded-md bg-white p-2 shadow-md dark:bg-dark-900 dark:text-dark-900">
          {data.map((message) => (
            <div
              key={message.id}
              className={`${
                selfData.data.result.id === message.recipient_id
                  ? 'self-end'
                  : 'self-start'
              } hide-scrollbar-f hide-scrollbar-c mb-2 h-48 w-96 shrink-0 overflow-auto  rounded-md p-4 shadow-md dark:bg-gray-200`}
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
          className="h-16 w-full rounded-md p-1 focus:outline-none dark:bg-gray-200"
        />
        <button type="submit" className="w-16  dark:text-light-50">
          <Tooltip title="Gönder">
            <SendIcon />
          </Tooltip>
        </button>
      </form>
    </DashboardContent>
  )
}

export default RecipentShowMessage
