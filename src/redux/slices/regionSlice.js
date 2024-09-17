import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const regionSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegions: (state, action) => action.payload
  }
})

export const { setRegions } = regionSlice.actions

export default regionSlice.reducer