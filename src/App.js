import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { ServiceProvider } from './context/serviceContext'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Service from './pages/Service'

function App() {
  return (
    <>
      <AuthProvider>
        <ServiceProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/service/:id" element={<Service />} />
            </Routes>
          </BrowserRouter>
        </ServiceProvider>
      </AuthProvider>
    </>
  )
}

export default App
