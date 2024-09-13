import { configureStore } from '@reduxjs/toolkit'
import regionReducer from './regionSlice.js'
import citiesReducer from './citiesSlice.js'

export const store = configureStore({
  reducer: {
    regions: regionReducer,
    cities: citiesReducer
  }
})