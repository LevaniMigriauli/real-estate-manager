import { useState, useRef, useEffect } from 'react'
import classes from './customPriceAndAreaDropDown.module.scss'
import styles from '../shareddropDownStyles.module.scss'
import ChevronDown from '../../../assets/svgIcons/chevron-down.jsx'

const CustomPriceAndAreaDropDown = ({
  dropDownDataForFilter,
  setDropDownDataForFilter,
  label,
  optionsKey,
  options,
  menuTitle
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [minTemporaryValue, setMinTemporaryValue] = useState(
    dropDownDataForFilter[optionsKey].min || ''
  )
  const [maxTemporaryValue, setMaxTemporaryValue] = useState(
    dropDownDataForFilter[optionsKey].max || ''
  )
  const inputRef = useRef(null)

  const { min, max } = dropDownDataForFilter[optionsKey]

  const handleMinInputChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) setMinTemporaryValue(value)
  }

  const handleMaxInputChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) setMaxTemporaryValue(value)
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
      [optionsKey]: {
        min: minTemporaryValue === '' ? '' : minTemporaryValue,
        max: maxTemporaryValue === '' ? '' : maxTemporaryValue
      }
    }))
    setIsDropdownOpen(false)
  }

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
      setMinTemporaryValue(min !== null ? String(min) : '')
      setMaxTemporaryValue(max !== null ? String(max) : '')
    }
  }

  useEffect(() => {
    setMinTemporaryValue(String(min))
    setMaxTemporaryValue(String(max))
  }, [min, max])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [min, max])

  const isOptionMatching = (option, temporaryValue) =>
    option === String(temporaryValue)

  return (
    <div className={styles.customSelectContainer} ref={inputRef}>
      <div className={`${styles.selectedValue}`}
           style={{ backgroundColor: `${isDropdownOpen ? '#F3F3F3' : ''}` }}
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <p>{label}</p>
        {isDropdownOpen
          ? (<span
            style={{ transform: 'rotate(180deg)' }}>{ChevronDown()}</span>)
          : (<span>{ChevronDown()}</span>)}
      </div>

      {isDropdownOpen && (
        <div className={styles.mergedDropdownMenu}>
          <p className={styles.title}>{menuTitle}</p>
          <div className={classes.columnsContainer}>
            <div className={classes.column}>
              <div className={classes.inputButtonContainer}>
                <input
                  type="text"
                  className={styles.dropdownInput}
                  placeholder="დან"
                  value={minTemporaryValue}
                  onChange={handleMinInputChange}
                />
              </div>
              <div className={classes.dropdownOptions}>
                <p>მინ. {label}</p>
                {options.map((option, index) => (
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
                  className={styles.dropdownInput}
                  placeholder="მდე"
                  value={maxTemporaryValue}
                  onChange={handleMaxInputChange}
                />
              </div>
              <div className={classes.dropdownOptions}>
                <p>მაქს. {label}</p>
                {options.map((option, index) => (
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

export default CustomPriceAndAreaDropDown