import { useEffect } from 'react'
import { deleteRealEstate, getRealEstate } from '../../api/realEstate.js'

const PropertyDetailsWithSlider = ({
  clickedPropertyId,
  realEstateDataFiltered,
  setIsPropertyView
}) => {

  useEffect(() => {
    getRealEstate(clickedPropertyId).then(res => console.log(res))
  }, [])

  return (<div>
    <button onClick={() => setIsPropertyView(false)}>დაბრუნება</button>

    {clickedPropertyId}</div>)
}

export default PropertyDetailsWithSlider