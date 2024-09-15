import apiClient from './apiClient.js'

export const createAgents = (formData) => {
  console.log(formData)
  return apiClient.post('/agents', formData).then(res => res.data)
}

export const getAgents = () => {
  return apiClient.get('/agents').then(res => res.data)
}