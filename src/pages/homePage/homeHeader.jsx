import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './homeHeader.module.scss'
import RegionSelect from './selects/regionSelect.jsx'
import AddAgentModal from './addAgentModal.jsx'
import AreaSelect from './selects/areaSelect.jsx'
import PriceSelect from './selects/priceSelect.jsx'
import { useSelector } from 'react-redux'
import {
  selectRealEstateFilterData
} from '../../redux/selectors/realEstateFilterSelector.js'

const HomeHeader = ({}) => {
  const addAgentModalRef = useRef(null)
  const [dropDownDataForFilter, setDropDownDataForFilter] = useState(() => {
    const savedData = localStorage.getItem('dropDownDataForFilter')
    return savedData ? JSON.parse(savedData) : {
      region: [],
      priceRange: { min: 0, max: null },
      area: [],
      nOfBedrooms: undefined
    }
  })
  const realEstateDataFiltered = useSelector(
    state => selectRealEstateFilterData(state, dropDownDataForFilter))

  const { priceRange } = dropDownDataForFilter

  useEffect(() => {
    localStorage.setItem('dropDownDataForFilter',
      JSON.stringify(dropDownDataForFilter))
  }, [dropDownDataForFilter])

  return (
    <header className={classes.header}>
      <div>
        <div className={classes['header-selects']}>
          <RegionSelect/>
          <PriceSelect dropDownDataForFilter={dropDownDataForFilter}
                       setDropDownDataForFilter={setDropDownDataForFilter}/>
          <AreaSelect/>
        </div>
        <div className={classes['header-btns']}>
          <button>
            <Link to={'/addListing'}>
              ლისტინგის დამატება
            </Link>
          </button>
          <button onClick={() => addAgentModalRef.current?.handleOpenModal()}>
            აგენტის დამატება
          </button>
        </div>
      </div>

      {(priceRange.min || priceRange.max) &&
        <div style={{ background: 'lightgray', width: 'fit-content' }}>
          <p>{`${priceRange.min} - ${priceRange.max}`} გელა</p>
          <button onClick={() => setDropDownDataForFilter(prevState => ({
            ...prevState,
            priceRange: { min: 0, max: null }
          }))}>წაშლა
          </button>
        </div>
      }

      <AddAgentModal ref={addAgentModalRef}/>
    </header>
  )
}

export default HomeHeader