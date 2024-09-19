import classes from './propertyListingCard.module.scss'
import Icon from '../../../ui/shared/svgIcons/Icon.jsx'
import { formatNumberWithSpaces } from '../../../utils/helpers.js'

const PropertyListingCard = ({
  property: {
    address,
    price,
    image,
    zip_code,
    bedrooms,
    area
  }
}) => {

  return (
    <div className={classes.property}>
      <div className={classes['img-container']}>
        <img src={image} alt={'Property Image'}/>
      </div>

      <div className={classes['property__details']}>
        <p
          className={classes['property__details-price']}>{formatNumberWithSpaces(
          price)} ₾</p>
        <p className={classes['property__details-address']}><Icon
          name={'location'} viewBox={'0 0 14 17'}/>{address}</p>

        <div className={classes['property__details-info']}>
          <span className={classes.bed}><Icon name={'bed'}
                                              viewBox={'0 0 24 24'}/>{bedrooms}</span>
          <span className={classes.area}><Icon name={'area'}
                                               viewBox={'0 0 18 18'}/>{area}</span>
          <span className={classes.post}><Icon name={'post'}
                                               viewBox={'0 0 16 18'}/>{zip_code} </span>
        </div>
      </div>
    </div>
  )
}

export default PropertyListingCard