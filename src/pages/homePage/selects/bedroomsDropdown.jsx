import styles from '../../../ui/shared/shareddropDownStyles.module.scss'
import ChevronDown from '../../../assets/svgIcons/chevron-down.jsx'
import { useEffect, useRef, useState } from 'react'
import classes
  from '../../../ui/shared/customPriceAndAreaDropDown/customPriceAndAreaDropDown.module.scss'

const BedroomsDropdown = ({
  dropDownDataForFilter,
  setDropDownDataForFilter
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [temporarySelected, setTemporarySelected] = useState('')
  const inputRef = useRef(null)

  const { nOfBedrooms: nOfSelectedBedrooms } = dropDownDataForFilter

  const handleInputChange = (e) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) setTemporarySelected(value)
  }

  const submitBedrooms = () => {
    setDropDownDataForFilter(prevState => ({
      ...prevState,
      nOfBedrooms: temporarySelected
    }))
    setIsDropdownOpen(false)
  }

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
      setTemporarySelected(nOfSelectedBedrooms)
    }
  }

  useEffect(() => {
    setTemporarySelected(nOfSelectedBedrooms)
  }, [nOfSelectedBedrooms])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [nOfSelectedBedrooms])

  return (
    <div className={styles.customSelectContainer} ref={inputRef}>
      <div className={styles.selectedValue}
           style={{ backgroundColor: `${isDropdownOpen ? '#F3F3F3' : ''}` }}
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <p>საძინებლების რაოდენობა</p>
        {isDropdownOpen
          ? (<span
            style={{ transform: 'rotate(180deg)' }}>{ChevronDown()}</span>)
          : (<span>{ChevronDown()}</span>)}
      </div>

      {isDropdownOpen && (
        <div className={`${styles.mergedDropdownMenu} ${styles.regions}`}>
          <p className={styles.title}>საძინებლების რაოდენობა</p>

          <input
            type="text"
            className={`${styles.dropdownInput} ${styles['bedroom-input']}`}
            placeholder="0"
            value={temporarySelected}
            onChange={handleInputChange}
          />

          <div className={classes.submitContainer}>
            <button className={classes.submitButton} onClick={submitBedrooms}>
              არჩევა
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default BedroomsDropdown