import { useRef } from 'react'
import { Link } from 'react-router-dom'
import classes from './homeHeader.module.scss'
import RegionSelect from './selects/regionSelect.jsx'
import PriceSelect from './selects/priceSelect.jsx'
import AddAgentModal from './addAgentModal.jsx'

const HomeHeader = () => {
  const addAgentModalRef = useRef(null)

  return (
    <header className={classes.header}>
      <div className={classes['header-selects']}>
        <RegionSelect/>
        <PriceSelect/>
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

      <AddAgentModal ref={addAgentModalRef}/>
    </header>
  )
}

export default HomeHeader