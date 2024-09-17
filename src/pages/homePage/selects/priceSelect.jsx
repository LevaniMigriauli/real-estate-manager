import { useState, useRef, useEffect } from 'react'
import classes from './priceSelect.module.scss'

const priceOptions = [
  '50000',
  '100000',
  '150000',
  '200000',
  '300000'
]

const PriceSelect = ({ dropDownDataForFilter, setDropDownDataForFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [minTemporaryValue, setMinTemporaryValue] = useState(
    dropDownDataForFilter.priceRange.min || '')
  const [maxTemporaryValue, setMaxTemporaryValue] = useState(
    dropDownDataForFilter.priceRange.max || '')
  const inputRef = useRef(null)

  const { priceRange: { min, max } } = dropDownDataForFilter

  const handleMinInputChange = (e) => {
    setMinTemporaryValue(e.target.value)
    setIsDropdownOpen(true)
  }

  const handleMaxInputChange = (e) => {
    setMaxTemporaryValue(e.target.value)
    setIsDropdownOpen(true)
  }

  const handleMinOptionClick = (option) => {
    setMinTemporaryValue(option)
  }

  const handleMaxOptionClick = (option) => {
    setMaxTemporaryValue(option)
  }

  const submitCustomText = () => {
    setDropDownDataForFilter(prevState => ({
      ...prevState,
      priceRange: {
        min: minTemporaryValue || prevState.priceRange.min,
        max: maxTemporaryValue || prevState.priceRange.max
      }
    }))

    setIsDropdownOpen(false)
  }

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
      setMinTemporaryValue(min)
      setMaxTemporaryValue(max)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [min, max])

  const isOptionMatching = (option, temporaryValue) =>
    option.toLowerCase() === temporaryValue.toLowerCase()

  return (
    <div className={classes.customSelectContainer} ref={inputRef}>
      <div className={classes.selectedValue}
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {min || max
          ? `${min || 'Select'} / ${max || 'Select'}`
          : 'საფასო კატეგორია'}
      </div>

      {isDropdownOpen && (
        <div className={classes.mergedDropdownMenu}>
          <div className={classes.columnsContainer}>

            <div className={classes.column}>
              <div className={classes.inputButtonContainer}>
                <input
                  type="text"
                  className={classes.dropdownInput}
                  placeholder="დან"
                  value={minTemporaryValue}
                  onChange={handleMinInputChange}
                />
              </div>
              <div className={classes.dropdownOptions}>
                <p>მინ. ფასი</p>
                {priceOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${classes.dropdownOption} ${isOptionMatching(
                      option, minTemporaryValue) ? classes.highlighted : ''}`}
                    onClick={() => handleMinOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.column}>
              <div className={classes.inputButtonContainer}>
                <input
                  type="text"
                  className={classes.dropdownInput}
                  placeholder="მდე"
                  value={maxTemporaryValue}
                  onChange={handleMaxInputChange}
                />
              </div>
              <div className={classes.dropdownOptions}>
                <p>მაქს. ფასი</p>
                {priceOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${classes.dropdownOption} ${isOptionMatching(
                      option, maxTemporaryValue) ? classes.highlighted : ''}`}
                    onClick={() => handleMaxOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={classes.submitContainer}>
            <button className={classes.submitButton} onClick={submitCustomText}>
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PriceSelect
