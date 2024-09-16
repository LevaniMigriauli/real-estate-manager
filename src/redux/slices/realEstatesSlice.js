import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const realEstatesSlice = createSlice({
  name: 'realEstates',
  initialState,
  reducers: {
    setRealEstates: (state, action) => {
      return action.payload
    }
  }
})

export const { setRealEstates } = realEstatesSlice.actions

export default realEstatesSlice.reducer
