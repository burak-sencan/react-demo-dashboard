/*
Path: "/employeeDashboard"
Component: <ProtectedEmployeeRoute/>
dashboardlara login olursa girebilmesi gerekiyor bu yüzden.
token varmı onu kontrol edip varsa selfDatasına fetch atıyorum.
Eger self data varsa dashboard ekranına erişebiliyor.
Sidebar ve sag kısımda Outlet komponenti bulunan dashboard komponent.
/employeeDashboard içindeki bir url değişikliği <Outlet /> komponenti içinde render ediliyor. sidebardan tıklanılan urller burda render ediliyor. 
*/
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../context/api'
import AuthContext from '../context/authContext'
import Loading from '../components/Loading'

const ProtectedEmployeeRoute = ({ children }) => {
  const { token, setSelfData, selfData } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  const getSelfData = async (token) => {
    api.getSelfClient(token).then((response) => {
      setSelfData(response)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (token === '') <Navigate to={'/'} replace />

    getSelfData(token)
  }, [])

  if (loading) {
    return <Loading />
  } else {
    if (selfData === '') return <Loading />
    if (selfData?.data?.result?.account_type === '2') {
      return children
    } else {
      return <Navigate to={'/'} replace />
    }
  }
}

export default ProtectedEmployeeRoute
