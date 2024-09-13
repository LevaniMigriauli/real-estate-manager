import { configureStore } from '@reduxjs/toolkit'
import regionReducer from './regionSlice.js'

export const store = configureStore({
  reducer: {
    regions: regionReducer
  }
})