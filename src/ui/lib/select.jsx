import React, { memo, useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import classes from './select.module.scss'
import InputLabel from './inputLabel.jsx'

const Select = ({
  label,
  name,
  isReq = false,
  control,
  options,
  defaultValue = null,
  onBtnClick = undefined
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className={classes.dropdownWrapper} ref={dropdownRef}>
          <InputLabel label={label} fieldName={name} isReq={isReq}/>
          <div
            className={classes.dropdown}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={classes.dropdownSelected}>
              {field.value ? field.value.name : ''}
            </div>
            <div
              className={`${classes.dropdownMenu} ${isOpen
                ? classes.show
                : ''}`}
            >
              {onBtnClick && <div className={classes.dropdownItem}
                                  onClick={onBtnClick}>button</div>}
              {options.map((option) => (
                <div
                  key={option.id}
                  className={classes.dropdownItem}
                  onClick={() => {
                    field.onChange(option)
                    setIsOpen(false)
                  }}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  )
}

export default memo(Select)
