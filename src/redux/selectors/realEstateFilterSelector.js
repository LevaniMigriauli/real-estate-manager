import { createSelector } from '@reduxjs/toolkit'

const selectRealEstateData = state => state.realEstates

export const selectRealEstateFilterData = createSelector(
  [
    selectRealEstateData,
    (state, dropDownDataForFilter) => dropDownDataForFilter],
  (realEstateData, dropDownDataForFilter) => {
    const { regions, priceRange: { min, max } } = dropDownDataForFilter

    const selectedRegionIds = regions.length > 0 ? regions.map(
      region => region.id) : null

    return realEstateData.filter(property => {

      const regionsMatch = selectedRegionIds ? selectedRegionIds.includes(
        property.city.region_id) : true

      const priceMatch = property.price >= min &&
        (max === null || property.price <= max)

      return priceMatch && regionsMatch
    })
  }
)