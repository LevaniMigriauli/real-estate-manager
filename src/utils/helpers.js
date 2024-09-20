export function formatNumberWithCommas (number) {
  return number.toLocaleString('en-US')
}

export function formatNumberWithSpaces (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function formatDateToMMDDYYYY (dateString) {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
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

export function filterById (dataArray, idToExclude) {
  return dataArray.filter(item => item.id !== idToExclude)
}