import axios from 'axios'
import { createContext, useState } from 'react'

const AuthContext = createContext()

//for cors policy
const headers = { 'Content-Type': 'text/plain' }

const isLogined = JSON.parse(localStorage.getItem('user'))

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(isLogined ? isLogined : null)

  //register user
  const register = async (userData) => {
    console.log(userData)
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/register',
        userData,
        { headers }
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
