import { useEffect } from 'react'
import { deleteRealEstate, getRealEstate } from '../../api/realEstate.js'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './propertyDetailsWithSlider.scss'
import CustomSlider from './components/slider.jsx'

const PropertyDetailsWithSlider = ({
  clickedPropertyId,
  realEstateDataFiltered,
  setIsPropertyView
}) => {

  useEffect(() => {
    getRealEstate(clickedPropertyId).then(res => console.log(res))
  }, [])

  return (<div>
    <button onClick={() => setIsPropertyView(
      false)}>დაბრუნება {clickedPropertyId}</button>


    <CustomSlider data={realEstateDataFiltered}/>


    {clickedPropertyId}</div>)
}

export default PropertyDetailsWithSlider