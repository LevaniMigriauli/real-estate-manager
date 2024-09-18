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
  from '../../ui/shared/customPriceAndAreaDropDown/customPriceAndAreaDropDown.jsx'

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
  nOfBedrooms: undefined
}

const HomeHeader = ({}) => {
  const addAgentModalRef = useRef(null)
  const [dropDownDataForFilter, setDropDownDataForFilter] = useState(() => {
    const savedData = localStorage.getItem('dropDownDataForFilter')
    return savedData ? JSON.parse(savedData) : initialDropDownData
  })
  const realEstateDataFiltered = useSelector(
    state => selectRealEstateFilterData(state, dropDownDataForFilter))

  const {area ,regions, priceRange } = dropDownDataForFilter

  useEffect(() => {
    localStorage.setItem('dropDownDataForFilter',
      JSON.stringify(dropDownDataForFilter))
  }, [dropDownDataForFilter])

  return (
    <header className={classes.header}>
      <div>
        <div className={classes['header-selects']}>
          <RegionSelect dropDownDataForFilter={dropDownDataForFilter}
                        setDropDownDataForFilter={setDropDownDataForFilter}/>

          <CustomPriceAndAreaDropDown
            dropDownDataForFilter={dropDownDataForFilter}
            setDropDownDataForFilter={setDropDownDataForFilter}
            label="ფასი"
            optionsKey="priceRange"
            options={priceOptions}
          />

          <CustomPriceAndAreaDropDown
            dropDownDataForFilter={dropDownDataForFilter}
            setDropDownDataForFilter={setDropDownDataForFilter}
            label="ფართობი"
            optionsKey="area"
            options={areaOptions}
          />

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

      {regions?.map(region => <div key={region.id} style={{
        background: 'lightgray',
        width: 'fit-content'
      }}>
        <p>{`${region.name}`}</p>
        <button onClick={() => setDropDownDataForFilter(prevState => ({
          ...prevState,
          regions: regions.filter(reg => reg.id !== region.id)
        }))}>წაშლა
        </button>
      </div>)}

      {(priceRange.min || priceRange.max) &&
        <div style={{ background: 'lightgray', width: 'fit-content' }}>
          <p>{`${priceRange.min} - ${priceRange.max}`}</p>
          <button onClick={() => setDropDownDataForFilter(prevState => ({
            ...prevState,
            priceRange: { min: '', max: '' }
          }))}>წაშლა
          </button>
        </div>
      }

      {(area.min || area.max) &&
        <div style={{ background: 'lightgray', width: 'fit-content' }}>
          <p>{`${area.min} - ${area.max}`}</p>
          <button onClick={() => setDropDownDataForFilter(prevState => ({
            ...prevState,
            area: { min: '', max: '' }
          }))}>წაშლა
          </button>
        </div>
      }

      <div style={{ background: 'lightgray', width: 'fit-content' }}>
        <p></p>
        <button onClick={() => setDropDownDataForFilter(
          initialDropDownData)}>გასუფთავება
        </button>
      </div>

      <AddAgentModal ref={addAgentModalRef}/>
    </header>
  )
}

export default HomeHeader