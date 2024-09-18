import { createSelector } from '@reduxjs/toolkit'

const selectRealEstateData = state => state.realEstates

export const selectRealEstateFilterData = createSelector(
  [
    selectRealEstateData,
    (state, dropDownDataForFilter) => dropDownDataForFilter],
  (realEstateData, dropDownDataForFilter) => {
    const { regions, priceRange, area } = dropDownDataForFilter

    const selectedRegionIds = regions.length > 0 ? regions.map(
      region => region.id) : null

    return realEstateData.filter(property => {

      const regionsMatch = selectedRegionIds ? selectedRegionIds.includes(
        property.city.region_id) : true

      const priceMatch = (priceRange.min === '' || property.price >=
          Number(priceRange.min)) &&
        (priceRange.max === '' || property.price <= Number(priceRange.max))

      const areaMatch = (area.min === '' || property.area >=
          Number(area.min)) &&
        (area.max === '' || property.price <= Number(area.max))

      return priceMatch && regionsMatch && areaMatch
    })
  }
)