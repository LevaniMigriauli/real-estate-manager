export function formatNumberWithCommas(number) {
  return number.toLocaleString('en-US');
}

export const isAnyFilterApplied = (dropDownDataForFilter) => {
  const { regions, priceRange, area, nOfBedrooms } = dropDownDataForFilter

  return (
    regions.length > 0 ||
    priceRange.min !== '' || priceRange.max !== '' ||
    area.min !== '' || area.max !== '' ||
    nOfBedrooms !== ''
  )
}