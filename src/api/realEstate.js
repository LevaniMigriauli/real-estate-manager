import apiClient from './apiClient.js'

export const getRealEstates = () => apiClient.get('/real-estates').
  then(res => res.data)

export const getRealEstate = (id) => apiClient.get(`/real-estates/${id}`).
  then(res => res.data)

export const deleteRealEstate = (id) => apiClient.delete(`/real-estates/${id}`).
  then(res => res.data)