/*
Path: "/employeeDashboard"
Component: <EmployeeDashboard/>
Sidebar ve sag kısımda Outlet komponenti bulunan dashboard komponent. 
/employeeDashboard içindeki bir url değişikliği <Outlet /> komponenti içinde render ediliyor.
Sidebardan tıklanılan urller burda render ediliyor. 
*/

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const EmployeeDashboard = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex  h-[calc(100vh_-_3rem)] w-full justify-between ">
      <div
        className={`${
          isOpen === false ? 'w-12' : 'w-52'
        } flex h-full flex-col overflow-hidden bg-white p-2 dark:!bg-dark-900`}
      >
        <Sidebar toggle={toggle} isOpen={isOpen} />
      </div>
      <div className="w-full overflow-auto ">
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard
