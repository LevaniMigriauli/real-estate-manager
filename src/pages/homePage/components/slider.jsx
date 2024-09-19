import React, { useState, useEffect } from 'react'
import PropertyListingCard from './PropertyListingCard'

const CustomSlider = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(4)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const extendedData = [
    ...data.slice(-4),
    ...data,
    ...data.slice(0, 4)
  ]

  useEffect(() => {
    if (isTransitioning) {
      const transitionEnd = () => {
        setIsTransitioning(false)

        if (currentIndex === data.length + 4) {
          setCurrentIndex(4)
        } else if (currentIndex === 0) {
          setCurrentIndex(data.length)
        }
      }
      const sliderContent = document.querySelector('.slider-content')
      sliderContent.addEventListener('transitionend', transitionEnd)

      return () => {
        sliderContent.removeEventListener('transitionend', transitionEnd)
      }
    }
  }, [currentIndex, isTransitioning, data.length])

  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const goToPrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="custom-slider">
      <div
        className="slider-content"
        style={{
          transform: `translateX(-${currentIndex * 25}%)`,
          transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
        }}
      >
        {extendedData.map((item, index) => (
          <div
            key={index}
            className="slider-item"
          >
            <PropertyListingCard property={item}/>
          </div>
        ))}
      </div>
      <button className="slider-button prev-button" onClick={goToPrev}>
        ←
      </button>
      <button className="slider-button next-button" onClick={goToNext}>
        →
      </button>
    </div>
  )
}

export default CustomSlider
