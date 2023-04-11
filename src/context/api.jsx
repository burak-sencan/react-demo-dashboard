import axios from 'axios'

const api = {
  // Auth APIs
  getSelfClient: (token) => {
    return axios
      .get(process.env.REACT_APP_API_URL + '/clients/self', {
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

  // Form, Service, Blog APIs
  getServices: () => {
    return axios.get(process.env.REACT_APP_API_URL + '/services')
  },
  getService: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/services/' + id)
  },
  getServiceAndDetails: (id) => {
    return axios.get(
      process.env.REACT_APP_API_URL +
        '/services/service_questions_and_values/' +
        id
    )
  },
  getProvinces: () => {
    return axios.get(process.env.REACT_APP_API_URL + '/cities/')
  },
  getCounties: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + '/cities/' + id)
  },
  getDistricts: (countie_id, district_id) => {
    return axios.get(
      process.env.REACT_APP_API_URL + `/cities/${countie_id}/${district_id}`
    )
  },
  getBlogs: () => {
    return axios.get(process.env.REACT_APP_API_URL + `/blog`)
  },
  getBlog: (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `/blog/${id}`)
  },
  uploadAvatar: (token, data) => {
    return axios.post(
      process.env.REACT_APP_API_URL + `/employers/upload_avatar`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },

  ////////////////// Recipient APIs //////////////////
  //Yapılacak
  recipientsAddServiceRequest: (token, data) => {
    return axios.post(
      process.env.REACT_APP_API_URL + '/recipients/add_service_request',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  recipientsServiceRequests: (token) => {
    return axios.get(
      process.env.REACT_APP_API_URL + '/recipients/service_requests',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  changeServiceStatus: (token, id) => {
    return axios.post(
      process.env.REACT_APP_API_URL + `/recipients/change_service_status`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  recipientsServiceRequest: (token, id) => {
    return axios.get(
      process.env.REACT_APP_API_URL + `/recipients/service_requests/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  getSelfMessages: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + '/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getSelfRequestMessages: (token, request_id, client_id) => {
    return axios.get(
      process.env.REACT_APP_API_URL + `/messages/${request_id}/${client_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  sendRequestMessage: (token, data) => {
    return axios.post(process.env.REACT_APP_API_URL + `/messages/send`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

  ////////////////// Employer APIs //////////////////
  getBankAccounts: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + '/bank_accounts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  bankTransferNotify: (token, data) => {
    return axios.post(
      process.env.REACT_APP_API_URL + `/employers/bank_transfer_notify`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  getBalanceHistory: (token) => {
    return axios.get(
      process.env.REACT_APP_API_URL + '/employers/balance_history',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },

  getOpportunities: (token) => {
    return axios.get(
      process.env.REACT_APP_API_URL + '/employers/opportunities',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  getOpportunitie: (token, id) => {
    return axios.get(
      process.env.REACT_APP_API_URL + `/employers/opportunitie/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  // get client interested services
  getClientInterestedServices: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + `/client_services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  // post client interested services
  updateClientInterestedServices: (token, data) => {
    return axios.post(
      process.env.REACT_APP_API_URL + `/client_services`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  // delete client interested services
  deletelientInterestedServices: (token, id) => {
    return axios.delete(
      process.env.REACT_APP_API_URL + `/client_services/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  // delete client interested services
  sendBid: (token, data, id) => {
    return axios.post(
      process.env.REACT_APP_API_URL + `/employers/send_bid/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  // get client interested services
  getMyBids: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + `/employers/my_bids`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  getMyBid: (token, id) => {
    return axios.get(
      process.env.REACT_APP_API_URL + `/employers/my_bids/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  },
  getMyWonBids: (token) => {
    return axios.get(process.env.REACT_APP_API_URL + `/employers/my_won_bids`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },

}

export default api
