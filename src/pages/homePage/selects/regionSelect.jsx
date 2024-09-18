import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classes from './regionSelect.module.scss'

const RegionSelect = ({ dropDownDataForFilter, setDropDownDataForFilter }) => {
  const regionOptionsList = useSelector(state => state.regions)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [temporaryChecked, setTemporaryChecked] = useState(
    dropDownDataForFilter.regions || [])
  const inputRef = useRef(null)

  const { regions: selectedRegions } = dropDownDataForFilter

  const handleOptionChange = (region) => {
    const isChecked = temporaryChecked.some(
      checkedRegion => checkedRegion.id === region.id)
    setTemporaryChecked(prevState =>
      isChecked
        ? prevState.filter(checkedRegion => checkedRegion.id !== region.id)
        : [...prevState, region]
    )
  }

  const submitRegions = () => {
    setDropDownDataForFilter(prevState => ({
      ...prevState,
      regions: temporaryChecked
    }))
    setIsDropdownOpen(false)
  }

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsDropdownOpen(false)
      setTemporaryChecked(selectedRegions)
    }
  }

  useEffect(() => {
    setTemporaryChecked(selectedRegions)
  }, [selectedRegions])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedRegions])

  return (
    <div className={classes.customSelectContainer} ref={inputRef}>
      <div className={classes.selectedValue}
           onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {selectedRegions?.length
          ? `${selectedRegions?.length} Region(s) Selected`
          : 'Select Region'}
      </div>

      {isDropdownOpen && (
        <div className={classes.dropDownMenu}>
          <ul className={classes.dropDownMenuList}>
            {regionOptionsList.map(region => {
              const isChecked = temporaryChecked.some(
                checkedRegion => checkedRegion.id === region.id)
              return (
                <li
                  key={region.id}
                  className={classes.dropDownMenuItem}
                  onClick={() => handleOptionChange(region)}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                  />
                  {region.name}
                </li>
              )
            })}
          </ul>

          <div className={classes.submitContainer}>
            <button className={classes.submitButton} onClick={submitRegions}>
              არჩევა
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegionSelect
