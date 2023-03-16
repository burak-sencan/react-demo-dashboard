import { useState, useEffect, useContext } from 'react'
import { FaHome, FaSignInAlt, FaUser } from 'react-icons/fa'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

import { Link } from 'react-router-dom'
import AccountMenu from './AccountMenu'
import AuthContext from '../context/authContext'
import { Tooltip } from '@mui/material'

const Header = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'light' ? 'dark' : 'light'
  )
  const { token } = useContext(AuthContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <header className="flex h-12  items-center justify-between  p-4 text-dark-800 dark:text-light-50">
      <Link to="/">
        <FaHome />
      </Link>

      <ul className=" flex items-center gap-4">
        <li>
          <Tooltip
            title={`${theme === 'light' ? 'Karanlık Mod' : 'Aydınlık Mod'}`}
          >
            <button
              className="rounded-full p-2 transition hover:bg-gray-400 hover:text-white"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
            </button>
          </Tooltip>
        </li>
        {token !== '' ? (
          <AccountMenu />
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt />
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser />
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
