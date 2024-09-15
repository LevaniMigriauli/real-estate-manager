import apiClient from './apiClient.js'

export const getRealEstates = () => apiClient.get('/real-estates').
  then(res => res.data)
