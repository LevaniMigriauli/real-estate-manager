import { createSlice } from '@reduxjs/toolkit'

const selectedOptions = {
  region: [],
  priceRange: [],
  area: [],
  nOfBedrooms: []
}

export const selectedOptionsSlice = createSlice({
  name: 'selectedForFilter',
  initialState: selectedOptions,
  reducers: {
    setSelectedOptions: (state, action) => {
      console.log(action) // Log the payload to check what is being dispatched
      const { filterName, selectedValues } = action.payload
      if (state[filterName]) {
        state[filterName] = selectedValues
      }
    }
  }
})

export const { setSelectedOptions } = selectedOptionsSlice.actions

export default selectedOptionsSlice.reducer