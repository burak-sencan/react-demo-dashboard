import { useState, useEffect } from 'react'
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

import { Link } from 'react-router-dom'

const Header = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'light' ? 'dark' : 'light'
  )
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
    <header className="flex h-10 items-center justify-between bg-slate-900 p-4 text-white dark:bg-white dark:text-black">
      <Link to="/">
        <FaHome />
      </Link>

      <ul className=" flex items-center gap-4">
        <li>
          <button onClick={toggleTheme}>
            {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
          </button>
        </li>
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
      </ul>
    </header>
  )
}

export default Header
