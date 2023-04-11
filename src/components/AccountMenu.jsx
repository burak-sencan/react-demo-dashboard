import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import api from '../context/api'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import LogoutIcon from '@mui/icons-material/Logout'

export default function AccountMenu() {
  const { token, setToken, setSelfData, selfData } = useContext(AuthContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    setAnchorEl(null)
    setToken('')
    setSelfData('')
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const getSelfData = async (token) => {
      api.getSelfClient(token).then((response) => {
        if (!response.data.status) {
          setToken('')
          setSelfData('')
          localStorage.removeItem('token')
        } else {
          setSelfData(response)
        }
      })
    }
    getSelfData(token)
  }, [])

  if (selfData === '') return <p>Yükleniyor...</p>

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Kullanıcı Profili">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img
                src={`${selfData.data.result.image}`}
                alt="profile_image"
                className="rounded-full"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: '15vw',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 0.5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link
          to={
            selfData.data.result.account_type === '1'
              ? '/recipentDashboard'
              : selfData.data.result.account_type === '2'
              ? '/employeeDashboard'
              : null
          }
        >
          <MenuItem>
            <ListItemIcon>
              <DashboardCustomizeIcon />
            </ListItemIcon>
            Kullanıcı Paneli
          </MenuItem>
        </Link>

        <Divider sx={{ marginY: 1 }} />
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
