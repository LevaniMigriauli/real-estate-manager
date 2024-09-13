import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const regionSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegions: (state, action) => {
      return action.payload.map(region => ({
        id: region.id,
        value: region.name,
        label: region.name
      }))
    }
  }
})

export const { setRegions } = regionSlice.actions

export default regionSlice.reducer