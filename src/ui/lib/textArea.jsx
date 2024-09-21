import React from 'react'
import { Controller } from 'react-hook-form'
import classes from './textArea.module.scss'

const Textarea = ({
  label,
  id,
  name,
  control,
  rules = {},
  defaultValue = '',
  rows = 4,
  cols = 50,
  maxLength = 1000
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <div className={classes.description}>
          <label htmlFor={id}>{label}</label>
          <textarea
            className={classes.textarea}
            id={id}
            name={name}
            rows={rows}
            cols={cols}
            maxLength={maxLength}
            value={field.value}
            onChange={field.onChange}
          />
        </div>
      )}
    />
  )
}

export default Textarea
