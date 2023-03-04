import { useEffect, useState } from 'react'
import api from '../context/api'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { Link } from 'react-router-dom'

const ServiceSearch = () => {
  const [value, setValue] = useState('')
  const [services, setServices] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    api.getServices(value).then((response) => {
      setServices(response.data.result)
      console.log(response.data.result)
    })
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
    setResults(tempData.slice(0, 5))
  }
  return (
    <>
      <Paper
        component="form"
        sx={{ padding: 0, display: 'flex', alignItems: 'center', width: 500 }}
      >
        <input
          className="h-12 w-full p-4 focus:outline-none"
          placeholder="Hizmet Ara"
          value={value}
          onChange={handleResult}
        />
      </Paper>
      {results.length > 0 && (
        <Paper className="mt-4">
          <List>
            {results.map((result) => (
              <ListItem key={result.id} disablePadding>
                <ListItemButton>
                  <Link className="w-full" to={`service/${result.id}`}>
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
