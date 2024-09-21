import React, { useState, useEffect, useRef } from 'react'
import PropertyListingCard from './PropertyListingCard'
import './slider.scss'
import Icon from '../../../ui/shared/svgIcons/Icon.jsx'

const CustomSlider = ({
  realEstatesFilteredByRegions,
  setClickedPropertyId
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [removedCard, setRemovedCard] = useState(null)

  const filteredData = realEstatesFilteredByRegions.filter(
    item => item !== removedCard)
  const isSliderDisabled = filteredData.length <= 4

  const extendedData = isSliderDisabled ? filteredData : [
    ...filteredData.slice(-4),
    ...filteredData,
    ...filteredData.slice(0, 4)
  ]

  const sliderRef = useRef(null)
  const cardWidthPercentage = 100 / Math.min(filteredData.length, 4)

  useEffect(() => {
    if (sliderRef.current) {
      if (isSliderDisabled) {
        sliderRef.current.style.transform = `translateX(0%)`
      } else {
        sliderRef.current.style.transform = `translateX(-${currentIndex *
        cardWidthPercentage}%)`
      }
    }
  }, [currentIndex, cardWidthPercentage, isSliderDisabled])

  const goToNext = () => {
    if (!isSliderDisabled && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(prevIndex => prevIndex + 1)
    }
  }

  const goToPrev = () => {
    if (!isSliderDisabled && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(prevIndex => prevIndex - 1)
    }
  }

  const handleCardClick = (item) => {
    if (removedCard === item) {
      setRemovedCard(null)
    } else {
      setRemovedCard(item)
    }
    setClickedPropertyId(item.id)
  }

  useEffect(() => {
    if (isTransitioning) {
      const handleTransitionEnd = () => {
        setIsTransitioning(false)

        if (currentIndex === 0) {
          setCurrentIndex(filteredData.length)
          sliderRef.current.style.transition = 'none'
          sliderRef.current.style.transform = `translateX(-${filteredData.length *
          cardWidthPercentage}%)`
        } else if (currentIndex === extendedData.length - 4) {
          setCurrentIndex(filteredData.length - 4)
          sliderRef.current.style.transition = 'none'
          sliderRef.current.style.transform = `translateX(-${(filteredData.length -
            4) * cardWidthPercentage}%)`
        }
      }

      const sliderContent = sliderRef.current
      sliderContent.addEventListener('transitionend', handleTransitionEnd)

      return () => {
        sliderContent.removeEventListener('transitionend', handleTransitionEnd)
      }
    }
  }, [
    currentIndex,
    isTransitioning,
    filteredData.length,
    cardWidthPercentage,
    extendedData.length])

  useEffect(() => {
    if (sliderRef.current && isTransitioning) {
      sliderRef.current.style.transition = 'transform 0.3s ease-in-out'
      sliderRef.current.style.transform = `translateX(-${currentIndex *
      cardWidthPercentage}%)`
    }
  }, [currentIndex, isTransitioning, cardWidthPercentage])

  return (
    <div className="slider-wrapper">
      {extendedData.length && <button
        className="slider-button prev-button"
        onClick={goToPrev}
        disabled={isSliderDisabled}
      >
        <Icon name={'slide-left'} viewBox={'0 0 30 30'}/>
      </button>}
      <div className="custom-slider">
        <h3 className={'custom-slider__header'}>ბინები მსგავს ლოკაციაზე</h3>
        <div className="slider-content" ref={sliderRef}>
          {extendedData.length ? (
            extendedData.map((item, index) => (
              <div
                key={index}
                className="slider-item"
                style={{ width: `${cardWidthPercentage}%` }}
              >
                <PropertyListingCard
                  property={item}
                  onClick={() => handleCardClick(item)}
                />
              </div>
            ))
          ) : (
            <div>არ მოიძებნა</div>
          )}
        </div>
      </div>
      {extendedData.length && <button
        className="slider-button next-button"
        onClick={goToNext}
        disabled={isSliderDisabled}
      >
        <Icon name={'slide-right'} viewBox={'0 0 30 30'}/>
      </button>}
    </div>
  )
}

export default CustomSlider
