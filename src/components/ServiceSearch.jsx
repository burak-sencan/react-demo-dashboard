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

const ServiceSearch = () => {
  const { setFormData } = useContext(ServiceContext)
  const { selfData } = useContext(AuthContext)
  const [value, setValue] = useState('')
  const [services, setServices] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    api.getServices(value).then((response) => {
      setServices(response.data.result)
    })

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
      <Paper
        component="form"
        sx={{ padding: 0, display: 'flex', alignItems: 'center' }}
        className="w-full  lg:w-[500px]"
      >
        <input
          className="h-12 w-full rounded-md p-4 focus:outline-none"
          placeholder="Hizmet Ara"
          value={value}
          onChange={handleResult}
        />
      </Paper>
      {results.length > 0 && value.length > 0 && (
        <Paper className="mt-2">
          <List className="max-h-80 overflow-auto">
            {results.map((result) => (
              <ListItem key={result.id} disablePadding>
                <ListItemButton>
                  <Link
                    className="w-full"
                    to={selfData !== '' ? `service/${result.id}` : 'login'}
                  >
                    <ListItemText primary={result.name} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  )
}

export default ServiceSearch
