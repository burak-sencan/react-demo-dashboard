import axios from 'axios'

const api = {
  getServices: () => {
    return axios.get(process.env.REACT_APP_API_URL + '/getServices')
  },
  getService: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getService/' + id)
  },
  getServiceAndDetails: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getServiceDetails/' + id)
  },
  getQuestions: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getQuestions/' + id)
  },
  getValues: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getQuestionValues/' + id)
  },
  getProvinces: () => {
    return axios.get(process.env.REACT_APP_API_URL + '/getProvinces/')
  },
  getCounties: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getCounties/' + id)
  },
  getDistricts: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getDistricts/' + id)
  },
  getSelfClient: (token) => {
    return axios
      .get(process.env.REACT_APP_API_URL + '/getSelfClient', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error)
        return 401
      })
  },
  getClientServices: (token, data) => {
    return axios.post(
      process.env.REACT_APP_API_URL + '/postSelfServiceRequest',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  getSelfMessages: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getSelfMessages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getSelfRequestMessages: (token, id) => {
    return axios.get(
      process.env.REACT_APP_API_URL + `/getSelfRequestMessages/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  sendRequestMessage: (token, data, id) => {
    return axios.post(
      process.env.REACT_APP_API_URL + `/sendRequestMessage/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  getSelfServiceRequests: (token) => {
    return axios.get(
      process.env.REACT_APP_API_URL + '/getSelfServiceRequests',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  getBankAccounts: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getBankAccounts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getSelfBalanceHistory: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getSelfBalanceHistory', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getOpportunities: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + '/getOpportunities', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getOpportunitie: (token, id) => {
    return axios.get(process.env.REACT_APP_API_URL + `/getOpportunitie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

export default api
