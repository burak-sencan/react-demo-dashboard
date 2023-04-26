import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { ServiceProvider } from './context/serviceContext'
import Header from './components/Header'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Service from './pages/Service'
import NotFound from './pages/NotFound'
import Blog from './pages/Blog'
import BlogPage from './components/BlogPage'
import HowWorks from './pages/infoPages/HowWorks'
import Help from './pages/infoPages/Help'
import AboutUs from './pages/infoPages/AboutUs'

import {
  EmployeeAddToYourSite,
  EmployeeJobOpportunities,
  EmployeeMessage,
  EmployeeMyBids,
  EmployeeMyGetBids,
  EmployeePanel,
  EmployeeSettings,
  EmployeeWallet,
  EmployeeShowMessage,
  EmployeeShowJobOpportunities,
  EmployeeShowMyBids,
  EmployeeShowMyGetBids,
} from './pages/dashboard/employeeDashboard/employersComponents'
import {
  RecipentAdvert,
  RecipentMessage,
  RecipentSettings,
  RecipentOffer,
  RecipentPanel,
  RecipentShowMessage,
  RecipentShowAdvert,
} from './pages/dashboard/recipientsDashboard/recipentComponents'
import EmployeeDashboard from './pages/dashboard/employeeDashboard/EmployeeDashboard'
import RecipentDashboard from './pages/dashboard/recipientsDashboard/RecipentDashboard'
import ProtectedEmployeeRoute from './components/ProtectedEmployeeRoute'
import ProtectedRecipientsRoute from './components/ProtectedRecipientsRoute'
import Gdpr from './pages/infoPages/Gdpr'

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <BrowserRouter>
          <div className="bg-light-50 dark:bg-dark-800">
            <div className="fixed z-50 w-full bg-white/80 shadow-md backdrop-blur-sm transition-all dark:bg-dark-800/80">
              <Header />
            </div>
            <div className="flex min-h-screen w-full justify-center pt-12">
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="service/:id" element={<Service />} />
                <Route path="login" element={<Login />} />
                <Route path="resetPassword" element={<ResetPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogPage />} />
                <Route path="howWorks" element={<HowWorks />} />
                <Route path="help" element={<Help />} />
                <Route path="aboutUs" element={<AboutUs />} />
                <Route path="gdpr" element={<Gdpr />} />

                {/* ///////////////employeeDashboard///////////////////// */}
                <Route
                  path="employeeDashboard"
                  element={
                    <ProtectedEmployeeRoute>
                      <EmployeeDashboard />
                    </ProtectedEmployeeRoute>
                  }
                >
                  <Route index element={<Navigate to="panel" replace />} />
                  <Route path="panel" element={<EmployeePanel />} />
                  <Route
                    path="jobOpportunities"
                    element={<EmployeeJobOpportunities />}
                  />
                  <Route
                    path="jobOpportunities/:id"
                    element={<EmployeeShowJobOpportunities />}
                  />
                  <Route path="myBids" element={<EmployeeMyBids />} />
                  <Route path="myBids/:id" element={<EmployeeShowMyBids />} />
                  <Route path="getBids" element={<EmployeeMyGetBids />} />
                  <Route
                    path="getBids/:id"
                    element={<EmployeeShowMyGetBids />}
                  />
                  <Route path="message" element={<EmployeeMessage />} />
                  <Route
                    path="message/:reqid/:recid"
                    element={<EmployeeShowMessage />}
                  />
                  <Route
                    path="addToYourSite"
                    element={<EmployeeAddToYourSite />}
                  />
                  <Route path="wallet" element={<EmployeeWallet />} />
                  <Route path="settings" element={<EmployeeSettings />} />
                </Route>

                {/* ///////////////recipentDashboard///////////////////// */}
                <Route
                  path="recipentDashboard"
                  element={
                    <ProtectedRecipientsRoute>
                      <RecipentDashboard />
                    </ProtectedRecipientsRoute>
                  }
                >
                  <Route index element={<Navigate to="panel" replace />} />
                  <Route path="panel" element={<RecipentPanel />} />
                  <Route index path="advert" element={<RecipentAdvert />} />
                  <Route
                    index
                    path="advert/:id"
                    element={<RecipentShowAdvert />}
                  />
                  <Route path="offer" element={<RecipentOffer />} />
                  <Route path="message" element={<RecipentMessage />} />
                  <Route
                    path="message/:reqid/:recid"
                    element={<RecipentShowMessage />}
                  />
                  <Route path="settings" element={<RecipentSettings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ServiceProvider>
    </AuthProvider>
  )
}

export default App
