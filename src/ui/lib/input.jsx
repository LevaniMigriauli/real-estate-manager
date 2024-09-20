import classes from './input.module.scss'
import IcnBlackCheck from '../../assets/svgIcons/black-check.jsx'
import clsx from 'clsx'
import { memo } from 'react'

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
      <label htmlFor={fieldName}>{label}{isReq && '*'}</label>
      <input id={fieldName} className={error && classes['inp-error']} maxLength={maxLength} {...register(
        fieldName, validation)} type={'text'}/>
      <span className={clsx(classes.hint, classes.default, {
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