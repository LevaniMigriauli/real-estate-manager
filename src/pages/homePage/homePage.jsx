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
import PropertyDetailsWithSlider from './propertyDetailsWithSlider.jsx'
import { filterById } from '../../utils/helpers.js'

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
  const [isPropertyView, setIsPropertyView] = useState(false)
  const [clickedPropertyId, setClickedPropertyId] = useState('')
  const realEstateDataFiltered = useSelector(
    state => selectRealEstateFilterData(state, dropDownDataForFilter))

  let realEstatesFilteredByRegions = filterById(realEstateDataFiltered,
    clickedPropertyId)

  useEffect(() => {
    localStorage.setItem('dropDownDataForFilter',
      JSON.stringify(dropDownDataForFilter))
  }, [dropDownDataForFilter])

  useEffect(() => {
    getRealEstates().then(res => dispatch(setRealEstates(res)))
  }, [])

  return (
    <>
      {!isPropertyView ?
        <div className={classes.homePage}>
          <HomeHeader dropDownDataForFilter={dropDownDataForFilter}
                      setDropDownDataForFilter={setDropDownDataForFilter}
                      initialDropDownData={initialDropDownData}/>


          <div className={classes.PropertyListing}>
            {realEstateDataFiltered.map(property => {
              return <PropertyListingCard key={property.id}
                                          property={property} onClick={() => {
                setIsPropertyView(true)
                setClickedPropertyId(property.id)

              }}/>
            })}
          </div>
        </div>
        :
        <PropertyDetailsWithSlider clickedPropertyId={clickedPropertyId}
                                   realEstatesFilteredByRegions={realEstatesFilteredByRegions}
                                   setIsPropertyView={setIsPropertyView}
                                   setClickedPropertyId={setClickedPropertyId}
        />
      }
    </>
  )
}

export default HomePage