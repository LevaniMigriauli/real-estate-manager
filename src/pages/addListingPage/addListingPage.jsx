import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCities } from '../../api/geographicalInfo.js'
import { setCities } from '../../redux/slices/citiesSlice.js'

const AddListingPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getCities().then(res => {
      console.log(res)
      dispatch(setCities(res))
    })
  }, [])

  return (
    <div>Add Listing</div>
  )
}

export default AddListingPage