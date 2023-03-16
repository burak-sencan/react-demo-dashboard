import { createContext, useState } from 'react'

const getToken = localStorage.getItem('token')
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken ? getToken : '')
  const [selfData, setSelfData] = useState('')

  return (
    <AuthContext.Provider
      value={{
        token,
        selfData,
        setToken,
        setSelfData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
