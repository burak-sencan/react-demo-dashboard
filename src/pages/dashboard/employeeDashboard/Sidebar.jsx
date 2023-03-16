import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import EmailIcon from '@mui/icons-material/Email'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import WalletIcon from '@mui/icons-material/Wallet'
import AddToQueueIcon from '@mui/icons-material/AddToQueue'
import { Box, Divider, Stack } from '@mui/material'

const employers = [
  {
    id: '1',
    text: 'Gösterge Paneli',
    url: 'panel',
    icon: <HomeIcon />,
  },
  {
    id: '2',
    text: 'İş Fırsatları',
    url: 'jobOpportunities',
    icon: <LocalOfferIcon />,
  },
  {
    id: '3',
    text: 'Teklif Verdiklerim',
    url: 'myBids',
    icon: <LocalOfferIcon />,
  },
  {
    id: '4',
    text: 'Kazandığım Teklifler',
    url: 'getBids',
    icon: <LocalOfferIcon />,
  },
  { id: '5', text: 'Mesajlar', url: 'message', icon: <EmailIcon /> },
  {
    id: '6',
    text: 'Sitenizi Ekleyin',
    url: 'addToYourSite',
    icon: <AddToQueueIcon />,
  },
  { id: '7', text: 'Cüzdanım', url: 'wallet', icon: <WalletIcon /> },
  { id: '8', text: 'Ayarlar', url: 'settings', icon: <SettingsIcon /> },
]

const Sidebar = ({ toggle, isOpen }) => {
  const [idx, setIdx] = useState('1')

  return (
    <div className="hide-scrollbar-f hide-scrollbar-c flex h-full flex-col items-center overflow-auto bg-white pt-4 dark:!bg-dark-900">
      <MenuIcon
        onClick={toggle}
        className={`${
          isOpen === false ? 'self-center' : 'self-end'
        } mb-2  !text-dark-900  dark:!text-lime-50`}
      />
      <Stack gap={0.5} divider={<Divider orientation="horizontal" flexItem />}>
        {employers.map((item) => (
          <Link
            className="flex w-full justify-start"
            to={item.url}
            key={item.id}
          >
            <button
              className={`${
                idx === item.id
                  ? '!bg-slate-200 !text-dark-800  dark:!bg-gray-700 dark:!text-white'
                  : '!text-gray-400 hover:!text-dark-800 dark:hover:!text-stone-100'
              } flex-start flex gap-2 overflow-hidden  rounded-md text-left transition ${
                isOpen === false
                  ? 'flex !w-32 justify-center !px-0 !py-2'
                  : '!w-full !p-2'
              } `}
              onClick={() => {
                setIdx(item.id)
              }}
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
