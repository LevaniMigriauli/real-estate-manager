import classes from './input.module.scss'
import clsx from 'clsx'
import { memo } from 'react'
import InputLabel from './inputLabel.jsx'

const Input = ({
  name: fieldName,
  register,
  validation,
  label,
  isReq,
  hint,
  error,
  isTouched,
  isDirty,
  maxLength
}) => {

  return (
    <div className={classes['form-input']}>
      <InputLabel label={label} fieldName={fieldName} isReq={isReq}/>
      <input id={fieldName} className={error && classes['inp-error']}
             maxLength={maxLength} {...register(
        fieldName, validation)} type={'text'}/>
      <span className={clsx(classes.hint, {
        [classes['error-red']]: error,
        [classes['valid-green']]: !error && isDirty && isTouched
      })}>
        {/*{IcnBlackCheck()} {hint}*/}
        {error ? error.message : hint === label ? '' : hint}
      </span>
    </div>
  )
}

export default memo(Input)