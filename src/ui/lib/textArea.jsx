import React from 'react'
import { Controller } from 'react-hook-form'
import classes from './textArea.module.scss'
import InputLabel from './inputLabel.jsx'
import clsx from 'clsx'

const Textarea = ({
  name,
  label,
  error,
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
          <InputLabel fieldName={name} label={label} isReq/>
          <textarea
            className={clsx(classes.textarea,
              { [classes['inp-error']]: error })}
            id={name}
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
