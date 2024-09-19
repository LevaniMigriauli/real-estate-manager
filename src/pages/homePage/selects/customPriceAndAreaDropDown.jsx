import { useState, useRef, useEffect } from 'react'
import classes from './customPriceAndAreaDropDown.module.scss'
import styles from '../../../ui/shared/shareddropDownStyles.module.scss'
import ChevronDown from '../../../assets/svgIcons/chevron-down.jsx'
import { formatNumberWithCommas } from '../../../utils/helpers.js'

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
  const [error, setError] = useState('')
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

  const validateInputs = () => {
    if (minTemporaryValue !== '' && maxTemporaryValue !== '' &&
      Number(minTemporaryValue) > Number(maxTemporaryValue)) setError(
      'შეიყვანეთ ვალიდური მონაცემები')
    else setError('')
  }

  const submitCustomText = () => {
    if (error === '') {
      setDropDownDataForFilter(prevState => ({
        ...prevState,
        [optionsKey]: {
          min: minTemporaryValue === '' ? '' : minTemporaryValue,
          max: maxTemporaryValue === '' ? '' : maxTemporaryValue
        }
      }))
      setIsDropdownOpen(false)
    }
  }

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
      setMinTemporaryValue(min !== null ? String(min) : '')
      setMaxTemporaryValue(max !== null ? String(max) : '')
    }
  }

  useEffect(() => {
    validateInputs()
  }, [minTemporaryValue, maxTemporaryValue])

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
           style={{ backgroundColor: `${isDropdownOpen ? 'var(--color-whisper-gray)' : ''}` }}
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <p>{label}</p>
        <span style={{
          transform: isDropdownOpen
            ? 'rotate(180deg)'
            : 'rotate(0deg)'
        }}>{ChevronDown()}</span>
      </div>

      {isDropdownOpen && (
        <div className={styles.mergedDropdownMenu}>
          <p className={styles.title}>{menuTitle}</p>
          <div className={classes['columns-container']}>
            <div className={classes.column}>
              <div className={classes.inputContainer}>
                <input
                  type="text"
                  className={styles.dropdownInput}
                  placeholder="დან"
                  value={minTemporaryValue}
                  onChange={handleMinInputChange}
                />
                {error && <p className={classes.errorMessage}>{error}</p>}
              </div>
              <div className={classes.dropdownOptions}>
                <p>მინ. {optionsKey === 'priceRange' ? 'ფასი' : 'მ²'}</p>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`${classes.dropdownOption} ${isOptionMatching(
                      option, minTemporaryValue) ? classes.highlighted : ''}`}
                    onClick={() => handleMinOptionClick(option)}
                  >
                    {formatNumberWithCommas(Number(option))} {optionsKey ===
                  'priceRange' ? '₾' : 'მ²'}
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.column}>
              <div className={classes.inputContainer}>
                <input
                  type="text"
                  className={styles.dropdownInput}
                  placeholder="მდე"
                  value={maxTemporaryValue}
                  onChange={handleMaxInputChange}
                />
              </div>
              <div className={classes.dropdownOptions}>
                <p>მაქს. {optionsKey === 'priceRange' ? 'ფასი' : 'მ²'}</p>
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`${classes.dropdownOption} ${isOptionMatching(
                      option, maxTemporaryValue) ? classes.highlighted : ''}`}
                    onClick={() => handleMaxOptionClick(option)}
                  >
                    {formatNumberWithCommas(Number(option))} {optionsKey ===
                  'priceRange' ? '₾' : 'მ²'}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.submitContainer}>
            <button className={styles.submitButton} onClick={submitCustomText}>
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomPriceAndAreaDropDown