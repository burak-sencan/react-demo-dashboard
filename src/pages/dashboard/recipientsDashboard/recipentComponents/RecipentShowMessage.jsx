import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../../context/api'
import AuthContext from '../../../../context/authContext'
import DashboardContent from '../../utils/DashboardContent'
import Loading from '../../../../components/Loading'
import { Tooltip } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { toast, ToastContainer } from 'react-toastify'
import TopNav from '../../utils/TopNav'
const RecipentShowMessage = () => {
  const { reqid, recid } = useParams()
  const { token, selfData } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [messageText, setMessageText] = useState('')
  const [data, setData] = useState([])
  const bottomRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.getSelfRequestMessages(token, reqid, recid).then((response) => {
      setData(response.data.result)

      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data])

  const onSubmit = async (e) => {
    e.preventDefault()

    if (messageText !== '') {
      try {
        const response = await api.sendRequestMessage(token, {
          message: messageText,
          recipient_id: selfData.data.result.id,
          employer_id: recid,
          request_id: reqid,
          bid_id: data[0].bid_id,
          sender_id: data[0].sender_id,
        })

        const requestMessageResponse = await api.getSelfRequestMessages(
          token,
          reqid,
          recid
        )

        setData(requestMessageResponse.data.result)
        setMessageText('')
        toast('Mesaj Gönderildi.')
        toast('Mesajlar bölümüne yönlendiriliyorsunuz.')
        setTimeout(() => {
          navigate('/recipentDashboard/message/')
        }, 3000)
      } catch (error) {
        console.error('Hata: ', error)
      }
    } else {
      toast('Boş mesaj gönderilemez!')
    }
  }

  if (isLoading) return <Loading />

  return (
    <>
      <DashboardContent>
        <div>
          <TopNav url={'/recipentDashboard/message'} text={'Mesaj'} />
          <div className=" flex h-[50vh] flex-col gap-2 overflow-auto rounded-md bg-white p-2 shadow-md dark:bg-dark-900 dark:text-dark-900">
            {data.map((message, idx) => (
              <div
                key={idx}
                className={`${
                  selfData.data.result.id === message.sender_id
                    ? 'self-end bg-light-50 dark:bg-neutral-700'
                    : 'self-start dark:bg-neutral-500'
                } mb-2 w-full shrink-0 overflow-auto rounded-md p-2 shadow-md  lg:w-96 2xl:w-[32rem]`}
              >
                <div className="flex h-full flex-col justify-between ">
                  <p className="text-dark-900 dark:text-white">
                    {message.message}
                  </p>
                  <div className="self-end text-xs text-gray-400 dark:text-white">
                    {selfData.data.result.id === message.sender_id ? (
                      <p>{message.recipient_name}</p>
                    ) : (
                      <p>{message.employer_details.full_name}</p>
                    )}
                    <p>{message.created_at.slice(10)}</p>
                    {/* <p>
                      {message.created_at.slice(8, 10)}/
                      {message.created_at.slice(5, 7)}/
                      {message.created_at.slice(0, 4)}
                    </p> */}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
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
            placeholder="Mesaj"
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

export default RecipentShowMessage
