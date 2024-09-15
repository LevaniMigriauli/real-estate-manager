import { configureStore } from '@reduxjs/toolkit'
import regionReducer from './slices/regionSlice.js'
import citiesReducer from './slices/citiesSlice.js'
import selectedOptionsSlice from './slices/selectedOptionsSlice.js'
import { realEstatesSlice } from './slices/realEstatesSlice.js'

export const store = configureStore({
  reducer: {
    regions: regionReducer,
    cities: citiesReducer,
    selects: selectedOptionsSlice,
    realEstates: realEstatesSlice
  }
})