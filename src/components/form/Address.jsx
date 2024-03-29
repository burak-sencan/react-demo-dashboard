// Adres sorusu için il ilçe mahalle verilerinin çekilmesi ve formdataya set edilmesi.
/*
ilk olarak il listesi useEffectte fetch ediliyor. Sonrasında tıklanan ilden, o ilin ilçeleri fetch ediliyor.
seçilen ilçeden ise o ilçenin mahalleleri fetch ediliyor.
3 seçimde tamamlanırsa next butonu aktif oluyor.
eğer seçim yapılmış ise il veya ilçeden değişme olursa altındaki childlar sıfırlanıyor. 

yani il ilçe mahalle seçilmiş ise kullanıcı il değiştirirse ilçe ve mahalle
il ilçe mahalle seçilmiş ise kullanıcı ilçe değiştirirse mahalle sıfırlanıyor.
bu iki durumdada il ilçe mahalle seçilmeden ileri butonu aktif olmuyor.
*/
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

const Address = ({ data, activeStep }) => {
  const {
    formData,
    setFormData,
    setProvinceName,
    setCountieName,
    setDistrictName,
    provinceName,
    countieName,
    districtName,
  } = useContext(ServiceContext)

  const [provinceValue, setProvinceValue] = useState('')
  const [countiesValue, setCountiesValue] = useState('')
  const [districtsValue, setDistrictsValue] = useState('')

  const [provinces, setProvinces] = useState([])
  const [counties, setCounties] = useState([])
  const [districts, setDistricts] = useState([])

  const handleProvinceChance = (e) => {
    const provinceId = e.target.value

    setProvinceValue(provinceId)
    //////////// Reset //////////////
    setCounties([])
    setDistricts([])
    setCountieName('')
    setDistrictName('')
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep ? { ...item, answer: null } : item
      )
    )
    ////////// Reset //////////

    api.getCounties(provinceId).then((response) => {
      setCounties(response.data.result)
    })
  }

  const handleCountyChance = (e) => {
    const countyId = e.target.value
    setCountiesValue(countyId)

    ////////// Reset //////////
    setDistricts([])
    setDistrictName('')
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep ? { ...item, answer: null } : item
      )
    )
    ////////// Reset //////////

    api
      .getDistricts(provinceValue, countyId)
      .then((response) => {
        setDistricts(response.data.result)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          const data = [provinceValue, countyId]
          handleFormData(data)
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
    setFormData(
      formData.map((item) =>
        item.activeStep === activeStep ? { ...item, answer: data } : item
      )
    )
  }

  useEffect(() => {
    api.getProvinces().then((response) => {
      setProvinces(response.data.result)
    })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Question data={data} />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Şehir</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Şehir"
          onChange={handleProvinceChance}
          value={provinceValue}
          MenuProps={MenuProps}
        >
          {provinces.map((province) => (
            <MenuItem
              key={province.id}
              value={province.id}
              onClick={() => setProvinceName(province.name)}
            >
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
            value={countiesValue}
            MenuProps={MenuProps}
          >
            {counties.map((county) => (
              <MenuItem
                key={county.id}
                value={county.id}
                onClick={() => setCountieName(county.name)}
              >
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
            value={districtsValue}
            MenuProps={MenuProps}
          >
            {districts.map((district) => (
              <MenuItem
                key={district.id}
                value={district.id}
                onClick={() => setDistrictName(district.name)}
              >
                {district.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {provinceName !== '' && countieName !== '' && districtName !== '' && (
        <div className="p-2">
          {/* <p className="text-base">Lokasyon Bilgisi</p> */}
          <div className="text-base  text-green-600">
            <p className="flex justify-between gap-8 rounded-md lg:gap-4">
              <span>İl</span>
              <span>{provinceName}</span>
            </p>
            <p className="flex justify-between gap-8 rounded-md lg:gap-4">
              <span>İlçe</span>
              <span>{countieName}</span>
            </p>
            <p className="flex justify-between gap-8 rounded-md lg:gap-4">
              <span>Mahalle</span>
              <span>{districtName}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Address
