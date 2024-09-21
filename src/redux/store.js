import { configureStore } from '@reduxjs/toolkit'
import regionReducer from './slices/regionSlice.js'
import realEstatesSlice from './slices/realEstatesSlice.js'

export const store = configureStore({
  reducer: {
    regions: regionReducer,
    realEstates: realEstatesSlice
  }
})