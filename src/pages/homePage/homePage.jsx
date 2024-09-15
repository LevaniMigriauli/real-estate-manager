import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setRealEstates } from '../../redux/slices/realEstatesSlice.js'
import classes from "./homePage.module.scss"
import HomeHeader from './homeHeader.jsx'
import { getRealEstates } from '../../api/realEstate.js'



const HomePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getRealEstates().then(res => dispatch(setRealEstates(res)))
  }, [])

  return (
    <div className={classes.homePage}>
      <HomeHeader />
    </div>
  )
}

export default HomePage