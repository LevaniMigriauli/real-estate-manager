import { createSelector } from '@reduxjs/toolkit'
import { isAnyFilterApplied } from '../../utils/helpers.js'

const getUniqueProperties = (properties) => {
  const uniqueProperties = new Map()
  properties.forEach(property => uniqueProperties.set(property.id, property))
  return Array.from(uniqueProperties.values())
}

const selectRealEstateData = state => state.realEstates

export const selectRealEstateFilterData = createSelector(
  [selectRealEstateData, (state, dropDownDataForFilter) => dropDownDataForFilter],
  (realEstateData, dropDownDataForFilter) => {
    const { regions, priceRange, area, nOfBedrooms } = dropDownDataForFilter

    if (!isAnyFilterApplied(dropDownDataForFilter)) {
      return realEstateData
    }

    const selectedRegionIds = regions.length > 0 ? regions.map(
      region => region.id) : null
    const filteredByRegions = selectedRegionIds
      ? realEstateData.filter(
        property => selectedRegionIds.includes(property.city.region_id))
      : []

    const isPriceRangeSet = priceRange.min !== '' || priceRange.max !== ''
    const filteredByPrice = isPriceRangeSet
      ? realEstateData.filter(property => {
        return (priceRange.min === '' || property.price >=
            Number(priceRange.min)) &&
          (priceRange.max === '' || property.price <= Number(priceRange.max))
      })
      : []

    const isAreaSet = area.min !== '' || area.max !== ''
    const filteredByArea = isAreaSet
      ? realEstateData.filter(property => {
        return (area.min === '' || property.area >= Number(area.min)) &&
          (area.max === '' || property.area <= Number(area.max))
      })
      : []

    const isNOfBedroomsSet = nOfBedrooms !== ''
    const filterByNOfBedrooms = isNOfBedroomsSet ?
      realEstateData.filter(
        property => property.bedrooms === Number(nOfBedrooms))
      : []

    const combinedResults = [
      ...filteredByRegions,
      ...filteredByPrice,
      ...filteredByArea,
      ...filterByNOfBedrooms]

    return getUniqueProperties(combinedResults)
  }
)