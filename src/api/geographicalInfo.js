import apiClient from './apiClient.js'

export const getRegions = () => apiClient.get('/regions').then(res => res.data)

export const getCities = () => apiClient.get('/cities').then(res => res.data)