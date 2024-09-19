import { useRef } from 'react'
import { Link } from 'react-router-dom'
import classes from './homeHeader.module.scss'
import RegionDropdown from './components/dropdowns/regionDropdown.jsx'
import AddAgentModal from './addAgentModal.jsx'
import CustomPriceAndAreaDropDown
  from './components/dropdowns/customPriceAndAreaDropDown.jsx'
import BedroomsDropdown from './components/dropdowns/bedroomsDropdown.jsx'
import {
  FilterSelectedItem,
  FilterSelectedRegions
} from '../../ui/lib/filterSelectedItem.jsx'
import { isAnyFilterApplied } from '../../utils/helpers.js'
import BtnOrangeRed from '../../ui/lib/btnOrangeRed.jsx'
import Icon from '../../ui/shared/svgIcons/Icon.jsx'
import BtnWhite from '../../ui/lib/btnWhite.jsx'

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

const HomeHeader = ({dropDownDataForFilter, setDropDownDataForFilter, initialDropDownData}) => {
  const addAgentModalRef = useRef(null)

  const { regions, priceRange, area, nOfBedrooms } = dropDownDataForFilter

  return (
    <header className={classes.header}>
      <div className={classes['top-header']}>
        <div className={classes.dropdowns}>
          <RegionDropdown dropDownDataForFilter={dropDownDataForFilter}
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
          <Link to={'/addListing'} className={classes['btn-navigate-listing']}>
            <BtnOrangeRed>
              <Icon name={'plus'} viewBox={'0 0 17 16'}/>
              ლისტინგის დამატება
            </BtnOrangeRed>
          </Link>

          <BtnWhite className={classes['btn-add-agent']} onClick={() => addAgentModalRef.current?.handleOpenModal()}>
            <Icon name={'plus'} viewBox={'0 0 17 16'}/> აგენტის დამატება
          </BtnWhite>
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


        {isAnyFilterApplied(dropDownDataForFilter) &&
          <button className={classes['btn-empty-all']}
                  onClick={() => setDropDownDataForFilter(
                    initialDropDownData)}>გასუფთავება
          </button>}
      </div>

      <AddAgentModal ref={addAgentModalRef}/>
    </header>
  )
}

export default HomeHeader