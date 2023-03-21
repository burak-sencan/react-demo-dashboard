import { Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/authContext'
import api from '../context/api'
import Loading from '../pages/dashboard/utils/Loading'

const ProtectedRecipientsRoute = ({ children }) => {
  const { token, selfData, setSelfData } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  const getSelfData = async (token) => {
    api.getSelfClient(token).then((response) => {
      setSelfData(response)
      setLoading(false)
      console.log('ProtecteRecipientsRoute: ' + response.data.result.account_type)
    })
  }

  useEffect(() => {
    getSelfData(token)
  }, [])

  if (loading) {
    return <Loading/>
  } else {
    if (selfData.data.result.account_type === '1') {
      return children
    } else {
      return <Navigate to={'/'} replace />
    }
  }
}

export default ProtectedRecipientsRoute
