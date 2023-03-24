import { useContext, useEffect, useState } from 'react'
import api from '../context/api'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Link } from 'react-router-dom'
import ServiceContext from '../context/serviceContext'
import AuthContext from '../context/authContext'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { Tooltip } from '@mui/material'

const ServiceSearch = () => {
  const { services, setServices, setFormData } = useContext(ServiceContext)
  const { selfData } = useContext(AuthContext)
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if (services.length === 0) {
      api.getServices(value).then((response) => {
        setServices(response.data.result)
      })
    }

    setFormData([]) //Resetting form data for new search
  }, [])

  const handleResult = (e) => {
    const textInput = e.target.value
    let tempData = []
    setValue(textInput)
    services.map((obj) => {
      if (obj.name.toLowerCase().includes(textInput.toLowerCase())) {
        tempData.push(obj)
      }
    })
    setResults(tempData.slice(0, 20)) //limit
  }

  return (
    <>
      <div className="flex w-full rounded-md bg-white shadow-md lg:w-[500px]">
        <input
          className="h-12 w-full rounded-md p-4 focus:outline-none"
          placeholder="Hizmet Ara"
          value={value}
          onChange={handleResult}
        />
        <div className="flex items-center p-2 text-gray-500">
          {value === '' ? (
            <SearchIcon />
          ) : (
            <Tooltip title="Temizle">
              <button
                onClick={(e) => {
                  setValue('')
                }}
              >
                <ClearIcon />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {results.length > 0 && value.length > 0 && (
        <Paper className="mt-2">
          <List className="max-h-60 overflow-auto">
            {results.map((result) => (
              <ListItem key={result.id} disablePadding>
                <Link
                  className="w-full"
                  to={selfData !== '' ? `service/${result.id}` : 'login'}
                >
                  <ListItemButton>
                    <ListItemText primary={result.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  )
}

export default ServiceSearch
