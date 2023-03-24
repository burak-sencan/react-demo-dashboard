import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../context/api'
import AuthContext from '../context/authContext'
import Loading from '../pages/dashboard/utils/Loading'

const ProtectedEmployeeRoute = ({ children }) => {
  const { token, selfData, setSelfData } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  const getSelfData = async (token) => {
    api.getSelfClient(token).then((response) => {
      setSelfData(response)
      setLoading(false)
    })
  }

  useEffect(() => {
    getSelfData(token)
  }, [])

  if (loading) {
    return <Loading />
  } else {
    if (selfData.data.result.account_type === '2') {
      return children
    } else {
      return <Navigate to={'/'} replace />
    }
  }
}

export default ProtectedEmployeeRoute
