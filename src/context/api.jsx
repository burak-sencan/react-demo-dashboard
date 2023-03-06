import axios from 'axios'

const api = {
  getServices: () => {
    return axios.get(process.env.REACT_APP_API_URL + '/get_services', {
      method: 'GET',
    })
  },
  getService: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/get_service/' + id, {
      method: 'GET',
    })
  },
  getServiceAndDetails: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/get_details/' + id, {
      method: 'GET',
    })
  },
  getQuestions: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/get_questions/' + id, {
      method: 'GET',
    })
  },
  getValues: (id) => {
    return axios.get(
      process.env.REACT_APP_API_URL + '/get_question_values/' + id,
      {
        method: 'GET',
      }
    )
  },
  getProvinces: () => {
    return axios.get(process.env.REACT_APP_API_URL + '/get_provinces/', {
      method: 'GET',
    })
  },
  getCounties: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/get_counties/' + id, {
      method: 'GET',
    })
  },
  getDistricts: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/get_districts/' + id, {
      method: 'GET',
    })
  },
}

export default api
