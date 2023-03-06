import { useContext, useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import api from '../../context/api'
import Question from './Question'
import ServiceContext from '../../context/serviceContext'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const Adress = ({ data, activeStep }) => {
  const { formData, setFormData } = useContext(ServiceContext)

  const [provinceValue, setProvinceValue] = useState()
  const [countiesValue, setCountiesValue] = useState()
  const [districtsValue, setDistrictsValue] = useState()

  const [provinces, setProvinces] = useState([])
  const [counties, setCounties] = useState([])
  const [districts, setDistricts] = useState([])

  const handleProvinceChance = (e) => {
    const provinceId = e.target.value

    setProvinceValue(provinceId)
    setCounties([])
    setDistricts([])

    api.getCounties(provinceId).then((response) => {
      setCounties(response.data.result)
      console.log(response.data.result)
    })
  }

  const handleCountyChance = (e) => {
    const countyId = e.target.value
    setCountiesValue(countyId)
    setDistricts([])
    console.log(countyId)

    api.getDistricts(countyId).then((response) => {
      setDistricts(response.data.result)
      console.log(response.data.result)
      if (response.data.result.length === 0) {
        handleFormData([provinceValue, countiesValue])
      }
    })
  }

  const handleDistricChance = (e) => {
    const districId = e.target.value
    setDistrictsValue(districId)
    const data = [provinceValue, countiesValue, districId]
    handleFormData(data)
  }
  const handleFormData = (data) => {
    console.log(data)
    console.log(formData)
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep ? { ...item, answer: data } : item
      )
    )
  }

  useEffect(() => {
    api.getProvinces().then((response) => {
      setProvinces(response.data.result)
      console.log(response.data.result)
    })
    // if (formData[activeStep]?.answer !== null) {
    //   setProvinceValue(formData[activeStep]?.answer[0])
    //   setCountiesValue(formData[activeStep]?.answer[1])
    //   setDistrictsValue(formData[activeStep]?.answer[2])
    // }
    // console.log(provinces)
    // console.log(counties)
    // console.log(districts)
  }, [])

  return (
    <>
      <Question data={data} />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Şehir</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Şehir"
          onChange={handleProvinceChance}
          MenuProps={MenuProps}
        >
          {provinces.map((province) => (
            <MenuItem key={province.id} value={province.id}>
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {counties.length > 0 && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">İlçe</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="İlçe"
            onChange={handleCountyChance}
            MenuProps={MenuProps}
          >
            {counties.map((county) => (
              <MenuItem key={county.id} value={county.id}>
                {county.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {districts.length > 0 && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mahalle</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Mahalle"
            onChange={handleDistricChance}
            MenuProps={MenuProps}
          >
            {districts.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export default Adress
