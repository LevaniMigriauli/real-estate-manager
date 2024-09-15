import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const realEstatesSlice = createSlice({
  name: 'realEstates',
  initialState,
  reducers: {
    setRealEstates: (state, action) => {
      console.log(action)
    }
  }
})

export const { setRealEstates } = realEstatesSlice.actions

export default realEstatesSlice.reducer
