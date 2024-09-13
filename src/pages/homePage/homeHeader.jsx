import classes from './homeHeader.module.scss'
import RegionSelect from './selects/regionSelect.jsx'
import PriceSelect from './selects/priceSelect.jsx'

const HomeHeader = () => {


  return (
    <header className={classes.header}>
      <div className={classes['header-selects']}>
      <RegionSelect/>
      <PriceSelect/>
      </div>
    </header>
  )
}

export default HomeHeader