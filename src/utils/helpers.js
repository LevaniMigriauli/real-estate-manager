export function formatNumberWithCommas(number) {
  return number.toLocaleString('en-US');
}

export function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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