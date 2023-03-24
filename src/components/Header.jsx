import { useState, useEffect, useContext } from 'react'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import LightModeIcon from '@mui/icons-material/LightMode'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import { logo } from '../assets'
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
    <header className="flex h-12  items-center justify-between p-4  text-dark-800 dark:text-light-50">
      <Link to="/" className="rounded-md py-1 px-4 dark:bg-white">
        <img src={logo} className="w-16" alt="biderya-logo" />
      </Link>

      <ul className=" flex items-center gap-4 ">
        <li>
          <Tooltip
            title={`${theme === 'light' ? 'Karanlık Mod' : 'Aydınlık Mod'}`}
          >
            <button
              className="m-0 flex items-center rounded-full p-1 transition hover:bg-gray-400 hover:text-white"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <NightlightRoundIcon /> : <LightModeIcon />}
            </button>
          </Tooltip>
        </li>
        {token !== '' ? (
          <AccountMenu />
        ) : (
          <>
            <li>
              <Link to="/login">
                <Tooltip title="Giriş Yap">
                  <button className="flex items-center justify-center rounded-full p-1 transition hover:bg-gray-400 hover:text-white">
                    <LoginIcon />
                  </button>
                </Tooltip>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Tooltip title="Kayıt Ol">
                  <button className="flex items-center justify-center rounded-full p-1 transition hover:bg-gray-400 hover:text-white">
                    <PersonAddAltIcon />
                  </button>
                </Tooltip>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
