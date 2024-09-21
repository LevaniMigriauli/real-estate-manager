import React, { memo, useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import classes from './select.module.scss'
import InputLabel from './inputLabel.jsx'
import clsx from 'clsx'
import chevronDown from '../../assets/svgIcons/chevron-down.jsx'

const Select = ({
  label,
  name,
  isReq = false,
  rules,
  control,
  options,
  error,
  isDirty,
  defaultValue = null,
  onBtnClick = undefined,
  onRegionOptionSelect = undefined
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

  const hint = `აირჩიეთ მონაცემები`

  console.log(name)
  console.log(options)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className={classes.dropdownWrapper} ref={dropdownRef}>
          <InputLabel label={label} fieldName={name} isReq={isReq}/>
          <div
            className={clsx(classes.dropdown, { [classes.isOpened]: isOpen , [classes['inp-error']] : error})}
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
              {options?.map((option) => (
                <div
                  key={option.id}
                  className={classes.dropdownItem}
                  onClick={() => {
                    field.onChange(option)
                    onRegionOptionSelect && onRegionOptionSelect()
                    setIsOpen(false)
                    if (!isOpen) {
                      field.onBlur() // Mark the field as touched when dropdown is opened
                    }
                  }}
                >
                  {option.name}
                </div>
              ))}
            </div>
            {chevronDown()}
          </div>
          <span className={clsx(classes.hint, {
            [classes['error-red']]: error,
            [classes['valid-green']]: !error && isDirty
          })}>
        {/*{IcnBlackCheck()} {hint}*/}
            {error ? error.message : hint === label ? '' : hint}
      </span>
        </div>
      )}
    />
  )
}

export default memo(Select)
