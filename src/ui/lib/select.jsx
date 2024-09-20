import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from './select.module.scss'

const Select = ({
  label,
  name,
  control,
  options,
  defaultValue = null,
  onBtnClick = undefined
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className={styles.dropdownWrapper}>
          <label className={styles.label}>{label}</label>
          <div
            className={styles.dropdown}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={styles.dropdownSelected}>
              {field.value ? field.value.name : ''}
            </div>
            <div
              className={`${styles.dropdownMenu} ${isOpen ? styles.show : ''}`}
            >
              {onBtnClick && <div className={styles.dropdownItem}
                                  onClick={onBtnClick}>button</div>}
              {options.map((option) => (
                <div
                  key={option.id}
                  className={styles.dropdownItem}
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

export default Select
