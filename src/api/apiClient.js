import axios from 'axios'


const token = '9cfeafb1-5291-4411-b168-b9846a6a6fc9'
const BASE_URL = 'https://api.real-estate-manager.redberryinternship.ge/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let errorMessage = 'An error occurred'

    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          errorMessage = 'Bad Request'
          break
        case 401:
          errorMessage = 'Unauthorized. Please login.'
          break
        case 404:
          errorMessage = 'Resource not found'
          break
        case 500:
          errorMessage = 'Server error. Please try again later.'
          break
        default:
          errorMessage = 'Unexpected error occurred'
          break
      }
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection.'
    } else {
      errorMessage = `Error: ${error.message}`
    }

    console.error('API Error:', errorMessage)

    return Promise.reject(new Error(errorMessage))
  }
)

export default apiClient
