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
            <div className="bg-slate-50 dark:bg-slate-900">
              <div
                className="
              hover:dark:gray-900
              fixed 
              z-10  
              w-full 
              bg-gray-900/90 
              backdrop-blur-sm
              transition-all
              hover:bg-gray-900
              hover:backdrop-blur-none 
              dark:bg-gray-600/90
              dark:hover:bg-gray-600
               "
              >
                <Header />
              </div>
              <div className="flex min-h-[100vh] items-center justify-center w-full pt-12">
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/service/:id" element={<Service />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </ServiceProvider>
      </AuthProvider>
    </>
  )
}

export default App
