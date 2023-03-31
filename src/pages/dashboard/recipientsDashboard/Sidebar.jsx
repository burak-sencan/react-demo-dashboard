import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import EmailIcon from '@mui/icons-material/Email'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import { Divider, Stack } from '@mui/material'

const recipients = [
  {
    id: '1',
    text: 'Gösterge Paneli',
    url: 'panel',
    icon: <HomeIcon />,
  },
  { id: '2', text: 'Verilen İlanlar', url: 'advert', icon: <LocalOfferIcon /> },
  { id: '4', text: 'Mesajlar', url: 'message', icon: <EmailIcon /> },
  { id: '5', text: 'Ayarlar', url: 'settings', icon: <SettingsIcon /> },
]

const Sidebar = ({ toggle, isOpen }) => {
  const location = useLocation()
  const isItemActive = (item) => location.pathname.includes(item.url)

  return (
    <div className="hide-scrollbar-f hide-scrollbar-c flex h-full flex-col items-center overflow-auto bg-white pt-4 dark:!bg-dark-900">
      <MenuIcon
        onClick={toggle}
        className={`${
          isOpen === false ? 'self-center' : 'self-end'
        } mb-2  !text-dark-900  dark:!text-lime-50`}
      />
      <Stack
        gap={0.6}
        divider={
          <Divider
            orientation="horizontal"
            flexItem
            className="dark:border-white/40"
          />
        }
      >
        {recipients.map((item) => (
          <Link
            className="flex w-full justify-start"
            to={item.url}
            key={item.id}
          >
            <button
              className={`${
                isItemActive(item)
                  ? '!bg-slate-200 !text-dark-800  dark:!bg-gray-700 dark:!text-white'
                  : '!text-gray-400 hover:!text-dark-800 dark:hover:!text-stone-100'
              } flex-start flex gap-2 overflow-hidden  rounded-md text-left transition ${
                isOpen === false
                  ? 'flex !w-32 justify-center !px-0 !py-2'
                  : '!w-full !p-2'
              } `}
            >
              {item.icon}
              {isOpen && item.text}
            </button>
          </Link>
        ))}
      </Stack>
    </div>
  )
}

export default Sidebar
