import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRealEstates } from '../../redux/slices/realEstatesSlice.js'
import classes from './homePage.module.scss'
import HomeHeader from './homeHeader.jsx'
import { getRealEstates } from '../../api/realEstate.js'
import {
  selectRealEstateFilterData
} from '../../redux/selectors/realEstateFilterSelector.js'
import PropertyListingCard from './components/propertyListingCard.jsx'

const initialDropDownData = {
  regions: [],
  priceRange: { min: '', max: '' },
  area: { min: '', max: '' },
  nOfBedrooms: ''
}

const HomePage = () => {
  const dispatch = useDispatch()
  const [dropDownDataForFilter, setDropDownDataForFilter] = useState(() => {
    const savedData = localStorage.getItem('dropDownDataForFilter')
    return savedData ? JSON.parse(savedData) : initialDropDownData
  })
  const realEstateDataFiltered = useSelector(
    state => selectRealEstateFilterData(state, dropDownDataForFilter))

  useEffect(() => {
    localStorage.setItem('dropDownDataForFilter',
      JSON.stringify(dropDownDataForFilter))
  }, [dropDownDataForFilter])

  useEffect(() => {
    getRealEstates().then(res => dispatch(setRealEstates(res)))
  }, [])

  return (
    <div className={classes.homePage}>
      <HomeHeader dropDownDataForFilter={dropDownDataForFilter}
                  setDropDownDataForFilter={setDropDownDataForFilter}
                  initialDropDownData={initialDropDownData}/>


      <div className={classes.PropertyListing}>
        {realEstateDataFiltered.map(property => {
         return <PropertyListingCard key={property.id} property={property}/>
        })}
      </div>

    </div>
  )
}

export default HomePage