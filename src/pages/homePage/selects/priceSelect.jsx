import { useState, useRef, useEffect } from 'react'
import styles from './priceSelect.module.scss'

const priceOptions = [
  '50000',
  '100000',
  '150000',
  '200000',
  '300000'
]

const PriceSelect = ({ dropDownDataForFilter, setDropDownDataForFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [minInputValue, setMinInputValue] = useState('')
  const [maxInputValue, setMaxInputValue] = useState('')
  const [minTemporaryValue, setMinTemporaryValue] = useState('')
  const [maxTemporaryValue, setMaxTemporaryValue] = useState('')
  const inputRef = useRef(null)

  const { priceRange: { min, max } } = dropDownDataForFilter

  const handleInputChange1 = (e) => {
    setMinTemporaryValue(e.target.value)
    setIsDropdownOpen(true)
  }

  const handleInputChange2 = (e) => {
    setMaxTemporaryValue(e.target.value)
    setIsDropdownOpen(true)
  }

  const handleOptionClick1 = (option) => {
    setMinTemporaryValue(option)
  }

  const handleOptionClick2 = (option) => {
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

    if (minTemporaryValue) {
      setMinInputValue(minTemporaryValue)
    }
    if (maxTemporaryValue) {
      setMaxInputValue(maxTemporaryValue)
    }
    setIsDropdownOpen(false)
  }

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
      setMinTemporaryValue(minInputValue)
      setMaxTemporaryValue(maxInputValue)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [minInputValue, maxInputValue])

  const isOptionMatching = (option, temporaryValue) =>
    option.toLowerCase() === temporaryValue.toLowerCase()

  return (
    <div className={styles.customSelectContainer} ref={inputRef}>
      <div className={styles.selectedValue}
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {min || max
          ? `${min || 'Select'} / ${max || 'Select'}`
          : 'საფასო კატეგორია'}
      </div>

      {isDropdownOpen && (
        <div className={styles.mergedDropdownMenu}>
          <div className={styles.columnsContainer}>

            <div className={styles.column}>
              <div className={styles.inputButtonContainer}>
                <input
                  type="text"
                  className={styles.dropdownInput}
                  placeholder="დან"
                  value={minTemporaryValue}
                  onChange={handleInputChange1}
                />
              </div>
              <div className={styles.dropdownOptions}>
                <p>მინ. ფასი</p>
                {priceOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.dropdownOption} ${isOptionMatching(
                      option, minTemporaryValue) ? styles.highlighted : ''}`}
                    onClick={() => handleOptionClick1(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.inputButtonContainer}>
                <input
                  type="text"
                  className={styles.dropdownInput}
                  placeholder="მდე"
                  value={maxTemporaryValue}
                  onChange={handleInputChange2}
                />
              </div>
              <div className={styles.dropdownOptions}>
                <p>მაქს. ფასი</p>
                {priceOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.dropdownOption} ${isOptionMatching(
                      option, maxTemporaryValue) ? styles.highlighted : ''}`}
                    onClick={() => handleOptionClick2(option)}
                  >
                    {option}
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

export default PriceSelect
