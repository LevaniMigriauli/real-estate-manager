import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './homeHeader.module.scss'
import RegionSelect from './selects/regionSelect.jsx'
import AddAgentModal from './addAgentModal.jsx'
import {
  selectRealEstateFilterData
} from '../../redux/selectors/realEstateFilterSelector.js'
import CustomPriceAndAreaDropDown
  from './selects/customPriceAndAreaDropDown.jsx'
import BedroomsDropdown from './selects/bedroomsDropdown.jsx'
import {
  FilterSelectedItem,
  FilterSelectedRegions
} from '../../ui/lib/filterSelectedItem.jsx'

const priceOptions = [
  '50000',
  '100000',
  '150000',
  '200000',
  '300000'
]

const areaOptions = [
  '50',
  '100',
  '150',
  '200',
  '300'
]

const initialDropDownData = {
  regions: [],
  priceRange: { min: '', max: '' },
  area: { min: '', max: '' },
  nOfBedrooms: ''
}

const HomeHeader = ({}) => {
  const addAgentModalRef = useRef(null)
  const [dropDownDataForFilter, setDropDownDataForFilter] = useState(() => {
    const savedData = localStorage.getItem('dropDownDataForFilter')
    return savedData ? JSON.parse(savedData) : initialDropDownData
  })
  const realEstateDataFiltered = useSelector(
    state => selectRealEstateFilterData(state, dropDownDataForFilter))

  const { regions, priceRange, area, nOfBedrooms } = dropDownDataForFilter

  useEffect(() => {
    localStorage.setItem('dropDownDataForFilter',
      JSON.stringify(dropDownDataForFilter))
  }, [dropDownDataForFilter])

  return (
    <header className={classes.header}>
      <div className={classes['top-header']}>
        <div className={classes.dropdowns}>
          <RegionSelect dropDownDataForFilter={dropDownDataForFilter}
                        setDropDownDataForFilter={setDropDownDataForFilter}/>

          <CustomPriceAndAreaDropDown
            dropDownDataForFilter={dropDownDataForFilter}
            setDropDownDataForFilter={setDropDownDataForFilter}
            label="საფასო კატეგორია"
            optionsKey="priceRange"
            options={priceOptions}
            menuTitle="ფასის მიხედვით"
          />

          <CustomPriceAndAreaDropDown
            dropDownDataForFilter={dropDownDataForFilter}
            setDropDownDataForFilter={setDropDownDataForFilter}
            label="ფართობი"
            optionsKey="area"
            options={areaOptions}
            menuTitle="ფართობის მიხედვით"
          />

          <BedroomsDropdown dropDownDataForFilter={dropDownDataForFilter}
                            setDropDownDataForFilter={setDropDownDataForFilter}/>
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

      <div className={classes['bottom-header']}>

        <FilterSelectedRegions
          regions={regions}
          setDropDownDataForFilter={setDropDownDataForFilter}
        />

        {(priceRange.min > 0 || priceRange.max > 0) &&
          <FilterSelectedItem value={priceRange} type={'priceRange'}
                              setDropDownDataForFilter={setDropDownDataForFilter}
                              initValue={initialDropDownData.priceRange}/>
        }

        {(area.min || area.max) &&
          <FilterSelectedItem value={area} type={'area'}
                              setDropDownDataForFilter={setDropDownDataForFilter}
                              initValue={initialDropDownData.area}/>}

        {nOfBedrooms &&
          <FilterSelectedItem value={nOfBedrooms} type={'nOfBedrooms'}
                              setDropDownDataForFilter={setDropDownDataForFilter}
                              initialDropDownData={initialDropDownData}
                              initValue={initialDropDownData.nOfBedrooms}/>}


          <button className={classes['btn-empty-all']} onClick={() => setDropDownDataForFilter(
            initialDropDownData)}>გასუფთავება
          </button>
      </div>

      <AddAgentModal ref={addAgentModalRef}/>
    </header>
  )
}

export default HomeHeader