import classes from './input.module.scss'
import IcnBlackCheck from '../../assets/svgIcons/black-check.jsx'
import clsx from 'clsx'
import { useState } from 'react'

const Input = ({
  name,
  register,
  validation,
  label,
  isReq,
  hint,
  error,
  isTouched
}) => {
  const [isFocused, setIsFocused] = useState(false)

  let inputIsTouched = false

  if (name in isTouched) {
    inputIsTouched = true
  }

  return (
    <div className={classes['form-input']}>
      <label htmlFor={name}>{label}{isReq && '*'}</label>
      <input id={name} className={error && classes['inp-error']} {...register(
        name, validation)} type={'text'}
             onFocus={(e) => e.target.value.length > 1 && setIsFocused(true)}/>
      <span className={clsx(classes.hint, {
        [classes.green]: !error && (inputIsTouched || isFocused),
        [classes['error-red']]: error
      })}>{IcnBlackCheck()} {hint}</span>
    </div>
  )
}

export default Input