import { createSelector } from '@reduxjs/toolkit'

const selectRealEstateData = state => state.realEstates

export const selectRealEstateFilterData = createSelector(
  [
    selectRealEstateData,
    (state, dropDownDataForFilter) => dropDownDataForFilter],
  (realEstateData, dropDownDataForFilter) => {
    const { priceRange: { min, max } } = dropDownDataForFilter

    return realEstateData.filter(property => {
      const priceMatch = property.price >= min &&
        (max === null || property.price <= max)
      return priceMatch
    })
  }
)