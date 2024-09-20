import React, { useEffect, useState } from 'react'
import { deleteRealEstate, getRealEstate } from '../../api/realEstate.js'
import classes from './propertyDetailsWithSlider.module.scss'
import CustomSlider from './components/slider.jsx'
import Icon from '../../ui/shared/svgIcons/Icon.jsx'
import {
  formatDateToMMDDYYYY,
  formatNumberWithCommas
} from '../../utils/helpers.js'

const PropertyDetailsWithSlider = ({
  clickedPropertyId,
  setIsPropertyView,
  setClickedPropertyId,
  realEstatesFilteredByRegions
}) => {
  const [realEstateDetails, setRealEstateDetails] = useState([])

  useEffect(() => {
    getRealEstate(clickedPropertyId).then(res => setRealEstateDetails(res))
  }, [clickedPropertyId])

  return (
    <div className={classes['property-container']}>
      <button className={classes['btn-goBack']} onClick={() => setIsPropertyView(
        false)}><Icon name={'slide-left'} viewBox={'0 0 30 30'}/></button>

      <div className={classes['real-estate']}>
        <div className={classes['real-estate__img-container']}>
          <img src={realEstateDetails.image}
               alt={'Selected real estate image'}/>
          <span>გამოქვეყნების თარიღი {formatDateToMMDDYYYY(
            realEstateDetails['created_at'])}</span>
        </div>

        <div className={classes['real-estate__info']}>
          <p className={classes.price}>{formatNumberWithCommas(
            Number(realEstateDetails.price))} ₾</p>

          <div className={classes.basics}>
            <p className={classes['basics__address']}><Icon
              name={'location'}
              viewBox={'0 0 15 17'}/>{realEstateDetails.address}
            </p>
            <p><Icon name={'area'}
                     viewBox={'0 0 18 18'}/>ფართი {realEstateDetails.area}</p>
            <p><Icon name={'bed'}
                     viewBox={'0 0 24 24'}/>საძინებელი {realEstateDetails.bedrooms}
            </p>
            <p><Icon name={'post'}
                     viewBox={'0 0 15 17'}/>საფოსტო
              ინდექსი {realEstateDetails['zip_code']}</p>
          </div>

          <p className={classes.description}>{realEstateDetails.description}</p>

          <div className={classes.agent}>
            <div className={classes['agent__main-info']}>
              <img src={realEstateDetails.agent?.avatar}
                   alt={'Sales agent profile image'}/>
              <div>
                <p
                  className={classes.name}>{realEstateDetails.agent?.name} {realEstateDetails?.agent?.surname}</p>
                <p>აგენტი</p>
              </div>
            </div>

            <div className={classes['agent__other-details']}>
              <p className={classes.email}><Icon name={'inbox'}
                                                 viewBox={'0 0 16 13'}/> {realEstateDetails.agent?.email}
              </p>
              <p className={classes.phone}><Icon name={'phone'}
                                                 viewBox={'0 0 14 14'}/> {realEstateDetails.agent?.phone}
              </p>
            </div>
          </div>

          <button className={classes['btn-delete-listing']}>
            ლისტინგის წაშლა
          </button>
        </div>
      </div>

      <CustomSlider realEstatesFilteredByRegions={realEstatesFilteredByRegions}
                    setClickedPropertyId={setClickedPropertyId}/>
    </div>)
}

export default PropertyDetailsWithSlider